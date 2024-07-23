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


interface GlobalProps{
  user: {
    displayName: string,
    email: string,
  },
  error: string,
  isUserLoggedIn: boolean,
  loading: boolean,
}