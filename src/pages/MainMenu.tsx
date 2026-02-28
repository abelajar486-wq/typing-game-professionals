import { useNavigate } from "react-router-dom";
import { getProfile, getExpToNextRank } from "@/lib/gameStore";
import StarField from "@/components/StarField";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile());

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const handleMenuClick = (path: string) => {
    if (!profile && path !== "/leaderboard") {
      navigate("/register");
    } else {
      navigate(path);
    }
  };

  const expInfo = profile ? getExpToNextRank(profile.exp) : null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      {/* Player badge */}
      {profile && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-3 border border-border rounded-lg px-4 py-2 bg-card/80 backdrop-blur-sm border-glow-cyan">
          <div className="text-right">
            <p className="font-orbitron text-xs text-primary tracking-widest">{profile.rank}</p>
            <p className="font-mono-share text-sm text-foreground">{profile.name}</p>
          </div>
          <div className="w-24">
            <p className="text-[10px] font-mono-share text-muted-foreground mb-0.5">EXP {profile.exp}</p>
            <Progress value={expInfo?.progress || 0} className="h-1.5 bg-muted" />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-orbitron text-6xl md:text-8xl font-black gradient-title tracking-[0.2em] mb-2">
            STARTYPE
          </h1>
          <p className="font-mono-share text-lg md:text-xl text-muted-foreground tracking-[0.5em] uppercase">
            Galactic Typing Wars
          </p>
        </div>

        {/* Menu buttons */}
        <div className="flex flex-col gap-4 w-72 mt-8">
          <MenuButton
            label="STORY MODE"
            icon="🚀"
            onClick={() => handleMenuClick("/chapters")}
            glowClass="border-glow-cyan"
          />
          <MenuButton
            label="FREE TYPING"
            icon="⌨️"
            onClick={() => handleMenuClick("/free-typing")}
            glowClass="border-glow-magenta"
          />
          <MenuButton
            label="LEADERBOARD"
            icon="🏆"
            onClick={() => navigate("/leaderboard")}
            glowClass="border-glow-purple"
          />
        </div>

        {/* Bottom hint */}
        {!profile && (
          <p className="font-mono-share text-xs text-muted-foreground mt-4 animate-pulse">
            [ Press any button to register as a Commander ]
          </p>
        )}
      </div>
    </div>
  );
};

const MenuButton = ({
  label,
  icon,
  onClick,
  glowClass,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  glowClass: string;
}) => (
  <button
    onClick={onClick}
    className={`relative w-full py-4 px-6 border border-border rounded-lg bg-card/60 backdrop-blur-sm font-orbitron text-sm tracking-[0.3em] text-foreground transition-all duration-300 hover:scale-105 hover:bg-card/90 gradient-underline ${glowClass}`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

export default MainMenu;
