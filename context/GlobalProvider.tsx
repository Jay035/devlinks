"use client";

// HOOKS
import {
  ReactNode,
  useState,
  useContext,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// COMPONENTS
import { auth, db, provider } from "@/config/Config";
import linksReducer from "../reducers/linksReducers";
import {
  ErrorProps,
  GlobalProps,
  LinkPlatformProps,
  LinksProps,
  ProfileProps,
} from "@/types";
import { addDoc, collection } from "firebase/firestore";

export const GlobalContext = createContext<GlobalProps>({
  user: {
    displayName: "",
    email: "",
  },
  // name: "",
  isUserLoggedIn: false,
  loading: false,
  profileData: {
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    links: [],
  },
  errors: {
    linkError: {
      "0": "",
    },
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    imageError: "",
    passwordError: "",
  },
});

type Props = {
  children: ReactNode;
};

export function GlobalProvider({ children }: Props) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("");
  const [uid, setUid] = useState(""); //the user's account id
  const [openLoginMessage, setOpenLoginMessage] = useState(false); //a dialog box that appears that will give the user a message
  const [openSaveChangesMessage, setOpenSaveChangesMessage] = useState(false);
  const [openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage] =
    useState(false);

  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>({
      icon: "/icons/github.svg",
      name: "GitHub",
    });
  const [linksCart, setLinksCart] = useState<LinksProps[]>([]);
  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  const [inputLinks, setInputLinks] = useState({
    gitHubLink: "",
    youTubeLink: "",
    devToLink: "",
    twitterLink: "",
  });

  const LinkPlatforms = [
    {
      icon: "/icons/github.svg",
      name: "GitHub",
    },
    {
      icon: "/icons/youtube.svg",
      name: "YouTube",
    },
    {
      icon: "/icons/frontend-mentor.svg",
      name: "Frontend Mentor",
    },
    {
      icon: "/icons/twitter.svg",
      name: "Twitter",
    },
    {
      icon: "/icons/linkedin.svg",
      name: "LinkedIn",
    },
    {
      icon: "/icons/facebook.svg",
      name: "Facebook",
    },
    {
      icon: "/icons/twitch.svg",
      name: "Twitch",
    },
    {
      icon: "/icons/devto.svg",
      name: "Dev.to",
    },
    {
      icon: "/icons/codewars.svg",
      name: "Codewars",
    },
    {
      icon: "/icons/codepen.svg",
      name: "Codepen",
    },
    {
      icon: "/icons/freecodecamp.svg",
      name: "FreeCodeCamp",
    },
    {
      icon: "/icons/gitlab.svg",
      name: "GitLab",
    },
    {
      icon: "/icons/hashnode.svg",
      name: "Hashnode",
    },
    {
      icon: "/icons/stackoverflow.svg",
      name: "Stack Overflow",
    },
  ];

  const [profileData, setProfileData] = useState<ProfileProps>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    links: [],
  });

  const [errors, setErrors] = useState<ErrorProps>({
    linkError: {
      "0": "",
    },
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    imageError: "",
    passwordError: "",
  });

  const [isDataInArray] = useState(profileData?.links?.length > 0);

  const addLink = (link: LinksProps) => {
    // const newLink: LinksProps = {
    //   id: `${profileData?.links ? profileData.links.length + 1 : "1"}`,
    //   platform: {
    //     icon: "/icons/github.svg",
    //     name: "GitHub",
    //   },
    //   link: "",
    // };

    // let temp: LinksProps[] = []
    //     const hasDuplicate = profileData.links.every((link: LinksProps) => {
    //         if(!temp.includes(link.link)){
    //             temp.push(link.platform)
    //             return true;
    //         }
    //         else
    //             return false

    //     })
    //     if(!hasDuplicate){
    //         alert('You cannot have duplicate platform links');
    //         return;
    //     }

    // const hasLinkBeenAdded = profileData.links?.find(
    //   (item: LinksProps) => item?.id === link.id
    // );
    // console.log(hasLinkBeenAdded);

    const updatedLinks =
      profileData.links?.length === 0 ? [link] : [...profileData.links, link];

    setProfileData((prev: any) => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  const updateLink = (
    updatedlink: LinksProps,
    label: string,
    index: string
  ) => {
    console.log(updatedlink);
    if (updatedlink) {
      setProfileData((prevState: any) => ({
        ...prevState,
        links: prevState.links.map((link: LinksProps) =>
          link.id === index ? { ...link, link: updatedlink } : link
        ),
      }));
      console.log(profileData)
    }
  };

  const updateProfileData = (updatedProfileDetails: ProfileProps) => {
    setProfileData(updatedProfileDetails);
  };

  const reorderLinks = (
    links: LinksProps[],
    startIdx: number,
    endIdx: number
  ) => {
    const result = Array.from(links);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);

    setProfileData({
      ...profileData,
      links: result,
    });
  };

  const removeLink = (id: string) => {
    const newLinks = profileData.links.filter((link) => link.id != id);

    setProfileData({
      ...profileData,
      links: newLinks,
    });
  };

  const setAvatar = async (images: FileList | null) => {
    if (!images?.length) {
      setErrors((prev) => ({
        ...prev,
        imageError: "No image found.",
      }));
      return;
    }

    const avatar = images[0];

    if (avatar.size > 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        imageError: "Incorrect Image Size (Max: 1MB)",
      }));

      return;
    } else if (!avatar.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        imageError: "Please select an image file.",
      }));

      return;
    }

    setProfileData((prev: any) => ({
      ...prev,
      avatar: avatar,
    }));
    setErrors((prev) => ({
      ...prev,
      imageError: "",
    }));

    console.log("Image Uploaded Successfully");
  };

  const [linksSaved, setLinksSaved] = useState(false);
  const linksRef = collection(db, "profileData");

  const saveProfile = async () => {
    console.log(linksRef);

    try {
      console.log(`saving profile....`);
      await addDoc(linksRef, {
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        links: profileData.links,
        uid: auth?.currentUser?.uid,
      });
      setLinksSaved(true);
      // re-route to blog page
      setTimeout(() => {
        setLinksSaved(false);
        // router.push("/blog");
      }, 1000);
      console.log(`saved`);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // AUTHENTCATION
  const [isUserLoggedIn, setIsUserLoggedIn]: any = useState(false);
  const [user, setUser]: any = useState(auth?.currentUser);
  const [loading, setLoading] = useState(true);

  //  user logout
  const logOut = async () => {
    await signOut(auth);
    setIsUserLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    console.log("authenticating")
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
        // User is signed in.
        router.push("/");
        console.log(user);
      } else {
        // User is not signed in.
        setLoading(false)
        router.push("/login");
      }
    });
  }, []);

  const value = {
    user,
    isUserLoggedIn,
    logOut,
    loading,
    setLoading,
    setUser,
    linksCart,

    errors,
    profileData,
    isDataInArray,
    setAvatar,
    addLink,
    removeLink,
    updateLink,
    updateProfileData,
    LinkPlatforms,
    selectedLinkPlatform,
    setSelectedLinkPlatform,
    reorderLinks,
    inputLinks,

    linksSaved,
    saveProfile,

    uid,
    setUid,
    openLoginMessage,
    openCopiedToClipboardMessage,
    openSaveChangesMessage,
    setOpenCopiedToClipboardMessage,
    setOpenLoginMessage,
    setOpenSaveChangesMessage,
  };

  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}

export const useGlobalProvider = () => useContext(GlobalContext);
