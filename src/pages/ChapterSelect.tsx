import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { isChapterUnlocked, getChapterProgress } from "@/lib/gameStore";
import { Lock } from "lucide-react";

const CHAPTERS = [
  { id: 1, title: "First Contact", desc: "Humanity's first encounter with alien signals in the outer rim." },
  { id: 2, title: "Nebula Storm", desc: "Navigate through electromagnetic interference in the Cygnus nebula." },
  { id: 3, title: "Rogue Station", desc: "Infiltrate an abandoned space station overrun by rogue AI." },
  { id: 4, title: "Shadow Fleet", desc: "Face the mysterious fleet emerging from dark space." },
  { id: 5, title: "Nexus Gate", desc: "The final battle at the interdimensional gateway." },
];

const ChapterSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-6">
        <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em] mb-4">
          STORY MODE
        </h1>

        <div className="flex flex-col gap-3 w-full">
          {CHAPTERS.map((ch) => {
            const unlocked = isChapterUnlocked(ch.id);
            const progress = getChapterProgress(ch.id);

            return (
              <div
                key={ch.id}
                className={`relative flex items-center gap-4 p-4 border rounded-xl transition-all ${
                  unlocked
                    ? "border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 cursor-pointer hover:scale-[1.02]"
                    : "border-border/50 bg-card/20 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => unlocked && navigate(`/levels/${ch.id}`)}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                  {unlocked ? (
                    <span className="font-orbitron text-lg font-bold text-primary">{ch.id}</span>
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-orbitron text-sm font-semibold tracking-wider text-foreground">
                    {ch.title}
                  </h3>
                  <p className="font-mono-share text-xs text-muted-foreground mt-0.5 truncate">
                    {unlocked ? ch.desc : "Complete previous chapter to unlock"}
                  </p>
                  {unlocked && progress.completed > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono-share text-[10px] text-neon-yellow">
                        {"★".repeat(Math.min(progress.stars, 30))} {progress.completed}/{progress.total} cleared
                      </span>
                    </div>
                  )}
                </div>
                {unlocked && (
                  <span className="font-orbitron text-xs text-primary tracking-wider">PLAY →</span>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
        >
          ← MENU
        </button>
      </div>
    </div>
  );
};

export default ChapterSelect;
