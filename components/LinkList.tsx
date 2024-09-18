import { useGlobalProvider } from "@/context/GlobalProvider";
import LinkItem from "./LinkItem";
import { Draggable } from "react-beautiful-dnd";

const LinkList = () => {
  const { profileData } = useGlobalProvider();

  return (
    <div className="mb-6 max-h-[80vh] lg:max-h-[40vh] mt-6 overflow-scroll">
      {profileData?.links &&
        profileData?.links.map((item, index) => (
          // <Draggable key={index} draggableId={item?.id!} index={index}>
          //   {(provided) => (
          <div
            key={index}
            className=""
            // ref={provided.innerRef}
            // {...provided.draggableProps}
          >
            <LinkItem key={index} index={index} item={item} />
          </div>
          //   )}
          // </Draggable>
        ))}
    </div>
  );
};

export default LinkList;
