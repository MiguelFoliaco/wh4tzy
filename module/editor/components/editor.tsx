"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";

import { useTranslate } from "../../common/hook/useTranslate";

const EDITOR_STORAGE_KEY = "novel-draft-data";

interface EditorCanvasProps {
  onSaveStatusChange: (status: "saved" | "saving" | "error") => void;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ onSaveStatusChange }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslate();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editorRef.current && containerRef.current) {
      // Initialize editor
      const initialDataStr = localStorage.getItem(EDITOR_STORAGE_KEY);
      let initialData: OutputData | undefined;

      if (initialDataStr) {
        try {
          initialData = JSON.parse(initialDataStr);
        } catch (e) {
          console.error("Failed to parse editor data from local storage", e);
        }
      }

      const editor = new EditorJS({
        holder: containerRef.current,
        data: initialData,
        placeholder: t("editor.placeholder"),
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["marker", "link"],
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4],
              defaultLevel: 2
            }
          },
          paragraph: {
            //@ts-ignore
            class: Paragraph,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          delimiter: Delimiter,
          marker: Marker,
          inlineCode: InlineCode,
        },
        onChange: async (api) => {
          onSaveStatusChange("saving");

          if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
          }

          saveTimeoutRef.current = setTimeout(async () => {
            try {
              const data = await api.saver.save();
              localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(data));
              onSaveStatusChange("saved");
            } catch (error) {
              console.error("Saving failed: ", error);
              onSaveStatusChange("error");
            }
          }, 1000); // Debounce save
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        try {
          editorRef.current.destroy();
        } catch (e) {
          console.error("Error destroying editor", e);
        }
        editorRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white min-h-[1056px] shadow-sm ring-1 ring-base-200/50 mt-6 mb-20 py-20 px-16 rounded-sm">
      <div
        ref={containerRef}
        className="prose prose-slate max-w-none focus:outline-none"
      />
    </div>
  );
};

export default EditorCanvas;
