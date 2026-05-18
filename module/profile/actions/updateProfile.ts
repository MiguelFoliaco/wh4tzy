'use server';

import { createClient } from "@/supabase/server";

export interface UpdateProfileData {
    full_name?: string;
    username?: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
    const client = await createClient();

    try {
        const { data: { user }, error: userError } = await client.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'User not authenticated' };
        }

        // Actualizar metadata del usuario en Auth
        const { data: updatedUser, error: updateError } = await client.auth.updateUser({
            data: {
                full_name: data.full_name || '',
                username: data.username || '',
            }
        });

        if (updateError) {
            return { success: false, error: updateError.message };
        }

        // Actualizar datos en la tabla users si es necesario
        if (data.username) {
            const { error: dbError } = await client
                .from('users')
                .update({
                    username: data.username,
                    updated_at: new Date().toISOString(),
                })
                .eq('auth_id', user.id);

            if (dbError) {
                console.error('Database update error:', dbError);
                return { success: false, error: 'Failed to update username' };
            }
        }

        return { success: true, data: updatedUser };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
};
