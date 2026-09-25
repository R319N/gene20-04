"use client"
import HeaderText from '@/components/headers/HeaderText'
import HeaderBanner from '@/components/headers/HeaderBanner'
import PortfolioSlider from '@/components/portfolio/PortfolioSlider'
import myProjects from '@/constants/my-projects'
import { styles } from '@/styles/styles'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react'

const PortfolioSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeProject = myProjects[activeIndex]

    return (
        <Box
            component="section"
            id="portfolio"
            className="portfolio gap-4 relative"
        >

            <Box
                sx={{
                    width: { md: "6vw", xxl: "4vw" },
                    minHeight: "100vh",
                    height: "100%",
                    position: "absolute",
                    inset: 0,
                    px: "2rem",
                    top: 0,
                    left: 0,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid rgba(153, 170, 255, 0.1)",
                    zIndex: 6,
                }}
            >

                <Stack
                    aria-label="Project slides"
                    direction={{ xs: 'row', md: 'column' }}
                    spacing={1.5}
                    sx={{

                        left: 0,
                        top: 6,
                        width: { xs: '100%', md: 'auto' },
                        alignItems: { xs: 'center', md: 'flex-start' },
                    }}
                >
                    {myProjects.map((project, index) => {
                        const isActive = index === activeIndex

                        return (
                            <Box
                                key={project.id}
                                component="button"
                                type="button"
                                aria-label={`Show ${project.title}`}
                                aria-current={isActive ? 'true' : undefined}
                                onClick={() => setActiveIndex(index)}
                                sx={{
                                    width: isActive ? 10 : 8,
                                    height: isActive ? 10 : 8,
                                    borderRadius: '50%',
                                    border: 0,
                                    p: 0,
                                    cursor: 'pointer',
                                    bgcolor: isActive ? 'primary.main' : 'rgba(255,255,255,0.26)',
                                    boxShadow: isActive ? '0 0 18px rgba(82, 111, 255, 0.95)' : 'none',
                                    transition: 'all 180ms ease',
                                }}
                            />
                        )
                    })}
                </Stack>
            </Box>

            <Box
                sx={{
                    ...styles.section_container,
                    gap: 2,
                    minHeight: "100dvh",
                    height: "100%",
                    boxSizing: "border-box",
                    px: { xs: "1rem", md: "8vw", xxl: "10vw" },
                    pt: "6rem"
                }}
            >
                <Box width="100%" display="flex" justifyContent="start" alignItems="flex-start" flexDirection="column" gap={4}>
                    <HeaderText label="Featured Projects" />
                    <HeaderBanner
                        text="Selected work, real"
                        spanText="impact"
                        spanColor="primary.main"
                        subtitle="We take pride in our work and the impact it has on our clients. Here are some of our most notable projects that showcase our expertise and dedication to delivering exceptional results."

                    />
                </Box>
                <Box height={"100%"} width="100%">
                    <PortfolioSlider
                        activeProject={activeProject}
                        totalProjects={myProjects.length}
                        activeIndex={activeIndex}
                        setActiveIndex={() =>
                            setActiveIndex((prev) => (prev + 1) % myProjects.length)
                        }
                    />
                </Box>

            </Box>

        </Box>
    )
}

export default PortfolioSection