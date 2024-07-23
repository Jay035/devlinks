interface LinksProps {
  id: number;
  platform: LinkPlatformProps;
  link: string;
  bgColor: string;
  icon: string;
}

interface LinkPlatformProps {
  name: string;
  icon: string;
}

interface SaveBtnProps {
  linkPresent: boolean;
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
  setHeader: (x: LinkPlatformProps) => void;
  options: LinkPlatformProps[];
}

interface SelectOptionProps {
  value: string;
  label: string;
  onSelect: (e: string) => void;
}

interface GlobalProps {
  user: {
    displayName: string;
    email: string;
  };
  error: string;
  isUserLoggedIn: boolean;
  loading: boolean;

  selectedLinkPlatform?: LinkPlatformProps;
  setSelectedLinkPlatform?: (x: LinkPlatformProps) => void;
  userLinks?: LinksProps[];
  LinkPlatforms?: LinkPlatformProps[];
  addLink?: (x: LinkProps) => void;
  deleteLink?: (id: number) => void;
}
