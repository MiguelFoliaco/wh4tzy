'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/module/common/components/header'
import { useTranslate } from '@/module/common/hook/useTranslate'
import { GetMyDocumentsReturn } from '../editor/services'

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
                        <Link key={novel.id} href={`/editor?id=${novel.id}&tab=write`} className="card bg-base-100 hover:bg-base-200 transition-colors shadow-sm ring-1 ring-base-300 hover:shadow-md cursor-pointer">
                            <div className="card-body p-6">
                                <h2 className="card-title text-xl mb-1">{novel.title || t('myNovels.untitled')}</h2>
                                <p className="text-sm text-base-content/60 line-clamp-3 min-h-16">
                                    {novel.synopsis || t('myNovels.noSynopsis')}
                                </p>

                                <div className="mt-4 pt-4 border-t border-base-300/50 flex justify-between items-center">
                                    <div className="text-xs text-base-content/50">
                                        {t('myNovels.updated')} {new Date(novel.updated_at || novel.created_at || '').toLocaleDateString()}
                                    </div>
                                    <div className="badge badge-primary badge-outline text-xs capitalize">
                                        {novel.status === 'draft' ? t('myNovels.draft') : novel.status}
                                    </div>
                                </div>
                            </div>
                        </Link>
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
