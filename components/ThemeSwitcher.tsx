"use client";

import { Box, Button, Stack, Typography } from "@mui/material";

interface ThemeSwitcherProps {
  themes: Array<{ id: string; label: string }>;
  value: string;
  onChange: (themeId: string) => void;
}

export default function ThemeSwitcher({ themes, value, onChange }: ThemeSwitcherProps) {
  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
        py: 1,
        position: "sticky",
        top: 0,
        zIndex: 1200,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
        <Typography variant="body2" sx={{ mr: 1, whiteSpace: "nowrap" }}>
          Theme:
        </Typography>
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant={value === theme.id ? "contained" : "outlined"}
            size="small"
            onClick={() => onChange(theme.id)}
          >
            {theme.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
