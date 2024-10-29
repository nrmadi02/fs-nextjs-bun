import { PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center font-poppins">
      {children}
    </main>
  );
}
