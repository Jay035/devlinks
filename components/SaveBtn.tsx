
export function SaveBtn({ linkPresent }: SaveBtnProps) {
  return (
    <button
      // onClick={() => console.log(linkPresent)}
      disabled={!linkPresent}
      className="rounded-lg text-white font-semibold border-t border-[#D9D9D9] m-4 sm:mt-[2.56rem] w-full flex sm:w-fit ml-auto py-[0.69rem] px-[1.69rem] bg-purple disabled:opacity-25"
    >
      Save
    </button>
  );
}
