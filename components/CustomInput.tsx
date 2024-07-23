import Image from "next/image";
import React from "react";

type Props = {
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSrc: string;
  type: string;
  id: string;
  altText: string
  placeholder: string
  label: string
};

export function CustomInput({ value, onchange, label, iconSrc, altText, type, id, placeholder }: Props) {
  return (
    <section className="flex flex-col gap-1">
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
      <div className="border border-[#D9D9D9] py-3 px-4 rounded-lg flex gap-3 items-center">
        <Image
          src={iconSrc}
          width="0"
          height="0"
          className="w-fit"
          alt={altText}
        />
        <input
          value={value}
          onChange={onchange}
          id={id}
          type={type}
          className="p-0 border-none outline-none w-full bg-transparent"
          placeholder={placeholder}
        />
      </div>
    </section>
  );
}
