'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/module/common/components/header'
import { useTranslate } from '@/module/common/hook/useTranslate'
import { GetMyDocumentsReturn } from '../editor/services'
import { CardNovel } from './components/card'

interface MyNovelsClientProps {
    novels: GetMyDocumentsReturn | null
    error: any
}

export const MyNovelsClient = ({ novels, error }: MyNovelsClientProps) => {
    const { t } = useTranslate()

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{t('myNovels.title')}</h1>
                        <p className="text-base-content/60 mt-1">{t('myNovels.subtitle')}</p>
                    </div>
                    <Link href="/editor" className="btn btn-primary gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {t('myNovels.newNovel')}
                    </Link>
                </div>

                {error && (
                    <div className="alert alert-error mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{error.toString()}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {novels?.map(novel => (
                        <CardNovel key={novel.id} novel={novel} />
                    ))}

                    {(!novels || novels.length === 0) && !error && (
                        <div className="col-span-full py-16 text-center bg-base-200/30 rounded-xl border-2 border-dashed border-base-300">
                            <h3 className="text-lg font-medium text-base-content/80 mb-2">{t('myNovels.noNovels.title')}</h3>
                            <p className="text-base-content/50 mb-6">{t('myNovels.noNovels.description')}</p>
                            <Link href="/editor" className="btn btn-outline btn-sm">
                                {t('myNovels.noNovels.button')}
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
