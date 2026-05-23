'use client';

import { useUser } from "@/module/auth/context/useUser";
import { Tables } from "@/supabase/database.types";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";


type LayoutClientProps = {
    children: React.ReactNode;
    user: User | null;
    userDB?: Tables<'users'>;
}

export const LayoutClient = ({ children, user, userDB }: LayoutClientProps) => {

    const updateUser = useUser(state => state.updateUser)
    useEffect(() => {
        if (user) {
            updateUser(user, userDB)
        }
    }, [user, userDB, updateUser])


    return children
}
