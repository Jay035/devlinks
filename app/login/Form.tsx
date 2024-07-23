import { CustomInput } from "@/components/CustomInput";
import Link from "next/link";
import { useState } from "react";

type Props = {};

export function Form({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="text-dark-grey flex justify-center flex-col">
      <div className="">
        <h1 className="text-2xl leading-[36px] font-bold mb-2">Login</h1>
        <p className="text-grey">
          Add your details below to get back into the app
        </p>
      </div>
      <div className="grid gap-6 mt-10">
        <CustomInput
          value={email}
          placeholder="e.g. alex@email.com"
          label="Email address"
          id="email"
          type="email"
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          iconSrc="/icons/mail-icon.svg"
          altText="mail icon"
        />
        <CustomInput
          value={password}
          placeholder="Enter your password"
          label="Password"
          id="password"
          type="password"
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          iconSrc="/icons/lock-icon.svg"
          altText="lock icon"
        />
        <p className="text-grey">Password must contain at least 8 characters</p>
        <button
          className="bg-purple px-[27px] py-[11px] text-white rounded-lg"
          type="submit"
        >
          Login
        </button>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purple ml-1">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
