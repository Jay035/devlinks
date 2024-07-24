"use client";

import { GetStarted } from "@/components/GetStarted";
import { LinkForm } from "@/components/LinkForm";
import { SaveBtn } from "@/components/SaveBtn";
import { useGlobalProvider } from "@/context/GlobalProvider";
import { useState } from "react";
import LinkList from "@/components/LinkList";
import { LinksProps } from "@/types";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

export default function Home() {
  const { profileData, addLink, reorderLinks } = useGlobalProvider();
  const [newLinks, setNewLinks] = useState<LinksProps[]>([]);

  const [dataInArray, setDataInArray] = useState<boolean>(false);

  const handleAddLink = () => {
    addLink?.();
    if (profileData.links.length > 0) setDataInArray(true);
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

  return (
    <main className=" p-6 sm:px-16 bg-white mx-4 h-full">
      <section>
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
                  className="w-full h-full flex flex-col gap-5"
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
