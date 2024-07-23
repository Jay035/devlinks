import { CustomInput } from "@/components/CustomInput";
import { auth } from "@/config/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

export function Form({}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e: any) => {
    e.preventDefault();
    setLoading?.(true);
    try {
      if (password === confirmPassword) {
        setError("")
        await createUserWithEmailAndPassword(auth, email, password);
        setLoading?.((prevState: boolean) => !prevState);
        router.push("/");
      } else {
        setError("Confirm password doesn't match password");
      }
    } catch (err: any) {
      setLoading?.((prevState: boolean) => !prevState);
      console.error(err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/weak-password":
          setError("Weak pasword. Password should be at least 6 characters");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        case "auth/network-request-failed":
          setError("Network request failed, check your network connection");
          break;
        default:
          setError("Incorrect email or password");
          break;
      }
    }
  };

  return (
    <form
      onSubmit={register}
      className="text-dark-grey flex justify-center flex-col"
    >
      <div className="">
        <h1 className="text-2xl leading-[36px] font-bold mb-2">
          Create account
        </h1>
        <p className="text-grey">Let’s get you started sharing your links!</p>
      </div>
      <div className="grid gap-6 mt-10">
        {error && <p className="text-red-500">{error}</p>}
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
          placeholder="At least 8 characters"
          label="Create password"
          id="password"
          type="password"
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          iconSrc="/icons/lock-icon.svg"
          altText="lock icon"
        />
        <CustomInput
          value={confirmPassword}
          placeholder="At least 8 characters"
          label="Confirm password"
          id="confirm-password"
          type="password"
          onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          iconSrc="/icons/lock-icon.svg"
          altText="lock icon"
        />
        <p className="text-grey">Password must contain at least 8 characters</p>
        <button
          disabled={email === "" || password === ""}
          className="bg-purple disabled:bg-purple/70 px-[27px] py-[11px] text-white rounded-lg"
          type="submit"
        >
          {loading && !error ? (
            <span className="animate-pulse">...</span>
          ) : (
            "Create new account"
          )}
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-purple ml-1">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
