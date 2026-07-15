import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./refinement.css";

export const metadata: Metadata = {
  title: "Klil Israeli | Motion Designer & Director",
  description: "Wasabi Studio by Klil Israeli — Motion Design, creative direction and brand films from Tel Aviv.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Klil Israeli | Motion Designer & Director",
    description: "Every frame moves for a reason. Wasabi Studio by Klil Israeli.",
    locale: "en_US",
    alternateLocale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Klil Israeli | Motion Designer & Director",
    description: "Every frame moves for a reason.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F1615",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
