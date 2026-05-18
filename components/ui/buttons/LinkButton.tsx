import { styles } from '@/styles/styles'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { ArrowForwardRounded } from '@mui/icons-material'
 
interface LinkButtonProps {
    label: string
    pageUrl: string
}

const LinkButton = ({ label, pageUrl }: LinkButtonProps) => {
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
                color: "#ffffff",
                textDecoration: "none",
            }}
        >
            <Box
                sx={{
                    ...styles.center_flex,
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    border: "1px solid rgba(214, 224, 255, 0.22)",
                    color: "#ffffff",
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
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#ffffff" }}>
                {label}
            </Typography>
        </Box>
    )
}

export default LinkButton