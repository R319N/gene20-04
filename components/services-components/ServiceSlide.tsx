import pxToRem from '@/assets/theme/functions/pxToRem'
import { styles } from '@/styles/styles'
import { Feature } from '@/type'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dynamic from "next/dynamic";
import FeatureCard from './FeatureCard'

const NetworkCanvas = dynamic(
    () => import("./networkCanvas"),
    { ssr: false }
);

interface props {
    image: string
    name: string
    description: string
    heading: string
    features: Feature[]
    importance: string
    pageUrl: string
    color?: string
    detailIntro: string
    deliverables: string[]
    outcomes: string[]
    index?: number
}

const ServiceSlide: React.FC<props> = ({ image, name, detailIntro, deliverables, outcomes, description, heading, features, importance, pageUrl, color = "#8f7cff", index = 0 }) => {
    const slideRef = React.useRef<HTMLDivElement>(null)
    return (
        <Container
            ref={slideRef}
            className="service-slide"
            sx={{
                height: '100%',
                width: "100%",
                position: "relative",
                flexDirection: "column",
                py: "0 2rem"
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    position: "relative",
                    flexDirection: { xs: "column", lg: "row-reverse" },
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                    py: "2rem"

                }}
            >
                <Box sx={{ height: "100%", zIndex: 1 }}>
                    <Typography
                        aria-hidden
                        variant="h1"
                        sx={{
                            position: "relative",
                            color: "rgba(255,255,255,0.055)",
                            fontSize: { xs: 88, lg: 190, xl: 200 },
                            fontWeight: 900,
                            lineHeight: 0.3,
                            zIndex: -1,
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Stack gap={1} mb="0.5rem">
                        <Typography
                            className="title1 slide-animate"
                            variant='h1'
                            sx={{
                                width: "15ch",
                                fontSize: { xs: 22, sm: 24, md: 42, xxl: 54 },
                                fontWeight: 900,
                                lineHeight: 1.3,
                                textTransform: "uppercase",
                                textShadow: "0 16px 44px rgba(255,255,255,0.14)",
                            }}
                        >
                            {name}
                        </Typography>

                        <Typography
                            className="slide-text slide-animate"
                            variant='body1'
                            sx={{
                                // color: "rgba(235, 239, 255, 0.78)",
                                fontSize: { xs: 12, md: 20, xxl: 26 },
                                fontWeight: 400,
                                lineHeight: 1.34,
                            }}
                        >
                            {heading}
                        </Typography>
                    </Stack>
                    <Box
                        className="slide-rule slide-animate"
                        sx={{
                            width: 46, height: 2, bgcolor: color, boxShadow: `0 0 14px ${color}`, my: "0.5rem 1rem"
                        }}
                    />

                </Box>

                {/* IMAGE-SECTION */}
                <Box
                    className="slide-image-wrap slide-animate"
                    sx={{
                        position: "relative",
                        width: { xs: "100%", md: "50vw" },
                        height: { xs: "100%", md: "40vw" },
                        filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.55))",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        mb: 3.2
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            overflow: "hidden",
                            bottom: 50,
                            right: 0,
                            opacity: 0.9,
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <NetworkCanvas />
                    </Box>

                    <Box
                        className="slide-feature-card slide-animate"
                        sx={{
                            position: "relative",
                            // left: { xs: "2%", md: "8%" },
                            // top: { xs: "6%", md: "31%" },
                            zIndex: 3,
                            width: { xs: "100%", md: 210 },
                            height: "fit-content",
                            borderRadius: 2,
                            color: "#ffffff",
                            bgcolor: `${color}22`,
                            border: `1px solid ${color}22`,
                            boxShadow: `0 24px 60px ${color}22`,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <Grid container spacing={2.2} p="0.5rem" width="100%">
                            {features.map((feature, featureIndex) => (
                                <FeatureCard
                                    key={featureIndex}
                                    icon={feature.icon}
                                    text={feature.text}
                                    sub={feature.sub || ""}
                                    color={color}
                                />
                            ))}
                        </Grid>
                    </Box>
                    <Box
                        className="slide-icon-tile slide-animate"
                        sx={{
                            ...styles.center_flex,
                            position: "absolute",
                            right: { xs: "0%", md: "28%" },
                            top: { xs: "20%", md: "12%" },
                            width: { xs: 74, md: 90 },
                            height: { xs: 74, md: 90 },
                            borderRadius: 2,
                            color: "#ffffff",
                            bgcolor: `${color}66`,
                            border: `1px solid ${color}`,
                            boxShadow: `0 24px 60px ${color}55`,
                            transform: "rotate(5deg)",
                            "& svg": { fontSize: { xs: 44, md: 44 } },
                            zIndex: 1
                        }}
                    >
                        {features[0]?.icon}
                    </Box>
                    <Box sx={{ width: "100%",height:"100% ",display: "flex", justifyContent: "flex-end", alignItems: "flex-end", position: "relative" }}>
                        <Box sx={{ width: "340px", height: "340px", position: "absolute", bottom: 0, right: 0, zIndex: 0 }}>
                            <Image
                                src={image}
                                alt={name}
                                fill
                                unoptimized
                                sizes="(max-width: 900px) 90vw, 98vw"
                                style={{ objectFit: "contain" }}
                            />
                        </Box>
                    </Box>
                </Box>


                {/* CTA */}
                <Stack sx={{ gap: 2, zIndex: 1 }}>
                    <Typography
                        className="slide-importance slide-animate"
                        variant='body2'
                        sx={{
                            textTransform: "capitalize",
                            fontSize: { xs: 12, md: 10, xxl: 16 },
                            lineHeight: 1.4,
                            // maxWidth: "50ch",
                            fontWeight: "light",
                            color:"#fff",
                            display:"flex",
                            alignItems:"start",
                            gap:1
                        }}
                    >
                      <span style={{background:color, height:"0.8rem", width:"1rem", borderRadius:"50%"}}/> 
                       {importance}
                    </Typography>

                    <Box
                        className="slide-button slide-animate"
                        component={Link}
                        href={pageUrl}
                        sx={{
                            ...styles.center_flex,
                            justifyContent: "flex-start",
                            gap: 1,
                            width: "fit-content",
                            color: "#ffffff",
                            textDecoration: "none",
                        }}
                    >
                        <Box
                            sx={{
                                ...styles.center_flex,
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                border: "1px solid #fafafa44",
                                color: { color },
                                transition: "border-color 0.2s ease, transform 0.2s ease",
                                "& svg": { fontSize: 20 },
                                ".slide-button:hover &": {
                                    borderColor: color,
                                    transform: "translateX(4px)",
                                },
                            }}
                        >
                            <ArrowForwardRounded />
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: { xs: 12, md: 16 }, color: "#ffffff" }} >
                            Explore {name}
                        </Typography>
                    </Box>
                </Stack>

                {/* wrapper end  */}
            </Box>
        </Container >
    )
}

export default ServiceSlide