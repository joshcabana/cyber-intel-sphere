import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Runtime check — warn if critical env vars are missing (dev only)
if (import.meta.env.DEV) {
  const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"] as const;
  for (const key of required) {
    if (!import.meta.env[key]) {
      console.warn(
        `⚠️ Missing env var: ${key} — copy .env.example to .env.local and fill in values.`
      );
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
