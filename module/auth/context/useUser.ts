import { Tables } from "@/supabase/database.types";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";


export type IUserContext = {
    user?: User;
    userDB?: Tables<'users'> | null;

    updateUser: (user: User, userDB?: Tables<'users'>) => void
    exit: () => void
}

export const useUser = create<IUserContext>(set => ({
    session: undefined,
    user: undefined,
    userDB: null,
    updateUser: (user: User, userDB?: Tables<'users'>) => set(state => ({ ...state, user, userDB })),
    exit: () => set({ user: undefined, userDB: null }),
}))