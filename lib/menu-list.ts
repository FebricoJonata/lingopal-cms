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
          active: pathname === "/dashboard",
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
          active: false,
          icon: SquarePen,
          submenus: [
            {
              href: "/dashboard/question",
              label: "Multiple Choice",
              active: pathname === "/dashboard/question",
            },
            {
              href: "/dashboard/prounciation-question",
              label: "Prounciation",
              active: pathname === "/dashboard/prounciation-question",
            },
          ],
        },
        {
          href: "",
          label: "Material Resource",
          active: false,
          icon: Book,
          submenus: [
            {
              href: "/dashboard/text-material",
              label: "Text",
              active: pathname === "/dashboard/text-material",
            },
            {
              href: "/dashboard/video-material",
              label: "Video",
              active: pathname === "/dashboard/video-material",
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
