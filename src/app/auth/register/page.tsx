import { Metadata } from "next";

import RegisterContainer from "@/features/auth/register/register.container";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};

export default function Register() {
  return <RegisterContainer />;
}
