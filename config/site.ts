import { GithubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { dropdown, dropdownItem } from "@heroui/theme";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "C21 Canada",
  description: "Transforming visions into reality with innovative web development, mobile apps, and captivating graphic design. Elevate your digital presence today.",
  navItems: [
    {
      label: "Home",
      href: "/",
      dropdownItems: null,
    },
    {
      label: "Get Advice",
      href: null,
      dropdownItems: [
        {
          label: "Buy",
          desc: "Find your dream home",
          href: "/get-advice",
        },
        {
          label: "Sell",
          desc: "Get the best price for your property",
          href: "/get-advice",
        },
      ]
    },
    {
      label: "More",
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
        {
          label: "NewsLetter",
          desc: "Subscribe to our newsletter",
          href: "/newsletter",
        },
      ]
    },
    // {
    //   label: "NewsLetter",
    //   href: "/newsletter",
    //   dropdownItems: null,
    // },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Buy",
      href: "/get-advice",
    },
    {
      label: "Sell",
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
