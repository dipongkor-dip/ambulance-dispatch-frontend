"use client";

import { LayoutDashboard, Menu } from "lucide-react";
import { cn } from "cn";
import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo: {
    url: string;
    src: string;
    alt: string;
    className?: string;
  };
  menu: MenuItem[];
  auth: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    dashboard?: {
      title: string;
      url: string;
    };
    onLoginClick?: () => void;
    onSignupClick?: () => void;
    onDashboardClick?: () => void;
  };
}

const Navbar1 = ({ logo, menu, auth }: Navbar1Props) => {
  return (
    <section className={cn("border-b border-[#d9e5ec] bg-white/95 py-3 backdrop-blur")}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className={cn("size-11", logo.className)}
                alt={logo.alt}
              />
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {auth.dashboard ? (
              <Button
                size="sm"
                onClick={auth.onDashboardClick}
                render={auth.onDashboardClick ? undefined : <Link to={auth.dashboard.url} />}
                nativeButton={auth.onDashboardClick ? true : false}
              >
                <LayoutDashboard className="size-4" />
                {auth.dashboard.title}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={auth.onLoginClick}
                  render={auth.onLoginClick ? undefined : <Link to={auth.login.url} />}
                  nativeButton={auth.onLoginClick ? true : false}
                >
                  {auth.login.title}
                </Button>
                <Button
                  size="sm"
                  onClick={auth.onSignupClick}
                  render={auth.onSignupClick ? undefined : <Link to={auth.signup.url} />}
                  nativeButton={auth.onSignupClick ? true : false}
                >
                  {auth.signup.title}
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className={cn("size-10", logo.className)}
                alt={logo.alt}
              />
            </Link>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" />}>
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className={cn("size-10", logo.className)}
                        alt={logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {auth.dashboard ? (
                      <Button
                        onClick={auth.onDashboardClick}
                        render={auth.onDashboardClick ? undefined : <Link to={auth.dashboard.url} />}
                        nativeButton={auth.onDashboardClick ? true : false}
                      >
                        <LayoutDashboard className="size-4" />
                        {auth.dashboard.title}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={auth.onLoginClick}
                          render={auth.onLoginClick ? undefined : <Link to={auth.login.url} />}
                          nativeButton={auth.onLoginClick ? true : false}
                        >
                          {auth.login.title}
                        </Button>
                        <Button
                          onClick={auth.onSignupClick}
                          render={auth.onSignupClick ? undefined : <Link to={auth.signup.url} />}
                          nativeButton={auth.onSignupClick ? true : false}
                        >
                          {auth.signup.title}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-transparent text-[#102a43] group-data-[viewport=false]/navigation-menu:bg-transparent">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              key={subItem.title}
              className="w-80 bg-transparent p-0 hover:bg-transparent"
              render={<SubMenuLink item={subItem} desktop />}
            ></NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        render={<Link to={item.url} />}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({
  item,
  desktop = false,
}: {
  item: MenuItem;
  desktop?: boolean;
}) => {
  return (
    <Link
      className={`flex w-full min-w-0 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none ${desktop ? "bg-transparent hover:bg-white/55 lg:min-w-80" : "bg-[#f1f7f8] hover:bg-[#e3f1ef]"} hover:text-[#102a43]`}
      to={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
