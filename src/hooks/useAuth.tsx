import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  user_id: string;
  email: string | null;
  display_name: string | null;
  streak_count: number;
  last_login: string | null;
  referral_code: string | null;
  referred_by: string | null;
  subscription_tier: string;
  subscription_status: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isPro: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isPro: false,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const syncAndFetchProfile = async (userId: string) => {
    try {
      // Call check-subscription and use its response directly
      const { data: subData } = await supabase.functions.invoke("check-subscription");
      // Now fetch the profile which has been updated by the edge function
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (data) {
        // Overlay subscription data from the edge function response if available
        if (subData?.subscription_tier) {
          data.subscription_tier = subData.subscription_tier;
          data.subscription_status = subData.subscription_status;
        }
        setProfile(data);
        await updateStreak(data);
      }
    } catch (e) {
      console.error("Profile sync failed:", e);
      // Fallback: just fetch profile without subscription sync
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (data) {
        setProfile(data);
      }
    }
  };

  const updateStreak = async (p: Profile) => {
    if (!p.last_login) return;
    const lastLogin = new Date(p.last_login);
    const now = new Date();
    const daysSince = Math.ceil((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince >= 7) {
      const newStreak = p.streak_count + Math.floor(daysSince / 7);
      const { data } = await supabase
        .from("profiles")
        .update({ streak_count: newStreak, last_login: now.toISOString() })
        .eq("user_id", p.user_id)
        .select()
        .single();
      if (data) setProfile(data);
    }
  };

  const refreshProfile = async () => {
    if (user) await syncAndFetchProfile(user.id);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          syncAndFetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        syncAndFetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isPro = profile?.subscription_tier?.startsWith("pro") && profile?.subscription_status === "active";

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, isPro: !!isPro, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
