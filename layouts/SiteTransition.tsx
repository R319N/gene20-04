"use client";

import { Box, LinearProgress, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [showPreloader, setShowPreloader] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowPreloader(false);
    }, reduceMotion ? 250 : 1450);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (showPreloader) {
      return;
    }

    setIsRouteChanging(true);
    const timer = window.setTimeout(() => {
      setIsRouteChanging(false);
    }, reduceMotion ? 180 : 720);

    return () => window.clearTimeout(timer);
  }, [pathname, showPreloader, reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader ? <WebsitePreloader reduceMotion={Boolean(reduceMotion)} /> : null}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <Box
          key={pathname}
          component={motion.div}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: "blur(10px)", scale: 0.985 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -14, filter: "blur(8px)", scale: 1.01 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          sx={{ willChange: "opacity, transform, filter" }}
        >
          {children}
        </Box>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isRouteChanging && !reduceMotion ? (
          <RouteCurtain key={`route-${pathname}`} reduceMotion={Boolean(reduceMotion)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function WebsitePreloader({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -20, scale: reduceMotion ? 1 : 0.98 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        color: "#fff",
        background:
          "radial-gradient(circle at 30% 20%, rgba(125,231,255,0.18), transparent 32%), radial-gradient(circle at 75% 70%, rgba(154,111,255,0.16), transparent 34%), linear-gradient(180deg, #02040d 0%, #070b16 100%)",
      }}
    >
      <Box
        component={motion.div}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        sx={{
          position: "absolute",
          width: { xs: 260, sm: 380 },
          height: { xs: 260, sm: 380 },
          borderRadius: "50%",
          border: "1px solid rgba(125,231,255,0.18)",
          background:
            "conic-gradient(from 90deg, transparent, rgba(125,231,255,0.2), rgba(154,111,255,0.18), transparent)",
          filter: "blur(0.2px)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          width: "min(420px, calc(100vw - 48px))",
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045))",
          boxShadow: "0 24px 80px rgba(0,0,0,0.38)",
          backdropFilter: "blur(24px)",
        }}
      >
        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            m: 0,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7de7ff",
          }}
        >
          Gene20
        </Typography>
        <Typography
          component={motion.h1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          sx={{
            mt: 1,
            mb: 3,
            fontSize: { xs: 30, sm: 42 },
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: 0,
          }}
        >
          Preparing the experience
        </Typography>
        <LinearProgress
          sx={{
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.08)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              background: "linear-gradient(90deg, #7de7ff, #a8ffcb, #9a6fff)",
            },
          }}
        />
      </Box>
    </Box>
  );
}

function RouteCurtain({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) return null;

  return (
    <Box
      component={motion.div}
      aria-hidden="true"
      initial={{ y: "100%", opacity: 0.65 }}
      animate={{ y: "-100%", opacity: 0.95 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 15000,
        pointerEvents: "none",
        background:
          "linear-gradient(135deg, rgba(125,231,255,0.92), rgba(154,111,255,0.9) 48%, rgba(3,7,18,0.96))",
        boxShadow: "0 -24px 80px rgba(0,0,0,0.36)",
      }}
    />
  );
}
