import { Box, Container, Typography, Paper } from '@mui/material'
import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" style={{ padding: '80px 0', backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 6, alignItems: 'center' }}>
          <Box>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                About Gene20
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                We are a passionate team of designers and developers committed to creating exceptional digital experiences.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                Founded in 2020, Gene20 has been at the forefront of digital innovation, helping businesses of all sizes establish a strong online presence. Our expertise spans across web design, branding, and graphic design, ensuring that every project we undertake reflects our clients&apos; vision and values.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                We believe in the power of collaboration and work closely with our clients to understand their unique needs and challenges. Our approach combines creativity with technical excellence to deliver solutions that not only look great but also perform exceptionally.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.8
                }}
              >
                Whether you&apos;re a startup looking to make your mark or an established business seeking to refresh your digital presence, we&apos;re here to help you succeed in the digital landscape.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center',
                borderRadius: 3
              }}
            >
              <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                Why Choose Us?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ✓ Innovative Solutions
                </Typography>
                <Typography variant="body1">
                  We stay ahead of the curve with the latest technologies and design trends.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ✓ Client-Centric Approach
                </Typography>
                <Typography variant="body1">
                  Your success is our priority. We work closely with you throughout the entire process.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ✓ Quality Assurance
                </Typography>
                <Typography variant="body1">
                  Every project undergoes rigorous testing to ensure perfection.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ✓ Timely Delivery
                </Typography>
                <Typography variant="body1">
                  We respect your time and deliver projects on schedule.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </section>
  )
}

export default AboutSection
