'use client'

import { useTranslate } from "@/module/common/hook/useTranslate";
import { useEffect, useState } from "react";
import { useUser } from "../../auth/context/useUser";
import { deleteToken, getTokens, upsertToken } from "../actions/token";
import { useToast } from "@/module/common/hook/useToast";
import { BiKey, BiTrash, BiCheck, BiX } from "react-icons/bi";
import { Enums } from "@/supabase/database.types";

export const FormTokens = () => {
    const { t } = useTranslate();
    const { user } = useUser();
    const { openToast } = useToast();
    const [tokens, setTokens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [deeplToken, setDeeplToken] = useState("");
    const [openaiToken, setOpenaiToken] = useState("");

    const [savingDeepl, setSavingDeepl] = useState(false);
    const [savingOpenAI, setSavingOpenAI] = useState(false);

    useEffect(() => {
        if (user) {
            loadTokens();
        }
    }, [user]);

    const loadTokens = async () => {
        setLoading(true);
        if (user) {
            const { data, error } = await getTokens(user.id);
            if (!error && data) {
                setTokens(data);
            }
        }
        setLoading(false);
    }

    const handleSave = async (type: Enums<'token_type'>, tokenValue: string) => {
        if (!tokenValue) return;

        if (type === 'deepl') setSavingDeepl(true);
        if (type === 'openia') setSavingOpenAI(true);

        const res = await upsertToken({
            body: {
                auth_id: user!.id,
                name: type === 'deepl' ? 'DeepL API Key' : 'OpenAI API Key',
                token_type: type,
                token_hash: tokenValue
            }
        });

        if (res.error) {
            openToast(res.error.toString(), "error");
        } else {
            openToast(t('profile.tokens.saved'), "success");
            if (type === 'deepl') setDeeplToken("");
            if (type === 'openia') setOpenaiToken("");
            await loadTokens();
        }

        if (type === 'deepl') setSavingDeepl(false);
        if (type === 'openia') setSavingOpenAI(false);
    }

    const handleDelete = async (tokenHash: string) => {
        const confirmDelete = confirm(t('profile.tokens.deleteConfirm'));
        if (!confirmDelete) return;

        const res = await deleteToken({ id: tokenHash });
        if (res.error) {
            openToast(t('profile.tokens.failedDelete'), "error");
        } else {
            openToast(t('profile.tokens.deleted'), "success");
            await loadTokens();
        }
    }

    const deeplConnected = tokens.find(t => t.token_type === 'deepl');
    const openaiConnected = tokens.find(t => t.token_type === 'openia');

    if (loading) {
        return (
            <div className="w-full flex justify-center py-8">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-base-content">{t('profile.tokens.title')}</h2>
            <p className="text-sm text-base-content/60 mb-6">{t('profile.tokens.description')}</p>

            <div className="overflow-x-auto">
                <table className="table w-full border border-base-200 rounded-lg">
                    <thead className="bg-base-200 text-base-content/70">
                        <tr>
                            <th>{t('profile.tokens.service')}</th>
                            <th>{t('profile.tokens.status')}</th>
                            <th>{t('profile.tokens.token')}</th>
                            <th className="text-right">{t('profile.tokens.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* DeepL Row */}
                        <tr className="hover:bg-base-200/30 transition-colors">
                            <td>
                                <div className="font-semibold flex items-center gap-2 text-base-content">
                                    <BiKey className="text-primary" /> DeepL Translator
                                </div>
                                <div className="text-xs text-base-content/60 mt-1">{t('profile.tokens.deeplDesc')}</div>
                            </td>
                            <td>
                                {deeplConnected ? (
                                    <span className="badge badge-success gap-1 badge-sm"><BiCheck /> {t('profile.tokens.connected')}</span>
                                ) : (
                                    <span className="badge badge-error gap-1 badge-sm"><BiX /> {t('profile.tokens.notConnected')}</span>
                                )}
                            </td>
                            <td>
                                {deeplConnected ? (
                                    <span className="text-xs font-mono opacity-50 bg-base-200 px-2 py-1 rounded">********************</span>
                                ) : (
                                    <input
                                        type="password"
                                        placeholder={t('profile.tokens.pasteDeepl')}
                                        className="input input-bordered input-sm w-full max-w-xs"
                                        value={deeplToken}
                                        onChange={(e) => setDeeplToken(e.target.value)}
                                    />
                                )}
                            </td>
                            <td className="text-right">
                                {deeplConnected ? (
                                    <button
                                        onClick={() => handleDelete(deeplConnected.token_hash)}
                                        className="btn btn-sm btn-error btn-outline hover:text-white!"
                                    >
                                        <BiTrash /> {t('profile.tokens.delete')}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSave('deepl', deeplToken)}
                                        disabled={!deeplToken || savingDeepl}
                                        className="btn btn-sm btn-primary"
                                    >
                                        {savingDeepl ? <span className="loading loading-spinner loading-xs"></span> : t('profile.tokens.save')}
                                    </button>
                                )}
                            </td>
                        </tr>

                        {/* OpenAI Row */}
                        <tr className="hover:bg-base-200/30 transition-colors">
                            <td>
                                <div className="font-semibold flex items-center gap-2 text-base-content">
                                    <BiKey className="text-primary" /> OpenAI
                                </div>
                                <div className="text-xs text-base-content/60 mt-1">{t('profile.tokens.openaiDesc')}</div>
                            </td>
                            <td className='w-[180px]'>
                                {openaiConnected ? (
                                    <span className="badge badge-success gap-1 badge-sm"><BiCheck /> {t('profile.tokens.connected')}</span>
                                ) : (
                                    <span className="badge badge-error gap-1 badge-sm"><BiX /> {t('profile.tokens.notConnected')}</span>
                                )}
                            </td>
                            <td>
                                {openaiConnected ? (
                                    <span className="text-xs font-mono opacity-50 bg-base-200 px-2 py-1 rounded">********************</span>
                                ) : (
                                    <input
                                        type="password"
                                        placeholder={t('profile.tokens.pasteOpenAI')}
                                        className="input input-bordered input-sm w-full max-w-xs"
                                        value={openaiToken}
                                        onChange={(e) => setOpenaiToken(e.target.value)}
                                    />
                                )}
                            </td>
                            <td className="text-right">
                                {openaiConnected ? (
                                    <button
                                        onClick={() => handleDelete(openaiConnected.token_hash)}
                                        className="btn btn-sm btn-error btn-outline hover:text-white!"
                                    >
                                        <BiTrash /> {t('profile.tokens.delete')}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSave('openia', openaiToken)}
                                        disabled={!openaiToken || savingOpenAI}
                                        className="btn btn-sm btn-primary"
                                    >
                                        {savingOpenAI ? <span className="loading loading-spinner loading-xs"></span> : t('profile.tokens.save')}
                                    </button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
