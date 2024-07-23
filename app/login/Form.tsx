import { CustomInput } from "@/components/CustomInput";
import { auth } from "@/config/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

export function Form({}: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: any) => {
    e.preventDefault();
    console.log("logging in....");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading((prevState) => !prevState);
      console.log("successfully signed in");
      console.log(auth.currentUser);

      router.push("/");
    } catch (err: any) {
      setLoading((prevState) => !prevState);
      console.log(err.code);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        case "auth/user-not-found":
          setError("No account with that email was found");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/network-request-failed":
          setError("Network request failed, check your network connection");
          break;
        case "auth/operation-not-allowed":
          setError("operation not allowed");
          break;
        default:
          setError("Incorrect email or password");
          break;
      }
    }
  };

  return (
    <form
      onSubmit={login}
      className="text-dark-grey flex justify-center flex-col"
    >
      <div className="">
        <h1 className="text-2xl leading-[36px] font-bold mb-2">Login</h1>
        <p className="text-grey">
          Add your details below to get back into the app
        </p>
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
          disabled={email === "" || password === ""}
          className="bg-purple disabled:bg-purple/70 px-[27px] py-[11px] text-white rounded-lg"
          type="submit"
        >
          {loading ? <span className="animate-pulse">Logging in...</span> : "Login"}
        </button>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purple ml-1">
           Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
