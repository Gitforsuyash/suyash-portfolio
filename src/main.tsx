import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const Admin = lazy(() => import("./admin/Admin"));

const path = window.location.pathname.replace(/\/+$/, "");
const isAdmin = path.endsWith("/admin");

// The admin tool uses its own light UI — drop the site's dark theme there.
if (isAdmin) document.documentElement.classList.remove("dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
