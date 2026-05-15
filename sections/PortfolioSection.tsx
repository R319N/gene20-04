'use client'
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material'
import React from 'react'

const portfolioItems = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce website with seamless user experience and secure payment integration.',
    image: '/images/portfolio/ecommerce.jpg',
    category: 'Web Design'
  },
  {
    title: 'Brand Identity Design',
    description: 'Complete brand identity including logo, color palette, and brand guidelines for a tech startup.',
    image: '/images/portfolio/branding.jpg',
    category: 'Branding'
  },
  {
    title: 'Marketing Materials',
    description: 'Eye-catching brochures, flyers, and social media graphics for a marketing campaign.',
    image: '/images/portfolio/graphics.jpg',
    category: 'Graphic Design'
  },
  {
    title: 'Corporate Website',
    description: 'Professional corporate website with CMS integration and responsive design.',
    image: '/images/portfolio/corporate.jpg',
    category: 'Web Design'
  },
  {
    title: 'Logo Collection',
    description: 'Creative logo designs for various industries including tech, fashion, and food.',
    image: '/images/portfolio/logos.jpg',
    category: 'Branding'
  },
  {
    title: 'Print Design',
    description: 'Business cards, letterheads, and packaging design for a retail brand.',
    image: '/images/portfolio/print.jpg',
    category: 'Graphic Design'
  }
]

const PortfolioSection = () => {
  return (
    <section id="portfolio" style={{ padding: '80px 0', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Portfolio
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Explore our recent projects and see how we&apos;ve helped businesses achieve their digital goals.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {portfolioItems.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'grey.600',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {item.category}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 'bold',
                      color: 'text.primary'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      lineHeight: 1.6
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        color: 'primary.dark',
                      }
                    }}
                  >
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
              }
            }}
          >
            View All Projects
          </Button>
        </Box>
      </Container>
    </section>
  )
}

export default PortfolioSection
