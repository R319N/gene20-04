"use client"
import ServiceSlide from '@/components/services-components/ServiceSlide'
import ourServices from '@/constants/our_services'
import { styles } from '@/styles/styles'
import { useGSAP } from '@gsap/react'
import { Box, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)
const ServicesSection = () => {
  const slides = ourServices
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      const slidesEls = cardsRef.current.filter((slide): slide is HTMLDivElement => Boolean(slide))

      if (!track || !section) return

      const totalScroll = track.scrollWidth - window.innerWidth

      // horizontal animation
      const scrollTween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + totalScroll,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: 0.25,
            ease: "power2.out",
          },
        }
      })

      slidesEls.forEach((slide, i) => {
        const items = slide.querySelectorAll(".title1, .title2, .slide-text, .slide-button")

        gsap.set(items, {
          y: 60,
          opacity: 0,
        })

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          }
        })

        tl.to(slide.querySelector(".title1"), {
          y: 0,
          opacity: 1,
          duration: 0.45,
        })
          .to(slide.querySelector(".title2"), {
            y: 0,
            opacity: 1,
            duration: 0.45,
          }, "-=0.2")
          .to(slide.querySelector(".slide-text"), {
            y: 0,
            opacity: 1,
            duration: 0.4,
          }, "-=0.2")
          .to(slide.querySelector(".slide-button"), {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
          }, "-=0.2")

        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: scrollTween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (self.isActive) {
              setActive(i)
              tl.play()
            } else {
              tl.reverse()
            }
          },
        })

        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: scrollTween,
          start: "center center",
          end: "center center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      })

      setActive(0)
    })

    return () => ctx.revert()
  }, [slides.length])
  return (
    <Box
      ref={sectionRef}
      component="section"
      className="services-section"
      sx={{
        ...styles.section_container_row,
        minHeight: "100dvh",
        height: "100dvh",
        boxSizing: "border-box",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 72% 48%, rgba(70, 54, 165, 0.28), transparent 32%), linear-gradient(180deg, #050816 0%, #01030c 100%)",

        width: "100%"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(120, 98, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 98, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "74px 74px",
          maskImage: "radial-gradient(circle at 72% 54%, black, transparent 68%)",
          opacity: 0.72,
          pointerEvents: "none",
        }}
      />
      <Box sx={{ width: "100%", flex: 1, overflow: "hidden", height: "100%", position: "relative" }} >
        <Box
          sx={{
            ...styles.between_flex,
            position: "absolute",
            top: { xs: 22, md: 54 },
            left: { xs: 24, md: 80, lg: 128 },
            right: { xs: 24, md: 80, lg: 128 },
            zIndex: 5,
            gap: 1.5,
            width: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "rgba(235, 239, 255, 0.72)",
              fontSize: { xs: 12, md: 13 },
              fontWeight: 400,
              letterSpacing: 4,
              lineHeight: 1,
              textTransform: "uppercase",
              width: "100%",
              "&::before": {
                content: '""',
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#8f7cff",
                boxShadow: "0 0 14px rgba(143, 124, 255, 0.7)",
                mr: 1.8,
                verticalAlign: "middle",
              },
            }}
          >
            Our Services
          </Typography>
          <Box
            sx={{
              ...styles.center_flex,
              alignItems: "center",
              gap: 1.5,
              width: { xs: "min(210px, 50%)", md: "min(370px, 100%)" },
              maxWidth: "100%",
              color: "#5db2ff",
              py: 1.35,
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "#ffffff",
                flexShrink: 0,
                fontWeight: 400,
                letterSpacing: 1.2,
                lineHeight: 1,
              }}
            >
              {String(active + 1).padStart(2, "0")}
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 2,
                overflow: "hidden",
                borderRadius: 999,
                bgcolor: "rgba(93, 178, 255, 0.18)",
              }}
            >
              <Box
                sx={{
                  width: `${slides.length > 1 ? (active / (slides.length - 1)) * 100 : 100}%`,
                  height: "100%",
                  borderRadius: "inherit",
                  bgcolor: "#5db2ff",
                  boxShadow: "0 0 16px rgba(77, 140, 255, 0.55)",
                  transition: "width 0.25s ease",
                }}
              />
            </Box>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "rgba(93, 178, 255, 0.62)",
                flexShrink: 0,
                fontWeight: 400,
                letterSpacing: 1.2,
                lineHeight: 1,
              }}
            >
              {String(slides.length).padStart(2, "0")}
            </Typography>
          </Box>
          {/* <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 32, md: 48, lg: 64 },
                fontWeight: 700,
                lineHeight: 1.1,
                mt: 2,
                mb: 1,
              }}>
              1
            </Typography>

          </Box> */}
        </Box>
        <Box
          ref={trackRef}
          className='track'
          sx={{
            ...styles.center_flex,
            height: "100%",
            width: `${slides.length * 100}vw`,
            minHeight: 0,
            willChange: "transform",
            pt: 0,
          }}>
          {slides.map((slide, i) => (
            <Box
              className="service-slide"
              key={i}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardsRef.current[i] = el
              }}
              sx={{
                width: { xs: "100vw", lg: "100vw" },
                height: "100%",
                minHeight: 0,
              }}
            >
              <ServiceSlide
                image={slide.image}
                name={slide.name}
                firstWord={slide.firstWord}
                secondWord={slide.secondWord}
                description={slide.description}
                features={slide.features}
                heading={slide.heading}
                importance={slide.importance}
                pageUrl={slide.pageUrl}
                color={slide.color}
                index={i}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ServicesSection
