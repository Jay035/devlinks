import { ProfileDetails } from "./components/ProfileDetails";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="relative h-full w-full">
      <div className="bg-purple hidden md:block rounded-bl-[32px] absolute top-0 -z-10 rounded-b-[32px] h-[357px] w-full"></div>
      <section className="flex bg-white mt-4 justify-between font-semibold">
        <button className="border min-w-[159px] text-purple border-purple py-[11px] px-[27px] rounded-lg">
          Back to Editor
        </button>
        <button className="bg-purple min-w-[159px] py-[11px] px-[27px] rounded-lg text-white">
          Share Link
        </button>
      </section>
      <ProfileDetails />
    </div>
  );
}
