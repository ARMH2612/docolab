import { DocumentEditor } from "@/components";
import React from "react";

const EditorPage = ({ documentId }: { documentId: string }) => {
  return (
    <div className="editor-page">
      <h1>Collaborate on Document: {documentId}</h1>
      <DocumentEditor documentId={documentId} />
    </div>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { documentId: string };
}) {
  return {
    props: {
      documentId: params.documentId, // The document ID from the URL
    },
  };
}

export default EditorPage;
