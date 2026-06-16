import pxToRem from '@/assets/theme/functions/pxToRem'
import { styles } from '@/styles/styles'
import { Feature } from '@/type'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    //     return (

    //         <Container
    //             ref={slideRef}
    //             className="service-slide"
    //             maxWidth={false}
    //             sx={{
    //                 height: '100%',
    //                 flexGrow: 0,
    //                 width: "100%",
    //                 position: "relative",
    //                 // bgcolor:"red",
    //                 ...styles.between_flex
    //             }}
    //         >
    // <Box sx={{ position: "relative", zIndex: 1, gap: 2 }}>

    //     <Typography
    //         aria-hidden
    //         variant="h1"
    //         sx={{
    //             position: "relative",
    //             left: { xs: -10, md: -36 },
    //             color: "rgba(255,255,255,0.055)",
    //             fontSize: { xs: 132, lg: 190, xl: 200 },
    //             fontWeight: 900,
    //             lineHeight: 0.5,
    //             zIndex: -1,
    //         }}
    //     >
    //         {String(index + 1).padStart(2, "0")}
    //     </Typography>
    //     <Stack gap={1.6}>
    //         <Typography
    //             className="title1 slide-animate"
    //             variant='h1'
    //             sx={{
    //                 width: "15ch",
    //                 fontSize: { xs: 32, sm: 62, md: 42, xxl: 54 },
    //                 fontWeight: 800,
    //                 lineHeight: 1.2,
    //                 mb: 0.4,
    //                 textTransform: "uppercase",
    //                 textShadow: "0 16px 44px rgba(255,255,255,0.14)",
    //             }}
    //         >
    //             {name}
    //         </Typography>

    //         <Typography
    //             className="slide-text slide-animate"
    //             variant='body1'
    //             sx={{
    //                 color: "rgba(235, 239, 255, 0.78)",
    //                 fontSize: { xs: 16, md: 20, xxl: 26 },
    //                 fontWeight: 400,
    //                 lineHeight: 1.34,
    //                 maxWidth: "20ch",
    //                 mb: 3.2,
    //             }}
    //         >
    //             {heading}
    //         </Typography>
    //     </Stack>
    //     <Box
    //         className="slide-rule slide-animate"
    //         sx={{
    //             width: 46, height: 2, bgcolor: color, boxShadow: `0 0 14px ${color}`, mb: 3.2
    //         }}
    //     />
    //                 {/*  <Typography
    //                     className="slide-description slide-animate"
    //                     variant='body2'
    //                     sx={{
    //                         color: "rgba(235, 239, 255, 0.68)",
    //                         fontSize: { xs: 14, lg: 14, xxl: 14 },
    //                         lineHeight: 1.55,
    //                         width: "60ch",
    //                         mb: 1.6,
    //                     }}
    //                 >
    //                     {description}
    //                 </Typography>

    //                 <Typography
    //                     className="slide-importance slide-animate"
    //                     variant='body2'
    //                     sx={{
    //                         color: "rgba(235, 239, 255, 0.54)",
    //                         fontSize: { xs: 13, md: 10, xxl: 16 },
    //                         lineHeight: 1.5,
    //                         maxWidth: 330,
    //                         mb: 5,
    //                     }}
    //                 >
    //                     {importance}
    //                 </Typography>

    //                 <Box
    //                     className="slide-button slide-animate"
    //                     component={Link}
    //                     href={pageUrl}
    //                     sx={{
    //                         ...styles.center_flex,
    //                         justifyContent: "flex-start",
    //                         gap: 2,
    //                         width: "fit-content",
    //                         color: "#ffffff",
    //                         textDecoration: "none",
    //                     }}
    //                 >
    //                     <Box
    //                         sx={{
    //                             ...styles.center_flex,
    //                             width: 54,
    //                             height: 54,
    //                             borderRadius: "50%",
    //                             border: "1px solid rgba(214, 224, 255, 0.22)",
    //                             color: "#ffffff",
    //                             transition: "border-color 0.2s ease, transform 0.2s ease",
    //                             "& svg": { fontSize: 22 },
    //                             ".slide-button:hover &": {
    //                                 borderColor: color,
    //                                 transform: "translateX(4px)",
    //                             },
    //                         }}
    //                     >
    //                         <ArrowForwardRounded />
    //                     </Box>
    //                     <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#ffffff" }}>
    //                         Explore {name}
    //                     </Typography>
    //                 </Box> */}
    //             </Box>

    //             {/* 
    //             //     <Box
    //             //         sx={{
    //             //             position: "relative",
    //             //             zIndex: 1,
    //             //             width: "100%",
    //             //             minHeight: { xs: 360, sm: 460, lg: 680 },
    //             //             display:"flex",
    //             //         }}
    //             //     >

    //             //         <Box
    //             //             className="slide-icon-tile slide-animate"
    //             //             sx={{
    //             //                 ...styles.center_flex,
    //             //                 position: "absolute",
    //             //                 left: { xs: "38%", md: "28%" },
    //             //                 top: { xs: "0%", md: "12%" },
    //             //                 width: { xs: 74, md: 90 },
    //             //                 height: { xs: 74, md: 90 },
    //             //                 borderRadius: 2,
    //             //                 color: "#ffffff",
    //             //                 bgcolor: `${color}66`,
    //             //                 border: `1px solid ${color}`,
    //             //                 boxShadow: `0 24px 60px ${color}55`,
    //             //                 transform: "rotate(5deg)",
    //             //                 "& svg": { fontSize: { xs: 34, md: 44 } },
    //             //             }}
    //             //         >
    //             //             {features[0]?.icon}
    //             //         </Box>

    //             //         <Box
    //             //             className="slide-image-wrap slide-animate"
    //             //             sx={{
    //             //                 // position: "absolute",
    //             //                 right: { xs: "-10%", md: "-2%" },
    //             //                 bottom: { xs: "0%", md: "3%" },
    //             //                 width: { xs: "88%", md: "50vw" },
    //             //                 height: { xs: "78%", md: "40vw" },
    //             //                 filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.55))",

    //             //             }}
    //             //         >
    //             //             <Image
    //             //                 src={image}
    //             //                 alt={name}
    //             //                 fill
    //             //                 unoptimized
    //             //                 sizes="(max-width: 900px) 90vw, 98vw"
    //             //                 style={{ objectFit: "contain", transform: "scaleX(1)" }}
    //             //             />
    //             //         </Box>
    //             //     </Box>
    //             //
    //   */}
    //             <Box sx={{ ...styles.center_flex,  position: "relative" }}>
    //                 <Box
    //                     className="slide-feature-card slide-animate"
    //                     sx={{
    //                         position: "relative",
    //                         // left: { xs: "2%", md: "8%" },
    //                         // top: { xs: "6%", md: "31%" },
    //                         zIndex: 3,
    //                         width: { xs: 190, md: 210 },
    //                         // p: 2.2,
    //                         borderRadius: 2,
    //                         border: "1px solid rgba(207, 218, 255, 0.18)",
    //                         bgcolor: "rgba(7, 10, 31, 0.68)",
    //                         backdropFilter: "blur(18px)",
    //                         boxShadow: "0 26px 60px rgba(0,0,0,0.34)",
    //                     }}
    //                 >
    //                     <Grid container spacing={2.2}>
    //                         {features.map((feature, featureIndex) => (
    //                             <Grid
    //                                 size={12}
    //                                 key={featureIndex}
    //                                 sx={{
    //                                     display: "flex",
    //                                     alignItems: "flex-start",
    //                                     gap: 1.3,
    //                                     minHeight: pxToRem(20),
    //                                 }}
    //                             >
    //                                 <Box
    //                                     sx={{
    //                                         ...styles.center_flex,
    //                                         mt: 0.3,
    //                                         color,
    //                                         "& svg": { fontSize: 10 },
    //                                     }}
    //                                 >
    //                                     {feature.icon}
    //                                 </Box>
    //                                 <Box>
    //                                     <Typography
    //                                         variant="body2"
    //                                         sx={{
    //                                             color: "#ffffff",
    //                                             fontSize: { xs: 12, md: 13 },
    //                                             fontWeight: 500,
    //                                             lineHeight: 1.2,
    //                                         }}
    //                                     >
    //                                         {feature.text}
    //                                     </Typography>
    //                                     <Typography
    //                                         variant="caption"
    //                                         sx={{
    //                                             color: "rgba(235,239,255,0.52)",
    //                                             display: "block",
    //                                             fontSize: 11,
    //                                             lineHeight: 1.4,
    //                                             mt: 0.4,
    //                                         }}
    //                                     >
    //                                         {featureIndex === 0 ? "Optimized" : featureIndex === 1 ? "Future-ready" : featureIndex === 2 ? "Best practices" : "Built to last"}
    //                                     </Typography>
    //                                 </Box>
    //                             </Grid>
    //                         ))}
    //                     </Grid>
    //                 </Box>
    //     <Box
    //         // className="slide-image-wrap slide-animate"
    //         sx={{
    //             position: "relative",
    //             // right: { xs: "-10%", md: "-2%" },
    //             // bottom: { xs: "0%", md: "3%" },
    //             width: { xs: "88%", md: "50vw" },
    //             height: { xs: "78%", md: "40vw" },
    //             filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.55))",

    //         }}
    //     >
    //         {/* <Box
    //             className="slide-icon-tile slide-animate"
    //             sx={{
    //                 ...styles.center_flex,
    //                 position: "absolute",
    //                 left: { xs: "38%", md: "28%" },
    //                 top: { xs: "50%", md: "12%" },
    //                 width: { xs: 74, md: 90 },
    //                 height: { xs: 74, md: 90 },
    //                 borderRadius: 2,
    //                 color: "#ffffff",
    //                 bgcolor: `${color}66`,
    //                 border: `1px solid ${color}`,
    //                 boxShadow: `0 24px 60px ${color}55`,
    //                 transform: "rotate(5deg)",
    //                 "& svg": { fontSize: { xs: 34, md: 44 } },
    //             }}
    //         >
    //             {features[0]?.icon}
    //         </Box> */}
    //         <Box sx={{ width: "100px", height: "100px" }}>
    //             <Image
    //                 src={image}
    //                 alt={name}
    //                 fill
    //                 unoptimized
    //                 sizes="(max-width: 900px) 90vw, 98vw"
    //                 style={{ objectFit: "contain", transform: "scaleX(1)" }}
    //             />
    //         </Box>

    //     </Box>
    // </Box>
    //         </Container>
    //     )
    // }

    // export default ServiceSlide

    return (
        <Container
            ref={slideRef}
            className="service-slide"
            sx={{
                height: '100%',
                flexGrow: 0,
                width: "100%",
                position: "relative",
                // bgcolor:"red",
                ...styles.between_flex
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        position: "relative",
                        flexDirection: { xs: "column", lg: "row-reverse" },
                        width: "100%",
                        justifyContent: "space-between",

                    }}
                >
                    <Typography
                        aria-hidden
                        variant="h1"
                        sx={{
                            position: "relative",
                            left: { xs: -10, md: -36 },
                            color: "rgba(255,255,255,0.055)",
                            fontSize: { xs: 132, lg: 190, xl: 200 },
                            fontWeight: 900,
                            lineHeight: 0.5,
                            zIndex: -1,
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Stack gap={1.6}>
                        <Typography
                            className="title1 slide-animate"
                            variant='h1'
                            sx={{
                                width: "15ch",
                                fontSize: { xs: 32, sm: 62, md: 42, xxl: 54 },
                                fontWeight: 800,
                                lineHeight: 1.2,
                                mb: 0.4,
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
                                color: "rgba(235, 239, 255, 0.78)",
                                fontSize: { xs: 16, md: 20, xxl: 26 },
                                fontWeight: 400,
                                lineHeight: 1.34,
                                // maxWidth: "20ch",
                                mb: 3.2,
                            }}
                        >
                            {heading}
                        </Typography>
                    </Stack>
                    <Box
                        className="slide-rule slide-animate"
                        sx={{
                            width: 46, height: 2, bgcolor: color, boxShadow: `0 0 14px ${color}`, mb: 3.2
                        }}
                    />
                </Box>

                <Box
                    className="slide-image-wrap slide-animate"
                    sx={{
                        position: "relative",
                        // right: { xs: "-10%", md: "-2%" },
                        // bottom: { xs: "0%", md: "3%" },
                        width: { xs: "100%", md: "50vw" },
                        // height: { xs: "78%", md: "40vw" },
                        filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.55))",


                    }}
                >
                    <Box
                        // className="slide-icon-tile slide-animate"
                        sx={{
                            ...styles.center_flex,
                            position: "absolute",
                            left: { xs: "8%", md: "28%" },
                            top: { xs: "50%", md: "12%" },
                            width: { xs: 74, md: 90 },
                            height: { xs: 74, md: 90 },
                            borderRadius: 2,
                            color: "#ffffff",
                            bgcolor: `${color}66`,
                            border: `1px solid ${color}`,
                            boxShadow: `0 24px 60px ${color}55`,
                            transform: "rotate(5deg)",
                            "& svg": { fontSize: { xs: 34, md: 44 } },
                        }}
                    >
                        {features[0]?.icon}
                    </Box>
                    <Box sx={{ width: "300px", height: "400px" }}>
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
                {/* wrapper end */}
            </Box>
        </Container >








    )
}

export default ServiceSlide