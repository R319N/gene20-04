import { Box, Typography } from '@mui/material'
import { Share_Tech } from 'next/font/google';
import React from 'react'
const shareTech = Share_Tech({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
});
const ScrollIndicator = () => {
    return (
        <Box sx={{
            position: 'absolute',
            left: '50%',
            bottom: 20,
            transform: 'translateX(-50%)',
            zIndex: 3,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: 6,
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem"
        }}>

            <Typography color="text.secondary" variant="body2" sx={{ ...shareTech.style, letterSpacing: 4, textTransform: 'uppercase' }}>SCROLL</Typography>
            <Box
                sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    height: "30px",
                    width: "2px",
                    boxShadow: `0 0 2px 0 #ffffff77, 0 0 5px 0 #ffffff55`,
                    animation: 'bounce 2s infinite',
                    '@keyframes bounce': {
                        '0%, 100%': { transform: 'translate(-50%, 0)' },
                        '50%': { transform: 'translate(-50%, -5px)' },
                    },
                }} />

        </Box>
    )
}

export default ScrollIndicator