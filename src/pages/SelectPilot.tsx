import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { getProfile, saveProfile, PILOTS, type PilotInfo } from "@/lib/gameStore";

const SelectPilot = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const profile = getProfile();

  if (!profile) {
    navigate("/register");
    return null;
  }

  const handleConfirm = () => {
    if (!selected) return;
    saveProfile({ ...profile, pilotId: selected as PilotInfo["id"] });
    navigate("/");
  };

  const glowColors: Record<string, string> = {
    nova: "border-glow-cyan",
    orion: "border-glow-purple",
    void: "border-glow-magenta",
  };

  const accentColors: Record<string, string> = {
    nova: "text-primary",
    orion: "text-secondary",
    void: "text-accent",
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl px-6">
        <div className="text-center">
          <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em] mb-2">
            SELECT YOUR PILOT
          </h1>
          <p className="font-mono-share text-sm text-muted-foreground tracking-wider">
            Choose your combat class, Commander {profile.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {PILOTS.map((pilot) => (
            <button
              key={pilot.id}
              onClick={() => setSelected(pilot.id)}
              className={`relative flex flex-col items-center gap-3 p-6 border rounded-xl bg-card/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                selected === pilot.id
                  ? `border-primary ${glowColors[pilot.id]} scale-105 bg-card/90`
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <span className="text-5xl">{pilot.icon}</span>
              <h3 className={`font-orbitron text-lg font-bold tracking-wider ${accentColors[pilot.id]}`}>
                {pilot.name}
              </h3>
              <p className="font-mono-share text-xs text-muted-foreground tracking-wider uppercase">
                {pilot.class}
              </p>
              <div className="mt-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                <p className="font-mono-share text-xs text-neon-yellow tracking-wider">
                  {pilot.perk}
                </p>
              </div>
              {selected === pilot.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-72">
          <button
            onClick={() => navigate("/register")}
            className="flex-1 py-3 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
          >
            ← BACK
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="flex-1 py-3 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border-glow-cyan"
          >
            CONFIRM →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectPilot;
