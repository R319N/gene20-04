'use client'
import { ArrowBack, ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'

import { Portfolio } from '@/type'
import ExternalLink from '@/components/ui/buttons/ExternalLink'
import NavigationButton from '@/components/ui/buttons/NavigationButton'
import { styles } from '@/styles/styles'
import pxToRem from '@/assets/theme/functions/pxToRem'

// interface Props {
//     activeIndex: number;
//     setActiveIndex: (value: number | ((prev: number) => number)) => void;
//     activeProject: Portfolio;
//     totalProjects: number;
// }

// const PortfolioSlider = ({ activeIndex, setActiveIndex, activeProject, totalProjects }: Props) => {
//     const currentNumber = useMemo(
//         () => String(activeIndex + 1).padStart(2, '0'),
//         [activeIndex]
//     )

//     const totalNumber = useMemo(
//         () => String(totalProjects).padStart(2, '0'),
//         [totalProjects]
//     )

//     const handlePrevious = () => {
//         setActiveIndex((current) => (current === 0 ? totalProjects - 1 : current - 1))
//     }

//     const handleNext = () => {
//         setActiveIndex((current) => (current === totalProjects - 1 ? 0 : current + 1))
//     }

//     return (
//         <Box
//             sx={{
//                 position: 'relative',
//                 width: '100%',
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 pl: { xs: "0rem", md: "4vw", xxl: "0vw" },

//             }}
//         >
//             <Grid container sx={{ width: "100%", height: "100%", justifyContent: "space-between" }} >
//                 <Grid container size={{ xs: 12, lg: 12 }}>
//                     <Grid size={{ xs: 12, lg: 6 }}>
// <Stack spacing={{ xs: 3, md: 2 }}>
//     <Stack spacing={1.6}>

//         <Typography
//             variant="h1"
//             sx={{
//                 textTransform: 'capitalize',
//                 // lineHeight: 1,
//                 // fontSize: { xs: '2.3rem', sm: '3rem', md: '3rem' },

//             }}
//         >
//             {activeProject.title}
//         </Typography>
//         <Stack spacing={1}>
//             <Typography
//                 variant="overline"
//                 sx={{
//                     color: 'primary.main',
//                     letterSpacing: 5,
//                     lineHeight: 1,
//                     fontWeight: 700,
//                 }}
//             >
//                 {activeProject.categories?.[0] ?? 'Portfolio Website'}
//             </Typography>

//             <Box
//                 sx={{
//                     width: 34,
//                     height: 2,
//                     bgcolor: 'primary.main',
//                     boxShadow: '0 0 16px rgba(82, 111, 255, 0.8)',
//                 }}
//             />
//         </Stack>
//         <Typography
//             variant="body2"
//             sx={{
//                 color: 'text.secondary',
//                 width: "60ch",
//                 lineHeight: 1.55,
//                 textTransform: 'capitalize',
//                 // fontSize:{xs:pxToRem(12), lg:pxToRem(12)}

//             }}
//         >
//             {activeProject.description}
//         </Typography>
//     </Stack>
//     {/* <ExternalLink activeProject={activeProject} /> */}
// </Stack>
//                     </Grid>
//                     <Grid size={{ xs: 12, lg: 6 }} sx={{ height: "100%", display: "flex", alignItems: "flex-end" , width:"100%"}}>
//                         <Grid size={{ xs: 12, lg: 12 }} sx={{ position: "relative", height: "fit-content", width:"100vw" }}>
// <Box
//     sx={{
//         position: {xs: 'relative', lg:'absolute'},
//         top: 0,
//         left: 0,
//         minHeight: { xs: 260, lg: "34vh", xxl: "28vh" },
//         border: '1px solid',
//         borderColor: 'primary.main',
//         borderRadius: 3,
//         overflow: 'hidden',
//         bgcolor: 'rgba(3, 7, 18, 0.62)',
//         boxShadow: '0 0 34px rgba(82, 111, 255, 0.26)',
//         transform: {xs:0, lg:"translate(0%, -130%)"},
//         height: { xs: "30vh", lg: "100%", xxl: "100%" },
//         width: { xs: "100vw", lg: "500px", xxl: "680px" }
//     }}
// >
//     <Image
//         key={activeProject.id}
//         src={activeProject.imgUrl}
//         alt={activeProject.title}
//         fill
//         // sizes="(max-width: 900px) 100vw, (max-width: 1536px) 50vw, 680px"
//         style={{
//             objectFit: 'fill',
//             objectPosition: 'top center',
//         }}
//     />
//     <Box
//         sx={{
//             // position: 'absolute',
//             inset: 0,
//             background:
//                 'linear-gradient(90deg, rgba(3,7,18,0.28), rgba(3,7,18,0.04) 48%, rgba(3,7,18,0.38))',
//             pointerEvents: 'none',
//         }}
//     />

// </Box>
//                         </Grid>
//                         <Grid size={12}>
// <Stack
//     spacing={{ xs: 2, md: 8 }}
//     flexDirection="row"
//     sx=
//     {{
//         width: "100%", display: "flex",
//         height: "10vh",
//         justifyContent: "center", alignItems: "center",
//     }}
// >
//     {/*  */}

//     <Stack spacing={2} direction="row" sx={{ ...styles.center_flex , zIndex:99}}>
//         <NavigationButton
//             onClick={handlePrevious}
//             icon={<ArrowBack />}
//             ariaLabel="Previous project"
//         />
//         <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>
//             {currentNumber}
//         </Typography>
//         <Box sx={{ width: "16vw", height: 2, bgcolor: 'rgba(255,255,255,0.35)', }} />
//         <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
//             {totalNumber}
//         </Typography>
//         <NavigationButton
//             onClick={handleNext}
//             icon={<ArrowForward />}
//             ariaLabel="Next project"
//         />
//     </Stack>


// </Stack>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>

//         </Box >
//     )
// }

// export default PortfolioSlider

import React, { useMemo } from 'react'


interface Props {
    activeIndex: number;
    setActiveIndex: (value: number | ((prev: number) => number)) => void;
    activeProject: Portfolio;
    totalProjects: number;
}

const PortfolioSlider = ({ activeIndex, setActiveIndex, activeProject, totalProjects }: Props) => {
    const currentNumber = useMemo(
        () => String(activeIndex + 1).padStart(2, '0'),
        [activeIndex]
    )

    const totalNumber = useMemo(
        () => String(totalProjects).padStart(2, '0'),
        [totalProjects]
    )

    const handlePrevious = () => {
        setActiveIndex((current) => (current === 0 ? totalProjects - 1 : current - 1))
    }

    const handleNext = () => {
        setActiveIndex((current) => (current === totalProjects - 1 ? 0 : current + 1))
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                gap: 4
            }}
        >
            <Stack spacing={{ xs: 3, md: 2 }}>
                <Stack spacing={1}>
                    <Stack spacing={1}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: 'primary.main',
                                letterSpacing: 5,
                                lineHeight: 1,
                                fontWeight: 700,
                            }}
                        >
                            {activeProject.categories?.[0] ?? 'Portfolio Website'}
                        </Typography>

                        <Box
                            sx={{
                                width: 34,
                                height: 2,
                                bgcolor: 'primary.main',
                                boxShadow: '0 0 16px rgba(82, 111, 255, 0.8)',
                            }}
                        />
                    </Stack>
                    <Typography
                        variant="h1"
                        sx={{
                            textTransform: 'capitalize',
                            // lineHeight: 1,
                            // fontSize: { xs: '2.3rem', sm: '3rem', md: '3rem' },

                        }}
                    >
                        {activeProject.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            width: "60ch",
                            lineHeight: 1.55,
                            textTransform: 'capitalize',
                            // fontSize:{xs:pxToRem(12), lg:pxToRem(12)}

                        }}
                    >
                        {activeProject.description}
                    </Typography>
                </Stack>

            </Stack>

            <Box
                sx={{
                    position: { xs: 'relative', lg: 'absolute' },
                    //     top: 0,
                    //     left: 0,
                    //     minHeight: { xs: 260, lg: "34vh", xxl: "28vh" },
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 3,
                    overflow: 'hidden',
                    //     bgcolor: 'rgba(3, 7, 18, 0.62)',
                    boxShadow: '0 0 34px rgba(82, 111, 255, 0.26)',
                    //     // transform: { xs: 0, lg: "translate(0%, -130%)" },
                    height: { xs: "240px", lg: "100%", xxl: "100%" },
                    //     width: { xs: "100vw", lg: "500px", xxl: "680px" }
                }}
            >


                <Image
                    key={activeProject.id}
                    src={activeProject.imgUrl}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1536px) 50vw, 680px"
                    style={{
                        objectFit: 'fill',
                        // objectPosition: 'top center',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(90deg, rgba(3,7,18,0.28), rgba(3, 7, 18, 0.34) 48%, rgba(3, 9, 27, 0.57))',
                        pointerEvents: 'none',
                    }}
                />
                {/* <Stack direction="row" flexWrap="wrap" gap={1}>
                    {activeProject.features?.slice(0, 4).map((feature) => (
                        <Box
                            key={feature.text}
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 1.5,
                                py: 0.9,
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 2,
                                bgcolor: 'rgba(255,255,255,0.04)',
                                color: 'text.secondary',
                                textTransform: 'capitalize',
                                fontSize: 13,
                                '& svg': {
                                    fontSize: 17,
                                    color: 'primary.main',
                                },
                                zIndex: 2
                            }}
                        >
                            {feature.icon}
                            {feature.text}
                        </Box>
                    ))}
                </Stack> */}
            </Box>
            <ExternalLink activeProject={activeProject} />
            <Stack
                spacing={{ xs: 2, md: 8 }}
                flexDirection="row"
                sx=
                {{
                    width: "100%", display: "flex",
                    height: "10vh",
                    justifyContent: "center", alignItems: "center",
                }}
            >
                <div className="flex items-center justify-center gap-5 mt-14">

                    <NavigationButton
                        onClick={handlePrevious}
                        icon={<ChevronLeft />}
                        ariaLabel="Previous project"
                    />

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalProjects }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: i === activeIndex ? "18px" : "5px",
                                    height: "5px",
                                    background:
                                        i === activeIndex ? "#5B7CFF" : "rgba(255,255,255,0.18)",
                                }}
                                aria-label={`Go to project ${i + 1}`}
                            />
                        ))}
                    </div>

                    <NavigationButton
                        onClick={handleNext}
                        icon={<ChevronRight />}
                        ariaLabel="Previous project"
                    />
                </div>
            </Stack>
        </Box>
    )
}

export default PortfolioSlider