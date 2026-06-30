"use client";

import Appbar from "@/components/navigation-bar/Appbar";
import {
  AutoAwesomeRounded,
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  EditRounded,
  RocketLaunchRounded,
  ScheduleRounded,
  UploadFileRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  linkedIn: string;
  services: string[];
  projectDetails: string;
  projectGoal: string;
  heardFrom: string;
  competitors: string;
  idealCustomers: string;
  uniqueValue: string;
  successMetric: string;
  stage: string;
  assets: string[];
  maintenance: string;
  multiUserAccess: string;
  integrations: string[];
  multilingual: string;
  analytics: string;
  compliance: string;
  budget: string;
  timeline: string;
  launchDate: string;
  priorities: string[];
  inspirationLinks: string[];
  additionalInfo: string;
  communicationMethod: string;
  bestTime: string;
  files: string[];
  concerns: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  website: "",
  linkedIn: "",
  services: [],
  projectDetails: "",
  projectGoal: "",
  heardFrom: "",
  competitors: "",
  idealCustomers: "",
  uniqueValue: "",
  successMetric: "",
  stage: "",
  assets: [],
  maintenance: "",
  multiUserAccess: "",
  integrations: [],
  multilingual: "",
  analytics: "",
  compliance: "",
  budget: "",
  timeline: "",
  launchDate: "",
  priorities: [],
  inspirationLinks: [""],
  additionalInfo: "",
  communicationMethod: "",
  bestTime: "",
  files: [],
  concerns: "",
};

const steps = [
  "About You",
  "Services",
  "Project",
  "Scope",
  "Budget",
  "Timeline",
  "Priorities",
  "Inspiration",
  "Additional",
];

const services = [
  "Custom Website",
  "Business Website",
  "E-commerce Store",
  "SaaS Platform",
  "Web Application",
  "UI/UX Design",
  "Branding",
  "SEO Optimization",
  "Website Redesign",
  "Maintenance & Support",
  "Other",
];

const stages = [
  "Just an idea",
  "Planning",
  "Design completed",
  "Development started",
  "Existing website needs redesign",
];

const assets = ["Logo", "Brand Guidelines", "Domain", "Hosting", "Content", "Images"];
const budgets = ["Under $500", "$500-$1,000", "$1,000-$3,000", "$3,000-$5,000", "$5,000+", "Let's discuss"];
const timelines = ["ASAP", "Within 2 weeks", "Within 1 month", "2-3 months", "Flexible"];
const priorities = [
  "Modern Design",
  "Fast Performance",
  "SEO",
  "Mobile First",
  "Accessibility",
  "Security",
  "CMS",
  "Easy Content Management",
  "Scalability",
  "Integrations",
];
const integrations = ["Payments", "CRM", "Booking", "Email marketing", "APIs", "Automation"];
const yesNo = ["Yes", "No", "Not sure"];

const glass = {
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045))",
  boxShadow: "0 24px 80px rgba(0,0,0,0.36)",
  backdropFilter: "blur(22px)",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    color: "#f8fbff",
    backgroundColor: "rgba(255,255,255,0.045)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.14)" },
    "&:hover fieldset": { borderColor: "rgba(125,231,255,0.42)" },
    "&.Mui-focused fieldset": { borderColor: "#7de7ff" },
  },
  "& .MuiInputLabel-root": { color: "rgba(236,244,255,0.68)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#7de7ff" },
  "& .MuiInputBase-input": { color: "#f8fbff" },
  "& .MuiFormHelperText-root": { color: "rgba(236,244,255,0.58)" },
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function filled(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).length > 0;
  return typeof value === "string" && value.trim().length > 0;
}

function SelectableCard({
  label,
  selected,
  onClick,
  description,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  description?: string;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-pressed={selected}
      sx={{
        ...glass,
        width: "100%",
        minHeight: 86,
        p: 2,
        borderRadius: 2,
        textAlign: "left",
        alignItems: "stretch",
        justifyContent: "flex-start",
        transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
        borderColor: selected ? "rgba(125,231,255,0.76)" : "rgba(255,255,255,0.12)",
        background: selected
          ? "linear-gradient(145deg, rgba(125,231,255,0.18), rgba(154,111,255,0.12))"
          : glass.background,
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(125,231,255,0.48)",
        },
        "&:focus-visible": {
          outline: "2px solid #7de7ff",
          outlineOffset: 3,
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start" width="100%">
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: selected ? "#061018" : "rgba(255,255,255,0.56)",
            backgroundColor: selected ? "#7de7ff" : "rgba(255,255,255,0.08)",
          }}
        >
          <CheckCircleRounded fontSize="small" />
        </Box>
        <Box>
          <Typography fontWeight={800} color="#ffffff" lineHeight={1.2}>
            {label}
          </Typography>
          {description ? (
            <Typography mt={0.75} fontSize={13} color="rgba(236,244,255,0.62)">
              {description}
            </Typography>
          ) : null}
        </Box>
      </Stack>
    </ButtonBase>
  );
}

export default function StartProjectPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [reviewing, setReviewing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const completion = useMemo(() => {
    const required: (keyof FormState)[] = [
      "fullName",
      "email",
      "phone",
      "company",
      "role",
      "services",
      "projectDetails",
      "projectGoal",
      "stage",
      "budget",
      "timeline",
      "priorities",
    ];
    const complete = required.filter((key) => filled(form[key])).length;
    return Math.round((complete / required.length) * 100);
  }, [form]);

  const readiness =
    completion > 85 ? "Ready for proposal" : completion > 55 ? "Almost ready" : "Gathering context";

  const canGoNext = activeStep < steps.length - 1;

  const handleNext = () => {
    if (canGoNext) setActiveStep((step) => step + 1);
    else setReviewing(true);
  };

  const handleBack = () => {
    if (reviewing) {
      setReviewing(false);
      return;
    }
    setActiveStep((step) => Math.max(0, step - 1));
  };

  const addInspirationLink = () => {
    update("inspirationLinks", [...form.inspirationLinks, ""]);
  };

  const updateInspirationLink = (index: number, value: string) => {
    update(
      "inspirationLinks",
      form.inspirationLinks.map((link, currentIndex) => (currentIndex === index ? value : link)),
    );
  };

  const stepContent = [
    <Box key="about" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
      <TextField required label="Full Name" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} sx={fieldSx} />
      <TextField required label="Email Address" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} sx={fieldSx} />
      <TextField required label="Phone Number" value={form.phone} onChange={(event) => update("phone", event.target.value)} sx={fieldSx} />
      <TextField required label="Company / Business Name" value={form.company} onChange={(event) => update("company", event.target.value)} sx={fieldSx} />
      <TextField required label="Position / Role" value={form.role} onChange={(event) => update("role", event.target.value)} sx={fieldSx} />
      <TextField label="Website (optional)" value={form.website} onChange={(event) => update("website", event.target.value)} sx={fieldSx} />
      <TextField label="LinkedIn (optional)" value={form.linkedIn} onChange={(event) => update("linkedIn", event.target.value)} sx={fieldSx} />
      <TextField label="How did you hear about us?" value={form.heardFrom} onChange={(event) => update("heardFrom", event.target.value)} sx={fieldSx} />
    </Box>,
    <Box key="services" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.5 }}>
      {services.map((service) => (
        <SelectableCard
          key={service}
          label={service}
          selected={form.services.includes(service)}
          onClick={() => update("services", toggle(form.services, service))}
        />
      ))}
    </Box>,
    <Stack key="project" spacing={2}>
      <TextField
        label="Tell us about your project"
        multiline
        minRows={8}
        value={form.projectDetails}
        onChange={(event) => update("projectDetails", event.target.value.slice(0, 1800))}
        helperText={`${form.projectDetails.length}/1800 characters`}
        placeholder={"What problem are you trying to solve?\nWhat are your business goals?\nWho is your target audience?\nWhat features do you need?\nWhat inspired this project?"}
        sx={fieldSx}
      />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        <TextField label="Primary goal" value={form.projectGoal} onChange={(event) => update("projectGoal", event.target.value)} placeholder="Generate leads, sell products, automate workflows..." sx={fieldSx} />
        <TextField label="Who are your ideal customers?" value={form.idealCustomers} onChange={(event) => update("idealCustomers", event.target.value)} sx={fieldSx} />
        <TextField label="Who are your main competitors?" value={form.competitors} onChange={(event) => update("competitors", event.target.value)} sx={fieldSx} />
        <TextField label="What makes your business unique?" value={form.uniqueValue} onChange={(event) => update("uniqueValue", event.target.value)} sx={fieldSx} />
        <TextField label="What does success look like after launch?" value={form.successMetric} onChange={(event) => update("successMetric", event.target.value)} sx={fieldSx} />
        <TextField label="Any concerns about the project?" value={form.concerns} onChange={(event) => update("concerns", event.target.value)} sx={fieldSx} />
      </Box>
    </Stack>,
    <Stack key="scope" spacing={3}>
      <Box>
        <Typography mb={1.5} fontWeight={900}>What stage is your project currently in?</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
          {stages.map((stage) => (
            <SelectableCard key={stage} label={stage} selected={form.stage === stage} onClick={() => update("stage", stage)} />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography mb={1.5} fontWeight={900}>Do you already have?</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {assets.map((asset) => (
            <Chip key={asset} label={asset} clickable color={form.assets.includes(asset) ? "primary" : "default"} onClick={() => update("assets", toggle(form.assets, asset))} sx={{ borderRadius: 2, px: 0.75, color: "#fff", border: "1px solid rgba(255,255,255,0.14)", backgroundColor: form.assets.includes(asset) ? "rgba(125,231,255,0.24)" : "rgba(255,255,255,0.06)" }} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        <FormControl sx={fieldSx}>
          <InputLabel>Need ongoing maintenance?</InputLabel>
          <Select value={form.maintenance} label="Need ongoing maintenance?" onChange={(event: SelectChangeEvent) => update("maintenance", event.target.value)}>
            {yesNo.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={fieldSx}>
          <InputLabel>Multiple people need access?</InputLabel>
          <Select value={form.multiUserAccess} label="Multiple people need access?" onChange={(event: SelectChangeEvent) => update("multiUserAccess", event.target.value)}>
            {yesNo.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Typography mb={1.5} fontWeight={900}>Do you require integrations?</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {integrations.map((item) => (
            <Chip key={item} label={item} clickable color={form.integrations.includes(item) ? "primary" : "default"} onClick={() => update("integrations", toggle(form.integrations, item))} sx={{ borderRadius: 2, color: "#fff", border: "1px solid rgba(255,255,255,0.14)", backgroundColor: form.integrations.includes(item) ? "rgba(154,111,255,0.26)" : "rgba(255,255,255,0.06)" }} />
          ))}
        </Stack>
      </Box>
    </Stack>,
    <Box key="budget" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.5 }}>
      {budgets.map((budget) => (
        <SelectableCard key={budget} label={budget} selected={form.budget === budget} onClick={() => update("budget", budget)} description={budget === "Let's discuss" ? "We will help define the right investment range." : "Best for scoped proposal planning."} />
      ))}
    </Box>,
    <Stack key="timeline" spacing={2}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.5 }}>
        {timelines.map((timeline) => (
          <SelectableCard key={timeline} label={timeline} selected={form.timeline === timeline} onClick={() => update("timeline", timeline)} />
        ))}
      </Box>
      <TextField label="Preferred launch date" type="date" value={form.launchDate} onChange={(event) => update("launchDate", event.target.value)} InputLabelProps={{ shrink: true }} sx={fieldSx} />
    </Stack>,
    <Stack key="priorities" spacing={2}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 1.5 }}>
        {priorities.map((priority) => (
          <SelectableCard key={priority} label={priority} selected={form.priorities.includes(priority)} onClick={() => update("priorities", toggle(form.priorities, priority))} />
        ))}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
        <FormControl sx={fieldSx}>
          <InputLabel>Multilingual support?</InputLabel>
          <Select value={form.multilingual} label="Multilingual support?" onChange={(event: SelectChangeEvent) => update("multilingual", event.target.value)}>
            {yesNo.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={fieldSx}>
          <InputLabel>Analytics dashboards?</InputLabel>
          <Select value={form.analytics} label="Analytics dashboards?" onChange={(event: SelectChangeEvent) => update("analytics", event.target.value)}>
            {yesNo.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Legal or compliance needs" value={form.compliance} onChange={(event) => update("compliance", event.target.value)} placeholder="POPIA, GDPR, accessibility..." sx={fieldSx} />
      </Box>
    </Stack>,
    <Stack key="inspiration" spacing={2}>
      <Typography color="rgba(236,244,255,0.7)">Add competitor websites, sites you admire, Pinterest, Dribbble, Behance, or brand references.</Typography>
      {form.inspirationLinks.map((link, index) => (
        <TextField key={index} label={`Reference URL ${index + 1}`} value={link} onChange={(event) => updateInspirationLink(index, event.target.value)} sx={fieldSx} />
      ))}
      <Button onClick={addInspirationLink} variant="outlined" sx={{ alignSelf: "flex-start", borderColor: "rgba(125,231,255,0.38)", color: "#7de7ff" }}>
        Add another link
      </Button>
    </Stack>,
    <Stack key="additional" spacing={2}>
      <TextField label="Anything else we should know?" multiline minRows={4} value={form.additionalInfo} onChange={(event) => update("additionalInfo", event.target.value)} sx={fieldSx} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        <FormControl sx={fieldSx}>
          <InputLabel>Preferred communication method</InputLabel>
          <Select value={form.communicationMethod} label="Preferred communication method" onChange={(event: SelectChangeEvent) => update("communicationMethod", event.target.value)}>
            {["Email", "Phone", "WhatsApp", "Video call"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="Best time to contact" value={form.bestTime} onChange={(event) => update("bestTime", event.target.value)} sx={fieldSx} />
      </Box>
      <Button component="label" variant="outlined" startIcon={<UploadFileRounded />} sx={{ alignSelf: "flex-start", borderColor: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 2 }}>
        Upload files
        <input
          hidden
          multiple
          type="file"
          accept=".pdf,image/*"
          onChange={(event) => update("files", Array.from(event.target.files ?? []).map((file) => file.name))}
        />
      </Button>
      {form.files.length ? <Typography color="rgba(236,244,255,0.7)">{form.files.join(", ")}</Typography> : null}
    </Stack>,
  ];

  const reviewSections = [
    ["About You", [form.fullName, form.email, form.phone, form.company, form.role, form.website, form.linkedIn]],
    ["Services", form.services],
    ["Project", [form.projectGoal, form.projectDetails, form.idealCustomers, form.competitors, form.successMetric]],
    ["Scope", [form.stage, ...form.assets, form.maintenance, ...form.integrations]],
    ["Budget", [form.budget]],
    ["Timeline", [form.timeline, form.launchDate]],
    ["Priorities", [...form.priorities, form.multilingual, form.analytics, form.compliance]],
    ["Inspiration", form.inspirationLinks],
    ["Additional", [form.additionalInfo, form.communicationMethod, form.bestTime, ...form.files]],
  ] as const;

  if (submitted) {
    return (
      <PageShell>
        <Container maxWidth="md" sx={{ py: { xs: 14, md: 18 } }}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <Paper sx={{ ...glass, p: { xs: 3, md: 6 }, borderRadius: 4, textAlign: "center", color: "#fff" }}>
              <Box sx={{ width: 72, height: 72, mx: "auto", mb: 3, borderRadius: "50%", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #7de7ff, #9a6fff)" }}>
                <RocketLaunchRounded sx={{ fontSize: 38, color: "#061018" }} />
              </Box>
              <Typography variant="h2" fontWeight={950} fontSize={{ xs: 34, md: 58 }}>Your Project Has Been Submitted</Typography>
              <Typography mt={2} color="rgba(236,244,255,0.72)">We will review your requirements and respond within 24 hours with the next best step.</Typography>
              <Stack spacing={1.5} mt={4} textAlign="left">
                {["We review your requirements.", "We prepare a tailored proposal.", "We schedule a discovery call.", "We begin building."].map((item, index) => (
                  <Paper key={item} sx={{ ...glass, p: 2, borderRadius: 2, color: "#fff", display: "flex", gap: 2, alignItems: "center" }}>
                    <Chip label={index + 1} sx={{ color: "#061018", bgcolor: "#7de7ff", fontWeight: 900 }} />
                    <Typography>{item}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Container maxWidth="xl" sx={{ pt: { xs: 13, md: 16 }, pb: 8 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 340px" }, gap: 3, alignItems: "start" }}>
          <Box>
            <HeroBlock />
            <Paper sx={{ ...glass, mt: 3, p: { xs: 2, md: 3 }, borderRadius: 4, color: "#fff" }}>
              <Stepper activeStep={reviewing ? steps.length : activeStep} alternativeLabel sx={{ display: { xs: "none", md: "flex" }, mb: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <LinearProgress variant="determinate" value={reviewing ? 100 : ((activeStep + 1) / steps.length) * 100} sx={{ mb: 3, height: 8, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.08)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #7de7ff, #9a6fff)" } }} />
              <AnimatePresence mode="wait">
                <motion.div key={reviewing ? "review" : activeStep} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.24 }}>
                  {reviewing ? (
                    <ReviewScreen sections={reviewSections} onEdit={(index) => { setActiveStep(index); setReviewing(false); }} />
                  ) : (
                    <>
                      <Typography variant="overline" color="#7de7ff" fontWeight={900}>Step {activeStep + 1} of {steps.length}</Typography>
                      <Typography variant="h4" fontWeight={950} mb={3}>{steps[activeStep]}</Typography>
                      {stepContent[activeStep]}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              <Stack direction="row" justifyContent="space-between" mt={4} gap={2}>
                <Button startIcon={<ArrowBackRounded />} onClick={handleBack} disabled={activeStep === 0 && !reviewing} sx={{ color: "#fff" }}>
                  Back
                </Button>
                <Button
                  endIcon={reviewing ? <CheckCircleRounded /> : <ArrowForwardRounded />}
                  variant="contained"
                  onClick={() => (reviewing ? setSubmitted(true) : handleNext())}
                  sx={{ borderRadius: 2, px: 3, color: "#061018", fontWeight: 900, background: "linear-gradient(90deg, #7de7ff, #a8ffcb)", "&:hover": { background: "linear-gradient(90deg, #a8ffcb, #7de7ff)" } }}
                >
                  {reviewing ? "Submit Project" : canGoNext ? "Continue" : "Review"}
                </Button>
              </Stack>
            </Paper>
          </Box>
          <SummarySidebar form={form} completion={completion} readiness={readiness} />
        </Box>
      </Container>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100dvh", color: "#fff", background: "radial-gradient(circle at 15% 10%, rgba(125,231,255,0.16), transparent 30%), radial-gradient(circle at 85% 0%, rgba(154,111,255,0.18), transparent 32%), linear-gradient(180deg, #040714 0%, #070b16 48%, #030409 100%)", position: "relative", overflow: "hidden" }}>
      <Appbar />
      <Box sx={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, black, transparent 78%)" }} />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
}

function HeroBlock() {
  return (
    <Paper sx={{ ...glass, p: { xs: 3, md: 5 }, borderRadius: 4, color: "#fff", position: "relative", overflow: "hidden" }}>
      <Box component={motion.div} animate={{ rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} sx={{ position: "absolute", right: { xs: -90, md: 24 }, top: { xs: -90, md: 24 }, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(125,231,255,0.22)", background: "conic-gradient(from 90deg, rgba(125,231,255,0), rgba(125,231,255,0.28), rgba(154,111,255,0.18), rgba(125,231,255,0))" }} />
      <Stack spacing={2} sx={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
        <Chip icon={<AutoAwesomeRounded />} label="Premium project discovery" sx={{ alignSelf: "flex-start", color: "#dffaff", bgcolor: "rgba(125,231,255,0.12)", border: "1px solid rgba(125,231,255,0.24)" }} />
        <Typography variant="h1" fontWeight={950} fontSize={{ xs: 42, md: 76 }} lineHeight={0.95} letterSpacing={0}>
          Let&apos;s Build Something Exceptional
        </Typography>
        <Typography fontSize={{ xs: 16, md: 19 }} color="rgba(236,244,255,0.74)" maxWidth={680}>
          Tell us about your project and we&apos;ll prepare a tailored proposal with the best approach, timeline, and investment estimate.
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {["Free consultation", "Response within 24 hours", "Tailored proposal"].map((item) => (
            <Chip key={item} icon={<VerifiedRounded />} label={item} sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

function SummarySidebar({ form, completion, readiness }: { form: FormState; completion: number; readiness: string }) {
  return (
    <Paper sx={{ ...glass, p: 2.5, borderRadius: 4, color: "#fff", position: { lg: "sticky" }, top: { lg: 104 } }}>
      <Typography fontWeight={950} fontSize={20}>Consultation Summary</Typography>
      <Stack spacing={2.25} mt={2.5}>
        <Box>
          <Typography fontSize={13} color="rgba(236,244,255,0.56)">Completion</Typography>
          <Stack direction="row" alignItems="center" gap={1.5} mt={0.75}>
            <LinearProgress variant="determinate" value={completion} sx={{ flex: 1, height: 8, borderRadius: 99, backgroundColor: "rgba(255,255,255,0.08)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #7de7ff, #a8ffcb)" } }} />
            <Typography fontWeight={900}>{completion}%</Typography>
          </Stack>
        </Box>
        <SummaryItem label="Selected service(s)" value={form.services.join(", ") || "Not selected yet"} />
        <SummaryItem label="Budget" value={form.budget || "Not selected yet"} />
        <SummaryItem label="Timeline" value={form.timeline || "Not selected yet"} />
        <SummaryItem label="Proposal readiness" value={readiness} icon={<ScheduleRounded fontSize="small" />} />
      </Stack>
    </Paper>
  );
}

function SummaryItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <Box>
      <Typography fontSize={13} color="rgba(236,244,255,0.56)">{label}</Typography>
      <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
        {icon}
        <Typography fontWeight={800}>{value}</Typography>
      </Stack>
    </Box>
  );
}

function ReviewScreen({
  sections,
  onEdit,
}: {
  sections: readonly (readonly [string, readonly string[]])[];
  onEdit: (index: number) => void;
}) {
  return (
    <Box>
      <Typography variant="overline" color="#7de7ff" fontWeight={900}>Final review</Typography>
      <Typography variant="h4" fontWeight={950} mb={3}>Confirm your project brief</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        {sections.map(([title, values], index) => (
          <Paper key={title} sx={{ ...glass, p: 2, borderRadius: 2, color: "#fff" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
              <Typography fontWeight={900}>{title}</Typography>
              <Button size="small" startIcon={<EditRounded />} onClick={() => onEdit(index)} sx={{ color: "#7de7ff" }}>Edit</Button>
            </Stack>
            <Typography mt={1} color="rgba(236,244,255,0.7)">
              {values.filter(Boolean).join(" | ") || "No details added yet"}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
