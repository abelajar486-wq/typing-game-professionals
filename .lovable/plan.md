

# StarType — Galactic Typing Wars

A space-themed typing game website for personal learning, inspired by the screenshots provided.

## Design & Theme
- Dark space background with animated twinkling stars
- Sci-fi/retro futuristic UI with neon cyan, magenta/pink, purple, and yellow accents
- Monospace/futuristic fonts with letter-spacing throughout
- Glowing borders and gradient underlines on buttons

## Screens & Flow

### 1. Main Menu
- Large "STARTYPE" title with gradient text (cyan-to-magenta)
- Subtitle "Galactic Typing Wars"
- Three menu buttons: Story Mode, Free Typing, Leaderboard
- Player info badge (top-right) showing name, rank, and EXP bar
- Language toggle (top-left)

### 2. Commander Registration
- Pilot name input field
- Proceed / Back buttons
- Name saved to localStorage

### 3. Select Pilot (Character Select)
- 3 pilot cards: **Nova** (Speed Pilot, Score x1.2), **Orion** (Tank Commander, +50 Shield HP), **Void** (Dark Hacker, Score x2.0)
- Each card has an icon, name, class, and perk
- Back / Confirm buttons

### 4. Chapter Select (Story Mode)
- 5 chapters listed vertically: First Contact, Nebula Storm, Rogue Station, Shadow Fleet, Nexus Gate
- Each shows chapter number, title, description, and progress (stars, levels cleared)
- Locked chapters show unlock requirement
- Play button on unlocked chapters

### 5. Level Select (per Chapter)
- Grid of 10 level cards per chapter
- Each shows level number, word count, time, and star rating (1-3 stars)
- Locked levels show lock icon and "???"
- Levels unlock sequentially

### 6. Gameplay — Story Mode
- **HUD bar** at top: Mission, Time (countdown), Words typed, Shield bar, Accuracy %, Score, Rank, EXP, Progress
- **Story dialog** phase: character portrait + dialog text, click to continue, skip all button
- **Typing phase**: Words appear as floating enemies on screen, type the glowing word to destroy it, word queue shown at bottom, typing input field at bottom
- Timer countdown, accuracy tracking, WPM tracking

### 7. Free Typing Mode
- Mode selector tabs: 30 sec, 60 sec, 25 words, 50 words
- Random space-themed words displayed in paragraph form
- Typed words highlight green (correct) or red (incorrect)
- Stats shown below: WPM, Accuracy, Words, Time
- Restart button, Menu button

### 8. Leaderboard
- "Galactic Hall of Fame" title
- Table rows: pilot icon, name, chapter-level, score, accuracy
- Back button

## Data & State
- All game data stored in **localStorage** (no backend needed)
- Player profile: name, selected pilot, EXP, rank
- Progress tracking: chapter/level completion, star ratings, best scores
- Leaderboard: local high scores per level

## Game Mechanics
- Words sourced from built-in space-themed word lists, increasing difficulty per level
- Star rating based on accuracy + speed thresholds
- EXP earned per level, rank progression system
- Shield HP decreases on wrong words (story mode); game over if shield reaches 0
- Pilot perks affect score multiplier or shield HP

