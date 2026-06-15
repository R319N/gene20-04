import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import pxToRem from '@/assets/theme/functions/pxToRem';
import LinkButton from '../ui/buttons/LinkButton';
import { TbClock24 } from 'react-icons/tb';
import { styles } from '@/styles/styles';
import { AccessTime, LockClockRounded, PunchClockSharp } from '@mui/icons-material';

// import { Box } from '@mui/material';

const HeroContent = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 2,
                py: "7rem",
                width: "100%",
                height: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: { xs: 'center', md: 'flex-end' },
                gap: 4
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontWeight: "regular",
                    fontSize: { xs: 34, sm: 58, md: 38, xxl: 56 },
                    lineHeight: "1.2",
                    width: { xs: "12ch", lg: "20ch" },
                    textShadow: '0 12px 34px rgba(91, 139, 255, 0.32)',
                    textWrap: "wrap",
                    textTransform: "uppercase"
                }}
            >
                Crafting Exceptional
                Digital Experiences
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: 'rgba(238, 243, 255, 0.78)',
                    maxWidth: pxToRem(650),
                }}
            >
                Elevate your brand with our comprehensive tech services. From innovative
                web and graphic design to cutting-edge software development, <Box component="strong" sx={{ color: '#fff' }}>we guide you through every step</Box>
                {' '}of the product development journey.
            </Typography>
            <Stack gap="4" sx={{spacing:"4"}}>
                <Button
                    sx={{ width: "fit-content" }}
                    variant="contained"
                    color="secondary"
                    startIcon={
                        <ArrowForwardRounded
                            sx={{ width: "22px", height: "22px" }}
                        />}
                >

                    Let&apos;s Discuss Your Project
                </Button>
                <Box color="#777777" sx={{ display: "flex", alignItems: "center", gap: 1,  height:"100%" }}>
                    <AccessTime />
                    <Typography variant="body2"  lineHeight="1" my="1rem" color="#d6d1d1" fontWeight="900" >
                        We respond within 24 hours
                    </Typography>
                </Box>

            </Stack>
        </Box>
    )
}

export default HeroContent
