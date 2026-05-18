'use client'

import LinkButton from '@/components/ui/buttons/LinkButton'
import myProjects from '@/constants/my-projects'
import { styles } from '@/styles/styles'
import { useGSAP } from '@gsap/react'
import { Box, Container, Stack, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slides = myProjects
  const [active, setActive] = useState(0)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const track = trackRef.current

      if (!section || !track) return

      const getDistance = () => Math.max(0, track.scrollHeight - window.innerHeight * 0.62)

      gsap.to(track, {
        y: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextActive = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)))
            setActive(nextActive)
          },
        },
      })
    })

    return () => ctx.revert()
  }, [slides.length])
  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="portfolio-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        backgroundColor: '#02040d',
        color: '#f6f7ff',
        borderTop: '1px solid rgba(153, 170, 255, 0.08)',
        borderBottom: '1px solid rgba(153, 170, 255, 0.08)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 78% 18%, rgba(114, 89, 255, 0.18), transparent 30%), radial-gradient(circle at 42% 56%, rgba(79, 109, 255, 0.12), transparent 34%), linear-gradient(180deg, #030611 0%, #02040d 100%)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ width: "5vw", height: "100vh", position: 'absolute', inset: 0, left: "2rem", top: 0, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', justifyContent: "space-evenly", borderRight: '1px solid rgba(153, 170, 255, 0.1)', zIndex: 6 }}  >
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
      </Box>

      <Container
        sx={{
          ...styles.container,
          position: 'relative',
          zIndex: 2,
          height: '100dvh',
          overflow: 'hidden',
          pt: { xs: 4, md: 7 },
          pb: 0,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: 8,
            mb: { xs: 6, md: 8 },
            '&::after': {
              content: '""',
              position: 'absolute',
              left: -40,
              right: -40,
              top: -80,
              bottom: -40,
              background: 'linear-gradient(180deg, rgba(2,4,13,0.98) 0%, rgba(2,4,13,0.84) 62%, rgba(2,4,13,0) 100%)',
              zIndex: -1,
              pointerEvents: 'none',
            },
          }}
        >
          <Typography
            variant='body2'
            sx={{
              color: 'rgba(235, 239, 255, 0.74)',
              // fontSize: { xs: 12, md: 13 },
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: 8,
                height: 8,
                mr: 1.8,
                borderRadius: '50%',
                ...styles.glow1,
                verticalAlign: 'middle',
              },
            }}
          >
            Our Projects
          </Typography>
          <LinkButton label="View All Projects" pageUrl="/projects" />
        </Stack>

        <Box
          sx={{
            position: 'relative',
            zIndex: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '0.38fr 0.62fr' },
            gap: { xs: 5, lg: 8 },
            height: 'calc(100dvh - 120px)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              pt: { xs: 1, md: 3 },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: -40,
                right: -30,
                top: -30,
                bottom: -60,
                background: 'linear-gradient(90deg, rgba(2,4,13,0.98) 0%, rgba(2,4,13,0.88) 72%, rgba(2,4,13,0) 100%)',
                zIndex: -1,
                pointerEvents: 'none',
              },
            }}
          >
            <Typography
              component="h2"
              sx={{
                maxWidth: 600,
                color: '#ffffff',
                fontSize: { xs: 48, sm: 62, md: 72 },
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: 0,
                mb: 4,
                '& span': { color: '#8f7cff' },
              }}
            >
              Selected work, real <span>impact.</span>
            </Typography>

            <Typography sx={{ maxWidth: 355, color: 'rgba(235,239,255,0.68)', fontSize: { xs: 16, md: 18 }, lineHeight: 1.55 }}>
              We partner with ambitious brands to create digital experiences that drive results.
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'relative',
              height: '100%',
              overflow: 'visible',
              pt: { xs: 2, lg: 8 },
            }}
          >
            <Box ref={trackRef} sx={{ willChange: 'transform' }}>
            {slides.map((slide, index) => (
              <Box
                key={slide.title}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '0.42fr 0.58fr' },
                  gap: { xs: 3, md: 5 },
                  alignItems: 'center',
                  minHeight: { xs: '62vh', md: '72vh' },
                  py: { xs: 5, md: 7 },
                  borderTop: index === 0 ? 0 : '1px solid rgba(220, 226, 255, 0.13)',
                  opacity: active === index ? 1 : 0.38,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <Box sx={{ position: 'relative', minHeight: 260 }} >
                  <Typography
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      left: { xs: 0, md: -28 },
                      top: { xs: -18, md: -34 },
                      color: 'rgba(255,255,255,0.11)',
                      fontSize: { xs: 110, md: 168 },
                      fontWeight: 200,
                      lineHeight: 1,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 13 }, pl: { xs: 0, md: 8 } }}>
                  <Typography sx={{ color: 'rgba(235,239,255,0.58)', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', mb: 2 }}>
                    {slide.categories?.[0] ?? 'Project'}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{
                      color: '#ffffff',
                      fontSize: { xs: 34, md: 44 },
                      fontWeight: 300,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      mb: 2.4,
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography sx={{ maxWidth: 360, color: 'rgba(235,239,255,0.62)', fontSize: { xs: 15, md: 17 }, lineHeight: 1.55, mb: 4 }}>
                    {slide.description}
                  </Typography>
                  <LinkButton label="View Project" pageUrl={slide.pageUrl}  />
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    minHeight: { xs: 260, md: 380 },
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 'auto 8% 6%',
                      height: '30%',
                      background: 'radial-gradient(ellipse at center, rgba(143,124,255,0.42), transparent 68%)',
                      filter: 'blur(20px)',
                      opacity: 0.8,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      width: 'min(100%, 640px)',
                      aspectRatio: '1.48 / 1',
                      borderRadius: { xs: 3, md: 4 },
                      border: '1px solid rgba(216, 225, 255, 0.24)',
                      bgcolor: 'rgba(8, 11, 26, 0.92)',
                      overflow: 'hidden',
                      transform: { xs: 'none', md: index % 2 === 0 ? 'perspective(1200px) rotateY(-10deg) rotateZ(2deg)' : 'perspective(1200px) rotateY(9deg) rotateZ(-2deg)' },
                      boxShadow: '0 44px 86px rgba(0,0,0,0.56), inset 0 0 0 8px rgba(255,255,255,0.02)',
                    }}
                  >
                    <Box sx={{ height: '12%', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', px: 3 }}>
                      <Typography sx={{ color: '#ffffff', fontSize: { xs: 12, md: 15 }, letterSpacing: 2.2 }}>{slide.title.toUpperCase()}</Typography>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: '12% 0 0',
                        backgroundImage: `linear-gradient(rgba(143,124,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(143,124,255,0.08) 1px, transparent 1px)`,
                        backgroundSize: '52px 52px',
                      }}
                    />
                    <Stack spacing={1.3} sx={{ position: 'absolute', left: '8%', top: '30%', width: '38%' }}>
                      {slide.features?.slice(0, 4).map((feature) => (
                        <Box key={feature.text} sx={{ height: 12, borderRadius: 99, bgcolor: 'rgba(255,255,255,0.14)' }} />
                      ))}
                    </Stack>
                    <Box sx={{ position: 'absolute', right: '9%', top: '22%', width: '33%', height: '48%', borderRadius: 3, background: 'linear-gradient(145deg, rgba(143,124,255,0.78), rgba(255,255,255,0.12))', boxShadow: '0 0 70px rgba(143,124,255,0.36)' }} />
                    <Typography sx={{ position: 'absolute', left: { xs: 24, md: 44 }, bottom: { xs: 24, md: 38 }, color: '#ffffff', fontSize: { xs: 16, md: 22 }, letterSpacing: 1.5, '& span': { color: '#8f7cff' } }}>
                      <span>{String(index + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            </Box>
          </Box>
        </Box>
      </Container>

    </section>
  )
}

export default PortfolioSection
