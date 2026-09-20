"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
// import SiteTransition from "./SiteTransition";
import uLwandleTheme from "@/assets/theme/uLwandleTheme";
import Appbar from "../navigation/Appbar";
import Footer from "@/sections/Footer";
import SmoothScrollProvider from "@/assets/providers/smooth-scroll-provider";

const ClientLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={uLwandleTheme}>
        <CssBaseline />
        <Appbar />
        <SmoothScrollProvider />
        {/* <SiteTransition> */}
        {children}
        {/* </SiteTransition> */}
        <Footer />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ClientLayout