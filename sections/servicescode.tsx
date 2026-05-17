'use client';

// import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
// import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
// import BrushRounded from '@mui/icons-material/BrushRounded';
// import CodeRounded from '@mui/icons-material/CodeRounded';
// import DrawRounded from '@mui/icons-material/DrawRounded';
// import LayersRounded from '@mui/icons-material/LayersRounded';
// import PaletteRounded from '@mui/icons-material/PaletteRounded';
// import PlayCircleOutlineRounded from '@mui/icons-material/PlayCircleOutlineRounded';
// import TagRounded from '@mui/icons-material/TagRounded';
// import { Box, Stack, Typography } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';

// const services = [
//   {
//     eyebrow: 'Web Development',
//     title: 'WEB\nDEVELOPMENT',
//     lead: 'We build fast, scalable, and high-performance websites that drive real results.',
//     note: 'Modern code. Clean architecture. Seamless experience across all devices and platforms.',
//     cta: 'Explore Web Development',
//     icon: <CodeRounded />,
//     accent: '#8b7cff',
//     visual: 'code',
//     points: [
//       ['Performance', 'Optimized'],
//       ['Scalability', 'Future-ready'],
//       ['Security', 'Best practices'],
//       ['SEO', 'Search optimized'],
//     ],
//   },
//   {
//     eyebrow: 'Graphic Design / UI/UX',
//     title: 'GRAPHIC\nDESIGN',
//     lead: 'We design polished interfaces and visuals that make brands feel clear, confident, and easy to trust.',
//     note: 'Product screens, social graphics, layouts, and user flows shaped for clarity.',
//     cta: 'Explore Graphic Design',
//     icon: <BrushRounded />,
//     accent: '#38d7ff',
//     visual: 'design',
//     points: [
//       ['UI Systems', 'Reusable'],
//       ['UX Flow', 'Friction-light'],
//       ['Visuals', 'Campaign-ready'],
//       ['Layouts', 'Pixel sharp'],
//     ],
//   },
//   {
//     eyebrow: 'Content',
//     title: 'CONTENT\nCREATION',
//     lead: 'We craft useful content that gives your brand a consistent voice across web, social, and campaigns.',
//     note: 'Copy, messaging, content structure, and creative direction for digital channels.',
//     cta: 'Explore Content',
//     icon: <DrawRounded />,
//     accent: '#ff70c9',
//     visual: 'content',
//     points: [
//       ['Copywriting', 'Clear voice'],
//       ['Social', 'Consistent'],
//       ['Story', 'Brand-aligned'],
//       ['Planning', 'Channel-ready'],
//     ],
//   },
//   {
//     eyebrow: 'Branding',
//     title: 'BRAND\nIDENTITY',
//     lead: 'We build memorable brand systems that help your business look established from the first interaction.',
//     note: 'Logos, color systems, type direction, brand rules, and launch-ready assets.',
//     cta: 'Explore Branding',
//     icon: <TagRounded />,
//     accent: '#a6ff6b',
//     visual: 'brand',
//     points: [
//       ['Identity', 'Distinct'],
//       ['Guidelines', 'Practical'],
//       ['Assets', 'Launch-ready'],
//       ['Positioning', 'Focused'],
//     ],
//   },
// ];

// const ServicesSection = () => {
//   const sectionRef = useRef<HTMLElement | null>(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let frame = 0;

//     const updateProgress = () => {
//       const section = sectionRef.current;
//       if (!section) return;

//       const viewportHeight = window.innerHeight;
//       const scrollable = section.offsetHeight - viewportHeight;
//       const nextProgress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable));

//       setProgress(nextProgress);
//     };

//     const onScroll = () => {
//       window.cancelAnimationFrame(frame);
//       frame = window.requestAnimationFrame(updateProgress);
//     };

//     updateProgress();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     window.addEventListener('resize', onScroll);

//     return () => {
//       window.cancelAnimationFrame(frame);
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onScroll);
//     };
//   }, []);

//   return (
//     <Box
//       ref={sectionRef}
//       component="section"
//       id="services"
//       sx={{
//         position: 'relative',
//         minHeight: { xs: 'auto', md: `${services.length * 100}vh` },
//         bgcolor: '#010513',
//         color: '#f5f7ff',
//       }}
//     >
//       <Box
//         sx={{
//           position: { xs: 'relative', md: 'sticky' },
//           top: 0,
//           height: { xs: 'auto', md: '100vh' },
//           overflow: 'hidden',
//         }}
//       >
//         <Box
//           sx={{
//           display: 'flex',
//           width: { xs: '100%', md: `${services.length * 100}%` },
//           transform: { xs: 'none', md: `translate3d(-${progress * (services.length - 1) * (100 / services.length)}%, 0, 0)` },
//           transition: 'transform 0.08s linear',
//           overflowX: { xs: 'auto', md: 'visible' },
//           overflowY: 'hidden',
//           scrollSnapType: 'x mandatory',
//           scrollBehavior: 'smooth',
//           scrollbarWidth: 'none',
//           '&::-webkit-scrollbar': { display: 'none' },
//         }}
//       >
//         {services.map((service, index) => (
//           <ServicePanel key={service.eyebrow} service={service} index={index} />
//         ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// function ServicePanel({
//   service,
//   index,
// }: {
//   service: (typeof services)[number];
//   index: number;
// }) {
//   return (
//     <Box
//       component="article"
//       sx={{
//         position: 'relative',
//         flex: { xs: '0 0 100%', md: `0 0 ${100 / services.length}%` },
//         minHeight: { xs: 'auto', md: '100vh' },
//         scrollSnapAlign: 'start',
//         overflow: 'hidden',
//         px: { xs: 2.5, sm: 4, md: 7 },
//         py: { xs: 8, md: 0 },
//         borderLeft: index === 0 ? 0 : '1px solid rgba(154, 176, 255, 0.12)',
//         background:
//           'radial-gradient(circle at 74% 48%, rgba(92, 63, 255, 0.25), transparent 32%), radial-gradient(circle at 24% 62%, rgba(36, 92, 202, 0.15), transparent 28%), linear-gradient(180deg, #040817 0%, #01030c 100%)',
//       }}
//     >
//       <GridBackground accent={service.accent} />

//       <Box
//         sx={{
//           position: 'relative',
//           zIndex: 1,
//           minHeight: { md: '100vh' },
//           maxWidth: 1580,
//           mx: 'auto',
//           display: 'grid',
//           gridTemplateColumns: { xs: '1fr', lg: '0.78fr 1.22fr' },
//           alignItems: 'center',
//           gap: { xs: 6, lg: 4 },
//           pl: { md: 7 },
//         }}
//       >
//         <SideRail active={index} accent={service.accent} />

//         <Box sx={{ position: 'relative', maxWidth: 640, pt: { md: 8 } }}>
//           <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 } }}>
//             <Box
//               sx={{
//                 width: 8,
//                 height: 8,
//                 borderRadius: '50%',
//                 bgcolor: service.accent,
//                 boxShadow: `0 0 18px ${service.accent}`,
//               }}
//             />
//             <Typography
//               sx={{
//                 color: 'rgba(235, 239, 255, 0.76)',
//                 fontSize: 13,
//                 letterSpacing: 4,
//                 textTransform: 'uppercase',
//               }}
//             >
//               Our Services
//             </Typography>
//           </Stack>

//           <Typography
//             aria-hidden
//             sx={{
//               position: 'absolute',
//               top: { xs: 62, md: 86 },
//               left: { xs: -8, md: -36 },
//               color: 'rgba(255,255,255,0.055)',
//               fontSize: { xs: 132, sm: 170, md: 250 },
//               fontWeight: 900,
//               lineHeight: 0.8,
//               letterSpacing: 0,
//               zIndex: -1,
//             }}
//           >
//             {String(index + 1).padStart(2, '0')}
//           </Typography>

//           <Typography
//             component="h2"
//             sx={{
//               whiteSpace: 'pre-line',
//               color: '#fff',
//               fontSize: { xs: 48, sm: 66, md: 82, xl: 92 },
//               fontWeight: 950,
//               lineHeight: 0.98,
//               letterSpacing: 0,
//               mb: 3,
//               textShadow: '0 16px 46px rgba(255,255,255,0.16)',
//             }}
//           >
//             {service.title}
//           </Typography>

//           <Typography
//             sx={{
//               color: 'rgba(226, 232, 255, 0.84)',
//               fontSize: { xs: 20, md: 28 },
//               lineHeight: 1.32,
//               maxWidth: 540,
//               mb: 3.5,
//               '& strong': { color: service.accent, fontWeight: 500 },
//             }}
//           >
//             {highlightLead(service.lead, service.accent)}
//           </Typography>

//           <Box sx={{ width: 46, height: 2, bgcolor: service.accent, mb: 3.5 }} />

//           <Typography
//             sx={{
//               color: 'rgba(226, 232, 255, 0.76)',
//               fontSize: { xs: 15, md: 17 },
//               lineHeight: 1.5,
//               maxWidth: 390,
//               mb: 5,
//             }}
//           >
//             {service.note}
//           </Typography>

//           <Stack direction="row" alignItems="center" spacing={2.5}>
//             <Box
//               sx={{
//                 width: 54,
//                 height: 54,
//                 borderRadius: '50%',
//                 display: 'grid',
//                 placeItems: 'center',
//                 border: '1px solid rgba(214, 224, 255, 0.22)',
//                 color: '#fff',
//                 '& svg': { fontSize: 25 },
//               }}
//             >
//               <ArrowForwardRounded />
//             </Box>
//             <Typography sx={{ fontSize: 16, color: '#fff' }}>{service.cta}</Typography>
//           </Stack>
//         </Box>

//         <Box
//           sx={{
//             position: 'relative',
//             minHeight: { xs: 420, sm: 540, lg: 680 },
//             display: 'grid',
//             placeItems: 'center',
//           }}
//         >
//           <TopProgress active={index} accent={service.accent} />
//           <ServiceVisual service={service} />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// function highlightLead(text: string, accent: string) {
//   const phrases = ['high-performance', 'clear, confident', 'consistent voice', 'memorable brand systems'];
//   const phrase = phrases.find((item) => text.includes(item));

//   if (!phrase) return text;

//   const [before, after] = text.split(phrase);
//   return (
//     <>
//       {before}
//       <Box component="strong" sx={{ color: accent }}>
//         {phrase}
//       </Box>
//       {after}
//     </>
//   );
// }

// function TopProgress({ active, accent }: { active: number; accent: string }) {
//   return (
//     <Stack
//       direction="row"
//       spacing={{ xs: 2, md: 5 }}
//       alignItems="center"
//       sx={{
//         position: 'absolute',
//         top: { xs: 0, md: 78 },
//         right: { xs: 0, md: 0 },
//         color: 'rgba(230,235,255,0.62)',
//         fontSize: 14,
//         letterSpacing: 1,
//         zIndex: 3,
//       }}
//     >
//       {services.map((_, index) => (
//         <Stack key={index} direction="row" spacing={1.4} alignItems="center">
//           <Typography sx={{ color: index === active ? accent : 'rgba(230,235,255,0.58)', fontSize: 14 }}>
//             {String(index + 1).padStart(2, '0')}
//           </Typography>
//           {index === active && (
//             <Box
//               sx={{
//                 width: { xs: 44, md: 130 },
//                 height: 1,
//                 bgcolor: 'rgba(210, 219, 255, 0.2)',
//                 '&::before': {
//                   content: '""',
//                   display: 'block',
//                   width: '68%',
//                   height: '100%',
//                   bgcolor: accent,
//                   boxShadow: `0 0 14px ${accent}`,
//                 },
//               }}
//             />
//           )}
//         </Stack>
//       ))}
//     </Stack>
//   );
// }

// function SideRail({ active, accent }: { active: number; accent: string }) {
//   return (
//     <Stack
//       alignItems="center"
//       sx={{
//         display: { xs: 'none', md: 'flex' },
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         bottom: 0,
//         width: 78,
//         borderLeft: '1px solid rgba(155, 176, 255, 0.09)',
//         borderRight: '1px solid rgba(155, 176, 255, 0.09)',
//         justifyContent: 'center',
//         gap: 2.1,
//       }}
//     >
//       {services.map((_, index) => (
//         <Box
//           key={index}
//           sx={{
//             width: index === active ? 9 : 7,
//             height: index === active ? 9 : 7,
//             borderRadius: '50%',
//             bgcolor: index === active ? accent : 'rgba(200, 210, 236, 0.42)',
//             boxShadow: index === active ? `0 0 18px ${accent}` : 'none',
//           }}
//         />
//       ))}
//       <Stack
//         alignItems="center"
//         spacing={2}
//         sx={{
//           position: 'absolute',
//           bottom: 52,
//           color: 'rgba(230,235,255,0.64)',
//           letterSpacing: 5,
//           textTransform: 'uppercase',
//           writingMode: 'vertical-rl',
//           fontSize: 12,
//         }}
//       >
//         <Typography sx={{ fontSize: 12, letterSpacing: 5 }}>Scroll</Typography>
//         <Box sx={{ width: 1, height: 48, bgcolor: accent }} />
//       </Stack>
//     </Stack>
//   );
// }

// function GridBackground({ accent }: { accent: string }) {
//   return (
//     <>
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage:
//             'linear-gradient(rgba(122, 143, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 143, 255, 0.07) 1px, transparent 1px)',
//           backgroundSize: '82px 82px',
//           maskImage: 'radial-gradient(circle at 72% 50%, black, transparent 70%)',
//           opacity: 0.72,
//         }}
//       />
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: `linear-gradient(90deg, rgba(1,5,19,0.98) 0%, rgba(1,5,19,0.78) 36%, rgba(1,5,19,0.28) 70%, rgba(1,5,19,0.74) 100%), radial-gradient(circle at 83% 30%, ${accent}36, transparent 28%)`,
//           pointerEvents: 'none',
//         }}
//       />
//     </>
//   );
// }

// function ServiceVisual({ service }: { service: (typeof services)[number] }) {
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         width: { xs: 'min(100%, 660px)', lg: 'min(61vw, 950px)' },
//         aspectRatio: { xs: '1.08 / 1', md: '1.34 / 1' },
//       }}
//     >
//       <FloatingBadge service={service} />
//       {service.visual === 'code' && <LaptopScene accent={service.accent} points={service.points} />}
//       {service.visual === 'design' && <DesignScene accent={service.accent} points={service.points} />}
//       {service.visual === 'content' && <ContentScene accent={service.accent} points={service.points} />}
//       {service.visual === 'brand' && <BrandScene accent={service.accent} points={service.points} />}
//     </Box>
//   );
// }

// function FloatingBadge({ service }: { service: (typeof services)[number] }) {
//   return (
//     <Box
//       sx={{
//         position: 'absolute',
//         left: { xs: '7%', md: '23%' },
//         top: { xs: '3%', md: '12%' },
//         width: { xs: 70, md: 92 },
//         height: { xs: 70, md: 92 },
//         borderRadius: 3,
//         display: 'grid',
//         placeItems: 'center',
//         color: '#fff',
//         border: `1px solid ${service.accent}88`,
//         background: `linear-gradient(135deg, ${service.accent}55, rgba(20, 17, 80, 0.9))`,
//         boxShadow: `0 24px 60px ${service.accent}36`,
//         transform: 'rotate(6deg)',
//         zIndex: 4,
//         '& svg': { fontSize: { xs: 38, md: 52 } },
//       }}
//     >
//       {service.icon}
//     </Box>
//   );
// }

// function FeatureCard({ accent, points }: { accent: string; points: string[][] }) {
//   return (
//     <Stack
//       spacing={2.2}
//       sx={{
//         position: 'absolute',
//         left: { xs: '2%', md: '9%' },
//         top: { xs: '32%', md: '32%' },
//         zIndex: 3,
//         width: { xs: 150, md: 168 },
//         p: 2,
//         borderRadius: 2,
//         border: '1px solid rgba(207, 218, 255, 0.2)',
//         bgcolor: 'rgba(7, 10, 31, 0.62)',
//         backdropFilter: 'blur(18px)',
//         boxShadow: '0 26px 60px rgba(0,0,0,0.32)',
//       }}
//     >
//       {points.map(([label, value]) => (
//         <Stack key={label} direction="row" spacing={1.4}>
//           <Box sx={{ width: 8, height: 8, mt: 0.5, borderRadius: '50%', bgcolor: accent, flex: '0 0 auto' }} />
//           <Box>
//             <Typography sx={{ color: '#fff', fontSize: 13, lineHeight: 1.1 }}>{label}</Typography>
//             <Typography sx={{ color: 'rgba(226,232,255,0.58)', fontSize: 12, lineHeight: 1.5 }}>{value}</Typography>
//           </Box>
//         </Stack>
//       ))}
//     </Stack>
//   );
// }

// function LaptopScene({ accent, points }: { accent: string; points: string[][] }) {
//   return (
//     <>
//       <FeatureCard accent={accent} points={points} />
//       <Box
//         sx={{
//           position: 'absolute',
//           right: '1%',
//           bottom: '9%',
//           width: '76%',
//           height: '67%',
//           transform: 'perspective(1000px) rotateX(3deg) rotateY(-13deg) rotateZ(7deg)',
//           filter: 'drop-shadow(0 42px 52px rgba(0,0,0,0.54))',
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             left: '8%',
//             right: '0%',
//             top: 0,
//             height: '62%',
//             borderRadius: '16px 16px 9px 9px',
//             border: '2px solid rgba(208, 220, 255, 0.48)',
//             bgcolor: '#050917',
//             boxShadow: `inset 0 0 0 7px rgba(1,4,14,0.96), inset 0 0 70px ${accent}24`,
//             overflow: 'hidden',
//           }}
//         >
//           <CodeScreen accent={accent} />
//         </Box>
//         <Box
//           sx={{
//             position: 'absolute',
//             left: 0,
//             right: '5%',
//             bottom: '2%',
//             height: '42%',
//             clipPath: 'polygon(12% 0, 91% 0, 100% 76%, 38% 100%, 0 73%)',
//             background: 'linear-gradient(145deg, #363959 0%, #171a33 44%, #030614 100%)',
//             boxShadow: 'inset 0 10px 28px rgba(255,255,255,0.12), inset 0 -24px 34px rgba(0,0,0,0.42)',
//           }}
//         />
//       </Box>
//     </>
//   );
// }

// function CodeScreen({ accent }: { accent: string }) {
//   const lines = ['import { motion } from "motion/react"', 'export default function Home() {', '  const ready = true', '  return (', '    <section className="hero">', '      Build digital experiences', '    </section>', '  )', '}'];

//   return (
//     <Box sx={{ position: 'absolute', inset: 13, borderRadius: 1.5, bgcolor: '#060817', overflow: 'hidden' }}>
//       <Stack direction="row" spacing={1} sx={{ height: 34, px: 2, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
//         {[0, 1, 2].map((dot) => (
//           <Box key={dot} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: dot === 0 ? accent : 'rgba(255,255,255,0.22)' }} />
//         ))}
//       </Stack>
//       <Stack spacing={1.2} sx={{ p: 2.4 }}>
//         {lines.map((line, index) => (
//           <Typography
//             key={line}
//             sx={{
//               color: index % 3 === 0 ? accent : index % 2 === 0 ? '#d9e3ff' : '#ff70c9',
//               fontFamily: 'monospace',
//               fontSize: { xs: 9, md: 12 },
//               opacity: index > 6 ? 0.62 : 0.95,
//             }}
//           >
//             {line}
//           </Typography>
//         ))}
//       </Stack>
//     </Box>
//   );
// }

// function DesignScene({ accent, points }: { accent: string; points: string[][] }) {
//   return (
//     <>
//       <FeatureCard accent={accent} points={points} />
//       <Box
//         sx={{
//           position: 'absolute',
//           right: '3%',
//           bottom: '6%',
//           width: '78%',
//           height: '72%',
//           borderRadius: 4,
//           border: '1px solid rgba(216,225,255,0.18)',
//           bgcolor: 'rgba(4,8,24,0.72)',
//           boxShadow: `0 42px 80px rgba(0,0,0,0.48), inset 0 0 70px ${accent}20`,
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ position: 'absolute', inset: 26, display: 'grid', gridTemplateColumns: '0.32fr 1fr', gap: 2.2 }}>
//           <Stack spacing={1.4}>
//             {['#38d7ff', '#8b7cff', '#ff70c9', '#f8fbff'].map((color) => (
//               <Box key={color} sx={{ height: 42, borderRadius: 2, bgcolor: color, boxShadow: `0 0 22px ${color}44` }} />
//             ))}
//           </Stack>
//           <Box sx={{ position: 'relative', borderRadius: 3, border: '1px solid rgba(255,255,255,0.15)', bgcolor: 'rgba(255,255,255,0.04)' }}>
//             <Box sx={{ position: 'absolute', left: '9%', top: '10%', width: '38%', height: '22%', borderRadius: 3, bgcolor: accent }} />
//             <Box sx={{ position: 'absolute', right: '8%', top: '10%', width: '34%', height: '58%', borderRadius: 3, border: '1px solid rgba(255,255,255,0.22)' }} />
//             <Box sx={{ position: 'absolute', left: '9%', bottom: '10%', width: '46%', height: '38%', borderRadius: 3, background: 'linear-gradient(135deg, #ff70c9, #8b7cff)' }} />
//             <Box sx={{ position: 'absolute', right: '13%', bottom: '14%', width: '24%', height: '10%', borderRadius: 999, bgcolor: '#fff' }} />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// function ContentScene({ accent, points }: { accent: string; points: string[][] }) {
//   return (
//     <>
//       <FeatureCard accent={accent} points={points} />
//       <Box sx={{ position: 'absolute', right: '4%', bottom: '10%', width: '76%', height: '66%' }}>
//         {[0, 1, 2].map((card) => (
//           <Box
//             key={card}
//             sx={{
//               position: 'absolute',
//               right: `${card * 9}%`,
//               top: `${card * 12}%`,
//               width: '70%',
//               height: '58%',
//               borderRadius: 3,
//               border: '1px solid rgba(226,232,255,0.18)',
//               bgcolor: card === 0 ? 'rgba(10,15,38,0.94)' : 'rgba(13,18,48,0.72)',
//               boxShadow: `0 32px 70px rgba(0,0,0,0.38), inset 0 0 50px ${accent}18`,
//               transform: `rotate(${card * -5}deg)`,
//               p: { xs: 2, md: 3 },
//             }}
//           >
//             <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 3 }}>
//               <PlayCircleOutlineRounded sx={{ color: accent }} />
//               <Typography sx={{ color: '#fff', fontWeight: 800 }}>Campaign Story</Typography>
//             </Stack>
//             {[0, 1, 2, 3].map((line) => (
//               <Box
//                 key={line}
//                 sx={{
//                   height: 10,
//                   width: `${line === 3 ? 52 : 86 - line * 8}%`,
//                   borderRadius: 999,
//                   bgcolor: line === 1 ? accent : 'rgba(255,255,255,0.18)',
//                   mb: 1.5,
//                 }}
//               />
//             ))}
//           </Box>
//         ))}
//       </Box>
//     </>
//   );
// }

// function BrandScene({ accent, points }: { accent: string; points: string[][] }) {
//   return (
//     <>
//       <FeatureCard accent={accent} points={points} />
//       <Box sx={{ position: 'absolute', right: '3%', bottom: '6%', width: '78%', height: '70%' }}>
//         <Box
//           sx={{
//             position: 'absolute',
//             inset: '5% 3% 5% 15%',
//             borderRadius: '50%',
//             border: `1px solid ${accent}55`,
//             boxShadow: `inset 0 0 90px ${accent}16, 0 0 80px ${accent}22`,
//           }}
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             left: '28%',
//             top: '16%',
//             width: '44%',
//             aspectRatio: '1',
//             borderRadius: 6,
//             display: 'grid',
//             placeItems: 'center',
//             color: '#061008',
//             bgcolor: accent,
//             transform: 'rotate(45deg)',
//             boxShadow: `0 34px 80px ${accent}34`,
//           }}
//         >
//           <LayersRounded sx={{ fontSize: { xs: 70, md: 122 }, transform: 'rotate(-45deg)' }} />
//         </Box>
//         <Stack direction="row" spacing={2} sx={{ position: 'absolute', left: '14%', right: '4%', bottom: '5%' }}>
//           {[PaletteRounded, AutoAwesomeRounded, TagRounded].map((Icon, index) => (
//             <Box
//               key={index}
//               sx={{
//                 flex: 1,
//                 height: { xs: 78, md: 112 },
//                 borderRadius: 3,
//                 display: 'grid',
//                 placeItems: 'center',
//                 border: '1px solid rgba(226,232,255,0.17)',
//                 bgcolor: 'rgba(7,10,31,0.62)',
//                 '& svg': { color: index === 1 ? accent : '#fff', fontSize: { xs: 30, md: 42 } },
//               }}
//             >
//               <Icon />
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//     </>
//   );
// }

// export default ServicesSection;
