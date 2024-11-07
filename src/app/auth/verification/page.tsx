import { Metadata } from "next";

import VerificationContainer from "@/features/auth/verification/verification.container";

export const metadata: Metadata = {
  title: "Verification",
  description: "Verification",
};

export default function Verification() {
  return <VerificationContainer />;
}
