"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import Avatars from "./Avatars";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";

type EditorProps = {
  doc: Y.Doc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any;
};

function BlockNote({ doc, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo.name,
        color: userInfo.color,
      },
    },
  });

  useEffect(() => {
    function setDefault() {
      if (!editor) {
        return;
      }

      if (editor.document.length === 1) {
        editor.insertBlocks(
          [{ type: "paragraph", content: "Hello world" }],
          editor.document[0]
        );
      }
    }

    if (provider.isReady) {
      setDefault();
    }

    provider.on("sync", setDefault);
    return () => provider.off("sync", setDefault);
  }, [provider, editor]);

  return (
    <div className="flex flex-col relative rounded-lg bg-white w-full h-full text-[#111827] ">
      <div className="flex justify-end px-4 items-center">
        <Avatars />
      </div>

      <BlockNoteView
        theme="light"
        className="outline-none border mx-3 rounded-lg flex-grow w-full h-full p-2"
        editor={editor}
        formattingToolbar={true}
        linkToolbar={true}
        sideMenu={true}
        slashMenu={true}
        filePanel={true}
        tableHandles={true}
      />
    </div>
  );
}

export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [provider, setProvider] = useState<any>();
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yDoc);
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }
  return <BlockNote doc={doc} provider={provider} />;
}
