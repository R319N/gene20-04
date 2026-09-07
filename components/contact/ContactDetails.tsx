"use client"
import pxToRem from '@/assets/theme/functions/pxToRem'
import contactDetailsdata from '@/constants/contact_detailsData'
import { styles } from '@/styles/styles'
import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
// import SocialMediaLinks from './SocialMediaLinks'

const ContactDetails = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <Stack gap={1.5} ref={ref} className='details w-full items-start'>
            {contactDetailsdata.map((item, i) => (
                <Stack key={i} gap={0} className='flex justify-start'>
                    <div className="flex items-center gap-5">
                        <Box sx={{
                            ...styles.iconXS,
                            // width:"40px", height:"40px"

                        }}>
                            {item.component}
                        </Box>

                        {/* <Box className='flex flex-col '> */}
                        {/* <Typography variant="body1" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                                {item.name}
                            </Typography> */}
                        < Typography variant='body1' color="textSecondary"
                            sx={{ fontWeight: "bold", 
                                lineHeight: "100%", letterSpacing: "0.5px", 
                                fontSize: { xs: "0.9rem", lg: pxToRem(14) } }}
                        >
                            {item.details}
                        </Typography>

                        {/* </Box> */}

                    </div>
                    {/* <Divider sx={{ width: "100%" }} /> */}
                </Stack>

            ))}
        </Stack>
    )
})

ContactDetails.displayName = 'ContactDetails'

export default ContactDetails
// function ContactSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [saPing, setSaPing] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     let ro: ResizeObserver | null = null;

//     async function setup() {
//       const [{ default: world }, { feature }, { geoMercator, geoPath, geoCentroid }] =
//         await Promise.all([
//           import("world-atlas/countries-110m.json"),
//           import("topojson-client"),
//           import("d3-geo"),
//         ]);

//       if (cancelled) return;

//       const countries = feature(world as any, (world as any).objects.countries) as any;
//       const sa = (countries.features as any[]).find((f: any) => Number(f.id) === 710);

//       function draw() {
//         const canvas = canvasRef.current;
//         const section = sectionRef.current;
//         if (!canvas || !section || cancelled) return;

//         const W = section.offsetWidth;
//         const H = section.offsetHeight;
//         if (W === 0 || H === 0) return;

//         const dpr = Math.min(window.devicePixelRatio || 1, 2);
//         canvas.width = W * dpr;
//         canvas.height = H * dpr;
//         canvas.style.width = `${W}px`;
//         canvas.style.height = `${H}px`;

//         const ctx = canvas.getContext("2d")!;
//         ctx.scale(dpr, dpr);
//         ctx.clearRect(0, 0, W, H);

//         // Mercator projection — scale fills full width
//         const scale = W / 6.4;
//         const proj = geoMercator()
//           .scale(scale)
//           .translate([W / 2, H / 2 + H * 0.14]);

//         // ── Offscreen rasterize land + SA ──────────────────────────
//         const off = document.createElement("canvas");
//         off.width = W;
//         off.height = H;
//         const octx = off.getContext("2d")!;
//         const pathGen = geoPath(proj as any, octx);

//         // All land: muted gray
//         octx.fillStyle = "rgba(120,120,120,1)";
//         (countries.features as any[]).forEach((f: any) => {
//           pathGen(f);
//           octx.fill();
//         });

//         // South Africa: solid red (for detection)
//         if (sa) {
//           octx.fillStyle = "rgba(255,0,0,1)";
//           pathGen(sa);
//           octx.fill();
//         }

//         const { data: pixels } = octx.getImageData(0, 0, W, H);

//         // SA centroid → screen coords
//         let saXY: [number, number] | null = null;
//         if (sa) {
//           const c = geoCentroid(sa as any);
//           const p = proj(c as [number, number]);
//           if (p) saXY = p as [number, number];
//         }

//         // ── SA glow ────────────────────────────────────────────────
//         if (saXY) {
//           const [sx, sy] = saXY;
//           const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.min(W, H) * 0.18);
//           g.addColorStop(0, "rgba(34,197,94,0.2)");
//           g.addColorStop(0.45, "rgba(34,197,94,0.06)");
//           g.addColorStop(1, "rgba(34,197,94,0)");
//           ctx.fillStyle = g;
//           ctx.fillRect(0, 0, W, H);
//         }

//         // ── Dots ───────────────────────────────────────────────────
//         const SPACING = Math.max(6, Math.round(W / 160));
//         const R_LAND = SPACING * 0.17;
//         const R_SA = SPACING * 0.29;

//         for (let x = SPACING / 2; x < W; x += SPACING) {
//           for (let y = SPACING / 2; y < H; y += SPACING) {
//             const xi = Math.min(Math.round(x), W - 1);
//             const yi = Math.min(Math.round(y), H - 1);
//             const idx = (yi * W + xi) * 4;
//             const r = pixels[idx];
//             const g = pixels[idx + 1];
//             const b = pixels[idx + 2];

//             if (r > 200 && g < 50 && b < 50) {
//               // South Africa
//               ctx.fillStyle = "rgba(34,197,94,0.95)";
//               ctx.beginPath();
//               ctx.arc(x, y, R_SA, 0, Math.PI * 2);
//               ctx.fill();
//             } else if (r > 60) {
//               // Other land
//               ctx.fillStyle = "rgba(255,255,255,0.055)";
//               ctx.beginPath();
//               ctx.arc(x, y, R_LAND, 0, Math.PI * 2);
//               ctx.fill();
//             }
//           }
//         }

//         if (saXY) setSaPing([...saXY] as [number, number]);
//       }

//       draw();

//       ro = new ResizeObserver(draw);
//       if (sectionRef.current) ro.observe(sectionRef.current);
//     }

//     setup();
//     return () => {
//       cancelled = true;
//       ro?.disconnect();
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden"
//       style={{ minHeight: "100svh", background: "#05080e" }}
//     >
//       {/* Map canvas */}
//       <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

//       {/* Bottom fade so content reads clean */}
//       <div
//         className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
//         style={{
//           background: "linear-gradient(to top, #05080e 0%, transparent 100%)",
//           zIndex: 1,
//         }}
//       />

//       {/* SA ping dot */}
//       {saPing && (
//         <div
//           className="absolute pointer-events-none"
//           style={{ left: saPing[0], top: saPing[1], transform: "translate(-50%,-50%)", zIndex: 2 }}
//         >
//           <span className="relative flex h-3 w-3">
//             <span
//               className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
//               style={{ backgroundColor: "#22c55e" }}
//             />
//             <span
//               className="relative inline-flex rounded-full h-3 w-3"
//               style={{ backgroundColor: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.9)" }}
//             />
//           </span>
//         </div>
//       )}

//       {/* Content */}
//       <div
//         className="relative flex flex-col justify-between h-full px-8 py-16 md:px-20 md:py-24"
//         style={{ minHeight: "100svh", zIndex: 3 }}
//       >
//         {/* Headline block */}
//         <div>
//           <p
//             className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-semibold mb-6 md:mb-10"
//             style={{ color: "#4f6ef7" }}
//           >
//             Based in South Africa
//           </p>
//           <h2
//             className="font-black text-white leading-none tracking-tight"
//             style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
//           >
//             Building
//             <br />
//             beyond
//             <br />
//             <span style={{ color: "rgba(255,255,255,0.18)" }}>borders.</span>
//           </h2>
//         </div>

//         {/* Contact row */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 pt-16">
//           <div className="flex flex-col gap-1">
//             <p className="text-[10px] tracking-[0.28em] uppercase text-white/25 mb-1">
//               Get in touch
//             </p>
//             <a
//               href="mailto:hello@studio.co.za"
//               className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
//               style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 300 }}
//             >
//               hello@studio.co.za
//               <svg
//                 width="11"
//                 height="11"
//                 viewBox="0 0 11 11"
//                 fill="none"
//                 className="opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <path
//                   d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
//                   stroke="currentColor"
//                   strokeWidth="1.4"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Socials + CTA */}
//           <div className="flex items-center gap-6">
//             {["Li", "Be", "Gh", "Tw"].map((s) => (
//               <button
//                 key={s}
//                 className="text-[10px] font-semibold tracking-widest text-white/25 hover:text-white/60 transition-colors duration-300"
//               >
//                 {s}
//               </button>
//             ))}
//             <div className="w-px h-4 bg-white/10" />
//             <button
//               className="group flex items-center gap-3 transition-colors duration-300"
//               style={{ color: "rgba(255,255,255,0.4)" }}
//             >
//               <span className="text-[10px] tracking-[0.28em] uppercase font-medium group-hover:text-white transition-colors duration-300">
//                 Let&apos;s work together
//               </span>
//               <span
//                 className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
//                 style={{ border: "1px solid rgba(255,255,255,0.12)" }}
//               >
//                 <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//                   <path
//                     d="M1.5 6.5H11.5M11.5 6.5L7.5 2.5M11.5 6.5L7.5 10.5"
//                     stroke="currentColor"
//                     strokeWidth="1.3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }