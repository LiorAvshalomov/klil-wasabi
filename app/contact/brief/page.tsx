import type { Metadata } from "next";
import { BriefForm } from "./BriefForm";

export const metadata: Metadata = {
  title: "Project Brief | Klil Israeli",
  description: "Send a motion design project brief to Klil Israeli.",
};

export default function Page() {
  return <BriefForm />;
}
