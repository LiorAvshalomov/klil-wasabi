import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact | Klil Israeli",
  description: "Start a motion design project with Klil Israeli.",
};

export default function Page() {
  return <ContactPage />;
}

