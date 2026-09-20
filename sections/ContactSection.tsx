"use client"
import { Box, Stack, Container } from '@mui/material'
import React from 'react'
import { styles } from '@/styles/styles'
import HeaderText from '@/components/headers/HeaderText'
import HeaderBanner from '@/components/headers/HeaderBanner'
import ContactDetails from '@/components/contact/ContactDetails'
import '@/styles/animatedButton.css'
import GlowButton from '@/components/ui/buttons/GlowButton'


type CountryFeature = {
  id?: string | number;
};

type CountryCollection = {
  features: CountryFeature[];
};


// const ContactSection = () => {
//   return (
//     <Box
//      component={"section"} 
//      id="contact"

//       sx={{ ...styles.section_container }}
//       >
//               <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 0,
//           pointerEvents: "none",
//           opacity: "10%",
//           transform: "translate(0%, 20%)"
//         }}
//       >
//         {/* <DottedWorldMap
//           dotSpacing={11}
//           dotRadius={1.4}
//           highlightColor="#8B5CF6"
//           opacity={0.22}
//         /> */}
//       </Box>
//       <Box sx={{ ...styles.between_flex,flexDirection:"column", width: "100%", px: { xs: "1rem", md: "8vw", xxl: "10vw" }, }}>
//         <Stack spacing={4}>
//           <HeaderText label='get in touch' />
//           <HeaderBanner
//             text="Let&apos;s create something"
//             spanText='extraordinary'
//             spanColor="rgb(32, 161, 253)"
//             subtitle=" I'm currently available for new projects and collaborations. Whether you have a question or just want to say hello, I'd love to hear from you."

//           />
//         </Stack>
//         <Box sx={{
//           ...styles.between_flex,
//           alignItems: "center",
//           height: "100%",
//           width: "100%"
//         }}>
//           <Stack mt={4}>
//             <ContactDetails />
//             {/* <SocialContacts /> */}
//           </Stack>

//           <GlowButton
//             title="START A PROJECT"
//             subtitle="Tell me about your project and let's bring your ideas to life."
//           />
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default ContactSection

function ContactSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [saPing, setSaPing] = React.useState<[number, number] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    async function setup() {
      const [{ default: world }, { feature }, { geoMercator, geoPath, geoCentroid }] =
        await Promise.all([
          import("world-atlas/countries-110m.json"),
          import("topojson-client"),
          import("d3-geo"),
        ]);

      if (cancelled) return;

      const worldData = world as unknown as { objects: { countries: unknown } };
      const countries = feature(
        worldData as never,
        worldData.objects.countries as never,
      ) as unknown as CountryCollection;
      const mapFeatures = countries.features.filter(
        (country) => Number(country.id) !== 10,
      );
      const mapShape = {
        type: "FeatureCollection",
        features: mapFeatures,
      };
      const sa = countries.features.find((country) => Number(country.id) === 710);

      function draw() {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section || cancelled) return;

        const W = Math.round(section.clientWidth);
        const H = Math.round(section.clientHeight);
        if (W === 0 || H === 0) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;

        const ctx = canvas.getContext("2d")!;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        // Mercator projection — scale fills full width
        const isSmall = W < 600;
        const paddingX = Math.max(isSmall ? 10 : 24, W * (isSmall ? 0.03 : 0.05));
        const paddingTop = Math.max(isSmall ? 48 : 32, H * (isSmall ? 0.12 : 0.08));
        const paddingBottom = Math.max(isSmall ? 56 : 32, H * (isSmall ? 0.12 : 0.08));
        const proj = geoMercator().fitExtent(
          [
            [paddingX, paddingTop],
            [W - paddingX, H - paddingBottom],
          ],
          mapShape as never,
        );

        // ── Offscreen rasterize land + SA ──────────────────────────
        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const octx = off.getContext("2d")!;
        const pathGen = geoPath(proj, octx);

        // All land: muted gray
        octx.fillStyle = "rgba(120,120,120,1)";
        mapFeatures.forEach((country) => {
          octx.beginPath();
          pathGen(country as never);
          octx.fill();
        });

        // South Africa: solid red (for detection)
        if (sa) {
          octx.fillStyle = "rgba(255,0,0,1)";
          octx.beginPath();
          pathGen(sa as never);
          octx.fill();
        }

        const { data: pixels } = octx.getImageData(0, 0, W, H);

        // SA centroid → screen coords
        let saXY: [number, number] | null = null;
        if (sa) {
          const c = geoCentroid(sa as Parameters<typeof geoCentroid>[0]);
          const p = proj(c as [number, number]);
          if (p) saXY = p as [number, number];
        }

        // ── SA glow ────────────────────────────────────────────────
        if (saXY) {
          const [sx, sy] = saXY;
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.min(W, H) * 0.18);
          g.addColorStop(0, "rgba(116, 56, 246, 0.32)");
          g.addColorStop(0.45, "rgba(88, 34, 197, 0.1)");
          g.addColorStop(1, "rgba(34,197,94,0)");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
        }

        // ── Dots ───────────────────────────────────────────────────
        const SPACING = Math.max(6, Math.round(W / 160));
        const R_LAND = SPACING * 0.17;
        const R_SA = SPACING * 0.29;

        for (let x = SPACING / 2; x < W; x += SPACING) {
          for (let y = SPACING / 2; y < H; y += SPACING) {
            const xi = Math.min(Math.round(x), W - 1);
            const yi = Math.min(Math.round(y), H - 1);
            const idx = (yi * W + xi) * 4;
            const r = pixels[idx];
            const g = pixels[idx + 1];
            const b = pixels[idx + 2];

            if (r > 200 && g < 50 && b < 50) {
              // South Africa
              ctx.fillStyle = "rgba(34, 135, 197, 0.95)";
              ctx.beginPath();
              ctx.arc(x, y, R_SA, 0, Math.PI * 2);
              ctx.fill();
            } else if (r > 60) {
              // Other land
              ctx.fillStyle = "rgba(255,255,255,0.22)";
              ctx.beginPath();
              ctx.arc(x, y, R_LAND, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        if (saXY) setSaPing([...saXY] as [number, number]);
      }

      draw();

      ro = new ResizeObserver(draw);
      if (sectionRef.current) ro.observe(sectionRef.current);
    }

    setup();
    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, []);

  return (
    <Box
  ref={sectionRef}
  className="relative"
  sx={{
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    minHeight: "100svh",
    height: "100%",
    isolation: "isolate",
    overflow: "hidden",
  }}
>
      {/* Map canvas */}
      {/* <Box sx={{ height: "100%",  width: "100%", zIndex: 0, pointerEvents: "none", opacity: "10%", transform: "translate(0%, 20%)" }}> */}
      <canvas ref={canvasRef} className="absolute top-[10%] w-full inset-0 pointer-events-none opacity-100 " style={{ zIndex: 0, }} />
      {/* </Box> */}


      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #05080e 0%, transparent 100%)",
          zIndex: 1,
        }}
      />
      <Container sx={{
        ...styles.section_container,
        ...styles.between_flex,
        position: "relative", zIndex: 10, flexDirection: "column",
        width: "100%", height: "100%", px: { xs: "1rem", md: "8vw", xxl: "10vw" },
      }}>
        <Stack spacing={4} sx={{ height: "100%", width: "100%", }}>
          <HeaderText label='get in touch' />
          <HeaderBanner
            text="Let&apos;s create something"
            spanText='extraordinary'
            spanColor="rgb(32, 161, 253)"
            subtitle=" I'm currently available for new projects and collaborations. Whether you have a question or just want to say hello, I'd love to hear from you."

          />
        </Stack>

        <Box sx={{
          ...styles.between_flex,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "start", md: "center" },
          height: "100%",
          width: "100%",
          gap: 4
        }}>
          <Stack mt={4} >
            <ContactDetails />
            {/* <SocialContacts /> */}
          </Stack>

          <GlowButton
            title="START A PROJECT"
            subtitle="Tell me about your project and let's bring your ideas to life."
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection
