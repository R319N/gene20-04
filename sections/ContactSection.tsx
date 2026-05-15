"use client"
import { Box, Container, Typography, Grid, TextField, Button, Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Email',
    content: 'hello@gene20.com',
    link: 'mailto:hello@gene20.com'
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Phone',
    content: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Address',
    content: '123 Design Street, Creative City, CC 12345',
    link: '#'
  }
]

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" style={{ padding: '80px 0', backgroundColor: 'background.default' }}>
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
            Get In Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Ready to start your next project? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h3" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                Contact Information
              </Typography>
              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ mb: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <Box sx={{ mr: 3 }}>
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="a"
                        href={info.link}
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'none',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" component="h3" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                  Send us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default ContactSection
