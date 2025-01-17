import { Home, Lock } from "@/icons";

export type MenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  auth?: boolean;
};

export const APP_ROUTE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "auth:title",
    icon: <Lock />,
    path: "/auth",
    auth: false,
  },
  {
    id: 1,
    label: "land:title",
    icon: <Home />,
    path: "",
    auth: true,
  },
  {
    id: 2,
    label: "task:title",
    icon: <Home />,
    path: "/task",
    auth: true,
  },
];
