"use client"
import { useUser } from "@clerk/nextjs";

import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface MediaRoomProps {
  chatId: string;
  video: boolean; 
  audio: boolean;
}


export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader className="h-7 w-7 animate-spin my-4 text-zinc-500" />
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIKEKIT_URL}
      connect={true}
      data-lk-theme="default"
    >
      
      <VideoConference />
      
      <RoomAudioRenderer />
      
     
    </LiveKitRoom>
  );
};
