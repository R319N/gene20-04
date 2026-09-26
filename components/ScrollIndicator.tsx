import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styles } from '@/styles/styles';


interface Props {
    label?: string
}

const ScrollIndicator: React.FC<Props> = ({ label }) => {
    return (
        <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 'max(16px, env(safe-area-inset-bottom, 0px))',
            zIndex: 1,
            letterSpacing: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        }}>

            <Typography color="text.secondary" variant="caption" sx={{ textAlign: "center", letterSpacing: 4, textTransform: 'uppercase' }}>
                {label}
            </Typography>
            <Box sx={{
                ...styles.column_flex,
                width: "0px",

            }
            }>
                <KeyboardArrowDownIcon sx={{
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.7)',
                }} />
                <Box
                    sx={{
                        height: "20px",
                        width: "1px",
                        boxShadow: `0 0 4px 0 #ffffffbb, 0 0 5px 0 #3f0069d7`,
                        animation: 'scrollPulse 2s ease-in-out infinite',
                        '@keyframes scrollPulse': {
                            '0%, 100% ': { opacity: 0.3, transform: "scaleY(1)" },
                            '50% ': { opacity: 0.8, transform: "scaleY(1.1)" },
                            '50%': { transform: 'translate(-50%, -5px)' },
                        },

                        background: 'linear-gradient(to bottom, rgba(59,158,255,0.9) 70%, transparent 30%)',

                    }} />
            </Box>
        </Box>
    )
}

export default ScrollIndicator