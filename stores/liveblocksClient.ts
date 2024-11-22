import { NEXT_PUBLIC_LIVE_BLOCKS } from "@/config/constants";
import { createClient } from "@liveblocks/client";

const liveblocksClient = createClient({
  publicApiKey: NEXT_PUBLIC_LIVE_BLOCKS,
});

export default liveblocksClient;
