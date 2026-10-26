---
doc: spec
status: approved
---

# Escape Perfectionism — Technical Specification

A browser-based 2D first-person point-and-click escape game exploring perfectionism, task paralysis, and gentle self-compassion.
Source: `prd.md > Escape Perfectionism — Product Requirements`, `scope.md > The Unique Kernel`.

## How This Works, In Plain Language

The game runs entirely in the browser using standard web technologies: **HTML5, CSS3, and modern JavaScript**. There is no backend, no database, and no build pipeline or complex setup.

1. **The Room & Lighting (HTML/CSS):**
   The desk scene is built as a single responsive viewport. All objects—the desk, sliding drawer, laptop, to-do notepad, book organizer, and wall sticky notes—are rendered using layered HTML elements and SVG vector artwork. Atmospheric lighting is controlled through CSS radial gradients, vignettes, and dynamic filters (`brightness` and `saturate`) that visually dim the room as internal dread rises.

2. **The Smooth Camera Zoom (CSS Transforms):**
   When the player clicks the laptop to clean up tabs, JavaScript adds a `.zoomed-laptop` class to the room container. A CSS transform (`scale(2.4) translate(...)`) smoothly glides the camera forward so the laptop screen fills the player's view. When completed, the class is removed to glide smoothly back to the desk.

3. **The Game State Machine (JavaScript):**
   A single JavaScript object (`gameState`) manages narrative progress, tracking which step the player is on (Walk-up → Desk → Paralysis → Shrink Task → Laptop Tabs → Mental Clutter → Journal → Breathe → Ending).

4. **The Journal & Hover Reveal:**
   The journal overlays the screen with a clean 3-page notebook layout. Sentences are styled in handwriting font (`Caveat`). In CSS, hovering over an entry triggers `.j-line { display: none; }` and displays the centered faded gray psychological explanation in its place.

5. **Hold-to-Breathe Interaction:**
   JavaScript listens for `mousedown` and `mouseup` events on a breathing focal circle. Holding continuously for 3 seconds expands the circle, triggers a soothing visual release, clears the gloomy filter, and transitions the game to the closing scene.

---

## The Core Journey Through the System

Traces `prd.md > The Core Journey`:

1. **Step 1: Walk-Up (`WALK_UP`):**
   - Page loads → CSS fade-in animation simulates walking up to the desk.
   - Internal thought modal displays: *"I should really get some stuff done."*
   - Clicking anywhere advances state to `DESK`.

2. **Step 2: Desk Exploration (`DESK`):**
   - The interactive desk is active. Hovering over objects displays tooltip labels ("To-do list", "Open drawer", "Laptop").
   - Clicking the drawer slides it open (`transform: translateY(35px)`). Clicking the journal inside sets `gameState.journalOnDesk = true` and renders the journal on the desk.

3. **Step 3: To-Do List & Paralysis (`TODO_PARALYSIS`):**
   - Clicking the notepad opens the 6 impossible CS student tasks.
   - Choosing paralysis dialog appears: *"Should I really start with this one, or is it better to start another? Am I even going to finish this?"*

4. **Step 4: Shrink the Task (`SHRINK_TASK`):**
   - Dialogue triggers: *"Two chapters is one big task, isn't it? Shall we shrink it and be more realistic? We aren't superheroes, the last time I checked."*
   - Text morphs: "Finish 2 chapters" → "Study first 3 pages" → "Open book to page 1."
   - Prompt directs the player to the laptop: *"Clear unnecessary tabs and keep only the lecture slides and assignment open."*

5. **Step 5: Laptop Zoom & Close Tabs (`LAPTOP_ZOOM`):**
   - Room zooms into laptop screen. 5 tabs are displayed (e.g., Reddit, YouTube, Discord, Lecture Slides, Assignment).
   - Clicking '✕' on distractor tabs closes them. When only the two essential tabs remain, the laptop zooms back out.

6. **Step 6: Mental Clutter Realization (`MENTAL_CLUTTER`):**
   - Screen is clean, but room desaturates (gloom filter rises).
   - Character sighs: *"I feel overwhelmed and distracted by many thoughts. I will get to my journal and then after continue working on this task."*
   - If journal is on desk → glowing outline invites click.
   - If journal is still in drawer → thought prompts: *"Search for your journal to clear your thoughts."*

7. **Step 7: Journal Exploration (`JOURNAL`):**
   - Journal overlay opens. Player flips through:
     - **Page 1 (Pressure & Detail):** 4 entries with centered hover-reveals.
     - **Page 2 (Inner Critic & Panic):** 4 entries with centered hover-reveals.
     - **Page 3 (When in Panic):** 3 tilted grounding frames.
   - The 3rd frame prompts the breathing reset before closing the notebook.

8. **Step 8: Hold-to-Breathe (`BREATHE`):**
   - Breathing circle appears. Player presses and holds mouse for 3 seconds.
   - Scene brightness/warmth transitions smoothly from gloom to gentle golden lamp light.

9. **Step 9: Ending (`ENDING`):**
   - Sticky note on wall morphs from *"Don't mess this up"* to *"Don't be so hard on yourself"*.
   - Closing message displays: *"Action is the real win."*

---

## Stack

- **Language:** HTML5, CSS3, modern Vanilla JavaScript (ES6+).
  - *Rationale:* Zero compilation, zero npm overhead, native browser performance, completely portable.
  - *Tradeoff:* Requires organizing code manually without framework component abstractions, which is ideal for a focused single-scene game.
- **Typography & Fonts:** Google Fonts CDN
  - `Caveat`: Handwritten journal text and sticky notes ([Documentation](https://fonts.google.com/specimen/Caveat)).
  - `Cormorant Garamond`: Italic inner-voice character thoughts ([Documentation](https://fonts.google.com/specimen/Cormorant+Garamond)).
  - `Special Elite`: Retro typewriter hover tooltips and labels ([Documentation](https://fonts.google.com/specimen/Special+Elite)).
- **Icons / Graphics:** Inline SVGs
  - *Rationale:* Infinite scaling without pixelation, controllable via CSS colors and transitions.

---

## Where It Runs and How Someone Tries It

- **Runtime:** Any modern desktop browser (Chrome, Edge, Firefox, Safari).
- **Local Run:** Double-click `index.html` or open via a local server (e.g. VS Code Live Server or python `-m http.server`).
- **Demo Recording:** Recorded locally in full-screen browser window (1080p, 16:9).
- **Public Repository:** Pushed to GitHub repository (`devpost-hackathon-project`).
- **Optional Deployment:** GitHub Pages (can be enabled with one click in repository settings).

---

## Look and Feel

- **Palette:** 
  - Deep Midnight Navy: `#090e17`
  - Slate Blue Surfaces: `#101a2b`, `#16233b`
  - Cold Steel Borders: `#223758`
  - Cyan / Ice Blue Accents: `#4b8fe2`, `#84bbf7`
  - Sticky Note Yellow: `#d9c97a` (with dark ink `#3a3210`)
  - Warm Progress Amber: `#f4a261`
- **Atmosphere & Lighting:** Dark Dome aesthetic—quiet, solitary late-night college dorm/bedroom, moody shadow vignettes around the viewport edge.
- **Copy Tone:** Deeply empathetic, vulnerable, honest inner monologue. Never clinical or patronizing.

---

## Components

### 1. Viewport & Room (`#game-viewport`)
Implements `prd.md > Screens and Layout (Desk scene)`.
- Enforces a 16:9 aspect ratio container centered on screen with `overflow: hidden`.
- Applies dynamic CSS filter: `filter: saturate(var(--sat)) brightness(var(--bright))`.
- Contains background wall, desk surface, and camera zoom container.

### 2. Desk & Interactive Objects (`#desk-surface`)
Implements `prd.md > Screens and Layout` and `prd.md > The to-do list and sticky notes`.
- **Drawer (`#drawer`):** Slides down on click. Contains SVG journal icon.
- **Laptop (`#laptop`):** Click triggers `.zoomed-laptop` CSS camera transform.
- **To-Do Notepad (`#notepad`):**
  - **Initial Click (The Freeze):** Clicking the pad pops up the choosing paralysis dilemma on screen:
    - *"Too many tasks... where do I even start? Am I even going to finish this?"*
    - Choice 1: *"Let's check our phone first"* → triggers delay, advances clock, deepens gloom.
    - Choice 2: *"Just pick anything"* → breaks the initial freeze and lets player select a task.
  - **Task Interaction & Shrinking:**
    - **Click 1 on *"Finish 2 chapters"*:** The task text remains *"Finish 2 chapters"*. A thought dialogue questions the overwhelming scope: *"Two chapters is one big task, isn't it? Shall we shrink the task and be more realistic? We aren't superheroes, the last time I checked."*
    - **Click 2 (clicking it again):** The task text actually shrinks to: *"Finish studying first 3 pages of chapter 1"*. A calming dialogue appears: *"A bit better. But remember, the real first task is just to open the book to page 1.* with **Next goal: clear unnecessary tabs on the laptop.** highlighted in deep blue (`#1e3a8a` background / `#ffffff` text / `#3b82f6` border). (The task text stays at 3 pages—it does not change to 1 page).
    - **Subsequent clicks:** Reaffirms the calming guidance without further task mutation.
  - **Other Tasks (Projects, Gym, Sleep):** Clicking any other task shows a switching hesitation thought: *"Maybe the other one? No... don't jump between tasks. Let's focus on this one."*

### 3. Laptop Zoom Surface (`#laptop-screen`)
Implements `prd.md > Puzzles (Close the tabs)`.
- Displays browser mockup with 5 clickable tab tabs.
- Clicking '✕' removes distractor tabs. Tracks count until only Lecture Slides & Assignment remain.

### 4. Journal Overlay Modal (`#journal-modal`)
Implements `prd.md > Features and Behavior (Journal)` and `prd.md > Page 3: ( When in Panic )`.
- 3 page navigation tabs:
  - Page 1: 4 pressure/comparison entries with Option B hover disappearance.
  - Page 2: 4 inner critic/panic entries with Option B hover disappearance.
  - Page 3: 3 tilted organic grounding frames centered with user's exact affirmations.

### 5. Dialogue & Thought Box (`#dialogue-box`)
Implements `prd.md > Paralysis and escape choices`.
- Floating speech/thought bubble displaying character's inner voice in `Cormorant Garamond` italic.
- Displays responsive choice buttons when decisions are required.

### 6. Breathing Controller (`#breathe-modal`)
Implements `prd.md > Puzzles (Quiet the chest tightness)`.
- Expanding glowing circle responding to pointer down/up events.
- Timer checks for 3000ms continuous hold.

---

## Data Model (In-Memory State)

Lives in `game.js`. Pure in-memory (refresh resets game per non-goal specifications):

```javascript
const gameState = {
  currentStep: 'WALK_UP', // WALK_UP, DESK, TODO, SHRINK, LAPTOP, CLUTTER, JOURNAL, BREATHE, ENDING
  drawerOpen: false,
  journalOnDesk: false,
  laptopZoomed: false,
  tabs: [
    { id: 'slides', name: 'CS Lecture Slides', keep: true, closed: false },
    { id: 'assign', name: 'Assignment Specs', keep: true, closed: false },
    { id: 'reddit', name: 'r/csMajors (Doomscrolling)', keep: false, closed: false },
    { id: 'youtube', name: 'YouTube - 4hr Tutorial', keep: false, closed: false },
    { id: 'discord', name: 'Discord (Study Group)', keep: false, closed: false }
  ],
  gloom: 20,              // 0 (calm) to 100 (peak panic)
  holdBreatheTimer: null
};
```

---

## File Structure

```
devpost-hackathon-project/
├── index.html            # Main game markup, SVG definitions, room layout, modals
├── style.css             # Dark Dome styling, CSS camera transforms, moody lighting, tilted frames
├── game.js               # State machine, event handlers, tab logic, hold-to-breathe mechanics
├── devpost/              # Planning & Devpost submission documentation
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md
│   └── spec.html
└── README.md             # Project overview & demo instructions
```

---

## Important Failure Modes

1. **Player forgets to explore drawer before laptop clutter:**
   - *Fallback:* When mental clutter hits in Step 6, if `journalOnDesk` is false, character explicitly prompts: *"Search your drawer to clear your thoughts."* A subtle highlight pulses on the drawer handle.
2. **Player releases mouse early during hold-to-breathe:**
   - *Fallback:* Breathing circle gently resets to initial size with a soft reminder: *"Take your time. Hold to breathe."*
3. **Screen scaling on small laptop displays:**
   - *Fallback:* `#game-viewport` uses CSS `max-width: 100vw; max-height: 100vh; aspect-ratio: 16/9;` with `object-fit: contain` so all desk elements remain in fixed relative positions.

---

## What Was Simplified and Why

- **Vector SVG & CSS Art instead of 3D or Raster Sprites:** Keeps the asset size tiny (<100KB total), prevents broken image URLs, guarantees crispness on 4K monitors, and allows instant code-level color shifts.
- **In-Memory State instead of LocalStorage / Database:** Refreshing restarts the game cleanly. For a 3–5 minute narrative demo experience, persistence adds unnecessary state-recovery bugs without proving any extra value.
- **Single Room Viewport instead of Multi-Room Navigation:** Keeps the entire project focused on the desk and the character's internal thoughts, avoiding scope creep.

---

## Decisions and Open Issues

- **Technical Tradeoffs Agreed:** Pure HTML/CSS/JS chosen over React/Vite to eliminate setup hurdles and guarantee immediate runnability.
- **One Useful Unknown Explored:** Explained how CSS `transform` camera zooms work (`scale` and `translate`) and how mouse `mousedown`/`mouseup` timers power the hold-to-breathe mechanic.
- **Status:** Complete technical blueprint ready for verification.
