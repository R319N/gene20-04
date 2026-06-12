import { Box, Typography } from '@mui/material'
import { Share_Tech } from 'next/font/google';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import React from 'react'
import { styles } from '@/styles/styles';
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
            bottom: 0,
            transform: 'translateX(-50%)',
            zIndex: 1,
            letterSpacing: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        }}>

            <Typography color="text.secondary" variant="caption" sx={{ ...shareTech.style, textAlign: "center", letterSpacing: 4, textTransform: 'uppercase' }}>
                SCROLL
            </Typography>
            <Box sx={{
                ...styles.column_flex,
                // gap: "0rem",
                width: "0px",

            }

            }>
                <KeyboardArrowDownIcon sx={{
                     fontSize: 28,
                     color: 'rgba(255,255,255,0.7)',
                    //  width:"0",
                      }} />
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        height: "20px",
                        width: "1px",
                        boxShadow: `0 0 4px 0 #ffffffbb, 0 0 5px 0 #3f0069d7`,
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 100%': { transform: 'translate(-50%, 0)' },
                            '50%': { transform: 'translate(-50%, -5px)' },
                        }
                    }} />
            </Box>
        </Box>
    )
}

export default ScrollIndicator