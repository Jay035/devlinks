import React from "react";
import { UploadImage } from "../../../components/UploadImage";
import { useGlobalProvider } from "@/context/GlobalProvider";

type Props = {};

export default function ProfilePic({}: Props) {
  const {
    errors: { imageError },
  } = useGlobalProvider();
  return (
    <section className="md:grid grid-cols-2 items-center w-full text-grey p-5 bg-[#FAFAFA] rounded-xl">
      <h2>Profile picture</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4 md:mt-0">
        <div className="">
          {imageError && <span className="text-[#FF3939] text-center"> {imageError}</span>}
          <UploadImage />
        </div>
        <p className="md:w-[127px] text-xs">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </section>
  );
}
