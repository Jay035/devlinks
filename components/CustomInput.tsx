import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  value: string | undefined;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur?: () => void;
  iconSrc: string;
  type: string;
  id: string;
  altText: string;
  placeholder: string;
  label: string;
  inputName?: string;
};

export function CustomInput({
  value,
  onchange,
  onInputBlur,
  label,
  iconSrc,
  altText,
  type,
  id,
  placeholder,
  inputName,
}: Props) {
  const path = usePathname();
  return (
    <section className="flex flex-col gap-1">
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
      <div className="border border-[#D9D9D9] py-3 px-4 rounded-lg flex gap-3 items-center cursor-pointer hover:border hover:border-purple focus-within:border focus-within:border-purple">
        <Image
          src={iconSrc}
          width="0"
          height="0"
          className={`w-fit ${path !== "/" && "hidden"}`}
          alt={altText}
        />
        <input
          name={inputName}
          value={value}
          onChange={onchange}
          onBlur={onInputBlur}
          id={id}
          type={type}
          className="p-0 border-none outline-none w-full bg-transparent cursor-pointer "
          placeholder={placeholder}
          required
        />
      </div>
    </section>
  );
}
