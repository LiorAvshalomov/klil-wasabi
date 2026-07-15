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

export const projects: Project[] = [
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
    client: "Lightricks",
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
    video: "/media/demo-reel.mp4",
    poster: "/media/vivid-vortex.jpg",
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
  { name: "LIGHTRICKS", className: "logo-lightricks", note: "CREATIVE" },
  { name: "EL AL", className: "logo-elal", note: "AVIATION" },
  { name: "LMND", className: "logo-lemonade", note: "INSURTECH" },
  { name: "קשת 12", className: "logo-keshet", note: "MEDIA" },
  { name: "taboola", className: "logo-taboola", note: "MEDIA" },
  { name: "Waze", className: "logo-waze", note: "MOBILITY" },
  { name: "partner", className: "logo-partner", note: "TELECOM" },
  { name: "PAPAYA", className: "logo-papaya", note: "GLOBAL" },
];
