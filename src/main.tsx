import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { Provider } from "react-redux";
import router from "./routes/router.tsx";
import { store } from "./redux/store.ts";
import NetworkProgressBar from "./components/layout/NetworkProgressBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <>
        <NetworkProgressBar />
        <RouterProvider router={router} />
      </>
    </Provider>
  </StrictMode>,
);
