const ACCESS_TOKEN_COOKIE = "access_token";

export const PASSENGER_BOOKING_PATH = "/dashboard/passenger/booking";

export function getAccessToken() {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${ACCESS_TOKEN_COOKIE}=`));
  if (cookie) {
    return decodeURIComponent(cookie.slice(ACCESS_TOKEN_COOKIE.length + 1));
  }

  const legacyToken = window.sessionStorage.getItem(ACCESS_TOKEN_COOKIE);
  if (!legacyToken) return null;

  setAccessToken(legacyToken);
  window.sessionStorage.removeItem(ACCESS_TOKEN_COOKIE);
  window.localStorage.removeItem(ACCESS_TOKEN_COOKIE);
  return legacyToken;
}

export function setAccessToken(token: string) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secure}`;
}

export function clearAccessToken() {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  window.sessionStorage.removeItem(ACCESS_TOKEN_COOKIE);
  window.localStorage.removeItem(ACCESS_TOKEN_COOKIE);
}

export function getLoginRequiredUrl(returnTo: string) {
  const params = new URLSearchParams({
    auth: "login",
    next: returnTo,
    notice: "Please sign in before requesting an ambulance.",
  });
  return `/?${params.toString()}`;
}