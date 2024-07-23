import React from "react";
import CustomSelect from "./CustomSelect";
import { useGlobalProvider } from "@/context/GlobalProvider";


export function LinkContainer() {
  const { LinkPlatforms, selectedLinkPlatform, setSelectedLinkPlatform } = useGlobalProvider();
  
  return (
    <section className="bg-[#fafafa] p-5 flex flex-col gap-3">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">

        <h1>Link #</h1>
        </div>
        <span>Remove</span>
      </div>
      <div className="">
        <p>Platform</p>
        <CustomSelect options={LinkPlatforms!} header={selectedLinkPlatform?.name!} setHeader={setSelectedLinkPlatform!} />
      </div>
    </section>
  );
}
