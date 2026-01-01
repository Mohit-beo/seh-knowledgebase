"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me").then(res => {
      if (res.status === 401) {
        router.push("/auth/login");
      }
    });
  }, []);

  return <>{children}</>;
}
