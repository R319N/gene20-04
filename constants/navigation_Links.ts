export interface NavigationItem {
  name: string;
  url: string;
  href: string;
  isTab?: boolean;
  isFooter?: boolean;
  isNavigation?: boolean;
  isExplore?: boolean;
  icon?: React.ReactNode; // Correct type for JSX icons
}

const navigation: NavigationItem[] = [
  {
    name: "home",
    url: "/#home",
    href: "/",
    isTab: true,
    isFooter: true,
    isNavigation: true,
  },
  {
    name: "about",
    url: "/#about",
    href: "/",
    isTab: true,
    isNavigation: true,
  },
  {
    name: "services",
    url: "/#services",
    href: "/",
    isTab: true,
    isNavigation: true,
  },

  {
    name: "portfolio",
    url: "/#portfolio",
    href: "/",
    isTab: true,
    isNavigation: true,
  },
  {
    name: "testimonials",
    url: "/#testimonials",
    href: "/",
    isTab: true,
    isNavigation: true,
  },

  {
    name: "contact",
    url: "/#contact",
    href: "/",
    isTab: false,
    isNavigation: true,
  },
  {
    name: "our projects",
    url: "/#gallery",
    href: "/our_projects",
    isTab: false,
    isExplore: true,
  },
  {
    name: "gene20 community",
    url: "/gene20community.com",
    href: "/",
    isExplore: true,
  },
  {
    name: "careers",
    url: "/careers",
    href: "/",
    isExplore: true,
  },
  {
    name: "help",
    url: "/help",
    href: "/",
    isExplore: true,
  },
];
export default navigation;
