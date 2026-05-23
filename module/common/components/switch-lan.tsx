import React from 'react'
import { useTranslate } from '../hook/useTranslate'
import Image from 'next/image'

const flagByLan = {
    'es': '/es.png',
    'en': '/en.png',
    'ja': '/ja.png',
}

const nameByLan = {
    'es': 'Español',
    'en': 'English',
    'ja': '日本語',
}

export const SwitchLan = () => {

    const { setLocale, locale } = useTranslate()

    const toogleLocale = () => {
        if (locale === 'es') return setLocale('en')
        if (locale === 'en') return setLocale('ja')
        if (locale === 'ja') return setLocale('es')
    }


    return (
        <button className='btn btn-sm btn-secondary  gap-2' onClick={toogleLocale} >
            <Image src={flagByLan[locale]} alt={locale} width={30} height={30} className='w-5 h-5 object-contain rounded-md' />
            {nameByLan[locale]}
        </button>
    )
}
