"use client";
import CssBaseline from "@mui/material/CssBaseline";
import type { Theme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import SmoothScrollProvider from "@/assets/providers/smooth-scroll-provider";
import themePresets from "@/assets/theme/themePresets";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const defaultThemeId = "classic";
const themeMap = themePresets.reduce((acc, themePreset) => {
  acc[themePreset.id] = themePreset.theme;
  return acc;
}, {} as Record<string, Theme>);

export default function ClientLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const [themeId, setThemeId] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("muiTheme");
      if (savedTheme && themeMap[savedTheme]) {
        return savedTheme;
      }
    }
    return defaultThemeId;
  });

  useEffect(() => {
    window.localStorage.setItem("muiTheme", themeId);
  }, [themeId]);

  const theme = useMemo(() => themeMap[themeId] ?? themeMap[defaultThemeId], [themeId]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      { <SmoothScrollProvider />
     
        {children}
        {/* <ThemeSwitcher themes={themePresets} value={themeId} onChange={setThemeId} /> */}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
