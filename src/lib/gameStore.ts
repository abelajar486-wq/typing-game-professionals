// Game state management with localStorage

export interface PilotInfo {
  id: 'nova' | 'orion' | 'void';
  name: string;
  class: string;
  perk: string;
  icon: string;
}

export const PILOTS: PilotInfo[] = [
  { id: 'nova', name: 'Nova', class: 'Speed Pilot', perk: 'Score x1.2', icon: '⚡' },
  { id: 'orion', name: 'Orion', class: 'Tank Commander', perk: '+50 Shield HP', icon: '🛡️' },
  { id: 'void', name: 'Void', class: 'Dark Hacker', perk: 'Score x2.0', icon: '👁️' },
];

export interface PlayerProfile {
  name: string;
  pilotId: 'nova' | 'orion' | 'void' | null;
  exp: number;
  rank: string;
  language: 'en' | 'th';
}

export interface LevelResult {
  stars: number; // 0-3
  bestScore: number;
  bestAccuracy: number;
  bestWpm: number;
  completed: boolean;
}

export interface GameProgress {
  // key: "ch{chapter}-lv{level}" e.g. "ch1-lv1"
  [key: string]: LevelResult;
}

export interface LeaderboardEntry {
  name: string;
  pilotId: string;
  chapter: number;
  level: number;
  score: number;
  accuracy: number;
  timestamp: number;
}

const STORAGE_KEYS = {
  profile: 'startype_profile',
  progress: 'startype_progress',
  leaderboard: 'startype_leaderboard',
};

const RANKS = [
  { name: 'Cadet', minExp: 0 },
  { name: 'Ensign', minExp: 100 },
  { name: 'Lieutenant', minExp: 300 },
  { name: 'Commander', minExp: 600 },
  { name: 'Captain', minExp: 1000 },
  { name: 'Admiral', minExp: 1500 },
  { name: 'Fleet Marshal', minExp: 2500 },
];

export function getRank(exp: number): string {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (exp >= RANKS[i].minExp) return RANKS[i].name;
  }
  return 'Cadet';
}

export function getExpToNextRank(exp: number): { current: number; next: number; progress: number } {
  for (let i = 0; i < RANKS.length - 1; i++) {
    if (exp < RANKS[i + 1].minExp) {
      const current = RANKS[i].minExp;
      const next = RANKS[i + 1].minExp;
      return { current, next, progress: ((exp - current) / (next - current)) * 100 };
    }
  }
  return { current: RANKS[RANKS.length - 1].minExp, next: RANKS[RANKS.length - 1].minExp, progress: 100 };
}

export function getProfile(): PlayerProfile | null {
  const data = localStorage.getItem(STORAGE_KEYS.profile);
  return data ? JSON.parse(data) : null;
}

export function saveProfile(profile: PlayerProfile): void {
  profile.rank = getRank(profile.exp);
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function getProgress(): GameProgress {
  const data = localStorage.getItem(STORAGE_KEYS.progress);
  return data ? JSON.parse(data) : {};
}

export function saveProgress(progress: GameProgress): void {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress));
}

export function saveLevelResult(chapter: number, level: number, result: LevelResult): void {
  const progress = getProgress();
  const key = `ch${chapter}-lv${level}`;
  const existing = progress[key];
  if (!existing || result.bestScore > existing.bestScore) {
    progress[key] = result;
  } else {
    progress[key] = {
      ...existing,
      stars: Math.max(existing.stars, result.stars),
      bestScore: Math.max(existing.bestScore, result.bestScore),
      bestAccuracy: Math.max(existing.bestAccuracy, result.bestAccuracy),
      bestWpm: Math.max(existing.bestWpm, result.bestWpm),
      completed: existing.completed || result.completed,
    };
  }
  saveProgress(progress);
}

export function isLevelUnlocked(chapter: number, level: number): boolean {
  if (chapter === 1 && level === 1) return true;
  const progress = getProgress();
  if (level > 1) {
    const prevKey = `ch${chapter}-lv${level - 1}`;
    return progress[prevKey]?.completed || false;
  }
  // First level of a chapter: need to complete last level of previous chapter
  const prevKey = `ch${chapter - 1}-lv10`;
  return progress[prevKey]?.completed || false;
}

export function isChapterUnlocked(chapter: number): boolean {
  if (chapter === 1) return true;
  return isLevelUnlocked(chapter, 1);
}

export function getChapterProgress(chapter: number): { completed: number; total: number; stars: number } {
  const progress = getProgress();
  let completed = 0;
  let stars = 0;
  for (let i = 1; i <= 10; i++) {
    const key = `ch${chapter}-lv${i}`;
    if (progress[key]?.completed) completed++;
    stars += progress[key]?.stars || 0;
  }
  return { completed, total: 10, stars };
}

export function getLeaderboard(): LeaderboardEntry[] {
  const data = localStorage.getItem(STORAGE_KEYS.leaderboard);
  return data ? JSON.parse(data) : [];
}

export function addLeaderboardEntry(entry: LeaderboardEntry): void {
  const lb = getLeaderboard();
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(lb.slice(0, 50)));
}
