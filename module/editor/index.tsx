"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TranslateProvider, useTranslate } from "../common/hook/useTranslate";
import Link from "next/link";

// Dynamically import the EditorCanvas component so it doesn't run during SSR
const EditorCanvas = dynamic(() => import("./components/editor"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center pt-20 text-base-content/50">Loading editor...</div>,
});

const EditorLayoutContent = () => {
  const { t, locale, setLocale } = useTranslate();
  const [title, setTitle] = useState(t("editor.defaultTitle"));
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Here you could also trigger a save of the title to local storage
    localStorage.setItem("novel-draft-title", e.target.value);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-base-100 overflow-hidden font-sans">
      {/* Technical Header - Compact */}
      <header className="flex items-center justify-between px-5 py-3 bg-base-100 border-b border-base-300/30 shrink-0 gap-8">
        <div className="flex items-center gap-3 flex-1">
          {/* Logo Icon */}
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center text-base-100 font-bold text-lg cursor-pointer hover:shadow-md transition-shadow">
            ◆
          </div>

          {/* Document Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-base font-semibold text-base-content bg-transparent border-none outline-none hover:bg-base-200/40 focus:bg-base-200/40 px-2 py-1 rounded transition-colors min-w-[200px] max-w-sm"
            placeholder="Untitled document"
          />
        </div>

        {/* Center - Document Actions */}
        <div className="flex items-center gap-1 text-xs text-base-content/60">
          <button className="px-2.5 py-1.5 hover:bg-base-200/40 rounded transition-colors font-medium">
            File
          </button>
          <button className="px-2.5 py-1.5 hover:bg-base-200/40 rounded transition-colors font-medium">
            Edit
          </button>
          <button className="px-2.5 py-1.5 hover:bg-base-200/40 rounded transition-colors font-medium">
            View
          </button>
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
            className="select select-xs focus:outline-none focus:ring-1 focus:ring-primary text-xs bg-base-200/30 border border-base-300/30 h-9 px-2"
            value={locale}
            onChange={(e) => setLocale(e.target.value as "en" | "es" | "ja")}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="ja">JA</option>
          </select>

          {/* Share Button */}
          <button className="btn btn-xs btn-primary h-9 min-h-9 px-4 gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Share
          </button>

          {/* Profile Avatar */}
          <Link href="/profile" className="avatar hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-md bg-secondary/20 flex items-center justify-center text-secondary font-semibold text-sm border border-secondary/30 hover:border-secondary/50">
              U
            </div>
          </Link>
        </div>
      </header>

      {/* Editor Canvas Area - Full Width */}
      <main className="flex-1 overflow-y-auto w-full bg-gradient-to-b from-base-100 to-base-100">
        <EditorCanvas onSaveStatusChange={setSaveStatus} />
      </main>
    </div>
  );
};

export const NovelEditor = () => {
  return (
    <TranslateProvider>
      <EditorLayoutContent />
    </TranslateProvider>
  );
};

