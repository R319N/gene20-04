"use client";
import initPlanet from '@/components/three/planet3D';
import { styles } from '@/styles/styles';
import { Box } from '@mui/material';
import ScrollIndicator from '@/components/ScrollIndicator';
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
    <section id="home" className='hero-section h-dvh rrelative top-0 inset-0' data-speed="4">
      <Box sx={{...styles.section_container, py:0, justifyContent: "space-between", alignItems: "center", zIndex: 2, px: { xs: "1rem", lg: "10vw" }, position:"relative", overflow:"visible" }} >
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
              height: { xs: "100%", sm: 520, md: '78vh', xl: '100vh' },
              mt: { xs: 5, md: 0 },
              opacity: { xs: 0.9, md: 1 },
              zIndex: 1,
              pointerEvents: 'none',
              // color: "#3437ff",
            }}
          > 
        <canvas id="planet-3D" className='planet-3D absolute inset-0 w-full h-full -z-10' />
         </Box>
         <ScrollIndicator/>  
      </Box>
    </section >
  )
}

export default HeroSection
