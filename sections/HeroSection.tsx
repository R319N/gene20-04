"use client";
import initPlanet from '@/components/three/planet';

import Globe3D from '@/components/Globe3D';
import { styles } from '@/styles/styles';
import { Box } from '@mui/material';

import ScrollIndicator from '@/components/ScrollIndicator';

// // export default function HeroSection() {
// //   return (
// //     <Box
// //       component="section"
// //       sx={{
// //         maxHeight: '100vh',
// //         width: '100%',
// //         position: 'relative',
// //         overflow: 'visible',
// //         background:"inherit",
// //           }}
// //     >
// //       <Box className="hero-gradient"/>
// //       {/* <Box
// //         sx={{
// //           position: 'absolute',
// //           inset: 0,
// //           backgroundImage:
// //             'linear-gradient(rgba(82, 132, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(82, 132, 255, 0.07) 1px, transparent 1px)',
// //           backgroundSize: '96px 96px',
// //           maskImage: 'radial-gradient(circle at 60% 48%, black, transparent 72%)',
// //           opacity: 0.45,
// //         }}
// //       /> */}

// //       <Box
// //         sx={{
// //           position: 'relative',
// //           zIndex: 2,
// //           display: 'flex',
// //           alignItems: 'center',
// //           minHeight: '100vh',
// //           width: '100%',
// //           mx: 'auto',
// //           px: { xs: 3, md: 8, xl: pxToRem(40) },
// //           pt: { xs: 14, md: 16 },
// //           pb: { xs: 8, md: 0 },
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             position: 'relative',
// //             zIndex: 2,
// //             width: { xs: '100%', md: '58%' },
// //             maxWidth: pxToRem(760),
// //             display: 'flex',
// //             flexDirection: 'column',
// //             alignItems: 'flex-start',
// //           }}
// //         >
// //          {/* <Typography
// //             color="primary"
// //             sx={{
// //               ...styles.center_flex,
// //               alignItems: 'center',
// //               gap: 1.2,
// //               width: 'fit-content',
// //               borderRadius: '999px',
// //               border: '1px solid rgba(68, 128, 255, 0.24)',
// //               bgcolor: 'rgba(41, 75, 180, 0.22)',
// //               boxShadow: '0 0 32px rgba(58, 116, 255, 0.18)',
// //               color: '#5db2ff',
// //               fontSize: { xs: 12, md: 12 },
// //               fontWeight: 400,
// //               letterSpacing: 1.1,
// //               lineHeight: 1,
// //               px: 2.4,
// //               py: 1.35,
// //               mb: { xs: 3, md: 5 },
// //             }}
// //           >
// //             <Box
// //               component="span"
// //               sx={{
// //                 width: 10,
// //                 height: 10,
// //                 borderRadius: '50%',
// //                 bgcolor: '#4d8cff',
// //                 boxShadow: '0 0 16px #4d8cff',
// //               }}
// //             />
// //             WE BUILD DIGITAL SOLUTIONS
// //           </Typography> */}



// //         <Box
// //           sx={{
// //             position: "absolute",
// //             right: { xs: 'auto', md: 24, xl: "-45%" },
// //             top: { xs: 'auto', md: '50%' },
// //             transform: { xs: 'none', md: 'translateY(-50%)' },
// //             width: { xs: '100%', md: '46vw', xl: '100%' },
// //             height: { xs:"100%", sm: 520, md: '78vh', xl: '100%' },
// //             minHeight: { md: 620 },
// //             maxHeight: { md: 1000 },
// //             mt: { xs: 5, md: 0 },
// //             opacity: { xs: 0.9, md: 1 },
// //             zIndex: 1,
// //             pointerEvents: 'none',
// //           }}
// //         >
// //           <Globe3D />
// //         </Box>
// //       </Box>

// //       {/* <Stack
// //         alignItems="center"
// //         spacing={0.8}
// //         sx={{
// //           display: { xs: 'none', md: 'flex' },
// //           position: 'absolute',
// //           left: '50%',
// //           bottom: 20,
// //           transform: 'translateX(-50%)',
// //           zIndex: 3,
// //           color: 'rgba(255,255,255,0.7)',
// //           letterSpacing: 6,
// //           fontSize: 13,
// //         }}
// //       >
// //         <Typography sx={{ fontSize: 13, letterSpacing: 6 }}>SCROLL</Typography>
// //         <KeyboardArrowDownRounded sx={{ color: '#9db8ff' }} />
// //         <Box sx={{ width: 1, height: 28, bgcolor: '#7fa2ff' }} />
// //       </Stack> */}
// //       <ScrollIndicator/>
// //     </Box>
// //   );
// // }

import React, { useEffect } from 'react'
import HeroContent from '@/components/hero/HeroContent';

const HeroSection = () => {

   useEffect(() => {
    const {scene, renderer} = initPlanet()
    
    return () => {
      if (renderer) {
        const gl = renderer.getContext();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        renderer.dispose()
      }
    }
  }, [])
  
  return (
    <section id="home" className='hero-section h-screen relative top-0 inset-0' data-speed="4">
      <Box sx={{...styles.section-container, justifyContent: "space-between", alignItems: "center", zIndex: 2, px: { xs: "1rem", lg: "10vw" }, position:"relative" }} >
        <HeroContent />
        {/* <Box sx={{position:"relative", width:{xs:"100%", md:"100%"}, height:{xs:300, sm: 520, md: '78vh', xl: '100%'}, minHeight:{md:620}, maxHeight:{md:1000}, mt:{xs:5, md:0}}}> */}
         <Box
            sx={{
              position: "absolute",
               inset:0,
              right: { xs: 'auto', md: 24, xl: "0%" },
              top: { xs: 'auto', md: '0' },
              transform: { xs: 'none', md: 'translateY(0%)' },
              width: { xs: '100%', md: '46vw', xl: '100%' },
              height: { xs: "100%", sm: 520, md: '78vh', xl: '100℅' },
              mt: { xs: 5, md: 0 },
              opacity: { xs: 0.9, md: 1 },
              zIndex: 1,
              pointerEvents: 'none',
            }}
          > 
        <canvas id="planet-3D" className='planet-3D h-full' />
         </Box>
         <ScrollIndicator/>
  
      </Box>
    </section >
  )
}

export default HeroSection
