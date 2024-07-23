"use client";

import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function BodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <div className="md:px-4">
      {path !== "/login" && path !== "/signup" && <Navbar />}
      {children}
    </div>
  );
}
