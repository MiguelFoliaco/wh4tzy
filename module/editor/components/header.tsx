import Link from 'next/link'
import React from 'react'
import { useTranslate } from '@/module/common/hook/useTranslate'
import { useNovel } from '../context/use-novel'
import { useUser } from '@/module/auth/context/useUser'

interface HeaderDocumentProps {
    title: string
    loadingDocument: boolean
    saveStatus: "saved" | "saving" | "error" | null
    setTabHelp: React.Dispatch<React.SetStateAction<boolean>>
    locale: string
    setLocale: (locale: "en" | "es" | "ja") => void
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSaveTitleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

export const HeaderDocument = ({ title, loadingDocument, saveStatus, locale, setLocale, handleTitleChange, handleSaveTitleKeyDown, setTitle }: HeaderDocumentProps) => {
    const { t } = useTranslate()
    const { document, chapters, currentChapter, setCurrentChapter } = useNovel()
    const { user } = useUser()

    const handleSelectChapter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const chapter = chapters?.find((chapter) => chapter.id === e.target.value)
        if (chapter) {
            setCurrentChapter(chapter)
        }
    }

    return (
        <header className="flex items-center justify-between px-5 py-3 bg-base-100 border-b border-base-300/30 shrink-0 gap-8">
            <div className="flex items-center gap-3 flex-1">
                {/* Logo Icon */}
                <div className='tooltip tooltip-right' data-tip={t("header.show-my-novels")}>
                    <Link href="/my-novels" className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-md flex items-center justify-center text-base-100 font-bold text-lg cursor-pointer hover:shadow-md transition-shadow">
                        ◆
                    </Link>
                </div>

                {/* Document Title Input */}
                <div className="flex gap-2">
                    <input
                        disabled={loadingDocument}
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        onKeyDown={handleSaveTitleKeyDown}
                        onBlur={(e) => {
                            setTitle(document?.title ?? t("editor.defaultTitle"))
                        }}
                        className="text-base font-semibold text-base-content bg-transparent border-none outline-none hover:bg-base-200/40 focus:bg-base-200/40 px-2 py-1 rounded transition-colors min-w-[200px] max-w-sm"
                        placeholder="Untitled document"
                    />
                    {
                        loadingDocument &&
                        <span className="loading loading-infinity" />
                    }
                </div>
            </div>

            {/* Center - Document Actions */}
            <div className="flex items-center gap-1 text-xs text-base-content/60">
                <select className='w-fit select select-sm' value={currentChapter?.id} onChange={(e) => handleSelectChapter(e)}>
                    <option value={''}>{t("editor.selectChapter")}</option>
                    {document?.chapters?.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                            {chapter.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Right side - Status & Controls */}
            <div className="flex items-center gap-5">
                {/* Save Status Indicator */}
                <div className="text-xs text-base-content/50 flex items-center gap-1.5 min-w-max">
                    {saveStatus === "saving" && (
                        <>
                            <span className="loading loading-spinner loading-xs bg-primary"></span>
                            <span>{t("editor.saving")}</span>
                        </>
                    )}
                    {saveStatus === "saved" && (
                        <>
                            <svg className="w-3.5 h-3.5 text-success" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span>{t("editor.saved")}</span>
                        </>
                    )}
                    {saveStatus === "error" && (
                        <>
                            <svg className="w-3.5 h-3.5 text-error" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                            <span className="text-error">{t("editor.error")}</span>
                        </>
                    )}
                </div>

                {/* Language Switcher - Compact */}
                <select
                    className="select select-xs "
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as "en" | "es" | "ja")}
                >
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                    <option value="ja">JA</option>
                </select>

                {/* Share Button */}
                <button className="btn btn-xs btn-primary ">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Share
                </button>

                {/* Profile Avatar */}
                <Link href="/profile" className="avatar hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold text-sm border border-secondary/30 hover:border-secondary/50">
                        {user?.email?.[0]?.toUpperCase()}
                    </div>
                </Link>
            </div>
        </header>
    )
}
