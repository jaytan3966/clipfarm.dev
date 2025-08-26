import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useAuth } from "./authContext";

type UserProfile = {
    id: string,
    username: string,
    email: string
}
const UserProfileContext = createContext<UserProfile | null>(null);

export function UserProfileProvider({children} : React.PropsWithChildren){
    const session = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (session?.user){
            console.log(session.user.id);
            const fetchProfile = async () => {
                const {data, error} = await supabase
                .from("profiles")
                .select("*")
                .eq("id", session.user.id)
                .maybeSingle()

                if (error){
                    console.error("Error fetching profile: ", error);
                } else {
                    setProfile(data)
                }
            }
            fetchProfile();
        } else {
            setProfile(null)
        }
    }, [session])
    return (
        <UserProfileContext.Provider value={profile}>
            {children}
        </UserProfileContext.Provider>
    )
}

export function useUserProfile() {
    return useContext(UserProfileContext)
}

