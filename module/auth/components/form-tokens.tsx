'use client'

import { useTranslate } from "@/module/common/hook/useTranslate";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../auth/context/useUser";
import { getWhatsappAccounts, deleteWhatsappAccount, upsertToken, type GetWhatsappAcountResult } from "../actions/token";
import { useToast } from "@/module/common/hook/useToast";
import { BiKey, BiTrash,  BiTestTube } from "react-icons/bi";
import { TablesInsert } from "@/supabase/database.types";

const initialState: TablesInsert<'whatsapp_accounts'> = {
    name: "",
    provider: "",
    user_id: ""
}

export const FormTokens = () => {
    const { t } = useTranslate();
    const { user } = useUser();
    const { openToast } = useToast();
    const [tokens, setTokens] = useState<GetWhatsappAcountResult>([]);
    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false)
    const [loadingTestConect, setLoadingTestConect] = useState(false)
    const [isValidConfiguration, setIsValidConfiguration] = useState(false)

    const [formToken, setFormToken] = useState<TablesInsert<'whatsapp_accounts'>>(initialState);

    const loadTokens = useCallback(async () => {
        setLoading(true);
        if (user) {
            const { data, error } = await getWhatsappAccounts(user.id);
            if (!error && data) {
                setTokens(data);
            }
        }
        setLoading(false);
    }, [user])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTokens();
    }, [loadTokens]);



    const handleSave = async (args: TablesInsert<'whatsapp_accounts'>) => {
        if (!isValidConfiguration) return openToast('Please test the connection before saving', 'error');
        if (!args.name) return openToast('Name is required', 'error');
        if (!args.phone_number_id) return openToast('Phone number id is required', 'error');
        if (!args.client_id) return openToast('Client id is required', 'error');
        if (!args.api_secret) return openToast('API secret is required', 'error');
        if (!args.access_token) return openToast('Access token is required', 'error');
        if (!args.bussine_account_id) return openToast('Bussine account id is required', 'error');
        setLoadingSave(true);
        args.provider = 'meta';
        args.auth_id = user?.id || '';
        args.user_id = '966f5b88-de95-46cf-b9d7-2fdaddae2cfa';
        const res = await upsertToken({ body: args });
        console.log(args, res);
        if (res.error) {
            openToast(res.error.toString(), "error");
        } else {
            openToast(t('profile.tokens.saved'), "success");
            await loadTokens();
        }
        setFormToken(initialState);
        setLoadingSave(false);
    }

    const handleDelete = async (tokenId: string) => {
        const confirmDelete = confirm(t('profile.tokens.deleteConfirm'));
        if (!confirmDelete) return;

        const res = await deleteWhatsappAccount({ id: user?.id || '', tokenId });
        console.log(res, tokenId, user?.id);
        if (res.error) {
            openToast(t('profile.tokens.failedDelete'), "error");
        } else {
            openToast(t('profile.tokens.deleted'), "success");
            await loadTokens();
        }
    }


    const handleTestConect = async () => {
        setLoadingTestConect(true);
        setLoadingSave(true)
        const res = await fetch(`https://graph.facebook.com/v22.0/${formToken.phone_number_id}`, {
            headers: {
                'Authorization': `Bearer ${formToken.access_token}`
            }
        });

        if (!res.ok) {
            setLoadingTestConect(false);
            const errorData = await res.json();
            openToast(errorData.error.message || 'Error testing connection', 'error');
            return setLoadingSave(false);
        }

        const data = await res.json() as {
            "verified_name": string,
            "display_phone_number": string,
            "id": string
        };

        setLoadingSave(false)
        setLoadingTestConect(false);
        if (data.id === formToken.phone_number_id) {
            openToast('Connection successful', 'success');
            setIsValidConfiguration(true);
        } else {
            openToast('Connection failed: phone number ID does not match', 'error');
            setIsValidConfiguration(false);
        }
    }


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

            <div className="bg-base-200/50 p-4 mb-6 grid grid-cols-2 gap-2">
                <fieldset className="fieldset">
                    <legend>Nombre del token:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.name} onChange={(e) => setFormToken({ ...formToken, name: e.target.value })} placeholder="Mi cuenta de WhatsApp" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend>Número de teléfono:</legend>
                    <input disabled={loadingSave} type="tel" className="input input-sm w-full" value={formToken.phone_number ?? ''} onChange={(e) => setFormToken({ ...formToken, phone_number: e.target.value })} placeholder="+54 9 1234-5678" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend>CLIENT ID:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.client_id ?? ''} onChange={(e) => setFormToken({ ...formToken, client_id: e.target.value })} placeholder="CLIENT ID" />
                    <span className="label">App id en meta developers</span>
                </fieldset>

                <fieldset className="fieldset">
                    <legend>CLIENT SECRET:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.api_secret ?? ''} onChange={(e) => setFormToken({ ...formToken, api_secret: e.target.value })} placeholder="API SECRET" />
                    <span className="label">Client secret en meta developers</span>
                </fieldset>

                <fieldset className="fieldset">
                    <legend>Phone number ID:</legend>
                    <input disabled={loadingSave} type="tel" className="input input-sm w-full" value={formToken.phone_number_id ?? ''} onChange={(e) => setFormToken({ ...formToken, phone_number_id: e.target.value })} placeholder="Phone number ID" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend>ACCESS TOKEN:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.access_token ?? ''} onChange={(e) => setFormToken({ ...formToken, access_token: e.target.value })} placeholder="ACCESS TOKEN" />
                </fieldset>

                {/* <fieldset className="fieldset">
                    <legend>API KEY:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.api_key ?? ''} onChange={(e) => setFormToken({ ...formToken, api_key: e.target.value })} placeholder="API KEY" />
                </fieldset> */}
                <fieldset className="fieldset">
                    <legend>Whatsapp Bussine ID:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.bussine_account_id ?? ''} onChange={(e) => setFormToken({ ...formToken, bussine_account_id: e.target.value })} placeholder="Whatsapp Bussine ID" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend>WEBHOOK SECRET:</legend>
                    <input disabled={loadingSave} type="text" className="input input-sm w-full" value={formToken.webhook_secret ?? ''} onChange={(e) => setFormToken({ ...formToken, webhook_secret: e.target.value })} placeholder="WEBHOOK SECRET" />
                </fieldset>

                <div className="flex items-end gap-2 mt-2 col-span-2">
                    <button className="btn btn-success btn-sm" onClick={handleTestConect} disabled={loadingTestConect}>Probar conexión<BiTestTube /></button>

                    <button type="button" className="btn btn-sm btn-primary" onClick={() => handleSave(formToken)} disabled={loadingSave || loadingTestConect || !isValidConfiguration}>
                        {loadingSave ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <ul>
                    {
                        tokens.map((token) => (
                            <li key={token.id} className="flex items-center justify-between p-4 bg-base-100 rounded-lg mb-4">
                                <div className="flex items-center gap-4">
                                    <BiKey size={24} />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{token.name}</span>
                                        <span className="text-xs text-base-content/60">{token.provider}</span>
                                        <span className="text-xs text-base-content/60">{token.bussine_account_id}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleDelete(token.id)}><BiTrash size={16} /></button>
                                </div>
                            </li>
                        ))
                    }
                    {
                        tokens.length === 0 && (
                            <li className="text-center text-sm text-base-content/60 py-8 bg-info/10 rounded-lg">
                                {t('profile.tokens.noTokens')}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}



