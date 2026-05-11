import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings, useT, type Language } from "@/lib/settings";
import { toast } from "@/hooks/use-toast";
import { Music, Volume2, Languages } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, update] = useSettings();
  const t = useT();

  const reset = () => {
    update({ musicVolume: 60, sfxVolume: 80, language: "id" });
    toast({ title: t("saved") });
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-10">
      <StarField />
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/")}
            className="py-2 px-5 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
          >
            {t("backToMenu")}
          </button>
          <div className="text-right">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold gradient-title tracking-[0.2em]">
              {t("settingsTitle")}
            </h1>
            <p className="font-mono-share text-[10px] md:text-xs text-muted-foreground tracking-[0.3em]">
              {t("settingsSubtitle")}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Music */}
          <section className="p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm border-glow-cyan">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-3 font-orbitron text-sm tracking-[0.2em] text-primary">
                <Music className="w-4 h-4" />
                {t("musicVolume").toUpperCase()}
              </label>
              <span className="font-mono-share text-sm text-foreground">{settings.musicVolume}%</span>
            </div>
            <Slider
              value={[settings.musicVolume]}
              max={100}
              step={1}
              onValueChange={(v) => update({ musicVolume: v[0] })}
            />
          </section>

          {/* SFX */}
          <section className="p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm border-glow-magenta">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-3 font-orbitron text-sm tracking-[0.2em] text-primary">
                <Volume2 className="w-4 h-4" />
                {t("sfxVolume").toUpperCase()}
              </label>
              <span className="font-mono-share text-sm text-foreground">{settings.sfxVolume}%</span>
            </div>
            <Slider
              value={[settings.sfxVolume]}
              max={100}
              step={1}
              onValueChange={(v) => update({ sfxVolume: v[0] })}
            />
          </section>

          {/* Language */}
          <section className="p-6 border border-border rounded-xl bg-card/60 backdrop-blur-sm border-glow-purple">
            <label className="flex items-center gap-3 font-orbitron text-sm tracking-[0.2em] text-primary mb-4">
              <Languages className="w-4 h-4" />
              {t("language").toUpperCase()}
            </label>
            <Select
              value={settings.language}
              onValueChange={(v: Language) => update({ language: v })}
            >
              <SelectTrigger className="font-mono-share bg-card/40 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">🇮🇩 {t("indonesian")}</SelectItem>
                <SelectItem value="en">🇬🇧 {t("english")}</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={reset}
              className="py-3 px-8 border border-border rounded-lg bg-card/40 font-orbitron text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all"
            >
              {t("reset")}
            </button>
            <button
              onClick={() => toast({ title: t("saved") })}
              className="py-3 px-8 border border-primary rounded-lg bg-primary/10 font-orbitron text-xs tracking-[0.2em] text-primary hover:bg-primary/20 transition-all border-glow-cyan"
            >
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
