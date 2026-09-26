import pxToRem from '@/assets/theme/functions/pxToRem'
import { styles } from '@/styles/styles'
import { Feature } from '@/type'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dynamic from "next/dynamic";
import FeatureCard from './FeatureCard'
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import InfoIcon from '@mui/icons-material/Info';
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
    function gradient(arg0: number, deg: unknown) {
        throw new Error('Function not implemented.');
    }

    return (
        <Box
            // disableGutters
            // maxWidth={false}
            // component="section"
            ref={slideRef}
            className="service-slide"
            px={{xs:"1rem", lg:"6rem", xxl:"10rem"}}

            sx={{
                height: '100%',
                minHeight: '100svh',
                width: "100%",
                position: "relative",
                flexDirection: "column",
                overflowY: "auto",
                // boxSizing: "border-box",

            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    position: "relative",
                    flexDirection: { xs: "column", lg: "row" },
                    width: "100%",
                    // minHeight: "100%",
                    height: "100%",
                    justifyContent: { xs:"space-between", md:"flex-start"},
                    pb: { xs: "0em", md: "2rem" },
                    pt: "0"
                }}
            >
                <Box sx={{
                    height: "100%",
                    zIndex: 1, position: "relative",
                    px: { xs: "0rem", md: "1rem", xxl: 0 },
                    width: "100%"
                }}>
                    <Typography
                        aria-hidden
                        variant="h1"
                        sx={{
                            position: "relative",
                            fontSize: { xs: pxToRem(80), lg: pxToRem(120), xxl: 154 },
                            fontWeight: 900,
                            lineHeight: 1,
                            color: (theme) => `${theme.palette.primary.main}22`,
                            zIndex: -1,
                            maskImage:
                                "linear-gradient(to bottom, black 0%, transparent 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Stack sx={{
                        // position: "absolute",
                        left: 0,
                        // top: "50%",
                        mt: { xs: "-25px", lg: "-40px", xxl: "-50px" },
                        zIndex: 2,
                        pl: { xs: "0rem", xxl: "2rem" },
                        pb: '6rem',
                        // ...styles.between_flex,
                        // height: "fit-content"

                    }}>
                        <Stack spacing={{ xs: 1, xxl: 3 }}                       >
                            <Typography
                                className="title1 slide-animate text-gradient"
                                variant='h1'
                                sx={{
                                    ...styles.textGradient,
                                    width: "14ch",
                                    fontSize: { xs: pxToRem(24), sm: pxToRem(24), md: pxToRem(32), xxl: pxToRem(44) },
                                    fontWeight: 900,
                                    lineHeight: 1.125,
                                    textTransform: "uppercase",
                                    textShadow: "0 2px 2px rgba(255, 255, 255, 0.07)",
                                    letterSpacing:"-0.5px"

                                }}
                            >
                                {name}
                            </Typography>

                            <Typography
                                className="slide-text slide-animate"
                                variant='body1'
                                color="textSecondary"
                                sx={{
                                    fontSize: { xs: pxToRem(14), md: pxToRem(18), xxl: pxToRem(18) },
                                    fontWeight: 400,
                                    lineHeight: 1.34,
                                }}
                            >
                                {heading}
                            </Typography>
                            <Box
                                className="slide-rule slide-animate"
                                sx={{
                                    width: 46, height: 2, bgcolor: color, boxShadow: `0 0 14px ${color}`, my: "0.5rem 1rem"
                                }}
                            />
                        </Stack>

                        <Stack spacing={2} sx={{ zIndex: 1, py: "1rem" }}>
                            <Typography
                                className="slide-importance slide-animate"
                                variant='body2'
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: { xs: "0.75em", md: 12, xxl: 16 },
                                    lineHeight: 1.4,
                                    width: {xs:"100%", md:"90%"},
                                    fontWeight: "medium",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    // py: "1rem",
                                    // pl: "1rem",
                                }}
                            >
                                <span>
                                    <LabelImportantIcon sx={{ color: color }} />
                                </span>
                                {description}
                            </Typography>
                            <Typography
                                className="slide-importance slide-animate"
                                variant='body2'
                                color="textSecondary"
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: { xs: 12, md: 12, xxl: 16 },
                                    lineHeight: 1.4,
                                    maxWidth: "60ch",
                                    fontWeight: "light",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    // py: "1rem",
                                    // pl: "1rem",
                                }}
                            >
                                <span>
                                    <InfoIcon sx={{ color: color }} />
                                </span>
                                {importance}
                            </Typography>

                            <Box
                                className="slide-button slide-animate"
                                component={Link}
                                href={pageUrl}
                                sx={{
                                    ...styles.center_flex,
                                    display:{xs:"none", md:"none"},
                                    justifyContent: "flex-start",
                                    gap: 1,
                                    width: "fit-content",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    pt: "1rem"
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
                                <Typography variant="caption" sx={{
                                    fontSize: { xs: 12, md: 16 }, '&:hover': {
                                        color: { color }
                                    }
                                }} >
                                    Explore {name}
                                </Typography>
                            </Box>
                        </Stack>

                    </Stack>
                </Box>

                {/* {/* IMAGE-SECTION  */}
                <Box
                    className="slide-image-wrap slide-animate"
                    sx={{
                        position: "relative",
                        // top:"40%",
                        width: { xs: "100%", md: "100%" },
                        height: { xs: "100%", md: "100%" },
                        filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.55))",
                        display: "flex",
                        alignItems: { xs: "flex-start", xl: "flex-end" },
                        justifyContent: { xs: "flex-end", xl: "space-between" },
                        overflow: "visible",
                          pl:"1rem"
                        // justifyContent: "flex-end",
                      
                    }}
                >
                    <Box
                        className="slide-feature-card slide-animate"
                        sx={{
                            position: "relative",
                            zIndex: 3,
                            width: { xs: "100%", md: 210 },
                            height: "fit-content",
                            borderRadius: 2,
                            bgcolor: `${color}22`,
                            border: `1px solid ${color}22`,
                            boxShadow: `0 24px 60px ${color}22`,
                            backdropFilter: "blur(20px)",
                            mb: "4rem",
                          
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
                            width: { xs: 44, md: 90 },
                            height: { xs: 44, md: 90 },
                            opacity: "0.7",
                            borderRadius: 2,
                            color: "#ffffff",
                            bgcolor: `${color}66`,
                            border: `1px solid ${color}`,
                            boxShadow: `0 24px 60px ${color}55`,
                            transform: "rotate(5deg)",
                            "& svg": { fontSize: { xs: 34, md: 34 } },
                            zIndex: 1
                        }}
                    >
                        {features[0]?.icon}
                    </Box>
                    <Box
                        sx={{ width: "100%", height: "100% ", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", position: "relative", overflow: "visible" }}>
                        <Box sx={{
                            width: { xs: "340px", xl: "500px" },
                            height: { xs: "340px", xl: "500px" },
                            position: "absolute",
                            top: { xs: "0%", md: '0%' },
                            right: 0,
                            zIndex: 0
                        }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 0,
                                    overflow: "visible",
                                    opacity: 0.9,
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <NetworkCanvas />
                            </Box>
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 900px) 90vw, (max-width: 1536px) 42vw, 680px"
                                style={{ objectFit: "fill" }}
                            />
                        </Box>
                    </Box>
                </Box>               

                    <Box
                        // className="slide-button slide-animate"
                        component={Link}
                        href={pageUrl}
                        sx={{
                            ...styles.center_flex,
                            justifyContent: "flex-end",
                            gap: 1,
                            width: "fit-content",
                            textDecoration: "none",
                            height:"100%"
                           
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
               
            </Box>
        </Box >
    )
}

export default ServiceSlide