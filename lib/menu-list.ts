import {
  Tag,
  Users,
  Settings,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Book,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Content",
      menus: [
        {
          href: "",
          label: "Questions",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "Multiple Choice",
              active: pathname === "/posts",
            },
            {
              href: "/posts/new",
              label: "Prounciation",
              active: pathname === "/posts/new",
            },
          ],
        },
        {
          href: "/categories",
          label: "Material Resource",
          active: pathname.includes("/categories"),
          icon: Book,
          submenus: [
            {
              href: "/",
              label: "Text",
              active: pathname === "/",
            },
            {
              href: "/",
              label: "Video",
              active: pathname === "/",
            },
          ],
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: [],
        // },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
