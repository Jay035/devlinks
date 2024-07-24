import { useGlobalProvider } from "@/context/GlobalProvider";
import LinkItem from "./LinkItem";

const LinkList = () => {
  const { profileData } = useGlobalProvider();

  return (
    <div className="mb-6 max-h-[80vh] lg:max-h-[60vh] mt-6 overflow-scroll">
      {profileData?.links &&
        profileData?.links.map((item, index) => (
          <LinkItem key={index} index={index} item={item} />
        ))}
    </div>
  );
};

export default LinkList;
