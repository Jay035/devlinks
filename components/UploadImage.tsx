import React, { useState } from "react";

import { useGlobalProvider } from "@/context/GlobalProvider";
import Image from "next/image";
import { getImageURL } from "@/utils/getImageURL";

export const UploadImage = () => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    profileData,
    setAvatar,
    errors: { imageError },
  } = useGlobalProvider();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    setAvatar?.(e.dataTransfer.files);
    console.log(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar?.(e.target.files);
    console.log(e.target.files);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      //   className="group dragdrop-container-layout dragdrop-container-styles"
      className={` ${
        imageError ? "border-red-500" : ""
      } group w-[193px] cursor-pointer h-[193px] rounded-xl px-2 lg:px-9 flex flex-col gap-2 text-purple font-semibold justify-center items-center bg-light-purple `}
      style={{
        backgroundImage: profileData.avatar
          ? `url(${getImageURL(profileData.avatar)})`
          : "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: dragging ? "1px solid purple" : "",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        accept=".jpeg, .jpg, .png"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      <div
        className={` flex flex-col gap-2 text-center text-purple font-semibold justify-center items-center   ${
          profileData.avatar ? "opacity-0" : "opacity-1"
        } `}
      >
        <Image
          src="/icons/upload_.svg"
          width="0"
          height="0"
          className="w-fit mx-auto"
          alt="upload"
        />
        <p className="">+ Upload Image</p>
      </div>

      {dragging && (
        <div
          className="dragdrop-element"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
};
