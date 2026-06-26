// this component was coded by wilfred reign and is a product of gene20 incoporations
// website:  www.wilfredreign.netlify.app
// facebook: wilfred reign
// contact : +27 61 202 3165
// whatsapp: +27 61 202 3165
"use client";
// *** react/next imports ***
import React, { useState } from "react";

// *** MUI5 Component imports ***
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

// *** MUI5 Icon imports ***
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";

// *** style imports ***
// import { styles } from "@/styles/styles";

// *** component imports ***
// import Gene20Logo from "../gene20Logo";
// import GlowingButtonOutlined from "../glowingButtonOutlined";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import NavTabs from "./NavTabs";
import NavigationMenu from "./NavigationMenu";
// import Logo from "../logo";
// import ContactBar from "../contactBar";
import { Button, Link, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { styles } from "@/styles/styles";
import LogoThumbnail from "@/assets/logo/LogoThumbnail";
import LogoIcon from "@/assets/logo/LogoIcon";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

interface DashBoardNavigationProps {
  window?: () => Window;
  title?: string;
  children?: React.ReactNode;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children!, {
    elevation: trigger ? 1 : 0,
    ...props,
  });
}

const Appbar: React.FC<DashBoardNavigationProps> = ({
  window,
  ...rest
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const container = window !== undefined ? () => window().document.body : undefined;
  const phone = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <>
      <Box
        position="fixed"
        sx={{
          top: "0",
          zIndex: 99,
          width: "100%",
          p: { xs: "0.5rem", md: "1rem 4rem", xxl: "1rem 8rem" },
        }}
      >
        <ElevationScroll>
          <AppBar
            position="sticky"
            sx={{
              ...styles.scrolledAppBar,
              bgcolor: "#00041417",
              backdropFilter: "blur(10px)",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                ...styles.between_flex,
                border: (theme) => theme.palette.mode === "light" ? `1px solid ${theme.palette.text.primary}33` : `1px solid ${theme.palette.text.primary}22`,
                borderRadius: (theme) => theme.shape.borderRadius,
                position: "relative",
                maxWidth: "100%",
                minHeight: "40px",
                width: "100%",
                p: "0.5rem",
                m: 0,
              }}
            >
              <Box
                sx={{
                  ...styles.between_flex,
                  width: "100%",
                }}
              >
                <Link href="/">
                  {/* {phone ? <LogoIcon /> : <LogoThumbnail />} */}
                  <LogoThumbnail />

                </Link>
                <Box display="flex" alignItems="center" gap={4}>
                  <IconButton
                    size="medium"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    sx={{
                      ...styles.iconHover,
                      borderRadius: "10px",
                      border: "1px solid #D0A5C055",
                      display: { xs: "flex", xl: "none" },
                    }}
                  >
                    {!mobileOpen ? <MenuIcon /> : <Close />}
                  </IconButton>

                </Box>
                <Box
                  sx={{
                    display: { xs: "none", xl: "flex" },
                    alignItems: "center",
                  }}
                >
                  <NavTabs />
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex" },
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"

                  >
                    contact us
                  </Button>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </Box>
      <Drawer
        {...rest}
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "flex", xl: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 260,
            pt: "1rem",
          },
        }}
      >
        <NavigationMenu
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Drawer>
      {/* </Box> */}
    </>
  );
};

export default Appbar;