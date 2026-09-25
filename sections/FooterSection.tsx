"use client"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Address from '@/components/footer-components/address'
import LogoIconFull from '@/assets/logo/Logo'
import ContactDetails from '@/components/contact/ContactDetails'
import SocialContacts from '@/components/contact/socialContact'
import Image from 'next/image'
import { styles } from "@/styles/styles";

const FooterSection = () => {
  const currentYear = new Date().getFullYear()
  // const exploreItems = navigation.filter((item) => item.isNavigation && item.isExplore);


  //   return (
  //     <footer style={{ marginTop: 'auto' }}>
  //       <Box sx={{ ...styles.column_flex, pt: "2rem", width: "100%", px: { xs: 3, md: 8, xl: "10vw" }, mx: "auto" }}>
  //         <Grid container spacing={4} sx={{ width: "100%" }}>
  //           <Grid size={{ xs: 12, lg: 3, xl: 4 }}
  //             sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' } }}>
  //             <Stack gap={1} sx={{ width: "100%" }}>
  //               <LogoIconFull />
  //               <Box sx={{ display: 'flex', gap: 1 }}>

  //                 <SocialContacts />
  //               </Box>
  //             </Stack>
  //           </Grid>
  //           <Grid size={{ xs: 12, lg: 2.5, xl: 2 }}>
  //             <Stack sx={{ width: "100%" }} >
  //               <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
  //                 Explore.
  //               </Typography>
  //               <Stack gap={1} px="1rem">
  //                 {exploreItems.map((item) => (
  //                   <Link
  //                     sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' }, textTransform: "capitalize" }}
  //                     key={item.name}
  //                     href={item.url}
  //                   >
  //                     {item.name}
  //                   </Link>
  //                 ))}
  //               </Stack>
  //             </Stack>
  //           </Grid>
  //           {/* <Grid size={{ xs: 12, lg: 2.5 }}>
  //             <Stack sx={{ width: "100%" }} >
  //               <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
  //                 Contact.
  //               </Typography>
  //               <Address />
  //             </Stack>
  //           </Grid>
  //           <Grid size={{ xs: 12, lg: 3, xl: 4 }}>
  //             <Stack sx={{ width: "100%" }} >
  //               <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
  //                 Subscribe to our newsletter.
  //               </Typography>
  //               <TextField
  //                 variant="standard"
  //                 placeholder="Enter your email"
  //                 fullWidth
  //                 InputProps={{
  //                   sx: {
  //                     backgroundColor: 'white',
  //                     borderRadius: 1,
  //                   },
  //                 }}
  //               />
  //             </Stack>
  //           </Grid> */}
  //         </Grid>

  //         <Box sx={{ borderTop: '1px solid grey.700', mt: 4, textAlign: 'center', width: "100%" }}>
  //           <Divider />
  //           <Typography variant="body2" sx={{ color: 'grey.400', py: "0.5rem" }}>
  //             © {currentYear} Gene20. All rights reserved.
  //           </Typography>
  //         </Box>
  //       </Box>
  //     </footer>
  //   )
  // }

  // export default Footer
  // {/* <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
  //           <Box>
  //             <Stack gap={2}>
  //               <LogoThumbnail />
  //               <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
  //                 Crafting digital excellence through innovative web design, branding, and graphic design solutions.
  //               </Typography>
  //             </Stack>

  //             <Box sx={{ display: 'flex', gap: 1 }}>
  //               <IconButton
  //                 component="a"
  //                 href="#"
  //                 sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
  //                 aria-label="Facebook"
  //               >
  //                 <FacebookIcon />
  //               </IconButton>
  //               <IconButton
  //                 component="a"
  //                 href="#"
  //                 sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
  //                 aria-label="Twitter"
  //               >
  //                 <TwitterIcon />
  //               </IconButton>
  //               <IconButton
  //                 component="a"
  //                 href="#"
  //                 sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
  //                 aria-label="Instagram"
  //               >
  //                 <InstagramIcon />
  //               </IconButton>
  //               <IconButton
  //                 component="a"
  //                 href="#"
  //                 sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
  //                 aria-label="LinkedIn"
  //               >
  //                 <LinkedInIcon />
  //               </IconButton>
  //             </Box>
  //           </Box>

  //           <Box>
  //             <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
  //               Quick Links
  //             </Typography>
  //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
  //               <Link href="#home" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
  //                 Home
  //               </Link>
  //               <Link href="#services" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
  //                 Services
  //               </Link>
  //               <Link href="#portfolio" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
  //                 Portfolio
  //               </Link>
  //               <Link href="#about" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
  //                 About
  //               </Link>
  //               <Link href="#contact" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
  //                 Contact
  //               </Link>
  //             </Box>
  //           </Box>

  //           <Box>
  //             <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
  //               Services
  //             </Typography>
  //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
  //               <Typography variant="body2" sx={{ color: 'grey.300' }}>
  //                 Web Design
  //               </Typography>
  //               <Typography variant="body2" sx={{ color: 'grey.300' }}>
  //                 Branding
  //               </Typography>
  //               <Typography variant="body2" sx={{ color: 'grey.300' }}>
  //                 Graphic Design
  //               </Typography>
  //               <Typography variant="body2" sx={{ color: 'grey.300' }}>
  //                 Digital Marketing
  //               </Typography>
  //               <Typography variant="body2" sx={{ color: 'grey.300' }}>
  //                 UI/UX Design
  //               </Typography>
  //             </Box>
  //           </Box>
  //         </Box>


  return (
    <footer style={{ marginTop: 'auto' }}>
      <Container>
        <Box
          sx={{
            ...styles.column_flex,
            pt: "2rem",
            width: "100%",
            px: { xs: 3, md: 8, xl: "10vw" },
            mx: "auto",
            gap: 4
          }}>
          <Stack gap={1} sx={{ width: "100%", display: "flex", justifyContent: "center", py:"20dvh" }}>
            <Box height="fit-content" width="100%" sx={{ ...styles.center_flex }}>
              <Image
                src="/images/logo-thumbnail.png"
                alt="Gene20 Logo Thumbnail"
                width={444}
                height={30}
                objectFit="contain"
              />

            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <SocialContacts />
            </Box>
          </Stack>
          <Box width="100%">
            <Box sx={{ display: 'flex', gap: {xs:0, lg:5},width:"100%", justifyContent:{xs:"space-between", lg:"center"} }}>
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
         
        </Box>
        
        <Box sx={{ mt: 4, pt: 3, textAlign: 'center' }}>
         <Divider />
          <Typography variant="body2" sx={{ color: 'grey.400', py:1 }}>
            © {currentYear} Gene20. All rights reserved.
          </Typography>
        </Box>

      </Container>
    </footer>
  )
}

export default FooterSection