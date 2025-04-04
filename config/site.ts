import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { dropdown, dropdownItem } from "@heroui/theme";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dara Dream Realty | Century 21",
  description: "Your trusted partner in real estate, backed by Century 21's legacy of excellence. Karandeep Dara brings expertise and dedication to every transaction.",
  navItems: [
    {
      label: "Home",
      href: "/",
      dropdownItems: null,
    },
    {
      label: "Get Advice",
      href: "/get-advice",
      dropdownItems: null
    },
    {
      label: "Tools",
      href: null,
      dropdownItems: [
        {
          label: "Ebooks",
          desc: "Get your free ebook",
          href: "/ebooks",
        },
        {
          label: "Calculators",
          desc: "Calculate your payments",
          href: "/calculators",
        },
        // {
        //   label: "NewsLetter",
        //   desc: "Subscribe to our newsletter",
        //   href: "/newsletter",
        // },
      ]
    },
    {
      label: "NewsLetter",
      href: "/newsletter",
      dropdownItems: null,
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Get Advice",
      href: "/get-advice",
    },
    {
      label: "Ebooks",
      href: "/ebooks",
    },
    {
      label: "Calculators",
      href: "/calculators",
    },
    {
      label: "NewsLetter",
      href: "/newsletter",
    },
  ],
  navSignUps : [
    {
      label: "Sign Up",
      href: "/auth/sign-up",
    },
    {
      label: "Sign In",
      href: "/auth/sign-in",
    },
    {
      label: "Sign Out",
      href: "/auth/logout",
    }
  ],
};
