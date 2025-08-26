import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({children} : React.PropsWithChildren){
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        })

        const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                router.push("/dashboard");
            }
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