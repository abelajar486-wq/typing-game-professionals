import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { getRandomCodeSnippet } from "@/lib/extraWordLists";

const CodeTyping = () => {
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const reset = useCallback(() => {
    setSnippet(getRandomCodeSnippet());
    setInput("");
    setStartTime(null);
    setFinished(false);
    setErrors(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }, []);

  useEffect(() => { reset(); }, [reset]);

  const handleChange = (value: string) => {
    if (finished) return;
    if (!startTime) setStartTime(Date.now());

    // count new errors on this keystroke
    if (value.length > input.length) {
      const newChar = value[value.length - 1];
      const targetChar = snippet[value.length - 1];
      if (newChar !== targetChar) setErrors((e) => e + 1);
    }

    setInput(value);
    if (value === snippet) setFinished(true);
  };

  const elapsedMin = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
  const correctChars = input.split("").filter((c, i) => c === snippet[i]).length;
  const wpm = elapsedMin > 0 ? Math.round((correctChars / 5) / Math.max(elapsedMin, 0.01)) : 0;
  const totalTyped = input.length + errors;
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-8">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-6">
        <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em]">CODE TYPING</h1>
        <p className="font-mono-share text-xs text-muted-foreground tracking-widest">PROGRAMMING SNIPPETS · TYPE EXACTLY</p>

        <div className="w-full p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm">
          <pre className="font-mono-share text-base leading-relaxed whitespace-pre-wrap">
            {snippet.split("").map((char, i) => {
              const typed = input[i];
              let cls = "text-muted-foreground/60";
              if (typed != null) {
                cls = typed === char ? "text-neon-green" : "text-destructive bg-destructive/20";
              } else if (i === input.length) {
                cls = "text-primary text-glow-cyan border-b-2 border-primary";
              }
              return (
                <span key={i} className={cls}>
                  {char === "\n" ? "↵\n" : char}
                </span>
              );
            })}
          </pre>
        </div>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          disabled={finished}
          rows={4}
          className="w-full bg-card/60 border border-border rounded-xl px-6 py-4 font-mono-share text-base text-foreground focus:outline-none focus:border-primary border-glow-cyan disabled:opacity-50 resize-none"
          placeholder={finished ? "Complete!" : "Type the code above..."}
          autoFocus
          spellCheck={false}
        />

        <div className="flex gap-6 font-mono-share text-sm">
          <span className="text-primary">WPM: {wpm}</span>
          <span className="text-neon-green">ACC: {accuracy}%</span>
          <span className="text-destructive">Errors: {errors}</span>
          {finished && <span className="text-neon-yellow">✓ COMPLETE</span>}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan">
            NEW SNIPPET
          </button>
          <button onClick={() => navigate("/")} className="py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all">
            ← MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeTyping;
