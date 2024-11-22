"use client";
import { LiveblocksProvider } from "@liveblocks/react";
import React, { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      {children}
    </LiveblocksProvider>
  );
};

export default Providers;
