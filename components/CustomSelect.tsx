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
    console.log(value, header);
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
    <div
      className="custom-dropdown"
      onClick={() => {
        setDropdownOpen((prevState) => !prevState);
      }}
      ref={dropdownRef}
    >
      <div className={`dropdown-header flex items-center gap-1 `} id="">
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
              className="custom-option last:border-b-0 py-2 text-grey"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
