import { Box, Container, Typography, Link, IconButton } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '40px 0', marginTop: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          <Box>
            <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Gene20
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              Crafting digital excellence through innovative web design, branding, and graphic design solutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component="a"
                href="#"
                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#home" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Home
              </Link>
              <Link href="#services" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Services
              </Link>
              <Link href="#portfolio" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Portfolio
              </Link>
              <Link href="#about" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                About
              </Link>
              <Link href="#contact" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Contact
              </Link>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Web Design
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Branding
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Graphic Design
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Digital Marketing
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                UI/UX Design
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ borderTop: '1px solid grey.700', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            © {currentYear} Gene20. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  )
}

export default Footer
