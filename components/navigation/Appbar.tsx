"use client";

// *** react/next imports ***
import React, { useState, useId } from "react";

// *** MUI5 Component imports ***
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

// *** MUI5 Icon imports ***
import SvgIcon from "@mui/material/SvgIcon";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import useScrollTrigger from "@mui/material/useScrollTrigger";

// *** component imports ***
import NavTabs from "./NavTabs";
import NavigationMenu from "./NavigationMenu";
import LogoThumbnail from "@/assets/logo/LogoThumbnail";

// *** style imports ***
import { styles } from "@/styles/styles";
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
  const gradientId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const container = window !== undefined ? () => window().document.body : undefined;

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
            position="static"
            sx={{
              ...styles.scrolledAppBar,
              overflow: "visible",
              boxShadow: "none",
              backgroundColor: trigger ? "#00041417" : "transparent",
              border: (theme) => trigger ? `1px solid ${theme.palette.text.primary}11` : "none",
              backdropFilter: trigger ? "blur(10px)" : 0,
              borderRadius: (theme) => theme.shape.borderRadius,
            }}
          >
            <Toolbar
              sx={{
                ...styles.between_flex,
                width: "100%",
                p: "0.5rem",
              }}
            >
              <Box
                sx={{
                  ...styles.between_flex,
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <Link href="/">
                  <LogoThumbnail />
                </Link>
                <IconButton
                  onClick={handleDrawerToggle}
                  aria-label="open drawer"
                  sx={{
                    display: trigger ? { xs: "flex", lg: "none" } : { xs: "flex", lg: "none" },
                    ...styles.iconHover,
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                                     {mobileOpen ? (
                      <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 32 }}>
                      <path
                        fill={`url(#${gradientId})`}
                        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.7 4.29 12 10.59l6.29-6.3z"
                      /> 
                      </SvgIcon>
                    ) : (
                      <DragHandleIcon sx={{ fontSize: 32, color: "text.primary" }} />
                    )}
                 

                </IconButton>

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
                   get in touch
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
    </>
  );
};

export default Appbar;