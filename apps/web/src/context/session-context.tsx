import { getSession, supabase } from "@fetcher-web/lib";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContext = { session: Session | undefined };

const sessionContext = createContext<SessionContext>({ session: getSession() });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionContext>({
    session: getSession(),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession({ session: session ?? undefined });
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession({ session: session ?? undefined });
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
