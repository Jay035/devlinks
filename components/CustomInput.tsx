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
  error?: string;
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
  error,
}: Props) {
  const path = usePathname();
  return (
    <section className="flex flex-col gap-1">
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
      <div
        className={` ${
          error !== "" ? "border-[#FF3939]" : "border-[#D9D9D9]"
        } border  py-3 px-4 rounded-lg flex gap-3 items-center cursor-pointer hover:border hover:border-purple focus-within:border focus-within:border-purple`}
      >
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
          autoComplete="off"
          id={id}
          type={type}
          className={`p-0 border-none outline-none w-full bg-transparent cursor-pointer `}
          placeholder={placeholder}
          required
        />
        {error && <span className="text-[#FF3939] text-xs">{error}</span>}
      </div>
    </section>
  );
}
