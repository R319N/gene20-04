'use client';

import MountainField3D from '@/components/MountainField3D';
import { styles } from '@/styles/styles';
// import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
// import ShieldRounded from '@mui/icons-material/ShieldRounded';
// import BoltRounded from '@mui/icons-material/BoltRounded';
import { Box, Button, Typography } from '@mui/material';

// const laptopStats = [
//   { icon: <AutoAwesomeRounded />, label: 'Visual Identity', value: 'Brand-led UI' },
//   { icon: <BoltRounded />, label: 'Performance', value: 'Fast pages' },
//   { icon: <ShieldRounded />, label: 'Credibility', value: 'Trust signals' },
// ];

const IntroSection = () => {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        position: 'relative',
        minHeight: "100vh",
        color: '#dbe7ff',
        px: { xs: 1.4, sm: 4, md: 7 },
      ...styles.center_flex
      }}
    >
      <Box className="intro-gradient" />

      <Box sx={{ 
        ...styles.center_flex, flexDirection: "column", gap: 0, zIndex: 1, height:"100%"}}>
        <Typography variant='h1'
          sx={{
            background: 'linear-gradient(90deg, #84d8ff, #8157ff)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            width:{xs:"100%", xl: "30ch"},
            textAlign: "center", lineHeight: 1.4,
            textTransform: "capitalize",
            
          }}
          >
          Your website shapes how people perceive your business.
        </Typography>

        <Typography
          variant='body1'
          sx={{
            mt: 4,
            textTransform: "capitalize",
            width: {xs:"100%", xl:"80ch"},
            textAlign: "center",
            lineHeight: "2"
          }}>
          In today&apos;s digital world, customers often judge a brand before they ever make contact. A slow, outdated, or poorly designed website can reduce trust, weaken credibility, and cost opportunities.
        </Typography>
        <Button variant="text" endIcon={<TrendingFlatIcon />} sx={{ mt: 5, fontWeight: 700, textTransform: "capitalize", color: "#c8d9ff", borderBottom: "1px solid #c8d9ff" }} >
          Let&apos;s Build Your Digital Presence
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '-8% -28% 0 -28%', md: '19% -8% -18% -8%' },
          opacity: { xs: 0.46, md: 0.2 },
          pointerEvents: 'none',
          width:"100%",
        }}
      >
        <MountainField3D />
      </Box>
      {/* <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 72% 46%, rgba(79, 116, 255, 0.2), transparent 34%), radial-gradient(circle at 24% 58%, rgba(25, 84, 202, 0.18), transparent 30%), linear-gradient(180deg, #020617 0%, #01030d 100%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '-8% -28% 0 -28%', md: '19% -8% -18% -8%' },
          opacity: { xs: 0.46, md: 0.78 },
          pointerEvents: 'none',
        }}
      >
        <MountainField3D />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(1,5,19,0.96) 0%, rgba(1,5,19,0.74) 36%, rgba(1,5,19,0.28) 68%, rgba(1,5,19,0.72) 100%), linear-gradient(180deg, rgba(1,5,19,0.15) 0%, rgba(1,5,19,0.06) 62%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: { md: '100vh' },
          maxWidth: 1560,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.92fr 1.08fr' },
          alignItems: 'center',
          gap: { xs: 8, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 760, pt: { md: 10 } }}>
          <Typography
            component="h2"
            sx={{
              color: '#b6cbff',
              fontSize: { xs: 44, sm: 58, md: 72, xl: 82 },
              fontWeight: 900,
              lineHeight: 1.23,
              letterSpacing: 0,
              mb: { xs: 4, md: 9 },
              textShadow: '0 18px 52px rgba(63, 111, 255, 0.24)',
            }}
          >
            Your Website Shapes
            <Box component="span" sx={{ display: 'block' }}>
              How People Perceive
            </Box>
            <Box component="span" sx={{ display: 'block' }}>
              Your Business.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(210, 225, 255, 0.88)',
              fontSize: { xs: 17, md: 22 },
              lineHeight: 1.45,
              maxWidth: 690,
              mb: { xs: 5, md: 9 },
              textTransform: 'capitalize',
            }}
          >
            In today&apos;s digital world, customers often judge a brand before they ever make
            contact. A slow, outdated, or poorly designed website can reduce trust, weaken
            credibility, and cost opportunities.
          </Typography>

          <Stack spacing={1.8} alignItems="flex-start">
            <Box
              sx={{
                width: 64,
                height: 1,
                bgcolor: '#a8c2ff',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: -1,
                  top: -4,
                  width: 9,
                  height: 9,
                  borderTop: '1px solid #a8c2ff',
                  borderRight: '1px solid #a8c2ff',
                  transform: 'rotate(45deg)',
                },
              }}
            />
            <Typography
              sx={{
                color: '#c8d9ff',
                fontSize: { xs: 16, md: 18 },
                fontWeight: 700,
              }}
            >
              Let&apos;s Build Your Digital Presence
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 390, sm: 520, md: 650 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: { md: 'translateY(4%)' },
          }}
        >
          <LaptopMockup />
        </Box>
      </Box>
    </Box>
  );
};

function LaptopMockup() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 'min(100%, 560px)', md: 'min(58vw, 900px)' },
        aspectRatio: '1.24 / 1',
        transform: { xs: 'rotate(-1deg)', md: 'rotate(-7deg)' },
        filter: 'drop-shadow(0 44px 68px rgba(0, 0, 0, 0.58))',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '14%',
          right: '4%',
          top: '4%',
          height: '54%',
          borderRadius: '18px 18px 10px 10px',
          border: '3px solid rgba(213, 225, 255, 0.78)',
          bgcolor: '#08122e',
          boxShadow:
            'inset 0 0 0 8px rgba(1, 5, 17, 0.96), inset 0 0 70px rgba(59, 114, 255, 0.26), 0 0 34px rgba(84, 126, 255, 0.28)',
          overflow: 'hidden',
          transform: 'perspective(900px) rotateX(2deg) skewY(-3deg)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '9px',
            background:
              'radial-gradient(circle at 70% 28%, rgba(124, 104, 255, 0.46), transparent 24%), radial-gradient(circle at 22% 24%, rgba(54, 142, 255, 0.36), transparent 28%), linear-gradient(135deg, #102353 0%, #090c2a 60%, #050713 100%)',
            overflow: 'hidden',
          }}
        >
          <ScreenContent />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: '7%',
          right: '5%',
          top: '57%',
          height: '30%',
          background:
            'linear-gradient(150deg, #d9ecfb 0%, #91a8c4 36%, #586684 64%, #d7eaff 100%)',
          clipPath: 'polygon(19% 0, 91% 0, 100% 82%, 43% 100%, 0 76%)',
          boxShadow: 'inset 0 12px 36px rgba(255,255,255,0.42), inset 0 -22px 34px rgba(2,8,25,0.35)',
          transform: 'perspective(900px) rotateX(54deg) skewX(-10deg)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '27%',
            right: '17%',
            top: '20%',
            height: '36%',
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '5%',
            opacity: 0.66,
          }}
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: '2px',
                bgcolor: index % 9 === 0 ? 'rgba(119, 103, 219, 0.55)' : 'rgba(4, 11, 28, 0.7)',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.24)',
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: 'absolute',
            left: '24%',
            bottom: '9%',
            width: '25%',
            height: '30%',
            borderRadius: '4px',
            border: '1px solid rgba(12, 20, 42, 0.32)',
            bgcolor: 'rgba(219, 236, 248, 0.32)',
          }}
        />
      </Box>
    </Box>
  );
}

function ScreenContent() {
  return (
    <>
      <Box
        sx={{
          height: '12%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '4.5%',
          color: '#d7e6ff',
          fontSize: { xs: 5, sm: 7, md: 8 },
          letterSpacing: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, fontWeight: 800 }}>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: '#2e8dff',
              boxShadow: '0 0 12px rgba(57, 148, 255, 0.8)',
            }}
          />
          LUMOS
        </Box>
        <Stack direction="row" spacing={2.2} sx={{ opacity: 0.76 }}>
          <span>ABOUT</span>
          <span>WORK</span>
          <span>STACK</span>
        </Stack>
        <Box
          sx={{
            px: 1.2,
            py: 0.45,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #18c8ff, #854bff)',
            fontWeight: 900,
          }}
        >
          START
        </Box>
      </Box>

      <Box sx={{ position: 'absolute', left: '7%', top: '27%', width: '38%' }}>
        <Typography sx={{ color: '#fff', fontSize: { xs: 13, sm: 18, md: 27 }, fontWeight: 900, lineHeight: 1.1 }}>
          Build a Website for Your Customers
        </Typography>
        <Typography sx={{ mt: 1, color: 'rgba(221,231,255,0.62)', fontSize: { xs: 4, sm: 6, md: 8 }, lineHeight: 1.5 }}>
          Strategy, visual systems, and fast frontend craft built around trust.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Box sx={{ width: 48, height: 14, borderRadius: 999, background: 'linear-gradient(90deg, #22d2ff, #8157ff)' }} />
          <Box sx={{ width: 48, height: 14, borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)' }} />
        </Stack>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: '9%',
          top: '20%',
          width: '36%',
          height: '50%',
          filter: 'drop-shadow(0 0 20px rgba(126, 180, 255, 0.76))',
        }}
      >
        <DigitalFlowers />
      </Box>

      <Stack
        direction="row"
        spacing={1.6}
        sx={{
          position: 'absolute',
          left: '12%',
          right: '8%',
          bottom: '10%',
          height: '22%',
          alignItems: 'center',
          px: '3%',
          borderRadius: '9px',
          border: '1px solid rgba(186, 208, 255, 0.18)',
          background: 'linear-gradient(90deg, rgba(47, 68, 154, 0.75), rgba(119, 82, 216, 0.62), rgba(53, 82, 160, 0.7))',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.32)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {laptopStats.map((item) => (
          <Stack key={item.label} direction="row" spacing={0.8} alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: { xs: 18, md: 32 },
                height: { xs: 18, md: 32 },
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
                borderRadius: '50%',
                bgcolor: 'rgba(109, 117, 255, 0.58)',
                color: '#cad9ff',
                '& svg': { fontSize: { xs: 10, md: 17 } },
              }}
            >
              {item.icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ color: '#fff', fontSize: { xs: 4, sm: 6, md: 8 }, fontWeight: 900, lineHeight: 1.1 }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: 'rgba(225,235,255,0.64)', fontSize: { xs: 3, sm: 5, md: 7 }, lineHeight: 1.2 }}>
                {item.label}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

function DigitalFlowers() {
  return (
    <Box sx={{ position: 'absolute', inset: 0 }}>
      {[0, 1, 2].map((flower) => (
        <Box
          key={flower}
          sx={{
            position: 'absolute',
            left: `${flower * 25 + 10}%`,
            top: flower === 0 ? '35%' : flower === 1 ? '4%' : '27%',
            width: flower === 1 ? '42%' : '32%',
            aspectRatio: '1 / 1',
            transform: `rotate(${flower * 14 - 10}deg)`,
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                left: '39%',
                top: '22%',
                width: '24%',
                height: '48%',
                borderRadius: '50% 50% 45% 45%',
                transformOrigin: '50% 80%',
                transform: `rotate(${index * 51.4}deg) translateY(-18%)`,
                background:
                  'radial-gradient(circle at 52% 28%, rgba(255,255,255,0.95), rgba(92,211,255,0.76) 24%, rgba(114,83,255,0.48) 58%, rgba(33,59,148,0.04) 100%)',
                border: '1px solid rgba(162, 214, 255, 0.22)',
              }}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              left: '45%',
              top: '45%',
              width: '12%',
              aspectRatio: '1',
              borderRadius: '50%',
              bgcolor: '#ffffff',
              boxShadow: '0 0 20px #84d8ff',
            }}
          />
        </Box>
      ))}

      {[0, 1, 2].map((stem) => (
        <Box
          key={stem}
          sx={{
            position: 'absolute',
            left: `${stem * 24 + 24}%`,
            top: stem === 1 ? '47%' : '58%',
            width: '1.5%',
            height: stem === 1 ? '43%' : '31%',
            borderRadius: 999,
            background: 'linear-gradient(180deg, rgba(97,221,255,0.65), rgba(84,72,255,0.08))',
            transform: `rotate(${stem * 13 - 14}deg)`,
            transformOrigin: 'top center',
          }}
        />
      ))} */}
    </Box>
  );
}

export default IntroSection;
