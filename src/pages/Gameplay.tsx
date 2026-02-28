import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarField from "@/components/StarField";
import { getProfile, saveProfile, saveLevelResult, addLeaderboardEntry, PILOTS } from "@/lib/gameStore";
import { getWordsForLevel } from "@/lib/wordLists";
import { Progress } from "@/components/ui/progress";

const STORY_DIALOGS: Record<number, string[]> = {
  1: ["Commander, we've detected unknown signals from the outer rim.", "Type the incoming transmissions to decode them!", "Good luck, pilot."],
  2: ["Warning! Electromagnetic storms ahead.", "Your typing precision will guide us through the nebula.", "Stay sharp!"],
  3: ["We've located the rogue station. Systems are corrupted.", "Override the AI by typing the command sequences!", "Be careful..."],
  4: ["The Shadow Fleet has emerged from dark space.", "Engage hostile transmissions with rapid typing!", "This is it, Commander."],
  5: ["The Nexus Gate is opening. This is our final stand.", "Type with everything you've got!", "The galaxy depends on you."],
};

const Gameplay = () => {
  const navigate = useNavigate();
  const { chapterId, levelId } = useParams();
  const chapter = parseInt(chapterId || "1");
  const level = parseInt(levelId || "1");
  const profile = getProfile();

  const [phase, setPhase] = useState<"dialog" | "typing" | "results">("dialog");
  const [dialogIndex, setDialogIndex] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shieldHp, setShieldHp] = useState(100);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pilot = profile ? PILOTS.find((p) => p.id === profile.pilotId) : null;
  const baseShield = pilot?.id === "orion" ? 150 : 100;
  const scoreMultiplier = pilot?.id === "nova" ? 1.2 : pilot?.id === "void" ? 2.0 : 1.0;

  const wordCount = 10 + level * 2;
  const dialogs = STORY_DIALOGS[chapter] || STORY_DIALOGS[1];

  useEffect(() => {
    setShieldHp(baseShield);
    setWords(getWordsForLevel(chapter, level, wordCount));
  }, [chapter, level, wordCount, baseShield]);

  // Timer
  useEffect(() => {
    if (phase !== "typing" || gameOver) return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, gameOver]);

  const endGame = useCallback(() => {
    setGameOver(true);
    setPhase("results");
  }, []);

  const startTyping = () => {
    setPhase("typing");
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = (value: string) => {
    setInput(value);
    if (value.endsWith(" ") || value.endsWith("\n")) {
      const typed = value.trim().toLowerCase();
      const target = words[currentIndex]?.toLowerCase();
      if (typed === target) {
        setCorrectCount((p) => p + 1);
        setScore((p) => p + Math.round(typed.length * 10 * scoreMultiplier));
      } else {
        setWrongCount((p) => p + 1);
        setShieldHp((p) => {
          const next = p - 15;
          if (next <= 0) {
            endGame();
            return 0;
          }
          return next;
        });
      }
      setInput("");
      const nextIndex = currentIndex + 1;
      if (nextIndex >= words.length) {
        endGame();
      } else {
        setCurrentIndex(nextIndex);
      }
    }
  };

  const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 100;
  const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 1;
  const wpm = elapsed > 0 ? Math.round(correctCount / Math.max(elapsed, 0.01)) : 0;

  const handleSaveResults = () => {
    const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : accuracy >= 60 ? 1 : 0;
    saveLevelResult(chapter, level, {
      stars,
      bestScore: score,
      bestAccuracy: accuracy,
      bestWpm: wpm,
      completed: currentIndex >= words.length || accuracy >= 60,
    });

    if (profile) {
      const expGain = Math.round(score * 0.1) + stars * 10;
      saveProfile({ ...profile, exp: profile.exp + expGain });
      addLeaderboardEntry({
        name: profile.name,
        pilotId: profile.pilotId || "nova",
        chapter,
        level,
        score,
        accuracy,
        timestamp: Date.now(),
      });
    }

    navigate(`/levels/${chapter}`);
  };

  // DIALOG PHASE
  if (phase === "dialog") {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <StarField />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg px-6">
          <div className="text-center mb-4">
            <p className="font-orbitron text-xs text-primary tracking-[0.3em]">
              CHAPTER {chapter} — LEVEL {level}
            </p>
          </div>
          <div className="border border-border rounded-xl bg-card/70 backdrop-blur-sm p-6 w-full border-glow-cyan">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{pilot?.icon || "🚀"}</span>
              <p className="font-mono-share text-sm text-foreground leading-relaxed">
                {dialogs[dialogIndex]}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {dialogIndex < dialogs.length - 1 ? (
              <button
                onClick={() => setDialogIndex((p) => p + 1)}
                className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan"
              >
                CONTINUE →
              </button>
            ) : (
              <button
                onClick={startTyping}
                className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan animate-pulse-glow"
              >
                START MISSION
              </button>
            )}
            <button
              onClick={startTyping}
              className="py-3 px-6 border border-border rounded-lg bg-card/40 font-orbitron text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
            >
              SKIP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS PHASE
  if (phase === "results") {
    const stars = accuracy >= 95 ? 3 : accuracy >= 80 ? 2 : accuracy >= 60 ? 1 : 0;
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <StarField />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-md px-6">
          <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-wider">
            {shieldHp <= 0 ? "MISSION FAILED" : "MISSION COMPLETE"}
          </h1>
          <div className="text-4xl text-neon-yellow">
            {"★".repeat(stars)}{"☆".repeat(3 - stars)}
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <StatBox label="SCORE" value={score.toString()} />
            <StatBox label="ACCURACY" value={`${accuracy}%`} />
            <StatBox label="WPM" value={wpm.toString()} />
            <StatBox label="WORDS" value={`${correctCount}/${words.length}`} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSaveResults} className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan">
              CONTINUE
            </button>
            <button onClick={() => { setPhase("dialog"); setDialogIndex(0); setCurrentIndex(0); setCorrectCount(0); setWrongCount(0); setScore(0); setTimeLeft(60); setShieldHp(baseShield); setGameOver(false); setInput(""); setWords(getWordsForLevel(chapter, level, wordCount)); }}
              className="py-3 px-6 border border-border rounded-lg bg-card/40 font-orbitron text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all">
              RETRY
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TYPING PHASE
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />
      {/* HUD */}
      <div className="relative z-10 flex items-center gap-4 px-4 py-2 bg-card/80 backdrop-blur-sm border-b border-border text-xs font-mono-share">
        <span className="text-primary">CH{chapter}-LV{level}</span>
        <span className="text-neon-yellow">⏱ {timeLeft}s</span>
        <span className="text-foreground">{correctCount}/{words.length}</span>
        <span className="text-neon-green">{accuracy}%</span>
        <span className="text-accent">♦ {score}</span>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-destructive">🛡️</span>
          <Progress value={(shieldHp / baseShield) * 100} className="w-20 h-2 bg-muted" />
          <span className="text-destructive">{shieldHp}</span>
        </div>
      </div>

      {/* Main typing area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-6">
        {/* Current word */}
        <div className="text-center">
          <p className="font-mono-share text-xs text-muted-foreground mb-2 tracking-widest">TYPE THIS WORD</p>
          <p className="font-orbitron text-4xl md:text-6xl font-bold text-primary text-glow-cyan tracking-wider">
            {words[currentIndex]}
          </p>
        </div>

        {/* Word queue */}
        <div className="flex gap-2 flex-wrap justify-center max-w-lg">
          {words.slice(currentIndex + 1, currentIndex + 6).map((w, i) => (
            <span key={i} className="font-mono-share text-sm text-muted-foreground/60 px-2 py-1 border border-border/30 rounded">
              {w}
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          className="w-full max-w-md bg-card/60 border border-border rounded-xl px-6 py-4 font-mono-share text-xl text-center text-foreground tracking-wider focus:outline-none focus:border-primary border-glow-cyan"
          placeholder="Type here..."
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border rounded-lg bg-card/60 p-3 text-center">
    <p className="font-mono-share text-[10px] text-muted-foreground tracking-wider">{label}</p>
    <p className="font-orbitron text-xl font-bold text-foreground">{value}</p>
  </div>
);

export default Gameplay;
