import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "כליל ישראלי | Motion Designer & Director",
  description: "Wasabi Studio by Klil Israeli — Motion Design, creative direction and brand films from Tel Aviv.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "כליל ישראלי | Motion Designer & Director",
    description: "Every frame moves for a reason. Wasabi Studio by Klil Israeli.",
    locale: "he_IL",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "כליל ישראלי | Motion Designer & Director",
    description: "Every frame moves for a reason.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F1615",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
