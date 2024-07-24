import { Action, State } from "@/types";

export default function linksReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_LINK":
      return { ...state, userLinks: [...state.userLinks, action.payload] };
    case "REMOVE_LINK":
      return {
        ...state,
        userLinks: state.userLinks.filter((link) => link.id !== action.payload),
      };
    default:
      return state;
  }
  // case "initialize links":
  //   const links = [...action.links];
  //   links.sort((linkOne, linkTwo) => {
  //     if (linkOne.order > linkTwo.order) return 1;
  //     else if (linkOne.order < linkTwo.order) return -1;
  //     else return 0;
  //   });
  //   return [...action.links];

  // case "add link":
  //   return [...usersLinks, action.link];

  // case "remove link":
  //   return usersLinks.filter((link: any) => {
  //     return link.id === action.linkId ? false : true;
  //   });

  // case "update link":
  //   const linkId = action.linkId;
  //   const newPlatform = action.platform;
  //   const newLink = action.link;

  //   return usersLinks.map((link: any) => {
  //     if (link.id === linkId)
  //       return newPlatform
  //         ? { ...link, platform: newPlatform }
  //         : { ...link, link: newLink };
  //     else return link;
  //   });

  // case "re-order links":
  //   const hoverLinkIndex: any = action.indices.hoverLink;
  //   const dropLinkIndex: any = action.indices.dropLink;
  //   const linksCopy: any = [...usersLinks];
  //   let temp = linksCopy[hoverLinkIndex]?.order;
  //   linksCopy[hoverLinkIndex].order = linksCopy[dropLinkIndex].order;
  //   linksCopy[dropLinkIndex].order = temp;
  //   linksCopy.sort((linkOne: any, linkTwo: any) => {
  //     if (linkOne.order > linkTwo.order) return 1;
  //     else if (linkOne.order < linkTwo.order) return -1;
  //     else return 0;
  //   });
  //   return linksCopy;
}
