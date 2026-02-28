import { useNavigate, useParams } from "react-router-dom";
import StarField from "@/components/StarField";
import { isLevelUnlocked, getProgress } from "@/lib/gameStore";
import { Lock } from "lucide-react";

const LevelSelect = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const chapter = parseInt(chapterId || "1");
  const progress = getProgress();

  const levels = Array.from({ length: 10 }, (_, i) => {
    const level = i + 1;
    const key = `ch${chapter}-lv${level}`;
    const result = progress[key];
    const unlocked = isLevelUnlocked(chapter, level);
    return { level, unlocked, result };
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-6">
        <h1 className="font-orbitron text-2xl font-bold gradient-title tracking-[0.15em]">
          CHAPTER {chapter}
        </h1>
        <p className="font-mono-share text-sm text-muted-foreground tracking-wider">Select a mission</p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
          {levels.map(({ level, unlocked, result }) => (
            <button
              key={level}
              onClick={() => unlocked && navigate(`/play/${chapter}/${level}`)}
              disabled={!unlocked}
              className={`flex flex-col items-center gap-1 p-4 border rounded-xl transition-all ${
                unlocked
                  ? "border-border bg-card/60 hover:bg-card/80 hover:scale-105 cursor-pointer"
                  : "border-border/30 bg-card/10 opacity-40 cursor-not-allowed"
              } ${result?.completed ? "border-glow-cyan" : ""}`}
            >
              {unlocked ? (
                <>
                  <span className="font-orbitron text-lg font-bold text-foreground">{level}</span>
                  <div className="text-neon-yellow text-xs">
                    {result?.stars ? "★".repeat(result.stars) + "☆".repeat(3 - result.stars) : "☆☆☆"}
                  </div>
                  {result?.bestScore ? (
                    <span className="font-mono-share text-[10px] text-muted-foreground">{result.bestScore}</span>
                  ) : null}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono-share text-[10px] text-muted-foreground">???</span>
                </>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/chapters")}
          className="mt-4 py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
        >
          ← CHAPTERS
        </button>
      </div>
    </div>
  );
};

export default LevelSelect;
