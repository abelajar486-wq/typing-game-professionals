import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { saveProfile, type PlayerProfile } from "@/lib/gameStore";
import { Input } from "@/components/ui/input";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleProceed = () => {
    if (name.trim().length < 2) return;
    const profile: PlayerProfile = {
      name: name.trim(),
      pilotId: null,
      exp: 0,
      rank: "Cadet",
      language: "en",
    };
    saveProfile(profile);
    navigate("/select-pilot");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="font-orbitron text-3xl font-bold gradient-title tracking-[0.15em] mb-2">
            COMMANDER REGISTRATION
          </h1>
          <p className="font-mono-share text-sm text-muted-foreground tracking-wider">
            Enter your pilot name to begin
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="relative">
            <label className="font-mono-share text-xs text-primary tracking-widest uppercase mb-2 block">
              Pilot Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProceed()}
              placeholder="Enter callsign..."
              maxLength={20}
              className="bg-card/60 border-border font-mono-share text-lg tracking-wider text-center border-glow-cyan focus:border-primary h-14"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
            >
              ← BACK
            </button>
            <button
              onClick={handleProceed}
              disabled={name.trim().length < 2}
              className="flex-1 py-3 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed border-glow-cyan"
            >
              PROCEED →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
