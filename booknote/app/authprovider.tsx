"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider refetchInterval={60 * 60}>{children}</SessionProvider>;
};

export default AuthProvider;