"use client";

import { GetStarted } from "@/components/GetStarted";
import LinkList from "@/components/LinkList";
import { Navbar } from "@/components/Navbar";
import PhonePlaceholder from "@/components/PhonePlaceholder";
import { auth } from "@/config/Config";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { useReroute } from "@/utils/useReroute";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

export default function BodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  useReroute("/login", !isAuthenticated);

  return (
    <div className="md:px-4 scroll-smooth">
      {path !== "/login" && path !== "/signup" && <Navbar />}
      <div
        className={` ${
          path !== "/login" &&
          path !== "/signup" &&
          "lg:grid lg:grid-cols-[500px_auto] my-4"
        } `}
      >
        {path !== "/login" && path !== "/signup" && <PhonePlaceholder />}
        {children}
      </div>
    </div>
  );
}
