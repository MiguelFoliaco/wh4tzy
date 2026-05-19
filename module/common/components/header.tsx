'use client';
import { useUser } from '@/module/auth/context/useUser';
import Link from 'next/link'
import { useTranslate } from '../hook/useTranslate';
import { BiBook, BiUser } from 'react-icons/bi';
import { SwitchLan } from './switch-lan';

export const Header = () => {

    const user = useUser(state => state.user)
    const { t } = useTranslate()

    return (
        <div className="flex justify-between p-3  shadow">
            <h3 className="text-xl font-medium">WhatZy</h3>
            <div className='ml-auto mr-2'>
                <SwitchLan />
            </div>
            <div className="join join-horizontal">

                {
                    user ?
                        <>
                            <Link className="join-item btn btn-primary btn-sm shadow-none" href={'/editor'} ><BiBook size={16} />{t("header.editor")}</Link>
                            <Link className="join-item btn btn-primary btn-sm shadow-none" href={'/profile'} ><BiUser size={16} />{t("header.profile")}</Link>
                        </>
                        :
                        <>
                            <Link className="join-item btn btn-primary btn-sm shadow-none" href={'/auth/login'} >Login</Link>
                            <Link className="join-item btn btn-neutral btn-outline btn-sm shadow-none" href={'/auth/signup'} >Sign Up</Link>
                        </>
                }
            </div>
        </div>
    )
}
