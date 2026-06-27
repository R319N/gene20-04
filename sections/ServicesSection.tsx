// import ServiceSlide from '@/components/my-services/ServiceSlide'
// import ourServices from '@/constants/our_services-data'
import { styles } from '@/styles/styles'
import { useGSAP } from '@gsap/react'
import { Box, Grid, styled, Stack, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'
// import '@/styles/animatedButton.css'
import rgba from '@/assets/theme/functions/rgba'
import ourServices from '@/constants/our_services'
import ServiceSlide from '@/components/services-components/ServiceSlide'
import ScrollIndicator from '@/components/ScrollIndicator'
// import TitleHeader from '@/components/headers/TitleHeader'
// import ScrollIndicator2 from '@/components/ScrollIndicator2'

gsap.registerPlugin(ScrollTrigger)

const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== "image" && prop !== "isActive",
})<{ image: string; isActive: boolean }>(({ image, isActive }) => ({
  position: "absolute",
  inset: 0,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
  opacity: isActive ? 0.9 : 0,
  transition: "opacity 0.6s ease-in-out"
}));

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: -1
  , width: "100%",
  height: "100%",
  background: "#0e1116f2",
  backdropFilter: "blur(2px)"

})
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
      const slidesEls = cardsRef.current.filter((el): el is HTMLDivElement => Boolean(el))

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

  //return
  return (
    <Box
      ref={sectionRef}
      component="section"
      id="services"
      className="services-section"
      sx={{
        ...styles.section_container_row,
        minHeight: "100dvh",
        height: "100dvh",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      {/* {slides.map((slide, i) => (
        <Background
          key={slide.key}
          image={slide.image}
          isActive={active === i}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(68, 221, 255, 0.03) 2px, rgba(68, 221, 255, 0.03) 4px)',
          animation: 'scanline 8s linear infinite',
        }}
      />
      {/* <div className="math-bg" /> 

      <Overlay /> */}

      <div
        className="services-gradient1"
      />
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
      </div> */}

      <Grid
        container
        sx={{
          height: "100%",
          minHeight: 0,
          zIndex: 1,
          flexWrap: "nowrap",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pt: { xs: "0vh", lg: "10vh", xxl: "0vh" },
        }}
      >
        <Box
          sx={{ width: "3vw", height: "100vh", position: 'absolute', inset: 0, px: "2rem", top: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", borderRight: '1px solid rgba(153, 170, 255, 0.1)', zIndex: 6 }}  >
          <Stack gap={2}>
            {slides.map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  height: "10px",
                  width: "10px",
                  borderRadius: '50%',
                  ...styles.glow1,
                  backgroundColor: active === i ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.primary,
                  transition: "width 0.25s ease, background-color 0.25s ease",
                }}
              />
            ))}
          </Stack>
          <Box
            sx={{
              position: "absolute", maxWidth: "2rem",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", bottom: 54
            }}
            gap={4} >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 2,
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}>
              scroll
            </Typography>
            <Box
              sx={{ height: "3rem", width: "1px", ...styles.glow1 }}
            />
          </Box>
        </Box>
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
              position: "relative",
              // top: { xs: 22, md: 54 },
              // left: { xs: 24, md: 80, lg: 128 },
              // right: { xs: 24, md: 80, lg: 128 },
              zIndex: 5,
              gap: 1.5,
              width: "100%",
              px: { xs: "1rem", lg: "10vw" },
              pt: "1rem"

            }}
          >
            <Typography
              variant="caption"
              sx={{
                background: `
  linear-gradient(#0e1116, #0e1116) padding-box,
  linear-gradient(90deg, #5876db, #4f5ad9, #3729ff) border-box
`,
                border: "1px solid transparent",
                fontSize: { xs: 10, md: 13 },
                fontWeight: 400,
                letterSpacing: 2,
                lineHeight: 1.5,
                textTransform: "uppercase",
                width: "fit-content",
                p: "0.3rem 0.5rem",
                height: "100%",
                borderRadius: "20px",
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #29adff 0%, #8f7cff 100%)",
                  boxShadow: "0 0 14px rgba(41,173,255,0.6)",
                  mr: 1,
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
                gap: 0.8,
                width: { xs: "min(210px, 30%)", md: "min(370px, 100%)" },
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
              py: { xs: "0", lg: "0" }
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
                  description={slide.description}
                  features={slide.features}
                  heading={slide.heading}
                  importance={slide.importance}
                  pageUrl={slide.pageUrl}
                  color={slide.color}
                  detailIntro={slide.detailIntro}
                  deliverables={slide.deliverables}
                  outcomes={slide.outcomes}
                  index={i}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            display: { xs: "block", lg: "none" },
            position: "relative",
            width: "100%",
            height: "fit-content",
            gap: 2,
          }}
        >
          <ScrollIndicator />
        </Box>
      </Grid>
    </Box >
  )
}

export default ServicesSection
