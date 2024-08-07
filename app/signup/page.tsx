"use client";

import React, { useEffect, useState } from "react";
import { Form } from "./Form";
import Image from "next/image";
import Link from "next/link";
import { useReroute } from "@/utils/useReroute";
import { auth } from "@/config/Config";

type Props = {};

export default function SignUp({}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
        setIsAuthenticated(true);
    }
  }, []);

  useReroute("/", isAuthenticated);

  return (
    <main className="my-16 bg-[#FAFAFA] md:flex flex-col md:my-0 justify-center items-center md:min-h-screen">
      <div className="px-8 md:bg-white max-w-[476px] mx-auto md:py-10 md:px-10">
        <Link href="/">
          <Image
            src="/icons/logo-group.svg"
            width="0"
            height="0"
            className="w-fit mb-16 md:mx-auto"
            alt="logo"
          />
        </Link>

        <Form />
      </div>
    </main>
  );
}
