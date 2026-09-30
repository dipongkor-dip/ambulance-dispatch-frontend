import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useExchangeOAuthCodeMutation } from "../redux/auth/auth.api";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [exchangeCode] = useExchangeOAuthCodeMutation();
  const [error, setError] = useState("");
  const started = useRef(false);
  const code = searchParams.get("code");
  const providerError = searchParams.get("error");
  const displayedError =
    error ||
    (!code || providerError
      ? "Sign-in could not be completed. Please try again."
      : "");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (!code || providerError) {
      return;
    }

    exchangeCode({ code })
      .unwrap()
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() =>
        setError("Sign-in could not be completed. Please try again."),
      );
  }, [code, exchangeCode, navigate, providerError]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <section className="w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold text-[#102a43]">
          {displayedError ? "Sign-in failed" : "Signing you in"}
        </h1>
        <p
          className="mt-2 text-sm leading-6 text-[#61716d]"
          role={displayedError ? "alert" : "status"}
        >
          {displayedError || "Please wait while we finish your sign-in."}
        </p>
        {displayedError && (
          <Link
            className="mt-5 inline-block text-sm font-medium text-[#1c6256] hover:underline"
            to="/"
          >
            Return to CallNow
          </Link>
        )}
      </section>
    </main>
  );
};

export default OAuthCallback;
