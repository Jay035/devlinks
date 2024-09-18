import { CustomInput } from "@/components/CustomInput";
import { SaveBtn } from "@/components/SaveBtn";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { useState } from "react";

type Props = {};

export default function Details({}: Props) {
  const { profileData, updateProfileData, saveProfile } = useGlobalProvider();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleProfileUpdate = (value: string, id: string) => {
    const updatedDetails = {
      ...profileData,
      [id]: value,
    };

    updateProfileData?.(updatedDetails);
    console.log(updatedDetails);
  };

  const condition = firstName !== "" && lastName !== "";

  return (
    <div className="rounded-xl flex gap-3 flex-col my-6 p-5 bg-[#FAFAFA] text-dark-grey">
      <CustomInput
        error={error.firstName}
        value={firstName}
        placeholder="e.g. Ben"
        label="First name*"
        id="firstName"
        type="text"
        inputName="firstName"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(e.target.value);
          handleProfileUpdate(firstName, e.target.name);
        }}
        iconSrc=""
        altText=""
      />
      <CustomInput
        error={error.lastName}
        value={lastName}
        placeholder="e.g. Wright"
        label="Last name*"
        id="lastName"
        type="text"
        inputName="lastName"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLastName(e.target.value);
          handleProfileUpdate(lastName, e.target.name);
        }}
        iconSrc=""
        altText=""
      />
      <CustomInput
        error={error.email}
        value={email}
        placeholder="ben@example.com"
        label="Email"
        id="email"
        type="email"
        inputName="email"
        onchange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          handleProfileUpdate(email, e.target.name);
        }}
        iconSrc=""
        altText=""
      />

    </div>
  );
}
