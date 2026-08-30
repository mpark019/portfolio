"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function GamingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlayState = () => setIsPlaying(!video.paused);
    const syncTime = () => setCurrentTime(video.currentTime);

    video.addEventListener("play", syncPlayState);
    video.addEventListener("pause", syncPlayState);
    video.addEventListener("timeupdate", syncTime);
    video.addEventListener("ended", syncPlayState);

    return () => {
      video.removeEventListener("play", syncPlayState);
      video.removeEventListener("pause", syncPlayState);
      video.removeEventListener("timeupdate", syncTime);
      video.removeEventListener("ended", syncPlayState);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function seek(time: number) {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setCurrentTime(time);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center py-10 sm:py-16">
      <section className="w-full border-2 border-[#d8d6c7] bg-[#d8d6c7] p-1 shadow-[5px_5px_0_#4b4b45,-2px_-2px_0_#ffffff]">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#164a8c] via-[#2874bf] to-[#79b5e8] px-2 py-1 text-sm font-bold text-white">
          <span>roblox_parkour.mp4 — media player</span>
          <div className="flex gap-1" aria-hidden="true">
            <span className="grid size-4 place-items-center border border-white bg-[#d8d6c7] text-[10px] text-black">—</span>
            <span className="grid size-4 place-items-center border border-white bg-[#d8d6c7] text-[9px] text-black">□</span>
            <span className="grid size-4 place-items-center border border-white bg-[#d8d6c7] text-[10px] text-black">×</span>
          </div>
        </div>

        <div className="flex gap-5 border-x border-[#8c8a80] bg-[#ecebe2] px-3 py-2 text-sm text-[#242424]">
          <span>file</span>
          <span>view</span>
          <span>play</span>
          <span>tools</span>
          <span>help</span>
        </div>

        <div className="border-2 border-[#74736a] bg-black shadow-[inset_2px_2px_0_#3e3e3a]">
          <video
            className="aspect-video w-full object-contain"
            onClick={togglePlay}
            onDurationChange={(event) => setDuration(event.currentTarget.duration)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            ref={videoRef}
            src="/videos/roblox-parkour.mp4"
          >
            Your browser does not support HTML video.
          </video>
        </div>

        <div className="border-x border-b border-[#8c8a80] bg-[#d8d6c7] p-3 text-[#242424]">
          <input
            aria-label="Video progress"
            className="mb-3 w-full accent-[#1e5fa8]"
            max={duration || 0}
            min="0"
            onChange={(event) => seek(Number(event.target.value))}
            type="range"
            value={currentTime}
          />
          <div className="flex items-center gap-3">
            <button aria-label={isPlaying ? "Pause video" : "Play video"} className="grid size-11 place-items-center border-2 border-[#ffffff] bg-[#e9e8dd] text-xl shadow-[inset_-2px_-2px_0_#77766e,inset_2px_2px_0_#ffffff] active:shadow-[inset_2px_2px_0_#77766e]" onClick={togglePlay} type="button">
              {isPlaying ? "Ⅱ" : "▶"}
            </button>
            <button aria-label="Restart video" className="grid size-9 place-items-center border-2 border-[#ffffff] bg-[#e9e8dd] text-sm shadow-[inset_-2px_-2px_0_#77766e,inset_2px_2px_0_#ffffff] active:shadow-[inset_2px_2px_0_#77766e]" onClick={() => seek(0)} type="button">
              |◀
            </button>
            <button aria-label={isMuted ? "Unmute video" : "Mute video"} className="grid size-9 place-items-center border-2 border-[#ffffff] bg-[#e9e8dd] text-sm shadow-[inset_-2px_-2px_0_#77766e,inset_2px_2px_0_#ffffff] active:shadow-[inset_2px_2px_0_#77766e]" onClick={toggleMute} type="button">
              {isMuted ? "🔇" : "🔊"}
            </button>
            <span className="ml-auto font-mono text-sm" data-scramble-ignore>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
