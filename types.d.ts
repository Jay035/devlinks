interface LinkProps {
  id: number;
  platform: string;
  link: string;
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
  setHeader: (x: string) => void;
  options: SelectOptionProps[];
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
}
