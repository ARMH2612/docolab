"use client";

import { ReactNode, useMemo } from "react";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";

function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("roomId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);
  return exampleRoomId;
}

export function Room({ children }: { children: ReactNode }) {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-yjs-blocknote");

  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}
