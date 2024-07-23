"use client";

// HOOKS
import {
  ReactNode,
  useState,
  useContext,
  useEffect,
  createContext,
} from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// COMPONENTS
import { auth, provider } from "@/config/Config";

export const GlobalContext = createContext<GlobalProps>({
  user: {
    displayName: "",
    email: "",
  },
  // name: "",
  error: "",
  isUserLoggedIn: false,
  loading: false,
});

type Props = {
  children: ReactNode;
};

export function GlobalProvider({ children }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedLinkPlatform, setSelectedLinkPlatform] = useState<LinkPlatformProps>({
    name: "GitHub",
    icon: "/icons/github.svg",
  });
  const [userLinks, setUserLinks] = useState<LinksProps[]>([]);

  const LinkPlatforms = [
    {
      icon: "/icons/github.svg",
      platform: "GitHub",
    },
    {
      icon: "/icons/youtube.svg",
      platform: "YouTube",
    },
    {
      icon: "/icons/frontend-mentor.svg",
      platform: "Frontend Mentor",
    },
    {
      icon: "/icons/twitter.svg",
      platform: "Twitter",
    },
    {
      icon: "/icons/linkedin.svg",
      platform: "LinkedIn",
    },
    {
      icon: "/icons/facebook.svg",
      platform: "Facebook",
    },
    {
      icon: "/icons/twitch.svg",
      platform: "Twitch",
    },
    {
      icon: "/icons/devto.svg",
      platform: "Dev.to",
    },
    {
      icon: "/icons/codewars.svg",
      platform: "Codewars",
    },
    {
      icon: "/icons/codepen.svg",
      platform: "Codepen",
    },
    {
      icon: "/icons/freecodecamp.svg",
      platform: "FreeCodeCamp",
    },
    {
      icon: "/icons/gitlab.svg",
      platform: "GitLab",
    },
    {
      icon: "/icons/hashnode.svg",
      platform: "Hashnode",
    },
    {
      icon: "/icons/stackoverflow.svg",
      platform: "Stack Overflow",
    },
  ];

  const addLink = ({ id, bgColor, icon, link, platform }: LinksProps) => {
    const newLink: LinksProps = { id, bgColor, icon, link, platform };
    setUserLinks([...userLinks, newLink]);
  };

  const deleteLink = (id: number) => {
    setUserLinks(userLinks.filter((link) => link.id !== id));
  };

  // AUTHENTCATION
  const [isUserLoggedIn, setIsUserLoggedIn]: any = useState(false);
  const [user, setUser]: any = useState(auth?.currentUser);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    console.log("signing in with google....");
    try {
      await signInWithPopup(auth, provider);
      setIsUserLoggedIn(true);
      setUser(auth?.currentUser);
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
      setIsUserLoggedIn(false);
    }
  };

  //  user logout
  const logOut = async () => {
    await signOut(auth);
    setIsUserLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        setIsUserLoggedIn(true);
      } else {
        // User is not signed in.
        setIsUserLoggedIn(false);
      }
    });
  }, []);

  const value = {
    user,
    isUserLoggedIn,
    logOut,
    signInWithGoogle,
    error,
    loading,
    setLoading,
    setError,
    setUser,
    userLinks,
    addLink,
    deleteLink,
    LinkPlatforms,
    selectedLinkPlatform,
    setSelectedLinkPlatform,
  };

  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}

export const useGlobalProvider = () => useContext(GlobalContext);
