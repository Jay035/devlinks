"use client";

import Details from "./Details";
import ProfilePic from "./ProfilePic";

type Props = {};

export function Form({}: Props) {
  return (
    <form>
      <ProfilePic />
      <Details />
    </form>
  );
}
