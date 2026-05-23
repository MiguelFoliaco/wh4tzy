'use server';

import { createClient } from "@/supabase/server";
import { TablesInsert } from "@/supabase/database.types";
import { decrypt, encrypt } from "@/utils/crypto";

export const upsertToken = async ({ body }: { body: TablesInsert<'whatsapp_accounts'> }) => {
    const client = await createClient();

    if (!body.bussine_account_id || !body.api_secret || !body.access_token) {
        return { data: null, error: 'All fields are required' };
    }
    const tokenHash = await encrypt(body.bussine_account_id + '@wh4tzy@' + body.api_secret + '@wh4tzy@' + body.access_token);

    if (!tokenHash) {
        return { data: null, error: 'Error encrypting token' };
    }

    const { data, error } = await client.from('whatsapp_accounts').upsert({ ...body, access_token: tokenHash }).select('*').maybeSingle();
    return { data, error };
}

export const deleteWhatsappAccount = async ({ id, tokenId }: { id: string; tokenId: string }) => {
    const client = await createClient();
    const currentUser = await client.auth.getUser();
    const idUser = currentUser.data.user?.id
    if (id !== idUser) {
        return { data: null, error: 'Unauthorized' };
    }
    const { error } = await client.from('whatsapp_accounts').delete().eq('auth_id', id).eq('id', tokenId);
    return { data: { status: error ? 'Error' : 'Deleted' }, error };
}

export const getWhatsappAccounts = async (auth_id: string) => {
    const client = await createClient();
    const { data, error } = await client.from('whatsapp_accounts').select('*').eq('auth_id', auth_id);
    return { data, error };
}

export type GetWhatsappAcountResult = NonNullable<Awaited<ReturnType<typeof getWhatsappAccounts>>['data']>;

export const getToken = async (auth_id: string, name: string) => {
    const client = await createClient();
    const { data, error } = await client.from('whatsapp_accounts').select('*').eq('auth_id', auth_id).eq('name', name).maybeSingle();
    if (data) {
        let token = await decrypt(data.access_token!)
        token = token?.split('@wh4tzy@')[2] || '';
        return {
            ...data,
            access_token: token
        }
    }
    return { token: null, error };
}