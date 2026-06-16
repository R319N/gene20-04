// "use client"
// import ServiceSlide from '@/components/services-components/ServiceSlide'
// import ourServices from '@/constants/our_services'
// import { styles } from '@/styles/styles'
// import { useGSAP } from '@gsap/react'
// import { Box, Stack, Typography } from '@mui/material'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/all'
// import React, { useRef, useState } from 'react'

// gsap.registerPlugin(ScrollTrigger)
// const ServicesSection = () => {
//   const slides = ourServices
//   const cardsRef = React.useRef<(HTMLDivElement | null)[]>([])
//   const trackRef = useRef<HTMLDivElement>(null)
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const [active, setActive] = useState(0)

//   useGSAP(() => {
//     const ctx = gsap.context(() => {
//       const track = trackRef.current
//       const section = sectionRef.current
//       const slidesEls = cardsRef.current.filter((slide): slide is HTMLDivElement => Boolean(slide))

//       if (!track || !section) return

//       const totalScroll = track.scrollWidth - window.innerWidth

//       // horizontal animation
//       const scrollTween = gsap.to(track, {
//         x: -totalScroll,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: () => "+=" + totalScroll,
//           scrub: 1,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           fastScrollEnd: true,
//           snap: {
//             snapTo: 1 / (slides.length - 1),
//             duration: 0.25,
//             ease: "power2.out",
//           },
//         }
//       })

//       slidesEls.forEach((slide, i) => {
//         const items = slide.querySelectorAll(".title1, .title2, .slide-text, .slide-button")

//         gsap.set(items, {
//           y: 60,
//           opacity: 0,
//         })

//         const tl = gsap.timeline({
//           paused: true,
//           defaults: {
//             ease: "power3.out",
//           }
//         })

//         tl.to(slide.querySelector(".title1"), {
//           y: 0,
//           opacity: 1,
//           duration: 0.45,
//         })
//           .to(slide.querySelector(".title2"), {
//             y: 0,
//             opacity: 1,
//             duration: 0.45,
//           }, "-=0.2")
//           .to(slide.querySelector(".slide-text"), {
//             y: 0,
//             opacity: 1,
//             duration: 0.4,
//           }, "-=0.2")
//           .to(slide.querySelector(".slide-button"), {
//             y: 0,
//             scale: 1,
//             opacity: 1,
//             duration: 0.3,
//           }, "-=0.2")

//         ScrollTrigger.create({
//           trigger: slide,
//           containerAnimation: scrollTween,
//           start: "left center",
//           end: "right center",
//           onToggle: (self) => {
//             if (self.isActive) {
//               setActive(i)
//               tl.play()
//             } else {
//               tl.reverse()
//             }
//           },
//         })

//         ScrollTrigger.create({
//           trigger: slide,
//           containerAnimation: scrollTween,
//           start: "center center",
//           end: "center center",
//           onEnter: () => setActive(i),
//           onEnterBack: () => setActive(i),
//         })
//       })

//       setActive(0)
//     })

//     return () => ctx.revert()
//   }, [slides.length])
//   return (
//     <Box
//       ref={sectionRef}
//       component="section"
//       className="services-section"
//       sx={{
//         ...styles.section_container_row,
//         minHeight: "100dvh",
//         height: "100dvh",
//         boxSizing: "border-box",
//         overflow: "hidden",
//         background:
//           "radial-gradient(circle at 72% 48%, rgba(70, 54, 165, 0.28), transparent 32%), linear-gradient(180deg, #050816 0%, #01030c 100%)",

//         width: "100%"
//       }}
//     >
//       <Box sx={{ width: "5vw", height: "100vh", position: 'absolute', inset: 0, left: "2rem", top: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", borderRight: '1px solid rgba(153, 170, 255, 0.1)', zIndex: 6 }}  >
//         <Stack gap={2}>
//           {slides.map((_, i) => (
//             <Box
//               key={i}
//               sx={{
//                 position: "relative",
//                 height: "10px",
//                 width: "10px",
//                 borderRadius: '50%',
//                 ...styles.glow1,
//                 backgroundColor: active === i ? (theme) => theme.palette.primary.main : (theme) => theme.palette.text.primary,
//                 transition: "width 0.25s ease, background-color 0.25s ease",
//               }}
//             />
//           ))}
//         </Stack>
//         <Box
//           sx={{
//             position: "absolute", maxWidth: "2rem",
//             display: "flex", flexDirection: "column",
//             alignItems: "center", justifyContent: "center", bottom: 54
//           }} gap={4} >
//           <Typography
//             variant="caption"
//             sx={{
//               letterSpacing: 2,
//               textTransform: 'uppercase',
//               writingMode: 'vertical-rl',
//               transform: 'rotate(180deg)',
//             }}>
//             scroll
//           </Typography>
//           <Box
//             sx={{ height: "3rem", width: "1px", ...styles.glow1 }}
//           />
//           {/* <Box> */}
//             <Box
//               ref={trackRef}
//               className='track'
//               sx={{
//                 // ...styles.center_flex,
//                 height: "100%",
//                 width: `${slides.length * 100}vw`,
//                 minHeight: 0,
//                 willChange: "transform",
//               }}>
//               {slides.map((slide, i) => (
//                 <Box
//                   className="service-slide"
//                   key={i}
//                   ref={(el: HTMLDivElement | null) => {
//                     if (el) cardsRef.current[i] = el
//                   }}
//                   sx={{
//                     width: { xs: "100vw", lg: "100vw" },
//                     height: "100%",
//                     minHeight: 0,
//                   }}
//                 >
//                   <ServiceSlide
//                     image={slide.image}
//                     name={slide.name}
//                     description={slide.description}
//                     features={slide.features}
//                     heading={slide.heading}
//                     importance={slide.importance}
//                     pageUrl={slide.pageUrl}
//                     color={slide.color}
//                     detailIntro={slide.detailIntro}
//                     deliverables={slide.deliverables}
//                     outcomes={slide.outcomes}
//                     index={i}
//                   />
//                 </Box>
//               ))}
//             </Box>
//         </Box>
//       </Box>





//       {/* <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage:
//             "linear-gradient(rgba(120, 98, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 98, 255, 0.08) 1px, transparent 1px)",
//           backgroundSize: "74px 74px",
//           maskImage: "radial-gradient(circle at 72% 54%, black, transparent 68%)",
//           opacity: 0.72,
//           pointerEvents: "none",
//         }}
//       />
//       <Box sx={{ width: "100%", flex: 1, overflow: "hidden", height: "100%", position: "relative" }} >
//         <Box
//           sx={{
//             ...styles.between_flex,
//             position: "absolute",
//             top: { xs: 22, md: 54 },
//             left: { xs: 24, md: 80, lg: 128 },
//             right: { xs: 24, md: 80, lg: 128 },
//             zIndex: 5,
//             gap: 1.5,
//             width: "auto",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               color: "rgba(235, 239, 255, 0.72)",
//               fontSize: { xs: 12, md: 13 },
//               fontWeight: 400,
//               letterSpacing: 4,
//               lineHeight: 1,
//               textTransform: "uppercase",
//               width: "100%",
//               "&::before": {
//                 content: '""',
//                 display: "inline-block",
//                 width: 8,
//                 height: 8,
//                 borderRadius: "50%",
//                 bgcolor: "#8f7cff",
//                 boxShadow: "0 0 14px rgba(143, 124, 255, 0.7)",
//                 mr: 1.8,
//                 verticalAlign: "middle",
//               },
//             }}
//           >
//             Our Services
//           </Typography>
//           <Box
//             sx={{
//               ...styles.center_flex,
//               alignItems: "center",
//               gap: 1.5,
//               width: { xs: "min(210px, 50%)", md: "min(370px, 100%)" },
//               maxWidth: "100%",
//               color: "#5db2ff",
//               py: 1.35,
//             }}
//           >
//             <Typography
//               component="span"
//               variant="body2"
//               sx={{
//                 color: "#ffffff",
//                 flexShrink: 0,
//                 fontWeight: 400,
//                 letterSpacing: 1.2,
//                 lineHeight: 1,
//               }}
//             >
//               {String(active + 1).padStart(2, "0")}
//             </Typography>
//             <Box
//               sx={{
//                 position: "relative",
//                 width: "100%",
//                 height: 2,
//                 overflow: "hidden",
//                 borderRadius: 999,
//                 bgcolor: "rgba(93, 178, 255, 0.18)",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: `${slides.length > 1 ? (active / (slides.length - 1)) * 100 : 100}%`,
//                   height: "100%",
//                   borderRadius: "inherit",
//                   bgcolor: "#5db2ff",
//                   boxShadow: "0 0 16px rgba(77, 140, 255, 0.55)",
//                   transition: "width 0.25s ease",
//                 }}
//               />
//             </Box>
//             <Typography
//               component="span"
//               variant="body2"
//               sx={{
//                 color: "rgba(93, 178, 255, 0.62)",
//                 flexShrink: 0,
//                 fontWeight: 400,
//                 letterSpacing: 1.2,
//                 lineHeight: 1,
//               }}
//             >
//               {String(slides.length).padStart(2, "0")}
//             </Typography>
//           </Box>
//         </Box>
//         <Box
//           ref={trackRef}
//           className='track'
//           sx={{
//             // ...styles.center_flex,
//             height: "100%",
//             width: `${slides.length * 100}vw`,
//             minHeight: 0,
//             willChange: "transform",
//           }}>
//           {slides.map((slide, i) => (
//             <Box
//               className="service-slide"
//               key={i}
//               ref={(el: HTMLDivElement | null) => {
//                 if (el) cardsRef.current[i] = el
//               }}
//               sx={{
//                 width: { xs: "100vw", lg: "100vw" },
//                 height: "100%",
//                 minHeight: 0,
//               }}
//             >
//               <ServiceSlide
//                 image={slide.image}
//                 name={slide.name}
//                 description={slide.description}
//                 features={slide.features}
//                 heading={slide.heading}
//                 importance={slide.importance}
//                 pageUrl={slide.pageUrl}
//                 color={slide.color}
//                 detailIntro={slide.detailIntro}
//                 deliverables={slide.deliverables}
//                 outcomes={slide.outcomes}
//                 index={i}
//               />
//             </Box>
//           ))}
//         </Box>
//       </Box> */}
//     </Box>
//   )
// }

// export default ServicesSection


"use client"
import ServiceSlide from '@/components/services-components/ServiceSlide'
import ourServices from '@/constants/our_services'
import { styles } from '@/styles/styles'
import { useGSAP } from '@gsap/react'
import { Box, Stack, Typography } from '@mui/material'
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

      const getTotalScroll = () => Math.max(0, track.scrollWidth - window.innerWidth)

      // horizontal animation
      const scrollTween = gsap.to(track, {
        x: () => -getTotalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getTotalScroll(),
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

      const revealSlide = (items: HTMLElement[], index: number) => {
        setActive(index)
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: "power3.out",
          stagger: 0.075,
          overwrite: true,
        })
      }

      const hideSlide = (items: HTMLElement[], y = 28) => {
        gsap.to(items, {
          autoAlpha: 0,
          y,
          scale: 0.98,
          duration: 0.28,
          ease: "power2.out",
          stagger: 0.025,
          overwrite: true,
        })
      }

      slidesEls.forEach((slide, i) => {
        const items = gsap.utils.toArray<HTMLElement>(".slide-animate", slide)

        gsap.set(items, {
          autoAlpha: 0,
          y: 34,
          scale: 0.98,
        })

        if (i === 0) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 70%",
            onEnter: () => revealSlide(items, i),
            onEnterBack: () => revealSlide(items, i),
          })
        }

        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: scrollTween,
          start: "left 65%",
          end: "right 35%",
          onEnter: () => revealSlide(items, i),
          onEnterBack: () => revealSlide(items, i),
          onLeave: () => hideSlide(items, -24),
          onLeaveBack: () => hideSlide(items, 34),
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
      <Box sx={{ width: "3vw", height: "100vh", position: 'absolute', inset: 0, px: "2rem", top: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", borderRight: '1px solid rgba(153, 170, 255, 0.1)', zIndex: 6 }}  >
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
          }} gap={4} >
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


            {/* <Box
              ref={trackRef}
              className='track'
              sx={{
                // ...styles.center_flex,
                height: "100%",
                width: `${slides.length * 100}vw`,
                minHeight: 0,
                willChange: "transform",
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
            </Box> */}
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
        </Box>
        <Box
          ref={trackRef}
          className='track'
          sx={{
            // ...styles.center_flex,
            display: "flex",
            flexWrap: "nowrap",
            height: "100%",
            width: `${slides.length * 100}vw`,
            minHeight: 0,
            willChange: "transform",
          }}>
          {slides.map((slide, i) => (
            <Box
              className="service-slide"
              key={i}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[i] = el
              }}
              sx={{
                flex: "0 0 100vw",
                width: "100vw",
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
    </Box>
  )
}

export default ServicesSection
