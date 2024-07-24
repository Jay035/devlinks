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
  const [error, setError] = useState({
    email: "",
    password: "",
    network: "",
    emailOrPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const register = async (e: any) => {
    e.preventDefault();
    setLoading?.(true);
    try {
      if (password.length > 6 && password.length < 8) {
        setError((prev: any) => ({
          ...prev,
          password: "Please check again",
        }));
      } else {
        setError((prev: any) => ({
          ...prev,
          password: "",
        }));
      }
      if (password === confirmPassword) {
        setError((prev: any) => ({
          ...prev,
          confirmPassword: "",
        }));
        await createUserWithEmailAndPassword(auth, email, password);
        setLoading?.((prevState: boolean) => !prevState);
        router.push("/");
      } else if(password.length > 6 ) {
        setError((prev: any) => ({
          ...prev,
          confirmPassword: "Confirm password doesn't match password",
        }));
      }
    } catch (err: any) {
      setLoading?.((prevState: boolean) => !prevState);
      console.error(err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError((prev: any) => ({
            ...prev,
            email: "Email already in use",
          }));
          break;
        case "auth/weak-password":
          setError((prev: any) => ({
            ...prev,
            password: "Weak pasword",
          }));
          // setError("Weak pasword. Password should be at least 6 characters");
          break;
        case "auth/invalid-email":
          setError((prev: any) => ({
            ...prev,
            email: "Invalid email",
          }));
          break;
        case "auth/network-request-failed":
          setError((prev: any) => ({
            ...prev,
            network: "Network request failed, check your network connection",
          }));
          break;
        default:
          setError((prev: any) => ({
            ...prev,
            emailOrPassword: "Incorrect email or password",
          }));
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
        {error.network && <p className="text-red-500">{error.network}</p>}
        {error.emailOrPassword && (
          <p className="text-red-500">{error.emailOrPassword}</p>
        )}
        {error.confirmPassword && (
          <p className="text-red-500">{error.confirmPassword}</p>
        )}
        <CustomInput
          error={error.email}
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
          error={error.password}
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
        error=""
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
