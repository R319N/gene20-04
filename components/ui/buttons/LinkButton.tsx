import { styles } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { ArrowForwardRounded } from '@mui/icons-material'
 
interface LinkButtonProps {
    label: string
    pageUrl: string
    color?:string
}

const LinkButton = ({ label, pageUrl , color}: LinkButtonProps) => {
    return (
        <Box
            className="slide-button"
            component={Link}
            href={pageUrl}
            sx={{
                ...styles.center_flex,
                justifyContent: "flex-start",
                gap: 2,
                width: "fit-content",
                color: {color},
                textDecoration: "none",
            }}
        >
            <Box
                sx={{
                    ...styles.center_flex,
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    border: "1px solid rgba(214, 224, 255, 0.22)",
                    color: {color},
                    transition: "border-color 0.2s ease, transform 0.2s ease",
                    "& svg": { fontSize: 22 },
                    ".slide-button:hover &": {
                        borderColor: "rgba(214, 224, 255, 0.55)",
                        transform: "translateX(4px)",
                    },
                }}
            >
                <ArrowForwardRounded />
            </Box>
            <Typography sx={{fontWeight: 700, fontSize: { xs: 14, md: 16 }, color: {color}  ,   background: "linear-gradient(90deg, #00a9d3, #3a47d5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {label}
            </Typography>
        </Box>
    )
}

export default LinkButton