import { Box } from '@mui/material'
import React from 'react'

const LogoThumbnail = () => {
  return (
   <Box sx={{ alignItems: "center", justifyContent: "center", mr: 2 }}>
        <img src="/images/logo-thumbnail.png" alt="Gene20 Logo Thumbnail" style={{ width: '120px', height: '40px' }} />
   </Box>
  )
}

export default LogoThumbnail