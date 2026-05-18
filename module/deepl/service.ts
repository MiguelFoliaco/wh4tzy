'use server';

import { DeepLClient, SourceLanguageCode, TargetLanguageCode } from 'deepl-node'

const deeplClient = new DeepLClient(process.env.DEEPL_API_KEY!);

export const translateText = async (text: string, sourceLang: SourceLanguageCode, targetLang: TargetLanguageCode) => {
    return await deeplClient.translateText(text, sourceLang, targetLang);
};