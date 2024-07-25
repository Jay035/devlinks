"use client";

import { GetStarted } from "@/components/GetStarted";
import { SaveBtn } from "@/components/SaveBtn";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";
import LinkList from "@/components/LinkList";
import { LinksProps } from "@/types";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { auth } from "@/config/Config";
import { useReroute } from "@/utils/useReroute";

export default function Home() {
  const { profileData, addLink, reorderLinks } = useGlobalProvider();

  const [dataInArray, setDataInArray] = useState<boolean>(false);

  const handleAddLink = () => {
    const newLink: LinksProps = {
      id: `${profileData?.links ? profileData.links.length + 1 : "1"}`,
      platform: {
        icon: "/icons/github.svg",
        name: "GitHub",
      },
      link: "",
    };
    addLink?.(newLink);
    if (profileData?.links.length > 0) setDataInArray(true);
  };

  // const links = [
  //   {
  //     id: 1,
  //     platform: "GitHub",
  //     bgColor: "",
  //     icon: "",
  //     link: "",
  //   },
  //   {
  //     id: 2,
  //     platform: "YouTube",
  //     bgColor: "",
  //     icon: "",
  //     link: "",
  //   },
  // ];

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) {
      return;
    }

    reorderLinks?.(
      profileData?.links,
      result.source.index,
      result.destination.index
    );
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 500);
    }
  }, []);

  useReroute("/", isAuthenticated);

  return (
    <main className=" bg-white mx-4 h-full">
      <section className=" p-6 sm:px-16">
        <h1 className="text-dark-grey text-2xl font-bold">
          Customize your links
        </h1>
        <p className="text-grey mt-2 mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          onClick={handleAddLink}
          disabled={profileData && profileData?.links?.length > 5}
          className="border text-purple border-purple font-semibold px-[1.69rem] py-[0.69rem] rounded-lg lg:rounded-xl text-center w-full"
        >
          + Add new link
        </button>
      </section>
      <section className="">
        {profileData && profileData?.links?.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided: any) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full h-full flex flex-col gap-5 p-6 sm:px-16"
                >
                  <LinkList />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <GetStarted />
        )}

        <div className="border-t border-[#D9D9D9] w-full m-4 sm:mt-[2.56rem] py-6 px-10">
          <SaveBtn condition={dataInArray} />
        </div>
      </section>
    </main>
  );
}
