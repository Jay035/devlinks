"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function CustomSelect({
  options,
  header,
  headerIcon,
  setHeader,
}: SelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: any) => {
    setHeader(value);
    setDropdownOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="p-[0.07rem] w-full bg-gradient-to-b from-[#51525C] to-[#414149] rounded-[0.625rem]">
      <div
        className="custom-dropdown"
        onClick={() => {
          setDropdownOpen((prevState) => !prevState);
        }}
        ref={dropdownRef}
      >
        <div
          className={`dropdown-header flex items-center gap-1 ${
            header === "Select router exchange" && "text-[#A0A0AB]"
          }`}
          id=""
        >
          {headerIcon && (
            <Image
              width="0"
              height="0"
              className="w-fit"
              src={headerIcon}
              alt={`${header} icon`}
            />
          )}
          <p className="truncate">{header}</p>
        </div>
        {dropdownOpen && (
          <div className="dropdown-options flex flex-col gap-2">
            {options?.map((option: LinkPlatformProps, index: number) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionClick(option.name);
                  setDropdownOpen((prevState) => !prevState);
                }}
                className="custom-option last:border-b-0 bg-[#3F3F46] py-2 tracking-[-0.00875rem] text-[0.875rem] text-[#A0A0AB]"
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
