import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import HeroSection from "@/sections/HeroSection";
import TestimonialSection from "@/sections/TestimonialSection";
import ContactSection from "@/sections/ContactSection";
import ServicesSection from "@/sections/ServicesSection";
import IntroSection from "@/sections/IntroSection";
import PortfolioSection from "@/sections/PortfolioSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gene20 | Web Design, Branding & Graphic Design Agency",
  description:
    "Gene20 is a leading web development company specializing in web design, branding, and graphic design. We create stunning digital experiences that drive results.",
}
export default function Home() {
  return (
    <Paper
      elevation={0}
      square={false}
      sx={{
        minHeight: "100svh",
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Box component="main" sx={{
            position: "relative",
            zIndex: 2,
            flexGrow: 0,
          }}>
            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <PortfolioSection />
            <TestimonialSection />
            <ContactSection />
          </Box>
        </div>
      </div>
    </Paper>
  );
}

