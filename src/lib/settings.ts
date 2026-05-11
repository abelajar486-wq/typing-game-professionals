import { useEffect, useState } from "react";

export type Language = "en" | "id";

export type Settings = {
  musicVolume: number; // 0-100
  sfxVolume: number; // 0-100
  language: Language;
};

const KEY = "startype.settings";

const DEFAULTS: Settings = {
  musicVolume: 60,
  sfxVolume: 80,
  language: "id",
};

export function getSettings(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(s: Settings) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("startype:settings", { detail: s }));
}

export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const [settings, setSettings] = useState<Settings>(() => getSettings());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Settings>).detail;
      if (detail) setSettings(detail);
    };
    window.addEventListener("startype:settings", handler);
    return () => window.removeEventListener("startype:settings", handler);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    saveSettings(next);
    setSettings(next);
  };

  return [settings, update];
}

// ---------- Simple i18n ----------

const DICT = {
  en: {
    menu: "MENU",
    selectMode: "SELECT A MODE",
    storyMode: "Story Mode",
    freeTyping: "Free Typing",
    codeTyping: "Code Typing",
    politicsTyping: "Politics Typing",
    ebook: "Ebook",
    leaderboard: "Leaderboard",
    settings: "Settings",
    backToMenu: "← MENU",
    // settings page
    settingsTitle: "SETTINGS",
    settingsSubtitle: "AUDIO & LANGUAGE",
    musicVolume: "Music Volume",
    sfxVolume: "Sound Effects",
    language: "Language",
    english: "English",
    indonesian: "Bahasa Indonesia",
    save: "SAVE",
    reset: "RESET",
    saved: "Settings saved",
  },
  id: {
    menu: "MENU",
    selectMode: "PILIH MODE",
    storyMode: "Mode Cerita",
    freeTyping: "Ketik Bebas",
    codeTyping: "Ketik Kode",
    politicsTyping: "Ketik Politik",
    ebook: "Ebook",
    leaderboard: "Papan Skor",
    settings: "Pengaturan",
    backToMenu: "← MENU",
    settingsTitle: "PENGATURAN",
    settingsSubtitle: "AUDIO & BAHASA",
    musicVolume: "Volume Musik",
    sfxVolume: "Efek Suara",
    language: "Bahasa",
    english: "English",
    indonesian: "Bahasa Indonesia",
    save: "SIMPAN",
    reset: "RESET",
    saved: "Pengaturan tersimpan",
  },
} as const;

export type TKey = keyof (typeof DICT)["en"];

export function useT() {
  const [settings] = useSettings();
  return (key: TKey) => DICT[settings.language][key] ?? DICT.en[key];
}
