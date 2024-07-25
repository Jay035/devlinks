import { LinkProps } from "next/link";

interface LinksProps {
  id?: string;
  platform: LinkPlatformProps;
  link: string;
}

interface LinkPlatformProps {
  name: string;
  icon: string;
}

interface SaveBtnProps {
  condition: boolean;
}

interface NavItemProps {
  id: number;
  text: string;
  icon: string;
  activeIcon: string;
  route: string;
}

interface SelectProps {
  header: string;
  headerIcon?: string;
  setHeader?: (x: LinkPlatformProps) => void;
  options: LinkPlatformProps[];
  onOptionClick: (value: LinkPlatformProps) => void;
}

interface SelectOptionProps {
  value: string;
  label: string;
  onSelect: (e: string) => void;
}

type Action =
  | { type: "ADD_LINK"; payload: LinksProps }
  | { type: "REMOVE_LINK"; payload: string };

interface State {
  userLinks: LinksProps[];
}

interface LinksContextProps {
  userLinks: LinksProps[];
  dispatch: React.Dispatch<Action>;
}

interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  links: LinksProps[];
}

interface ErrorProps {
  linkError: {
    "0": string;
  };
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  imageError: string;
  passwordError: string,
}

interface GlobalProps {
  user: {
    displayName: string;
    email: string;
  };
  isUserLoggedIn: boolean;
  loading: boolean;
  errors: ErrorProps;
  setLoading?: (x: boolean) => void;
  // updateErrors?: (err: ErrorProps) => void;

  newLink?: string;
  setNewLink?: (x: string) => void;
  selectedLinkPlatform?: LinkPlatformProps;
  setSelectedLinkPlatform?: (x: LinkPlatformProps) => void;
  profileData: ProfileProps;
  linksCart?: LinksProps[];
  isDataInArray?: boolean;

  setLinksCart?: (x: LinksProps) => void;
  LinkPlatforms?: LinkPlatformProps[];
  addLink?: (link: LinksProps) => void;
  updateLink?: (link: LinksProps, label: string, index: string) => void;
  updateProfileData?: (data: ProfileProps) => void;
  removeLink?: (id: string) => void;
  reorderLinks?: (
    links: LinksProps[],
    startIdx: number,
    endIdx: number
  ) => void;

  setAvatar?: (images: FileList | null) => void;
  inputLinks?: {
    gitHubLink: string;
    youTubeLink: string;
    devToLink: string;
    twitterLink: string;
  };

  linksSaved?: boolean;
  saveProfile?: () => void;
  // reducerProps: <(usersLinks: any[] | undefined, action: any) => any[]>(reducer: (usersLinks: any[] | undefined, action: any) => any[], initializerArg: any[], initializer?: undefined): [ReducerStateWithoutAction<(usersLinks: any[] | undefined, action: any) => any[]>
}
