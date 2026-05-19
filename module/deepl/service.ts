'use server';

import { DeepLClient, LanguageCode, SourceLanguageCode, TargetLanguageCode } from 'deepl-node'
import { getToken } from '../auth/actions/token';
import { createClient } from '@/supabase/server';
import { decrypt } from '@/utils/crypto';


export const translateText = async (text: string, sourceLang: SourceLanguageCode | LanguageCode | 'auto', targetLang: TargetLanguageCode | LanguageCode) => {
    const client = await createClient();
    const { data, error } = await client.auth.getUser();
    const tokenHash = await getToken('deepl', data?.user?.id as string);
    if (!tokenHash.token) return { text: `Error DeepL --- No token found, use /profile to configure it` };
    const token = await decrypt(await tokenHash.token)
    const deeplClient = new DeepLClient(token);
    if (!token) return { text: `Error DeepL --- No token found, use /profile to configure it` };
    return await deeplClient.translateText(text, (sourceLang === 'auto' ? null : sourceLang) as SourceLanguageCode, targetLang as TargetLanguageCode);
};