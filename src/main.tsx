import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { isSupabaseConfigured } from "./lib/supabase";
import { STORAGE_KEY } from "./lib/keys";

const path = window.location.pathname.replace(/\/+$/, "");
const isAdmin = path.endsWith("/admin");

// The admin tool uses its own light UI — drop the site's dark theme there.
if (isAdmin) document.documentElement.classList.remove("dark");

function render() {
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  // Dynamic imports so the content store (data.ts) reads localStorage AFTER
  // any Supabase content has been cached below.
  if (isAdmin) {
    import("./admin/Admin").then(({ default: Admin }) =>
      root.render(
        <React.StrictMode>
          <Admin />
        </React.StrictMode>
      )
    );
  } else {
    import("./App").then(({ default: App }) =>
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      )
    );
  }
}

async function boot() {
  // When a Supabase backend is configured, pull the latest published content
  // so every visitor sees the owner's saved edits. Falls back silently.
  if (isSupabaseConfigured) {
    try {
      const { fetchContent } = await import("./lib/supabase");
      const remote = await fetchContent();
      if (remote) localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
    } catch {
      /* network/permission error — fall back to local cache / defaults */
    }
  }
  render();
}

boot();
