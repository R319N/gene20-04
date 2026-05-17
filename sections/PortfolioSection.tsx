'use client'

import NorthEast from '@mui/icons-material/NorthEast'
import { Box, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const portfolioItems = [
  {
    title: 'Luxora',
    category: 'E-Commerce',
    description: 'A luxury fashion e-commerce experience designed to elevate brand perception and drive sales.',
    accent: '#8f7cff',
    mockup: 'fashion',
  },
  {
    title: 'Nova Finance',
    category: 'Fintech',
    description: 'A modern fintech platform focused on clarity, trust, and performance.',
    accent: '#6d8cff',
    mockup: 'dashboard',
  },
  {
    title: 'Studio Atlas',
    category: 'Brand System',
    description: 'A visual identity and digital presence for a creative team with a sharp, premium voice.',
    accent: '#b46cff',
    mockup: 'brand',
  },
]

const PortfolioSection = () => {
  return (
    <Box
      component="section"
      id="portfolio"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100dvh',
        bgcolor: '#02040d',
        color: '#f6f7ff',
        borderTop: '1px solid rgba(153, 170, 255, 0.08)',
        borderBottom: '1px solid rgba(153, 170, 255, 0.08)',
      }}
    >
      <Rail total={portfolioItems.length + 1} />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 78% 18%, rgba(114, 89, 255, 0.2), transparent 30%), radial-gradient(circle at 40% 56%, rgba(79, 109, 255, 0.13), transparent 34%), linear-gradient(180deg, #030611 0%, #02040d 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1720,
          pl: { xs: 3, md: 11, lg: 16 },
          pr: { xs: 3, md: 7, lg: 8 },
          py: { xs: 8, md: 10 },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            sx={{
              color: 'rgba(235, 239, 255, 0.74)',
              fontSize: { xs: 12, md: 13 },
              letterSpacing: 4,
              textTransform: 'uppercase',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: 8,
                height: 8,
                mr: 1.8,
                borderRadius: '50%',
                bgcolor: '#8f7cff',
                boxShadow: '0 0 14px rgba(143, 124, 255, 0.75)',
                verticalAlign: 'middle',
              },
            }}
          >
            Our Projects
          </Typography>

          <ProjectLink href="/portfolio" label="View All Projects" />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '0.36fr 0.64fr' },
            gap: { xs: 6, lg: 9 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 120 }, pb: { xs: 2, lg: 8 } }}>
            <Typography
              component="h2"
              sx={{
                maxWidth: 500,
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

          <Stack divider={<Box sx={{ height: 1, bgcolor: 'rgba(220, 226, 255, 0.13)' }} />}>
            {portfolioItems.map((item, index) => (
              <ProjectRow key={item.title} item={item} index={index} total={portfolioItems.length} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

function ProjectRow({
  item,
  index,
  total,
}: {
  item: (typeof portfolioItems)[number]
  index: number
  total: number
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '0.42fr 0.58fr' },
        gap: { xs: 4, md: 5 },
        alignItems: 'center',
        minHeight: { xs: 620, md: 560 },
        py: { xs: 7, md: 6 },
      }}
    >
      <Box sx={{ position: 'relative', minHeight: { xs: 260, md: 360 } }}>
        <Typography
          aria-hidden
          sx={{
            position: 'absolute',
            left: { xs: -8, md: -38 },
            top: { xs: -34, md: -24 },
            color: 'rgba(255,255,255,0.11)',
            fontSize: { xs: 110, md: 168 },
            fontWeight: 200,
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </Typography>

        <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 11, md: 14 }, pl: { xs: 0, md: 10 } }}>
          <Typography sx={{ color: 'rgba(235,239,255,0.58)', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', mb: 2 }}>
            {item.category}
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
            {item.title}
          </Typography>
          <Typography sx={{ maxWidth: 360, color: 'rgba(235,239,255,0.62)', fontSize: { xs: 15, md: 17 }, lineHeight: 1.55, mb: 4 }}>
            {item.description}
          </Typography>
          <ProjectLink href="/portfolio" label="View Project" accent={item.accent} compact />
        </Box>
      </Box>

      <ProjectMockup item={item} index={index} total={total} />
    </Box>
  )
}

function ProjectLink({ href, label, accent = '#8f7cff', compact = false }: { href: string; label: string; accent?: string; compact?: boolean }) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        width: 'fit-content',
        color: compact ? '#ffffff' : accent,
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: 2.6,
        fontSize: { xs: 11, md: 12 },
        '&::after': compact
          ? {
              content: '""',
              display: 'block',
              width: 132,
              height: 1,
              bgcolor: accent,
              opacity: 0.85,
              order: 1,
            }
          : undefined,
        '& svg': {
          order: 2,
          fontSize: 16,
          transition: 'transform 0.2s ease',
        },
        '&:hover svg': { transform: 'translate(3px, -3px)' },
      }}
    >
      <Box component="span" sx={{ order: 0 }}>
        {label}
      </Box>
      <NorthEast />
    </Box>
  )
}

function ProjectMockup({ item, index, total }: { item: (typeof portfolioItems)[number]; index: number; total: number }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 320, md: 500 },
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto 0 8% 5%',
          height: '28%',
          background: `radial-gradient(ellipse at center, ${item.accent}55, transparent 65%)`,
          filter: 'blur(22px)',
          opacity: 0.65,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: { xs: 'min(100%, 620px)', md: 'min(58vw, 840px)' },
          aspectRatio: '1.48 / 1',
          borderRadius: { xs: 3, md: 4 },
          border: '1px solid rgba(216, 225, 255, 0.24)',
          bgcolor: 'rgba(8, 11, 26, 0.92)',
          overflow: 'hidden',
          transform: { xs: 'none', md: index % 2 === 0 ? 'perspective(1200px) rotateY(-10deg) rotateZ(2deg)' : 'perspective(1200px) rotateY(9deg) rotateZ(-2deg)' },
          boxShadow: '0 44px 86px rgba(0,0,0,0.56), inset 0 0 0 8px rgba(255,255,255,0.02)',
        }}
      >
        <Box sx={{ height: '10%', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', px: 3 }}>
          <Typography sx={{ color: '#ffffff', fontSize: { xs: 12, md: 15 }, letterSpacing: 2.2 }}>{item.title.toUpperCase()}</Typography>
          <Stack direction="row" spacing={3} sx={{ ml: 'auto', display: { xs: 'none', sm: 'flex' } }}>
            {['New In', 'Collections', 'About'].map((nav) => (
              <Typography key={nav} sx={{ color: 'rgba(235,239,255,0.58)', fontSize: 9, textTransform: 'uppercase' }}>
                {nav}
              </Typography>
            ))}
          </Stack>
        </Box>

        {item.mockup === 'dashboard' ? <DashboardScreen accent={item.accent} /> : <EditorialScreen accent={item.accent} />}

        <Box
          sx={{
            position: 'absolute',
            left: { xs: 24, md: 44 },
            bottom: { xs: 24, md: 38 },
            color: '#ffffff',
            fontSize: { xs: 16, md: 22 },
            letterSpacing: 1.5,
            '& span': { color: item.accent },
          }}
        >
          <span>{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </Box>
      </Box>
    </Box>
  )
}

function EditorialScreen({ accent }: { accent: string }) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: '8%',
          top: '26%',
          zIndex: 2,
          color: '#ffffff',
        }}
      >
        <Typography sx={{ maxWidth: 300, fontSize: { xs: 28, md: 48 }, fontWeight: 300, lineHeight: 0.98, letterSpacing: 1.2 }}>
          Timeless Elegance
        </Typography>
        <Typography sx={{ mt: 2, color: 'rgba(235,239,255,0.6)', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase' }}>
          Discover the collection
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: '8%',
          top: '19%',
          width: '32%',
          height: '48%',
          borderRadius: '48% 48% 12% 12%',
          background: `linear-gradient(155deg, rgba(255,255,255,0.92), ${accent}44 45%, rgba(6,8,18,0.96) 46%)`,
          boxShadow: `0 0 70px ${accent}44`,
        }}
      />
      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '24%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {[0, 1, 2].map((tile) => (
          <Box key={tile} sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderLeft: tile ? '1px solid rgba(255,255,255,0.08)' : 0, bgcolor: tile === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.035)' }} />
        ))}
      </Box>
    </>
  )
}

function DashboardScreen({ accent }: { accent: string }) {
  return (
    <Box sx={{ position: 'absolute', inset: '10% 7% 9%', display: 'grid', gridTemplateColumns: '0.24fr 1fr 0.34fr', gap: 2 }}>
      <Stack spacing={1.4} sx={{ borderRight: '1px solid rgba(255,255,255,0.07)', pr: 1.5 }}>
        {['Dashboard', 'Transactions', 'Analytics', 'Settings'].map((item, index) => (
          <Box key={item} sx={{ height: 24, borderRadius: 1, bgcolor: index === 0 ? `${accent}22` : 'transparent', border: index === 0 ? `1px solid ${accent}55` : 0 }} />
        ))}
      </Stack>
      <Box>
        <Typography sx={{ color: '#ffffff', fontSize: { xs: 24, md: 32 }, mb: 0.6 }}>$24,860.50</Typography>
        <Typography sx={{ color: accent, fontSize: 11, mb: 5 }}>+12.6% from last month</Typography>
        <Box sx={{ height: '48%', borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', background: `linear-gradient(160deg, transparent, ${accent}22)` }} />
      </Box>
      <Stack spacing={1.5} sx={{ p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.035)' }}>
        {[0, 1, 2].map((item) => (
          <Box key={item} sx={{ height: 34, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)' }} />
        ))}
      </Stack>
    </Box>
  )
}

function Rail({ total }: { total: number }) {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 82,
        borderRight: '1px solid rgba(153, 170, 255, 0.1)',
        zIndex: 2,
      }}
    >
      <Typography sx={{ position: 'absolute', top: '31%', left: 30, color: 'rgba(235,239,255,0.7)', fontSize: 15 }}>
        {String(total).padStart(2, '0')}
      </Typography>
      <Stack spacing={2.8} sx={{ position: 'absolute', top: '41%', left: 38, alignItems: 'center' }}>
        {[0, 1, 2, 3].map((dot) => (
          <Box key={dot} sx={{ width: dot === 0 ? 8 : 6, height: dot === 0 ? 8 : 6, borderRadius: '50%', bgcolor: dot === 0 ? '#8f7cff' : 'rgba(235,239,255,0.38)', boxShadow: dot === 0 ? '0 0 14px rgba(143,124,255,0.8)' : 'none' }} />
        ))}
      </Stack>
      <Typography
        sx={{
          position: 'absolute',
          bottom: 104,
          left: 25,
          color: 'rgba(235,239,255,0.74)',
          fontSize: 12,
          letterSpacing: 4,
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        Scroll
      </Typography>
      <Box sx={{ position: 'absolute', bottom: 54, left: 39, width: 1, height: 52, bgcolor: '#8f7cff' }} />
    </Box>
  )
}

export default PortfolioSection
