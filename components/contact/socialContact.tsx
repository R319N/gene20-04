import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RotatingCard from "../ui/cards/RotatingCard";
import socialMediaRoutes from "@/constants/socialMediaRoutes";

export default function SocialContacts() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
      }}
      gap={1}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={1}
      >
        {socialMediaRoutes.map((social, index) => (
         
          <RotatingCard href={social.url} key={index} >
            {social.icon}
            </RotatingCard>
            
        
        ))}
      </Box>
    </Box>
  );
}
