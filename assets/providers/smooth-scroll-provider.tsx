"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller() {
  useEffect(() => {
    // kill existing (fixes Next.js double render)
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",

      smooth: 1.2,          // 🔥 DO NOT go above 1.5
      effects: true,
      normalizeScroll: true, // 🔥 fixes mobile behavior
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return null;
}