"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslate } from "../common/hook/useTranslate";
import { Toolbar } from "./components/toolbar";
import { getDocumentById, upsertDocument } from "./services";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../common/hook/useToast";
import { useNovel } from "./context/use-novel";
import { useUser } from "../auth/context/useUser";
import { HeaderDocument } from "./components/header";

// Dynamically import the EditorCanvas component so it doesn't run during SSR
const EditorCanvas = dynamic(() => import("./components/editor"), {
  ssr: false,
  loading: () => {
    const { t } = useTranslate();

    return <div className="w-full h-full flex items-center justify-center pt-20 text-base-content/50" >{t("editor.loading")}</div>
  },
});
const EditorHelpCanvas = dynamic(() => import("./components/editor.help"), {
  ssr: false,
  loading: () => {
    const { t } = useTranslate();

    return <div className="w-full h-full flex items-center justify-center pt-20 text-base-content/50" >{t("editor.loading")}</div>
  },
});

const EditorLayoutContent = () => {
  const { user } = useUser()
  const { t, locale, setLocale } = useTranslate();
  const { setDocument, document } = useNovel()
  const [loadingDocument, setLoadingDocument] = useState(false)
  const [title, setTitle] = useState(t("editor.defaultTitle"));
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | null>(null);
  const [tabHelp, setTabHelp] = useState(false)
  const { openToast } = useToast()
  const params = useSearchParams()
  const route = useRouter()
  const documentId = params.get('id')

  useEffect(() => {
    if (!user?.id) return;

    if (!documentId) {
      upsertDocument({
        body: {
          title: t("editor.defaultTitle"),
          status: 'draft',
          synopsis: '',
          cover_url: '',
          updated_at: new Date().toISOString(),
          auth_id: user.id,
        }
      }).then((res) => {
        if (res.error) {
          openToast('Error al crear el documento', 'error');
          return;
        }
        if (res.data) {
          console.log('Redirigiendo...', res.data.id)
          route.replace(`/editor?id=${res.data.id}&tab=write`)
          setTitle(res.data.title);
          setDocument(res.data)
        }
      })
        .catch((err) => {
          console.error(err)
        })
      return;
    }
    else {
      console.log('Call user doc')
      try {
        getDocumentById({ id: documentId })
          .then((res) => {
            if (res.error) {
              openToast('No se encontro el documento', 'error');
              console.log('Error en documento', res.error)
              return;
            }
            if (res.data) {
              console.log('Doc title: ', res.data)
              setTitle(res.data.title);
              setDocument(res.data);
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  }, [user?.id, documentId])


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Here you could also trigger a save of the title to local storage
    localStorage.setItem("novel-draft-title", e.target.value);
  };

  const handleSaveTitleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!user) return;
    if (e.key === 'Enter' && document) {
      setLoadingDocument(true)
      const res = await upsertDocument({
        body: { title: title, auth_id: user.id, id: document?.id }
      })
      console.log(res)
      setLoadingDocument(false)
      if (res.error) {
        openToast('Error al crear el documento', 'error');
        return;
      }
      if (res.data) {
        setTitle(res.data.title);
        setDocument(res.data)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-base-100 overflow-hidden font-sans">
      {/* Technical Header - Compact */}
      <HeaderDocument
        title={title}
        loadingDocument={loadingDocument}
        saveStatus={saveStatus}
        setTabHelp={setTabHelp}
        locale={locale}
        setLocale={setLocale}
        handleTitleChange={handleTitleChange}
        handleSaveTitleKeyDown={handleSaveTitleKeyDown}
        setTitle={setTitle}

      />

      {/* Toolbar */}
      <Toolbar tabHelp={tabHelp} setTabHelp={setTabHelp} />

      {/* Editor Canvas Area - Full Width */}
      <main className="flex-1 overflow-y-auto py-10 w-full bg-linear-to-b from-base-100 to-primary/5 flex justify-center">
        <EditorCanvas tabId={'main'} onSaveStatusChange={setSaveStatus} />
        {
          tabHelp && (
            <EditorHelpCanvas tabId={'help'} onSaveStatusChange={setSaveStatus} />
          )
        }
      </main>
    </div>
  );
};

export const NovelEditor = () => {
  return (
    <EditorLayoutContent />
  );
};

