"use client";
import { useState, useEffect, useRef } from "react";
import { PlayCircle, CheckCircle2, Clock, Trophy, Undo2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getEmbedUrl } from "./YoutubeEmbed";

async function saveProgress(chapterId, watchPercent, completed, courseId) {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chapterId, watchPercent, completed, courseId }),
  });
  return res.json();
}

export default function CourseChapters({
  chapters,
  initialProgress = {},
  courseId,
  initialCourseCompleted = false,
  onCourseComplete,
  onCourseUncomplete,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(initialProgress);
  const [courseCompleted, setCourseCompleted] = useState(initialCourseCompleted);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  if (!chapters || chapters.length === 0) return null;

  const activeChapter = chapters[activeIndex];
  const completedCount = chapters.filter((ch) => progress[ch._id]?.completed).length;
  const coursePercent = Math.round((completedCount / chapters.length) * 100);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (!activeChapter) return;
    const embedUrl = getEmbedUrl(activeChapter.videoUrl);
    const videoId = embedUrl?.split("/embed/")[1]?.split("?")[0];
    if (!videoId) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const initPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onReady: () => startTracking(),
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) startTracking();
            if (
              e.data === window.YT.PlayerState.PAUSED ||
              e.data === window.YT.PlayerState.ENDED
            )
              stopTracking();
          },
        },
      });
    };

    if (window.YT?.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;

    return () => stopTracking();
  }, [activeIndex]);

  const startTracking = () => {
    stopTracking();
    intervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player?.getDuration) return;
      const duration = player.getDuration();
      const current = player.getCurrentTime();
      if (!duration) return;

      const percent = Math.round((current / duration) * 100);
      const chapterId = activeChapter._id;

      setProgress((prev) => {
        const existing = prev[chapterId] || {};
        if ((existing.watchPercent || 0) >= percent) return prev;
        const updated = {
          ...prev,
          [chapterId]: { ...existing, watchPercent: percent },
        };
        saveProgress(chapterId, percent, existing.completed || false, courseId);
        return updated;
      });
    }, 5000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleComplete = async (chapterId) => {
    const current = progress[chapterId] || {};
    setProgress((prev) => ({
      ...prev,
      [chapterId]: { ...current, completed: true, watchPercent: 100 },
    }));

    const result = await saveProgress(chapterId, 100, true, courseId);
    toast.success("Chapter marked as complete!");

    if (result?.courseCompleted) {
      setCourseCompleted(true);
      onCourseComplete?.();
      toast.success("🎉 Congratulations! You completed the course!", { duration: 5000 });
    }
  };

  const handleUndoComplete = async (chapterId) => {
    setProgress((prev) => ({
      ...prev,
      [chapterId]: { watchPercent: 0, completed: false },
    }));
    await saveProgress(chapterId, 0, false, courseId);
    setCourseCompleted(false);
    onCourseUncomplete?.();
    toast("Chapter marked as incomplete.");
  };

  return (
    <div className="mt-2">
      <Toaster position="top-right" />

      {/* Course completion banner */}
      {courseCompleted && (
        <div className="mb-4 flex items-center gap-3 bg-green-900/30 border border-green-500/40 text-green-400 rounded-xl px-4 py-3">
          <Trophy className="w-5 h-5 shrink-0" />
          <span className="font-semibold">Course Completed!</span>
        </div>
      )}

      {/* Overall course progress bar */}
      <div className="mb-5 p-3 bg-gray-800 rounded-xl">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Course Progress</span>
          <span className="text-white font-medium">
            {completedCount}/{chapters.length} chapters
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-linear-to-r from-purple-500 to-green-400 transition-all duration-500"
            style={{ width: `${coursePercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{coursePercent}% complete</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chapter sidebar */}
        <div className="lg:w-80 shrink-0 space-y-2">
          {chapters.map((chapter, i) => {
            const p = progress[chapter._id] || {};
            const percent = p.watchPercent || 0;
            const completed = p.completed || false;

            return (
              <button
                key={chapter._id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  activeIndex === i
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  ) : (
                    <PlayCircle className="w-5 h-5 shrink-0" />
                  )}
                  <span className="text-sm font-semibold truncate">
                    {i + 1}. {chapter.title}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      completed ? "bg-green-400" : "bg-purple-300"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">{percent}% watched</p>
              </button>
            );
          })}
        </div>

        {/* Video player */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">{activeChapter.title}</h3>
            {progress[activeChapter._id]?.completed ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </span>
                <button
                  onClick={() => handleUndoComplete(activeChapter._id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Undo2 className="w-3 h-3" /> Undo
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleComplete(activeChapter._id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Complete
              </button>
            )}
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <div id="yt-player" className="absolute inset-0 w-full h-full" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-purple-500 transition-all"
                style={{
                  width: `${progress[activeChapter._id]?.watchPercent || 0}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-400 w-12 text-right">
              {progress[activeChapter._id]?.watchPercent || 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}