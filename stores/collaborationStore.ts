import { create } from "zustand";
import { liveblocks } from "@liveblocks/zustand";
import liveblocksClient from "./liveblocksClient";

export type CursorPositionType = { x: number; y: number };

export type DocumentState = {
  content: string;
  cursors: Record<string, CursorPositionType>;
  users: Record<string, { name: string; color: string }>;
  setContent: (newContent: string) => void;
  setCursor: (userId: string, cursor: CursorPositionType) => void;
};

const useDocumentStore = create<DocumentState>()(
  liveblocks(
    (set) => ({
      content: "",
      cursors: {},
      users: {},
      setContent: (newContent) => set({ content: newContent }),
      setCursor: (userId, cursor) =>
        set((state) => ({
          cursors: { ...state.cursors, [userId]: cursor },
        })),
    }),
    {
      client: liveblocksClient,

      presenceMapping: (state) => ({
        cursors: state.cursors,
        users: state.users,
      }),
      storageMapping: { content: true },
    }
  )
);

export default useDocumentStore;
