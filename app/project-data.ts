export type Project = {
  slug: string;
  title: string;
  englishTitle: string;
  category: string;
  roles: string;
  year: string;
  video: string;
  poster: string;
  intro: string;
  challenge: string;
  approach: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "kinetic-field",
    title: "שדה קינטי",
    englishTitle: "KINETIC FIELD",
    category: "סרט מותג",
    roles: "בימוי · עיצוב · אנימציה",
    year: "2026",
    video: "/media/dynamic-shapes.mp4",
    poster: "/media/dynamic-shapes.jpg",
    intro:
      "סרט מותג שמתרגם מערכת גרפית חדה לעולם חי, משתנה ומלא אופי. הפרויקט בנוי סביב קצב, מסה ומעברים שמרגישים כמו חלק מהרעיון - לא שכבת קישוט.",
    challenge:
      "לייצר נוכחות חזקה ומהירה, בלי לאבד את הסיפור ובלי להפוך את התנועה לרעש חזותי.",
    approach:
      "הגדרנו חוקי תנועה קבועים, בנינו שפה של חיתוכים ומסכות, ורק אז הלבשנו אותה על כל סצנה.",
    result:
      "מערכת תנועה גמישה שיכולה להמשיך מסרט אחד למוצרים, סושיאל ומסכי אירוע.",
  },
  {
    slug: "signal-noise",
    title: "אות / רעש",
    englishTitle: "SIGNAL / NOISE",
    category: "פתיח וזהות בתנועה",
    roles: "ארט דיירקשן · מושן",
    year: "2026",
    video: "/media/vivid-vortex.mp4",
    poster: "/media/vivid-vortex.jpg",
    intro:
      "זהות בתנועה שנעה בין מידע נקי להתפרצות צבעונית. כל מעבר תוכנן כדי לשמור על תחושת גילוי ולהוביל את העין לפריים הבא.",
    challenge:
      "לחבר בין אנרגיה גבוהה לבין היררכיה ברורה שאפשר לקרוא גם בקצב מהיר.",
    approach:
      "עבדנו בשכבות: מסר, טיפוגרפיה, תנועה ואימפקט - עם נקודות עצירה מכוונות בתוך הקצב.",
    result:
      "פתיח זכיר ומערכת מודולרית שמספקת הרבה וריאציות בלי לאבד זהות.",
  },
  {
    slug: "soft-impact",
    title: "אימפקט רך",
    englishTitle: "SOFT IMPACT",
    category: "השקת מוצר",
    roles: "עיצוב · תלת-ממד · מושן",
    year: "2025",
    video: "/media/clean-3d.mp4",
    poster: "/media/clean-3d.jpg",
    intro:
      "השקת מוצר שמדברת בשפה רגועה אבל לא נעלמת. אובייקטים רכים, תנועה מדויקת וטיימינג שמייצר תחושת ביטחון.",
    challenge:
      "להסביר מוצר חדש בלי ליפול להסבר טכני צפוף או לקלישאות של סרטי טכנולוגיה.",
    approach:
      "צמצמנו כל סצנה לפעולה אחת ברורה ונתנו לחומר, לקצב ולמצלמה לשאת את הסיפור.",
    result:
      "סרט נקי ומובחן שמציג את המוצר במהירות ומשאיר מספיק מקום למותג.",
  },
  {
    slug: "framework",
    title: "מערכת בתנועה",
    englishTitle: "FRAMEWORK",
    category: "מערכת מושן",
    roles: "זהות בתנועה · כלי מותג",
    year: "2025",
    video: "/media/mono-pattern.mp4",
    poster: "/media/mono-pattern.jpg",
    intro:
      "מערכת תנועה שנבנתה כדי לעבוד שוב ושוב: מפתיחים קצרים ועד מצגות, סושיאל ומסכי במה.",
    challenge:
      "לשמור על עקביות בלי לייצר תבנית שחוזרת על עצמה ומרגישה צפויה.",
    approach:
      "בנינו טווח של מהירויות, מעברים וחוקי קומפוזיציה שמאפשרים גיוון בתוך מערכת אחת.",
    result:
      "ערכת מושן יעילה שנותנת לצוותים חופש פעולה ושומרת על אופי ברור בכל פורמט.",
  },
  {
    slug: "vertical-pressure",
    title: "לחץ אנכי",
    englishTitle: "VERTICAL PRESSURE",
    category: "קמפיין סושיאל",
    roles: "בימוי · עיצוב · מושן",
    year: "2025",
    video: "/media/green-geometry-vertical.mp4",
    poster: "/media/green-geometry-vertical.jpg",
    intro:
      "סדרת סרטים אנכיים שמתייחסת לפורמט כאל במה, לא כאל גרסה חתוכה של סרט רחב.",
    challenge:
      "לתפוס תשומת לב במהירות ולשמור על רעיון ברור גם בצפייה ללא סאונד.",
    approach:
      "הקומפוזיציה, הטיפוגרפיה והקצב נבנו מראש למסך אנכי וללולאות קצרות.",
    result:
      "מערכת סושיאל חדה, מזוהה וגמישה שממשיכה לעבוד גם בין קמפיינים.",
  },
];

export const demoClients = [
  "WIX",
  "MONDAY",
  "FIVERR",
  "SIMILARWEB",
  "APPSFLYER",
  "LEMONADE",
  "LIGHTRICKS",
  "TABOOLA",
];
