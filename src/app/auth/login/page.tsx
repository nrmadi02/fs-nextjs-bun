import { Metadata } from "next";

import LoginContainer from "@/features/auth/login/login.container";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function Login() {
  return <LoginContainer />;
}
