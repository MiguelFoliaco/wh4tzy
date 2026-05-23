'use server';

import { Tables, TablesInsert } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";

export type UpdateProfileData = TablesInsert<'users'>

export const updateProfile = async (data: UpdateProfileData) => {
    const client = await createClient();

    try {
        const { data: { user }, error: userError } = await client.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'User not authenticated' };
        }

        // Actualizar metadata del usuario en Auth
        const { data: updatedUser, error: updateError } = await client.auth.updateUser(data);

        if (updateError) {
            return { success: false, error: updateError.message };
        }

        let userDBData: Tables<'users'> | null = null;
        // Actualizar datos en la tabla users si es necesario
        if (data.username) {
            const { error: dbError, data: userDB } = await client
                .from('users')
                .update({
                    username: data.username,
                    updated_at: new Date().toISOString(),
                    avatar_url: data.avatar_url || null,
                    role: 'owner',
                    phone_number: data.phone_number || null,
                    lastname: data.lastname || null,
                    name: data.name || null,
                })
                .eq('auth_id', user.id).select('*').maybeSingle();

            if (dbError) {
                console.error('Database update error:', dbError);
                return { success: false, error: 'Failed to update username' };
            }
            userDBData = userDB;
        }

        return { success: true, data: updatedUser, userDB: userDBData };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
};
