import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { getRandomWords } from "@/lib/wordLists";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Mode = "30s" | "60s" | "25w" | "50w";

const FreeTyping = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("30s");
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [results, setResults] = useState<("correct" | "incorrect" | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctWords, setCorrectWords] = useState(0);
  const [wrongWords, setWrongWords] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const wordCount = mode === "25w" ? 25 : mode === "50w" ? 50 : 60;
  const isTimeBased = mode === "30s" || mode === "60s";
  const initialTime = mode === "30s" ? 30 : 60;

  const reset = useCallback(() => {
    setWords(getRandomWords(wordCount));
    setInput("");
    setWordIndex(0);
    setCharIndex(0);
    setResults(new Array(wordCount).fill(null));
    setStarted(false);
    setFinished(false);
    setTimeLeft(initialTime);
    setStartTime(null);
    setCorrectWords(0);
    setWrongWords(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [wordCount, initialTime]);

  useEffect(() => { reset(); }, [mode, reset]);

  // Timer
  useEffect(() => {
    if (!started || finished || !isTimeBased) return;
    if (timeLeft <= 0) { setFinished(true); return; }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [started, finished, timeLeft, isTimeBased]);

  const handleInput = (value: string) => {
    if (finished) return;
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    
    if (value.endsWith(" ")) {
      const typed = value.trim();
      const target = words[wordIndex];
      const newResults = [...results];
      const isCorrect = typed === target;
      newResults[wordIndex] = isCorrect ? "correct" : "incorrect";
      setResults(newResults);
      if (isCorrect) setCorrectWords((p) => p + 1);
      else setWrongWords((p) => p + 1);

      const nextIndex = wordIndex + 1;
      if (!isTimeBased && nextIndex >= words.length) {
        setFinished(true);
      }
      setWordIndex(nextIndex);
      setInput("");
      setCharIndex(0);
    } else {
      setInput(value);
      setCharIndex(value.length);
    }
  };

  const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
  const wpm = elapsed > 0 ? Math.round(correctWords / Math.max(elapsed, 0.01)) : 0;
  const accuracy = correctWords + wrongWords > 0 ? Math.round((correctWords / (correctWords + wrongWords)) * 100) : 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-8">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-6">
        <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em]">FREE TYPING</h1>

        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-2">
          <TabsList className="bg-card/60 border border-border">
            <TabsTrigger value="30s" className="font-mono-share text-xs tracking-wider data-[state=active]:text-primary">30 SEC</TabsTrigger>
            <TabsTrigger value="60s" className="font-mono-share text-xs tracking-wider data-[state=active]:text-primary">60 SEC</TabsTrigger>
            <TabsTrigger value="25w" className="font-mono-share text-xs tracking-wider data-[state=active]:text-primary">25 WORDS</TabsTrigger>
            <TabsTrigger value="50w" className="font-mono-share text-xs tracking-wider data-[state=active]:text-primary">50 WORDS</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Word display */}
        <div className="w-full p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm min-h-[120px]">
          <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono-share text-lg leading-relaxed">
            {words.map((word, i) => (
              <span
                key={i}
                className={`transition-colors ${
                  results[i] === "correct"
                    ? "text-neon-green"
                    : results[i] === "incorrect"
                    ? "text-destructive line-through"
                    : i === wordIndex
                    ? "text-primary text-glow-cyan"
                    : "text-muted-foreground/60"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          disabled={finished}
          className="w-full max-w-md bg-card/60 border border-border rounded-xl px-6 py-4 font-mono-share text-xl text-center text-foreground tracking-wider focus:outline-none focus:border-primary border-glow-cyan disabled:opacity-50"
          placeholder={finished ? "Done!" : "Start typing..."}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Stats */}
        <div className="flex gap-6 font-mono-share text-sm">
          <span className="text-primary">WPM: {wpm}</span>
          <span className="text-neon-green">ACC: {accuracy}%</span>
          <span className="text-foreground">Words: {correctWords + wrongWords}</span>
          {isTimeBased && <span className="text-neon-yellow">⏱ {timeLeft}s</span>}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan">
            RESTART
          </button>
          <button onClick={() => navigate("/")} className="py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all">
            ← MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeTyping;
