// Space-themed word lists by difficulty

export const WORD_LISTS: Record<number, string[]> = {
  1: [
    'star', 'moon', 'sun', 'sky', 'ship', 'crew', 'beam', 'fuel', 'dock', 'core',
    'void', 'nova', 'wave', 'dust', 'glow', 'mars', 'ring', 'bolt', 'zone', 'gate',
    'dark', 'warp', 'helm', 'hull', 'scan', 'link', 'base', 'grid', 'flux', 'pods',
  ],
  2: [
    'orbit', 'laser', 'alien', 'comet', 'cargo', 'radar', 'hyper', 'solar', 'space', 'drone',
    'force', 'pilot', 'fleet', 'phase', 'blast', 'probe', 'quasar', 'nebula', 'titan', 'astro',
    'cyber', 'vapor', 'surge', 'relay', 'pulse', 'gamma', 'delta', 'sigma', 'omega', 'alpha',
  ],
  3: [
    'galaxy', 'rocket', 'meteor', 'shield', 'engine', 'fusion', 'photon', 'plasma', 'vector', 'beacon',
    'matrix', 'sector', 'system', 'colony', 'module', 'turret', 'cipher', 'static', 'binary', 'vortex',
    'cosmos', 'launch', 'impact', 'deploy', 'breach', 'signal', 'thruster', 'reactor', 'quantum', 'stellar',
  ],
  4: [
    'asteroid', 'starship', 'wormhole', 'supernova', 'hyperion', 'antimatter', 'lightspeed', 'telemetry',
    'commander', 'navigator', 'terraform', 'propulsion', 'frequency', 'satellite', 'radiation', 'dimension',
    'blackhole', 'interstellar', 'atmosphere', 'trajectory', 'coordinate', 'graviton', 'magnetar', 'hologram',
  ],
  5: [
    'constellation', 'electromagnetic', 'reconnaissance', 'gravitational', 'extraterrestrial', 'acceleration',
    'thermonuclear', 'consciousness', 'interplanetary', 'recalibration', 'decontamination', 'hypervelocity',
    'singularity', 'nanotechnology', 'teleportation', 'antimicrobial', 'spectroscopy', 'astrophysics',
  ],
};

export function getWordsForLevel(chapter: number, level: number, count: number = 15): string[] {
  const difficulty = Math.min(chapter, 5);
  const words = [...WORD_LISTS[difficulty]];
  // Add some from adjacent difficulties for variety
  if (difficulty > 1) words.push(...WORD_LISTS[difficulty - 1].slice(0, 10));
  if (difficulty < 5) words.push(...WORD_LISTS[difficulty + 1].slice(0, 5));
  
  // Shuffle and pick
  const shuffled = words.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getRandomWords(count: number): string[] {
  const allWords = Object.values(WORD_LISTS).flat();
  const shuffled = allWords.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
