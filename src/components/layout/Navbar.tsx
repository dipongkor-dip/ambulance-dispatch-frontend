import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Navbar1 } from "../navbar1";
import Auth from "../../pages/Auth";
import type { AuthMode } from "../auth/Login";
import callNowIcon from "@/assets/callnow.svg";
import { Ambulance, Book, MapPin, PhoneCall, Zap } from "lucide-react";
import {
  getAccessToken,
  getLoginRequiredUrl,
  PASSENGER_BOOKING_PATH,
} from "@/lib/authSession";
import { showSuccessToast } from "@/lib/toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(getAccessToken()),
  );
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authNotice, setAuthNotice] = useState("");
  const [postLoginPath, setPostLoginPath] = useState("/dashboard");

  useEffect(() => {
    if (searchParams.get("auth") !== "login" || isAuthenticated) return;

    const requestedPath = searchParams.get("next") ?? "/dashboard";
    setPostLoginPath(
      requestedPath.startsWith("/dashboard/") ? requestedPath : "/dashboard",
    );
    setAuthNotice(searchParams.get("notice") ?? "");
    setAuthMode("login");
    setAuthOpen(true);

    const cleanParams = new URLSearchParams(searchParams);
    cleanParams.delete("auth");
    cleanParams.delete("next");
    cleanParams.delete("notice");
    setSearchParams(cleanParams, { replace: true });
  }, [isAuthenticated, searchParams, setSearchParams]);

  const logo = {
    url: "/",
    src: callNowIcon,
    alt: "CallNow",
  };

  const bookingUrl = isAuthenticated
    ? PASSENGER_BOOKING_PATH
    : getLoginRequiredUrl(PASSENGER_BOOKING_PATH);

  const menu = [
    { title: "Home", url: "/" },
    {
      title: "Ambulance",
      url: "/#how-it-works",
      items: [
        {
          title: "Request an ambulance",
          description: "Share a pickup point and destination with dispatch",
          icon: <Ambulance className="size-5 shrink-0" />,
          url: bookingUrl,
        },
        {
          title: "How dispatch works",
          description: "See what happens from request to arrival",
          icon: <MapPin className="size-5 shrink-0" />,
          url: "/#how-it-works",
        },
        {
          title: "Ambulance partnerships",
          description: "Get in touch about joining the response network",
          icon: <Book className="size-5 shrink-0" />,
          url: "/contact",
        },
      ],
    },
    {
      title: "Emergency & Support",
      url: "/contact",
      items: [
        {
          title: "Emergency contact",
          description: "Find emergency and support contact information",
          icon: <PhoneCall className="size-5 shrink-0" />,
          url: "/contact#emergency",
        },
        {
          title: "Help Center",
          description: "Find answers about requests, trips, and your account",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/help",
        },
        {
          title: "Patient stories and guidance",
          description: "Read practical guidance from the CallNow journal",
          icon: <Book className="size-5 shrink-0" />,
          url: "/blog",
        },
      ],
    },
    {
      title: "Request ambulance",
      url: bookingUrl,
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
            ...(isAuthenticated
              ? { dashboard: { title: "Dashboard", url: "/dashboard" } }
              : {}),
            onLoginClick: () => {
              setPostLoginPath("/dashboard");
              setAuthNotice("");
              setAuthMode("login");
              setAuthOpen(true);
            },
            onSignupClick: () => {
              setPostLoginPath("/dashboard");
              setAuthNotice("");
              setAuthMode("register");
              setAuthOpen(true);
            },
            onDashboardClick: () => navigate("/dashboard"),
          }}
        />
      </div>
      {!isAuthenticated && (
        <Auth
          open={authOpen}
          mode={authMode}
          onOpenChange={setAuthOpen}
          onModeChange={setAuthMode}
          notice={authNotice}
          onAuthSuccess={() => {
            setAuthOpen(false);
            setIsAuthenticated(true);
            setAuthNotice("");
            showSuccessToast("Signed in successfully.");
            navigate(postLoginPath);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
