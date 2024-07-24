import React from "react";
import { Form } from "./components/Form";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="my-4 mx-4 p-6 sm:px-16 bg-white">
      <section>
        <h1 className="text-dark-grey text-2xl font-bold">Profile Details</h1>
        <p className="text-grey mt-2 mb-10">
          Add your details to create a personal touch to your profile.
        </p>
      </section>
      <Form />
    </main>
  );
}
