import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: "כליל ישראלי | Motion Designer & Director",
    description:
      "Wasabi Studio by Klil Israeli - מושן דיזיין, בימוי, סרטי מותג ומערכות תנועה.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "כליל ישראלי | Motion Designer & Director",
      description: "מושן מדויק, עם קיק. Wasabi Studio by Klil Israeli.",
      locale: "he_IL",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "כליל ישראלי | Motion Designer & Director",
      description: "מושן מדויק, עם קיק.",
      images: [socialImage],
    },
  };
}

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
