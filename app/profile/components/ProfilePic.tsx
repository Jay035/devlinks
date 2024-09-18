import React from "react";
import { UploadImage } from "../../../components/UploadImage";
import { useGlobalProvider } from "@/context/GlobalProvider";

type Props = {};

export default function ProfilePic({}: Props) {
  const {
    errors: { imageError },
  } = useGlobalProvider();
  return (
    <section className="grid sm:grid-cols-2 sm:items-center lg:items-start lg:grid-cols-1 w-full text-grey p-5 bg-[#FAFAFA] rounded-xl">
      <h2 className="w-fit">Profile picture</h2>
      <div className="flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start gap-6 mt-4 xl:mt-0">
        <div className="">
          {imageError && (
            <span className="text-[#FF3939] text-center"> {imageError}</span>
          )}
          <UploadImage />
        </div>
        <p className="xl:w-[127px] text-xs">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </p>
      </div>
    </section>
  );
}
