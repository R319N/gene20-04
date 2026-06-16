// import ServiceSlide from '@/components/my-services/ServiceSlide'
// import ourServices from '@/constants/our_services-data'
import { styles } from '@/styles/styles'
import { useGSAP } from '@gsap/react'
import { Box, Grid, styled, } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'
// import '@/styles/animatedButton.css'
import rgba from '@/assets/theme/functions/rgba'
import ourServices from '@/constants/our_services'
import ServiceSlide from '@/components/services-components/ServiceSlide'
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

        pb: { xs: 2, lg: 3 },
      }}
    >
      {slides.map((slide, i) => (
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
      {/* <div className="math-bg" /> */}

      <Overlay />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(167, 139, 250, 0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167, 139, 250, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent)',
        }} />
      </div>

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
        {/* <Grid
          size={12}
          sx={{ ...styles.alignRight, width: "100%", px: { xs: 0, lg: "10vw" } }} >
          <Box sx={{ display: "flex", flexDirection: "column", }}>
            <TitleHeader title='what i do' />
          </Box>
        </Grid> */}
        <Box sx={{ width: "100%", flex: 1, overflow: "hidden", height: "100%" }} >
          <Box
            ref={trackRef}
            className='track'
            sx={{
              ...styles.center_flex,
              height: "100%",
              width: `${slides.length * 100}vw`,
              minHeight: 0,
              willChange: "transform",
              pt: { xs: "2rem", lg: "0" }
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
        <Grid size={12} px={"16vw"} sx={{ flexShrink: 0 }} >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                // height: "100%",
                display: "flex",
                gap: 2,
              }}
            >
              {slides.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    ...styles.glow1,
                    positiion: "relative",
                    width: { xs: "25vw", lg: "40px" },
                    display: "flex",
                    borderRadius: "50px",
                    height: 6,
                    backgroundColor: active === i ? (theme) => theme.palette.primary.main : rgba("#7E78D2", 0.2),
                    transition: "width 0.25s ease, background-color 0.25s ease",
                  }}
                />
              ))}
            </Box>

          </Box>
        </Grid>
        {/* <Grid className="relative">
         
        </Grid> */}
      </Grid>
    </Box >
  )
}

export default ServicesSection
