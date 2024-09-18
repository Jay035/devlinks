"use client";

import { GetStarted } from "@/components/GetStarted";
import LinkList from "@/components/LinkList";
import Loader from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import PhonePlaceholder from "@/components/PhonePlaceholder";
import { SaveBtn } from "@/components/SaveBtn";
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
  const { loading } = useGlobalProvider();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsAuthenticated(true);
    }
  }, []);

  useReroute("/login", !isAuthenticated);

  return loading ? (
    <Loader />
  ) : (
    <div className="md:px-4 scroll-smooth">
      {path !== "/login" && path !== "/signup" && path !== "/preview" && (
        <Navbar />
      )}
      <div
        className={` ${
          path !== "/login" &&
          path !== "/signup" &&
          path !== "/preview" &&
          "lg:grid lg:grid-cols-[500px_auto] my-4"
        } `}
      >
        {path !== "/login" && path !== "/signup" && path !== "/preview" && (
          <PhonePlaceholder />
        )}
        <main className={`${path === "/" && "bg-white px-4"} h-full relative`}>
          {children}

          {path !== "/login" && path !== "/signup" && path !== "/preview" && (
            <div className="border-t border-[#D9D9D9] w-full m-4 sm:mt-[2.56rem] py-6 px-10">
              <SaveBtn />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
