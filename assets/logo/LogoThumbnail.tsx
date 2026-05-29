import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const LogoThumbnail = () => {
  return (
   <span style={{ alignItems: "center", justifyContent: "center" }}>
        <Image src="/images/logo-thumbnail.png" alt="Gene20 Logo Thumbnail" width={120} height={40} />
   </span>
  )
}

export default LogoThumbnail