import useDocumentStore from "@/stores/collaborationStore";
import React, { FC, useEffect } from "react";

export type DocumentEditorPropsType = {
  documentId: string;
};

const DocumentEditor: FC<DocumentEditorPropsType> = (props) => {
  const { documentId } = props;
  const { content, setContent, cursors, setCursor } = useDocumentStore();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  //   useEffect(() => {
  //     const handleMouseMove = (e: MouseEvent) => {
  //       const cursor = { x: e.clientX, y: e.clientY };
  //       setCursor("currentUserId", cursor); // Replace "currentUserId" with the actual user ID from auth
  //     };

  //     window.addEventListener("mousemove", handleMouseMove);
  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   }, [setCursor]);

  useEffect(() => {
    // This is where you handle room initialization
    const client = liveblocks.getClient();
    client.joinRoom(documentId); // Join the specific document's room

    // Handle cursor updates
    const updateCursorPosition = (e: MouseEvent) => {
      setCursor("user-id", { x: e.clientX, y: e.clientY }); // Use actual user ID
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [documentId, setCursor]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl border rounded-lg bg-white p-4 shadow">
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full h-96 border rounded-lg p-2 text-gray-800 resize-none"
          placeholder="Start writing your document here..."
        />
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(cursors).map(([userId, cursor]) => (
            <div
              key={userId}
              style={{
                position: "absolute",
                left: cursor.x,
                top: cursor.y,
              }}
              className="w-4 h-4 bg-blue-500 rounded-full"
            >
              {userId}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
