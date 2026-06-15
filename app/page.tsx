"use client"
import Appbar from "@/components/navigation-bar/Appbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import IntroSection from "@/sections/IntroSection";
import PortfolioSection from "@/sections/PortfolioSection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import { Paper, Box } from "@mui/material";
import ServicesSection from "@/sections/ServicesSection";
import { useEffect } from "react";
import initPlanet from "@/components/three/planet3D";

export default function Home() {

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
    <Paper
      sx={{
        minHeight: "100dvh",
        height: "100%",
        width: "100%",
        borderRadius: 0,
        margin: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: `(theme) => theme.palette.background.default`,
      }}
    >
      <Appbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Box component="main" sx={{
            position: "relative",
            zIndex: 2,
            flexGrow: 1,
          }}>

            <HeroSection />
            {/* <IntroSection /> */}
            {/*  <ServicesSection />
            <PortfolioSection /> 
             <AboutSection /> */}
             <Box>
               <ContactSection />
             </Box>
           
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
            <Footer />
          </Box>
        </div>
      </div>
    </Paper>
  );
}

