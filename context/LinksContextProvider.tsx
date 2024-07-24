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
import { auth, provider } from "@/config/Config";
import linksReducer from "../reducers/linksReducers";
import { Action, LinkPlatformProps, LinksProps, State } from "@/types";

// Initial state
const initialState: State = {
  userLinks: [],
};

export const LinksContext = createContext<
  { userLinks: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export function LinksContextProvider({ children }: Props) {
  const [userLinks, dispatch] = useReducer(linksReducer, initialState); //usersLinks contains ALL of the user's links

  const [uid, setUid] = useState(""); //the user's account id
  const [openLoginMessage, setOpenLoginMessage] = useState(false); //a dialog box that appears that will give the user a message
  const [openSaveChangesMessage, setOpenSaveChangesMessage] = useState(false);
  const [openCopiedToClipboardMessage, setOpenCopiedToClipboardMessage] =
    useState(false);

  const [error, setError] = useState("");
  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>({
      icon: "/icons/github.svg",
      name: "GitHub",
    });
  const [linksCart, setLinksCart] = useState<LinksProps[]>([]);
  const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  const addNewLink = (link: string, platform: LinkPlatformProps) => {
    const newLink: LinksProps = { link, platform };
    setLinksCart([...linksCart, newLink]);
  };

  const deleteLink = (id: number) => {
    setLinksCart(linksCart.filter((link) => link.id !== id));
  };

  const saveAllLinks = () => {
    console.log(linksCart);
  };

  const value = {
    linksCart,
    addNewLink,
    deleteLink,
    selectedLinkPlatform,
    setSelectedLinkPlatform,

    uid,
    setUid,
    userLinks,
    dispatch,
    openLoginMessage,
    openCopiedToClipboardMessage,
    openSaveChangesMessage,
    setOpenCopiedToClipboardMessage,
    setOpenLoginMessage,
    setOpenSaveChangesMessage,
  };

  return (
    <>
      <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
    </>
  );
}

export const useLinksContext = () => useContext(LinksContext);
