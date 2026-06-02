import Appbar from "@/components/navigation-bar/Appbar";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import IntroSection from "@/sections/IntroSection";
import PortfolioSection from "@/sections/PortfolioSection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import { Paper, Box } from "@mui/material";
import ServicesSection from "@/sections/ServicesSection";

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
        display: "flex",
        flexDirection: "column",
        backgroundColor: `(theme) => theme.palette.background.default`,
        position: "relative"
      }}
    >
      <Appbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Box component="main" sx={{ flexGrow: 1 }}>
            <HeroSection />
            <IntroSection />
            {/* <ServicesSection />
            <PortfolioSection /> 
             <AboutSection /> */}
            <ContactSection />
            <Footer/>
          </Box>
        </div>
      </div>
    </Paper>
  );
}

