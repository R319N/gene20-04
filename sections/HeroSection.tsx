"use client";
import initPlanet from '@/components/three/planet3D';
import { styles } from '@/styles/styles';
import { Box } from '@mui/material';
import ScrollIndicator from '@/components/ScrollIndicator';
import React, { useEffect } from 'react'
import HeroContent from '@/components/hero/HeroContent';

const HeroSection = () => {
  return (
    <section id="home" className='hero-section h-dvh relative '>
      <Box sx={{ ...styles.section_container, py: 0, justifyContent: "space-between", alignItems: "center", zIndex: 2, px: { xs: "1rem", lg: "10vw" }, position: "relative", overflow: "visible" }} >
        <HeroContent />     
        <ScrollIndicator label="scroll down" />
      </Box>
    </section >
  )
}

export default HeroSection
