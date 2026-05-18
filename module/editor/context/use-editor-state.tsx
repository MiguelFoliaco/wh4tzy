import { create } from "zustand";
import EditorJS from "@editorjs/editorjs";

type State = {
    editorValue: EditorJS | null;
    editorHelpValue: EditorJS | null;

    setEditorValue: (editorValue: EditorJS | null) => void;
    setEditorHelpValue: (editorHelpValue: EditorJS | null) => void;
}

export const useEditorState = create<State>((set) => ({
    editorValue: null,
    editorHelpValue: null,
    setEditorValue: (editorValue) => set({ editorValue }),
    setEditorHelpValue: (editorHelpValue) => set({ editorHelpValue }),
}))