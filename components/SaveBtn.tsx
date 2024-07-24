import { useGlobalProvider } from "@/context/GlobalProvider";
import { SaveBtnProps } from "@/types";

export function SaveBtn({ condition }: SaveBtnProps) {
  
  return (
    <button
      // onClick={() => console.log(linkPresent)}
      disabled={!condition}
      className="rounded-lg cursor-pointer text-white font-semibold w-full sm:flex sm:w-fit ml-auto py-[0.69rem] px-[1.69rem] bg-purple disabled:opacity-25"
    >
      Save
    </button>
  );
}
