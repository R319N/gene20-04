"use client"
import Appbar from "@/components/navigation-bar/Appbar";
import Footer from "@/components/Footer";
import ourServices from "@/constants/our_services";
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function getServiceId(pageUrl: string, name: string) {
  const hash = pageUrl.split("#")[1];
  if (hash) return hash;

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ServicesPage() {
  return (
    <Paper
      sx={{
        minHeight: "100dvh",
        width: "100%",
        borderRadius: 0,
        backgroundColor: "background.default",
        color: "common.white",
      }}
    >
      <Appbar />

      <Box component="main" sx={{ pt: { xs: 16, md: 20 }, pb: 10 }}>
        <Container maxWidth="xl">
          <Stack spacing={4} sx={{ mb: { xs: 6, md: 8 }, maxWidth: 900 }}>
            <Chip
              label="Our Services"
              sx={{
                width: "fit-content",
                borderRadius: "999px",
                px: 1.5,
                py: 0.75,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                bgcolor: "rgba(93, 178, 255, 0.16)",
                color: "#5db2ff",
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 800 }}>
              Digital services built around clarity, momentum, and measurable growth.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 720, lineHeight: 1.8 }}>
              From polished websites to brand systems and digital campaigns, we create thoughtful experiences that help businesses present themselves with confidence and convert attention into action.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {ourServices.map((service) => {
              const serviceId = getServiceId(service.pageUrl, service.name);

              return (
                <Grid size={{xs:"12", md:"6"}} key={service.key}>
                  <Paper
                    id={serviceId}
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: `1px solid ${service.color}33`,
                      bgcolor: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(16px)",
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      scrollMarginTop: { xs: 96, md: 112 },
                      boxShadow: `0 24px 60px ${service.color}14`,
                    }}
                  >
                    <Box sx={{ position: "relative", width: "100%", height: { xs: 220, md: 260 }, borderRadius: 3, overflow: "hidden" }}>
                      <Image src={service.image} alt={service.name} fill style={{ objectFit: "cover" }} />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${service.color}CC 0%, rgba(14,17,22,0.1) 100%)`,
                        }}
                      />
                    </Box>

                    <Stack spacing={1.5}>
                      <Typography variant="overline" sx={{ color: service.color, letterSpacing: 2, fontWeight: 700 }}>
                        {service.name}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: "1.35rem", md: "1.75rem" } }}>
                        {service.heading}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                        {service.description}
                      </Typography>
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        What this service includes
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {service.features.slice(0, 4).map((feature, index) => (
                          <Chip
                            key={`${service.key}-${index}`}
                            label={feature.text}
                            sx={{
                              bgcolor: `${service.color}22`,
                              color: "common.white",
                              border: `1px solid ${service.color}44`,
                            }}
                          />
                        ))}
                      </Box>
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                        {service.importance}
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary", display: "grid", gap: 1 }}>
                        {service.deliverables.slice(0, 3).map((item, index) => (
                          <Box component="li" key={`${service.key}-deliverable-${index}`} sx={{ lineHeight: 1.6 }}>
                            {item}
                          </Box>
                        ))}
                      </Box>
                    </Stack>

                    <Button
                      component={Link}
                      href={service.pageUrl}
                      variant="contained"
                      sx={{
                        mt: "auto",
                        width: "fit-content",
                        bgcolor: service.color,
                        color: "#06101b",
                        fontWeight: 700,
                        px: 2.4,
                        py: 1,
                        borderRadius: "999px",
                        textTransform: "none",
                        boxShadow: `0 12px 30px ${service.color}33`,
                        "&:hover": {
                          bgcolor: service.color,
                          opacity: 0.95,
                        },
                      }}
                    >
                      Explore this service
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Paper>
  );
}
