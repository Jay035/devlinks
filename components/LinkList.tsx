import { useGlobalProvider } from "@/context/GlobalProvider";
import { useState } from "react";
import { LinkForm } from "./LinkForm";
import Image from "next/image";
import CustomSelect from "./CustomSelect";
import { CustomInput } from "./CustomInput";
import LinkItem from "./LinkItem";

const LinkList = () => {
  const { profileData } = useGlobalProvider();

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    setIsEditing(false);
  };

  return (
    <div className="mb-6 max-h-[60vh] mt-6 overflow-scroll">
      {profileData?.links &&
        profileData?.links.map((item, index) => <LinkItem key={index} index={index} item={item} />)}
    </div>
  );
};

export default LinkList;
