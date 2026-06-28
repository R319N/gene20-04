"use client";
import initPlanet from '@/components/three/planet3D';
import { styles } from '@/styles/styles';
import { Box } from '@mui/material';
import ScrollIndicator from '@/components/ScrollIndicator';
import React, { useEffect } from 'react'
import HeroContent from '@/components/hero/HeroContent';

const HeroSection = () => {

  useEffect(() => {
    const { scene, renderer } = initPlanet()

    return () => {
      if (renderer) {
        const gl = renderer.getContext();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        renderer.dispose()
      }
    }
  }, [])


  return (
    <section id="home" className='hero-section h-dvh relative '>
      {/* <div className="gradient-wrapper">
        <div className="intro-gradient" />
      </div> */}
      <Box sx={{ ...styles.section_container, py: 0, justifyContent: "space-between", alignItems: "center", zIndex: 2, px: { xs: "1rem", lg: "10vw" }, position: "relative", overflow: "visible" }} >
        <Box
          sx={{
            position: "fixed",
            right: { xs: 0, md: 24, xl: 0 },
            top: 0,
            width: { xs: "100%", md: "46vw", xl: "100%" },
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <canvas
            className="planet-3D"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "block",
              overflow: "visible",
              top: 0,
            }}
          />
        </Box>
        <HeroContent />
        <ScrollIndicator label="scroll down" />
      </Box>
    </section >
  )
}

export default HeroSection
