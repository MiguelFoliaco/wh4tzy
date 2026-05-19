'use server';

import { createClient } from "@/supabase/server";
import { Enums, TablesInsert } from "@/supabase/database.types";
import { decrypt, encrypt } from "@/utils/crypto";

export const upsertToken = async ({ body }: { body: TablesInsert<'tokens'> }) => {
    const client = await createClient();

    if (!body.token_hash) {
        return { data: null, error: 'Token is required' };
    }
    const tokenHash = encrypt(body.token_hash);

    const { data, error } = await client.from('tokens').upsert({ ...body, token_hash: tokenHash }).select('*').maybeSingle();
    return { data, error };
}

export const deleteToken = async ({ id }: { id: string }) => {
    const client = await createClient();
    const { data, error } = await client.from('tokens').delete().eq('token_hash', id);
    return { data, error };
}

export const getTokens = async (auth_id: string) => {
    const client = await createClient();
    const { data, error } = await client.from('tokens').select('*').eq('auth_id', auth_id);
    return { data, error };
}

export const getToken = async (name: Enums<'token_type'>, auth_id: string) => {
    const client = await createClient();
    const { data, error } = await client.from('tokens').select('token_hash').eq('token_type', name).eq('auth_id', auth_id).maybeSingle();
    if (data) {
        return {
            token: decrypt(data.token_hash),
        }
    }
    return { token: null, error };
}