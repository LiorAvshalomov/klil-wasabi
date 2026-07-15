export type Language = "he" | "en";

export type Copy = {
  he: string;
  en: string;
};

export type ProjectCategory = "brand" | "systems" | "3d" | "social";
export type ProjectLayout = "kinetic" | "signal" | "soft" | "system" | "vertical";

export type Project = {
  slug: string;
  title: Copy;
  eyebrow: Copy;
  category: ProjectCategory;
  field: Copy;
  client: string;
  service: Copy;
  year: string;
  video: string;
  poster: string;
  statement: Copy;
  challenge: Copy;
  approach: Copy;
  result: Copy;
  layout: ProjectLayout;
  accent: string;
};

const sameCopy = (value: string): Copy => ({ he: value, en: value });

export const selectedProjects: Project[] = [
  {
    slug: "kinetic-field",
    title: { he: "תנופה", en: "Momentum" },
    eyebrow: { he: "Brand Film", en: "Brand Film" },
    category: "brand",
    field: { he: "סרט מותג", en: "Brand Film" },
    client: "Wix Studio",
    service: { he: "בימוי · Motion Design", en: "Direction · Motion Design" },
    year: "2026",
    video: "/media/dynamic-shapes.mp4",
    poster: "/media/dynamic-shapes.jpg",
    statement: {
      he: "זהות חדה שנפתחת לעולם חי, משתנה וקצת בלתי צפוי.",
      en: "A sharp identity opening into a living, shifting and slightly unpredictable world.",
    },
    challenge: {
      he: "לייצר נוכחות חזקה ומהירה, בלי לתת לתנועה להפוך לרעש.",
      en: "Build a fast, confident presence without letting motion turn into noise.",
    },
    approach: {
      he: "חוקי תנועה ברורים, חיתוכים מדויקים ומסה גרפית שמגיבה לכל ביט.",
      en: "Clear motion rules, precise cuts and graphic mass tuned to every beat.",
    },
    result: {
      he: "סרט מוביל ומערכת גמישה שממשיכה לסושיאל, מוצר ובמה.",
      en: "A hero film and a flexible system extending into social, product and stage.",
    },
    layout: "kinetic",
    accent: "#b3e400",
  },
  {
    slug: "signal-noise",
    title: { he: "אות / רעש", en: "Signal / Noise" },
    eyebrow: { he: "Motion Identity", en: "Motion Identity" },
    category: "systems",
    field: { he: "זהות בתנועה", en: "Motion Identity" },
    client: "monday.com",
    service: { he: "Art Direction · Motion", en: "Art Direction · Motion" },
    year: "2026",
    video: "/media/vivid-vortex.mp4",
    poster: "/media/vivid-vortex.jpg",
    statement: {
      he: "מערכת שנעה בין מידע נקי להתפרצות צבעונית — בלי לאבד את הסיגנל.",
      en: "A system moving between clean information and vivid release — without losing the signal.",
    },
    challenge: {
      he: "לחבר אנרגיה גבוהה להיררכיה שנשארת קריאה גם בקצב מהיר.",
      en: "Pair high energy with hierarchy that stays readable at speed.",
    },
    approach: {
      he: "מסר, טיפוגרפיה, תנועה ואימפקט נבנו כשכבות עם רגעי שקט מכוונים.",
      en: "Message, type, motion and impact were layered with deliberate moments of quiet.",
    },
    result: {
      he: "פתיח זכיר וערכת תנועה מודולרית שמייצרת וריאציות בלי לאבד אופי.",
      en: "A memorable opener and modular toolkit that varies without losing character.",
    },
    layout: "signal",
    accent: "#ff2b2b",
  },
  {
    slug: "soft-impact",
    title: { he: "אימפקט רך", en: "Soft Impact" },
    eyebrow: { he: "3D Product Film", en: "3D Product Film" },
    category: "3d",
    field: { he: "סרט מוצר", en: "Product Film" },
    client: "Fiverr",
    service: { he: "3D · Design · Motion", en: "3D · Design · Motion" },
    year: "2025",
    video: "/media/clean-3d.mp4",
    poster: "/media/clean-3d.jpg",
    statement: {
      he: "חומר רך, מצלמה בטוחה וטיימינג שנותן למוצר להחזיק את הפריים.",
      en: "Soft material, a confident camera and timing that lets the product own the frame.",
    },
    challenge: {
      he: "להסביר מוצר חדש בלי הסבר טכני צפוף ובלי קלישאות של סרטי טכנולוגיה.",
      en: "Explain a new product without dense technical copy or familiar tech-film clichés.",
    },
    approach: {
      he: "כל סצנה צומצמה לפעולה אחת; החומר, האור והמצלמה נשאו את הסיפור.",
      en: "Each scene was reduced to one action; material, light and camera carried the story.",
    },
    result: {
      he: "סרט נקי ומובחן שמציג את המוצר במהירות ומשאיר מקום למותג.",
      en: "A clean, distinct film that introduces the product fast and leaves room for the brand.",
    },
    layout: "soft",
    accent: "#ff6969",
  },
  {
    slug: "framework",
    title: { he: "מערכת חיה", en: "Living System" },
    eyebrow: { he: "Motion Toolkit", en: "Motion Toolkit" },
    category: "systems",
    field: { he: "מערכת מושן", en: "Motion System" },
    client: "Partner",
    service: { he: "Motion System · Direction", en: "Motion System · Direction" },
    year: "2025",
    video: "/media/mono-pattern.mp4",
    poster: "/media/mono-pattern.jpg",
    statement: {
      he: "לא עוד טמפלט. מערכת שיודעת להשתנות ועדיין להישאר היא.",
      en: "Not another template. A system built to change and still stay itself.",
    },
    challenge: {
      he: "לשמור על עקביות בלי לייצר תבנית שחוזרת על עצמה ומרגישה צפויה.",
      en: "Keep consistency without creating a repetitive, predictable template.",
    },
    approach: {
      he: "טווח מהירויות, מעברים וחוקי קומפוזיציה מייצרים חופש בתוך מסגרת.",
      en: "A range of speeds, transitions and composition rules creates freedom inside a framework.",
    },
    result: {
      he: "ערכת עבודה יעילה שנותנת לצוותים חופש ושומרת על אופי בכל פורמט.",
      en: "An efficient toolkit that gives teams freedom and keeps character in every format.",
    },
    layout: "system",
    accent: "#92ba00",
  },
  {
    slug: "cut-to-beat",
    title: { he: "קאט לביט", en: "Cut to Beat" },
    eyebrow: { he: "Launch Film", en: "Launch Film" },
    category: "social",
    field: { he: "סרט השקה", en: "Launch Film" },
    client: "Artlist",
    service: { he: "בימוי · Motion Design · עריכה", en: "Direction · Motion Design · Edit" },
    year: "2025",
    video: "/media/projects/golden-orbit.mp4",
    poster: "/media/projects/golden-orbit.jpg",
    statement: {
      he: "סרט השקה שבו הקאט, הצבע והטיפוגרפיה נבנים מתוך הקצב — לא רק יושבים עליו.",
      en: "A launch film where cut, colour and type are built from the rhythm — not simply placed on top of it.",
    },
    challenge: {
      he: "לחבר כמה עולמות חזותיים לסיפור אחד מהיר, בלי שהאנרגיה תחליף את הרעיון.",
      en: "Connect several visual worlds into one fast story without letting energy replace the idea.",
    },
    approach: {
      he: "עריכה מוזיקלית, מעברי צורה וחוקי צבע שמחזיקים את הסרט גם כשהשפה מתחלפת מפריים לפריים.",
      en: "Musical editing, shape transitions and colour rules hold the film together as its visual language shifts frame by frame.",
    },
    result: {
      he: "סרט קצר, זכיר וגמיש שנפתח לרשת של נכסים לקמפיין ולסושיאל.",
      en: "A short, memorable and flexible film that expands into a campaign and social toolkit.",
    },
    layout: "kinetic",
    accent: "#ff2b2b",
  },
];

export const moreProjects: Project[] = [
  {
    slug: "chromatic-current",
    title: sameCopy("Chromatic Current"),
    eyebrow: sameCopy("Brand Motion Study"),
    category: "brand",
    field: sameCopy("Brand Film"),
    client: "Kinetica",
    service: sameCopy("Direction · Design · Motion"),
    year: "2026",
    video: "/media/projects/orange-flow.mp4",
    poster: "/media/projects/orange-flow.jpg",
    statement: sameCopy("A warm, elastic visual language built to make an emerging energy brand feel immediate, human and impossible to ignore."),
    challenge: sameCopy("Turn an invisible product into a tactile story without relying on product UI or technical explanation."),
    approach: sameCopy("Light, fabric and liquid movement were treated as one responsive material, with every transition following a single directional pulse."),
    result: sameCopy("A concise launch film and a flexible bank of loops for social, events and digital brand moments."),
    layout: "kinetic",
    accent: "#ff6a2b",
  },
  {
    slug: "glass-signal",
    title: sameCopy("Glass Signal"),
    eyebrow: sameCopy("Motion Identity"),
    category: "systems",
    field: sameCopy("Motion System"),
    client: "Luma",
    service: sameCopy("Art Direction · Motion System"),
    year: "2026",
    video: "/media/projects/signal-glass.mp4",
    poster: "/media/projects/signal-glass.jpg",
    statement: sameCopy("A translucent motion system that turns changing light into a clear, ownable signal."),
    challenge: sameCopy("Create a premium language that could move from quiet product moments to high-energy campaign launches."),
    approach: sameCopy("Refraction, controlled blur and colour shifts were organised into a small set of repeatable motion behaviours."),
    result: sameCopy("A scalable system with enough range for product, social, presentation and environmental screens."),
    layout: "soft",
    accent: "#50e3c2",
  },
  {
    slug: "acid-bloom",
    title: sameCopy("Acid Bloom"),
    eyebrow: sameCopy("Launch Film"),
    category: "brand",
    field: sameCopy("Campaign Film"),
    client: "Kite Labs",
    service: sameCopy("Direction · Design · Edit"),
    year: "2026",
    video: "/media/projects/lemon-waves.mp4",
    poster: "/media/projects/lemon-waves.jpg",
    statement: sameCopy("An optimistic launch language where colour behaves like a living surface rather than a static brand asset."),
    challenge: sameCopy("Build energy around a simple message while keeping the film clean enough for a product-led brand."),
    approach: sameCopy("Large colour fields, soft tension and decisive cuts created rhythm without crowding the frame."),
    result: sameCopy("A bright hero film supported by seamless loops and adaptable motion backgrounds."),
    layout: "kinetic",
    accent: "#b3e400",
  },
  {
    slug: "mono-many",
    title: sameCopy("Mono / Many"),
    eyebrow: sameCopy("Title Sequence"),
    category: "systems",
    field: sameCopy("Title Design"),
    client: "Noir Assembly",
    service: sameCopy("Concept · Typography · Motion"),
    year: "2025",
    video: "/media/projects/mono-prism.mp4",
    poster: "/media/projects/mono-prism.jpg",
    statement: sameCopy("One monochrome toolkit, continuously recomposed into an unpredictable sequence of marks, masks and optical rhythm."),
    challenge: sameCopy("Create variety without colour, illustration or a large library of bespoke assets."),
    approach: sameCopy("Contrast, repetition and mirrored geometry became the grammar; pacing supplied the personality."),
    result: sameCopy("A modular title package that stays coherent while producing hundreds of distinct frames."),
    layout: "system",
    accent: "#e1e1e1",
  },
  {
    slug: "fractal-transit",
    title: sameCopy("Fractal Transit"),
    eyebrow: sameCopy("3D Brand Film"),
    category: "3d",
    field: sameCopy("3D Film"),
    client: "Orbit One",
    service: sameCopy("Direction · 3D · Motion"),
    year: "2025",
    video: "/media/projects/fractal-tunnel.mp4",
    poster: "/media/projects/fractal-tunnel.jpg",
    statement: sameCopy("A continuous flight through a system that keeps opening, multiplying and revealing a new sense of scale."),
    challenge: sameCopy("Express speed and technical depth without falling into familiar space or data visualisation clichés."),
    approach: sameCopy("One forward camera move connected a sequence of procedural worlds, each inheriting geometry from the last."),
    result: sameCopy("A cinematic launch asset with cutdowns that retain their momentum at every duration."),
    layout: "signal",
    accent: "#ff2b2b",
  },
  {
    slug: "form-room",
    title: sameCopy("Form / Room"),
    eyebrow: sameCopy("3D Identity"),
    category: "3d",
    field: sameCopy("Visual Identity"),
    client: "Forma",
    service: sameCopy("Look Development · 3D · Motion"),
    year: "2025",
    video: "/media/projects/floating-forms.mp4",
    poster: "/media/projects/floating-forms.jpg",
    statement: sameCopy("A playful spatial identity where simple objects become characters through timing, weight and collision."),
    challenge: sameCopy("Give an architectural platform warmth and personality while keeping its visual system systematic."),
    approach: sameCopy("A limited library of forms was animated through physical rules, expressive camera moves and deliberately imperfect timing."),
    result: sameCopy("An ownable 3D world that moves easily between brand film, product stories and social content."),
    layout: "soft",
    accent: "#ff6969",
  },
  {
    slug: "afterdark-grid",
    title: sameCopy("Afterdark Grid"),
    eyebrow: sameCopy("Digital Campaign"),
    category: "social",
    field: sameCopy("Campaign System"),
    client: "Afterdark",
    service: sameCopy("Art Direction · Motion · Social"),
    year: "2025",
    video: "/media/projects/neon-grid.mp4",
    poster: "/media/projects/neon-grid.jpg",
    statement: sameCopy("A nocturnal campaign system built from electric colour, modular perspective and sharp bursts of speed."),
    challenge: sameCopy("Create a social-first language that stays recognisable across dozens of short, fast-moving edits."),
    approach: sameCopy("A fixed grid held the system together while colour, depth and camera energy shifted from asset to asset."),
    result: sameCopy("A flexible campaign kit designed for fast rollout without losing its distinct visual signature."),
    layout: "signal",
    accent: "#ff2b2b",
  },
  {
    slug: "moving-matter",
    title: sameCopy("Moving Matter"),
    eyebrow: sameCopy("Experimental Film"),
    category: "brand",
    field: sameCopy("Motion Study"),
    client: "Paper Signal",
    service: sameCopy("Concept · Design · Motion"),
    year: "2025",
    video: "/media/projects/moving-collage.mp4",
    poster: "/media/projects/moving-collage.jpg",
    statement: sameCopy("An experimental collage where illustration, texture and rhythm meet without settling into a single style."),
    challenge: sameCopy("Unify a deliberately mixed visual language while protecting the surprise of every new frame."),
    approach: sameCopy("Transitions were designed as transformations, letting each image physically generate the next."),
    result: sameCopy("A compact film with a handmade energy and a library of distinctive loops for editorial use."),
    layout: "kinetic",
    accent: "#b3e400",
  },
];

export const projects: Project[] = [...selectedProjects, ...moreProjects];

export const categoryLabels: Record<"all" | ProjectCategory, Copy> = {
  all: { he: "הכל", en: "All" },
  brand: { he: "Brand Films", en: "Brand Films" },
  systems: { he: "Motion Systems", en: "Motion Systems" },
  "3d": { he: "3D", en: "3D" },
  social: { he: "Social", en: "Social" },
};

export const clients = [
  { name: "Wix", className: "logo-wix", note: "TECH" },
  { name: "monday", className: "logo-monday", note: "PRODUCT" },
  { name: "בנק הפועלים", className: "logo-hapoalim", note: "FINANCE" },
  { name: "fiverr.", className: "logo-fiverr", note: "MARKETPLACE" },
  { name: "בנק לאומי", className: "logo-leumi", note: "FINANCE" },
  { name: "Similarweb", className: "logo-similarweb", note: "DATA" },
  { name: "AppsFlyer", className: "logo-appsflyer", note: "MOBILE" },
  { name: "תנובה", className: "logo-tnuva", note: "CONSUMER" },
  { name: "EL AL", className: "logo-elal", note: "AVIATION" },
  { name: "LMND", className: "logo-lemonade", note: "INSURTECH" },
  { name: "קשת 12", className: "logo-keshet", note: "MEDIA" },
  { name: "taboola", className: "logo-taboola", note: "MEDIA" },
  { name: "Waze", className: "logo-waze", note: "MOBILITY" },
  { name: "partner", className: "logo-partner", note: "TELECOM" },
  { name: "PAPAYA", className: "logo-papaya", note: "GLOBAL" },
];
