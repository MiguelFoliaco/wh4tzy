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
    <div className="flex flex-col h-screen w-full bg-base-200/50 overflow-hidden font-sans">
      {/* Google Docs Style Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-base-100 border-b border-base-200 shrink-0">
        <div className="flex items-center gap-4">
          {/* Mock Logo */}
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary font-bold text-xl cursor-pointer">
            N
          </div>

          <div className="flex flex-col justify-center">
            {/* Editable Title */}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="text-lg font-medium text-base-content bg-transparent border-none outline-none hover:bg-base-200 focus:bg-base-100 px-1.5 py-0.5 rounded-sm transition-colors w-fit min-w-[200px]"
            />

            {/* Menu Bar */}
            <div className="flex items-center gap-1 text-sm text-base-content/70 mt-0.5">
              <button className="px-2 py-0.5 hover:bg-base-200 rounded-sm cursor-pointer transition-colors">
                {t("editor.file")}
              </button>
              <button className="px-2 py-0.5 hover:bg-base-200 rounded-sm cursor-pointer transition-colors">
                {t("editor.edit")}
              </button>
              <button className="px-2 py-0.5 hover:bg-base-200 rounded-sm cursor-pointer transition-colors">
                {t("editor.view")}
              </button>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-6">
          {/* Save Status */}
          <div className="text-sm text-base-content/60 flex items-center gap-2">
            {saveStatus === "saving" && (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                {t("editor.saving")}
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t("editor.saved")}
              </>
            )}
            {saveStatus === "error" && (
              <span className="text-error">Error saving</span>
            )}
          </div>

          {/* Language Switcher */}
          <select
            className="select select-sm w-full max-w-xs focus:outline-none focus:ring-0 text-sm"
            value={locale}
            onChange={(e) => setLocale(e.target.value as "en" | "es" | "ja")}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ja">日本語</option>
          </select>

          {/* Share Button (Mock) */}
          <button className="btn btn-primary btn-sm">
            Share
          </button>

          {/* Profile Avatar (Mock) */}
          <Link className="avatar" href="/profile">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium border border-secondary/30">
              U
            </div>
          </Link>
        </div>
      </header>

      {/* Editor Canvas Area */}
      <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
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

