import { supabase } from "@fetcher-web/lib";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContext = { session: Session | null };

const sessionContext = createContext<SessionContext>({ session: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionContext>({ session: null });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession({ session });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ session });
    });
  }, []);

  return (
    <sessionContext.Provider value={session}>
      {children}
    </sessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(sessionContext);

  if (!context) {
    throw new Error("useSession must be used within a AuthProvider");
  }

  return { isAuth: !!context.session, session: context.session };
};
