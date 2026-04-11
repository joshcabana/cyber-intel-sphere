import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Referral() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // Set 30-day referral cookie
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `referral_code=${code}; expires=${expires}; path=/; SameSite=Lax`;
    }
    navigate("/login?ref=applied", { replace: true });
  }, [code, navigate]);

  return null;
}
