import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import { useGlobalProvider } from "@/context/GlobalProvider";
import Image from "next/image";
import { CustomInput } from "./CustomInput";
import { useLinksContext } from "@/context/LinksContextProvider";
import { LinkPlatformProps, LinksProps } from "@/types";

type Props = {
  linkId: number;
  initialState: LinksProps;
  // onInputChange: (link: string, platform: LinkPlatformProps) => void;
};

export function LinkForm() {
  const {
    LinkPlatforms,
    newLink,
    setNewLink,
    linksCart,
    selectedLinkPlatform,
    setSelectedLinkPlatform,
  } = useGlobalProvider();
  // const platformsNotAdded= LinkPlatforms?.filter(platform => link)
  const [link, setLink] = useState(newLink);
  const [githubLink, setGithubLink] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
  // const [selectedLinkPlatform, setSelectedLinkPlatform] =
  //   useState<LinkPlatformProps>({
  //     icon: "/icons/github.svg",
  //     name: "GitHub",
  //   });

  const [formComplete, setFormComplete] = useState(false);

  const onOptionClick = (value: LinkPlatformProps) => {
    setSelectedLinkPlatform?.(value);
    // if (link !== "" && selectedLinkPlatform) {
    //   addNewLink?.(link, selectedLinkPlatform);
    //   setLink("");
    //   setSelectedLinkPlatform({
    //     icon: "/icons/github.svg",
    //     name: "GitHub",
    //   });
    // }
    console.log(linksCart);
  };

  // const { userLinks, dispatch} = useLinksContext()
  // const [url, setUrl] = useState(initialState);
  const inputRef = useRef();
  const emptyMessageRef = useRef();
  const invalidUrlMessageRef = useRef();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleBlur = (e: any) => {
    const isEmpty = e.target.validity.valueMissing;
    // const isValidLink = isValidUrl(url);

    // if(isEmpty) {
    //     emptyMessageRef?.current.style.display = 'flex';
    //     inputRef.current.style.border = '1px solid #FF3939';
    //     inputRef.current.style.color = '#FF3939'
    // }
    // else if(!isValidLink) {
    //     e.target.setCustomValidity(' ');
    //     invalidUrlMessageRef.current.style.display = 'flex';
    //     inputRef.current.style.border = '1px solid #FF3939';
    //     inputRef.current.style.color = '#FF3939';
    // }
    // dispatch({type: 'update link', linkId, link: url})
  };

  return (
    <form className="bg-[#fafafa] p-5 flex flex-col gap-3">
      <div className="flex justify-between text-grey gap-4 items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/drag.svg"
            width="0"
            height="0"
            className="w-fit"
            alt="logo"
          />
          <h1 className="font-bold">Link #</h1>
        </div>
        <span className="cursor-pointer">Remove</span>
      </div>
      <div className="">
        <p className="mb-1 text-xs text-dark-grey">Platform</p>
        <CustomSelect
          options={LinkPlatforms!}
          header={selectedLinkPlatform?.name!}
          headerIcon={selectedLinkPlatform?.icon}
          onOptionClick={onOptionClick}
        />
      </div>
      <CustomInput
        value={newLink}
        placeholder="https://www.github.com/benwright"
        label="Link"
        id={`${selectedLinkPlatform?.name} link`}
        type="website"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewLink?.(e.target.value);
        }}
        // onInputBlur={() => {
        //   if (link !== "" && selectedLinkPlatform) {
        //     addNewLink?.(link!, selectedLinkPlatform);
        //     setLink("")
        //   }
        //   console.log(linksCart);
        // }}
        iconSrc="/icons/link.svg"
        altText="link icon"
      />
    </form>
  );
}
