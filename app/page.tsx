import Appbar from "@/components/navigation-bar/Appbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import TestimonialSection from "@/sections/TestimonialSection";
import ContactSection from "@/sections/ContactSection";
import { Paper, Box } from "@mui/material";
import ServicesSection from "@/sections/ServicesSection";
import IntroSection from "@/sections/IntroSection";
import PortfolioSection from "@/sections/PortfolioSection";

export default function Home() {
  return (
    <Paper
      sx={{
        minHeight: "100dvh",
        height: "100%",
        width: "100%",
        borderRadius: 0,
        margin: 0,
        p: 0,
        position: "relative",
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
            // flexGrow: 0,
          }}>

            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <PortfolioSection />
            <TestimonialSection />
            <ContactSection />
            <Footer />
          </Box>
        </div>
      </div>
    </Paper>
  );
}

