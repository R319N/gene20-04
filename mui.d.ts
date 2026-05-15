import "@mui/material/Button";
import "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    iconLink: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    socialMediaColors: {
      facebook: { main: string };
      instagram: { main: string };
      twitter: { main: string };
      linkedin: { main: string };
    };
  }

  interface PaletteOptions {
    socialMediaColors?: {
      facebook?: { main?: string };
      instagram?: { main?: string };
      twitter?: { main?: string };
      linkedin?: { main?: string };
    };
  }
}
