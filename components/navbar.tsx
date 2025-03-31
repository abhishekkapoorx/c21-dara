"use client"
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Session } from "next-auth";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  SearchIcon
} from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

import logout from "@/actions/logout";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { IconChevronDown, IconLogin, IconLogout } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";



export const Navbar = ({ session }: { session: Session | null }) => {

  const pathname = usePathname();
  const user = session?.user


  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <NextUINavbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* <Logo /> */}
      <NavbarBrand as="li" className="gap-3 max-w-fit mr-4">
        <NextLink className="flex justify-center items-center gap-1" href="/">
          <Image src={require("@/public/c21-logo.svg")} alt="C21 Logo" width={120} height={40} className="w-40 h-20" />
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden md:flex gap-4 justify-center items-center ml-2">
          {siteConfig.navItems.map((item) =>
          (item.href ?
            (
              <NavbarItem key={item.href} className="flex items-center justify-center">
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  data-active={pathname === item.href ? "true" : "false"}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )

            :

            (
              <Dropdown key={item.label}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-yellow-500 data-[active=true]:font-medium",
                      )}
                      data-active={pathname === item.href ? "true" : "false"}
                      radius="sm"
                      variant="light"
                      endContent={<IconChevronDown stroke={2} size={16} />}
                    >
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={`C21 ${item.label}`}
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {item.dropdownItems?.map((dropdownItem) => (
                    <DropdownItem
                      key={dropdownItem.label}
                      description={dropdownItem.desc}
                    >

                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-yellow-500 data-[active=true]:font-medium",
                        )}
                        color="foreground"
                        data-active={pathname === item.href ? "true" : "false"}
                        href={dropdownItem.href}
                      >
                        {dropdownItem.label}
                      </NextLink>
                    </DropdownItem>
                  )) as any}
                </DropdownMenu>
              </Dropdown>
            )
          ))}
          {user && user.role === 'ADMIN' && (
            <NavbarItem key={"/admin"}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                data-active={pathname === "/admin" ? "true" : "false"}
                href={"/admin"}
              >
                Admin
              </NextLink>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          {
            user ? (
              <form action={logout}>
                <Button color="danger" type="submit" variant="flat" className="text-sm font-normal text-default-600 bg-default-100" startContent={<IconLogout className="text-danger" />} onPress={() => setIsMenuOpen(false)}>
                  Logout
                </Button>
              </form>
            ) : (
              <div>
                <Button
                  as={Link}
                  className="text-sm font-normal text-default-600 bg-default-100"
                  href={siteConfig.navSignUps[1].href}
                  startContent={<IconLogin className="text-success-500" />}
                  variant="flat"
                  onPress={() => setIsMenuOpen(false)}
                >
                  {siteConfig.navSignUps[1].label}
                </Button>
              </div>
            )
          }
        </NavbarItem>
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal aria-label={siteConfig.links[2].label} href={siteConfig.links[2].href}>
          <LinkedInIcon className="text-default-500" />
        </Link> */}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  pathname === item.href
                    ? "primary"
                    : "foreground"
                }
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
                className="ml-3"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {user && user.role === 'ADMIN' && (
            <NavbarMenuItem key={`/ADMIN`}>
              <Link
                color={
                  pathname === '/admin'
                    ? "primary"
                    : "foreground"
                }
                href={"/admin"}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
                className="ml-3"
              >
                Admin
              </Link>
            </NavbarMenuItem>
          )}

          {!user ? (siteConfig.navSignUps.slice(1, 2).map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Button
                as={Link}
                className="text-sm w-full font-normal text-default-600 bg-default-100"
                href={item.href}
                startContent={<IconLogin className="text-success-500" />}
                variant="flat"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Button>
            </NavbarMenuItem>

          ))) :
            (siteConfig.navSignUps.slice(2).map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <form action={logout}>
                  <Button color="danger" type="submit" variant="flat" className="w-full text-sm font-normal text-default-600 bg-red-100 mt-4" startContent={<IconLogout className="text-danger" />} onPress={() => setIsMenuOpen(false)}>
                    Logout
                  </Button>
                </form>
              </NavbarMenuItem>

            )))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
