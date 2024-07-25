import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import { CustomInput } from "./CustomInput";
import Image from "next/image";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { LinkPlatformProps, LinksProps } from "@/types";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  item: LinksProps;
  index: number;
};

export default function LinkItem({ item, index }: Props) {
  const { profileData, LinkPlatforms, addLink, updateLink, removeLink } =
    useGlobalProvider();

  const [selectedLinkPlatform, setSelectedLinkPlatform] =
    useState<LinkPlatformProps>(item.platform);
    const [link, setLink] = useState(item.link)

  // const onOptionClick = (value: LinkPlatformProps) => {
  //   setSelectedLinkPlatform(value);
  //   addLink?.();
  //   console.log(profileData);
  // };

  const handlePlatformUpdate = (option: LinkPlatformProps) => {
    setSelectedLinkPlatform(option);
    const newLink = {
      ...item,
      platform: option,
    };

    updateLink?.(newLink, 'platform');
  };

  const handleLinkUpdate = (value: string) => {
    const newLink = {
      ...item,
      link: value,
    };
    console.log(newLink);

    updateLink?.(newLink, "link");
  };

  return (
    <Draggable draggableId={item?.id!} index={index}>
      {(provided) => (
        <section
          key={item.link}
          className="bg-[#fafafa] p-5 flex flex-col gap-3 mb-6"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-between text-grey gap-4 items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/drag.svg"
                width="0"
                height="0"
                className="w-fit"
                alt="logo"
              />
              <h1 className="font-bold">Link #{index + 1}</h1>
            </div>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (item.id) removeLink?.(item?.id);
              }}
            >
              Remove
            </span>
          </div>
          <div className="">
            <p className="mb-1 text-xs text-dark-grey">Platform</p>
            <CustomSelect
              options={LinkPlatforms!}
              header={selectedLinkPlatform?.name}
              headerIcon={selectedLinkPlatform?.icon}
              onOptionClick={handlePlatformUpdate}
            />
          </div>
          <CustomInput
            error=""
            value={item?.link}
            placeholder="https://www.github.com/benwright"
            label="Link"
            id={`${selectedLinkPlatform?.name} link`}
            type="website"
            onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleLinkUpdate(e.target.value);
              // setLink(e.target.value)
              // console.log(profileData);
            }}
            iconSrc="/icons/link.svg"
            altText="link icon"
          />
        </section>
      )}
    </Draggable>
  );
}
