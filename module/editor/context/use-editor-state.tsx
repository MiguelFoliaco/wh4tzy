import { create } from "zustand";
import type EditorJS from "@editorjs/editorjs";

type State = {
    editorValue: EditorJS | null;
    editorHelpValue: EditorJS | null;

    setEditorValue: (editorValue: EditorJS | null) => void;
    setEditorHelpValue: (editorHelpValue: EditorJS | null) => void;

    lastEditorEvent: { type: string, detail: any } | null;
    setLastEditorEvent: (event: { type: string, detail: any } | null) => void;


    toolActive: 'translate' | 'rewrite' | 'ia' | 'math' | null;
    activeTool: (tool: State['toolActive'], args?: State['args']) => void;
    args?: {
        text?: string;
        sourceLanguage?: string;
        targetLanguage?: string;
        mode?: 'one' | 'in-write';

        prompt?: string;
    }
}

export const useEditorState = create<State>((set) => ({
    editorValue: null,
    editorHelpValue: null,
    setEditorValue: (editorValue) => set({ editorValue }),
    setEditorHelpValue: (editorHelpValue) => set({ editorHelpValue }),
    lastEditorEvent: null,
    setLastEditorEvent: (event) => set({ lastEditorEvent: event }),
    toolActive: null,
    activeTool: (tool, args) => set({ toolActive: tool, args }),
}))