"use client"
import { Box, Stack } from '@mui/material'
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
      const sa = countries.features.find((country) => Number(country.id) === 710);

      function draw() {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section || cancelled) return;

        const W = section.offsetWidth;
        const H = section.offsetHeight;
        if (W === 0 || H === 0) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;

        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, W, H);

        // Mercator projection — scale fills full width
        const scale = W / 6.4;
        const proj = geoMercator()
          .scale(scale)
          .translate([W / 2, H / 2 + H * 0.14]);

        // ── Offscreen rasterize land + SA ──────────────────────────
        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const octx = off.getContext("2d")!;
        const pathGen = geoPath(proj, octx);

        // All land: muted gray
        octx.fillStyle = "rgba(120,120,120,1)";
        countries.features.forEach((country) => {
          pathGen(country as never);
          octx.fill();
        });

        // South Africa: solid red (for detection)
        if (sa) {
          octx.fillStyle = "rgba(255,0,0,1)";
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
          g.addColorStop(0, "rgba(116, 56, 246, 0.2)");
          g.addColorStop(0.45, "rgba(88, 34, 197, 0.06)");
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
              ctx.fillStyle = "rgba(255,255,255,0.055)";
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
      sx={{ ...styles.section_container, minHeight: "100svh", background: "transparent", isolation: "isolate" }}
    >
      {/* Map canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 0, scale:"0.5" }} />

      {/* Bottom fade so content reads clean */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #05080e 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* SA ping dot */}
      {saPing && (
        <div
          className="absolute pointer-events-none"
          style={{ left: saPing[0], top: saPing[1], transform: "translate(-50%,-50%)", zIndex: 2 }}
        >
          <span className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: "#3b22c5" }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ backgroundColor: "#227cc5", boxShadow: "0 0 10px rgba(34, 173, 197, 0.9)" }}
            />
          </span>
        </div>
      )}

      {/* Content */}
      {/* <div
        className="relative flex flex-col justify-between h-full px-8 py-16 md:px-20 md:py-24"
        style={{ minHeight: "100svh", zIndex: 3 }}
      >
        //  Headline block 
        <div>
          <p
            className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-semibold mb-6 md:mb-10"
            style={{ color: "#4f6ef7" }}
          >
            Based in South Africa
          </p>
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
          >
            Building
            <br />
            beyond
            <br />
            <span style={{ color: "rgba(255,255,255,0.18)" }}>borders.</span>
          </h2>
        </div>

        Contact row
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 pt-16">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/25 mb-1">
              Get in touch
            </p>
            <a
              href="mailto:hello@studio.co.za"
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 300 }}
            >
              hello@studio.co.za
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <path
                  d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>

          Socials + CTA
          <div className="flex items-center gap-6">
            {["Li", "Be", "Gh", "Tw"].map((s) => (
              <button
                key={s}
                className="text-[10px] font-semibold tracking-widest text-white/25 hover:text-white/60 transition-colors duration-300"
              >
                {s}
              </button>
            ))}
            <div className="w-px h-4 bg-white/10" />
            <button
              className="group flex items-center gap-3 transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <span className="text-[10px] tracking-[0.28em] uppercase font-medium group-hover:text-white transition-colors duration-300">
                Let&apos;s work together
              </span>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M1.5 6.5H11.5M11.5 6.5L7.5 2.5M11.5 6.5L7.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div> */}
      <Box
        sx={{
          ...styles.between_flex,
          position: "relative",
          zIndex: 10,
          flexDirection: "column",
          width: "100%",
          px: { xs: "1rem", md: "8vw", xxl: "10vw" },
        }}
      >
        <Stack spacing={4}>
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
          alignItems: "center",
          height: "100%",
          width: "100%"
        }}>
          <Stack mt={4}>
            <ContactDetails />
            {/* <SocialContacts /> */}
          </Stack>

          <GlowButton
            title="START A PROJECT"
            subtitle="Tell me about your project and let's bring your ideas to life."
          />


        </Box>
      </Box>
    </Box>
  );
}

export default ContactSection
