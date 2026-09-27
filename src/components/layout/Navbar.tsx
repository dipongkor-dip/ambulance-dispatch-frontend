import { useState } from "react";
import { Navbar1 } from "../navbar1";
import Auth from "@/pages/Auth";
import type { AuthMode } from "@/components/auth/Login";
import callNowIcon from "@/assets/callnow.svg";
import { Book, Sunset, Trees, Zap } from "lucide-react";

const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const logo = {
    url: "/",
    src: callNowIcon,
    alt: "CallNow",
  };

  const menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ];

  return (
    <>
      <div className="w-full mx-auto">
        <Navbar1
          logo={logo}
          menu={menu}
          auth={{
            login: { title: "Login", url: "#" },
            signup: { title: "Sign up", url: "#" },
            onLoginClick: () => {
              setAuthMode("login");
              setAuthOpen(true);
            },
            onSignupClick: () => {
              setAuthMode("register");
              setAuthOpen(true);
            },
          }}
        />
      </div>
      <Auth
        open={authOpen}
        mode={authMode}
        onOpenChange={setAuthOpen}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navbar;
