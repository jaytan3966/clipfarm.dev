import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({children} : React.PropsWithChildren){
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        })

        const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);
    
    return (
    <AuthContext.Provider value={session}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}