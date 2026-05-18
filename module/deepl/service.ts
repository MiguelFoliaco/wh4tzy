'use server';

import { DeepLClient, LanguageCode, SourceLanguageCode, TargetLanguageCode } from 'deepl-node'

const deeplClient = new DeepLClient(process.env.DEEPL_API_KEY!);

export const translateText = async (text: string, sourceLang: SourceLanguageCode | LanguageCode | 'auto', targetLang: TargetLanguageCode | LanguageCode) => {
    return await deeplClient.translateText(text, (sourceLang === 'auto' ? null : sourceLang) as SourceLanguageCode, targetLang as TargetLanguageCode);
};