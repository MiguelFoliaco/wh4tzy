import { Tables } from "@/supabase/database.types";
import { create } from "zustand";
import { GetChaptersByDocumentIdReturn, UpsertChapterReturn, UpsertDocumentReturn } from "../services";

type NovelState = {
    document: UpsertDocumentReturn;
    chapters: UpsertChapterReturn[];
    setDocument: (document: UpsertDocumentReturn) => void;
    setChapters: (chapters: UpsertChapterReturn[]) => void;
    currentChapter: UpsertChapterReturn | null;
    setCurrentChapter: (chapter: UpsertChapterReturn) => void;
}

export const useNovel = create<NovelState>(set => ({
    document: null,
    chapters: [],
    currentChapter: null,
    setDocument: (document) => set({ document }),
    setChapters: (chapters) => set({ chapters }),
    setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
}))