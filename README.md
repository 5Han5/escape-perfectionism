# Escape Perfectionism 🌱

> *"Tonight, you do not need to be perfect. You only need to start."*

**Escape Perfectionism** is a 2D first-person browser escape-room story game about a college Computer Science student sitting at their desk at 2:14 AM during a quiet rainstorm—experiencing the freeze, dread, and task paralysis of perfectionism, and learning a gentle, practical way through it.

Most games reward finishing everything flawlessly. **This one rewards starting at all.**

---

## 🎮 How to Play (Run Locally)

No build tools, dependencies, or servers are required.

1. Clone or download this repository.
2. Open [`index.html`](index.html) directly in any modern desktop browser (Chrome, Edge, Firefox, or Safari).
3. Put on headphones (optional—synthesized procedural rain and distant thunder are built in) and click **Start**.

---

## 🧩 The Core Journey & Mechanics

1. **Late-Night Arrival (`2:14 AM`)**
   - A procedural rainy window and gentle inner-monologue intro welcome you to the desk.
2. **The Wall Sticky Note (`"DON'T MESS THIS UP."`)**
   - Inspecting the harsh rule on the wall reveals how self-imposed pressure creates fear before you even begin.
3. **Breaking Task Paralysis & Shrinking the Task**
   - Clicking the **To-Do List** notepad on the right brings up 3 floating choices above the pad (*Check my phone first*, *Do something fun instead*, or *Just pick one*).
   - Choosing **⚡ Just pick one** opens the 6-task CS checklist and lets you shrink an overwhelming goal (*"Finish 2 chapters"*) into something human and doable (*"Read the first 3 pages of chapter 1"*).
4. **Clearing Digital Noise (Laptop Zoom & Browser Tabs)**
   - Clicking the laptop smoothly zooms the camera into a Chrome-style browser with 6 open tabs:
     - **Distractions to close (`✕`):** `Search` (`seek.example`), `Discord` (`# cs301-homework-help`), and `LinkedIn`
     - **Study tabs to keep:** `Algorithms.pdf`, `GitHub` (`cs301/project-2-dijkstra`), and `Lecture slides`
5. **The Grounding Journal (3 Two-Page Spreads)**
   - When the screen is clear but your mind still feels noisy, opening the **Grounding Journal** on the left lets you hover over handwritten worries (`Reenie Beanie`) to uncover what they really mean (*fear of failure, constant comparison, all-or-nothing thinking, imposter syndrome*) and read a 3-step panic reset.
6. **Somatic Hold-to-Breathe Reset**
   - Pressing and holding the expanding water-ripple orb for **3 seconds** loosens the chest tightness and restores warmth to the room.
7. **The Real Win**
   - The sticky note on the wall transforms from *"DON'T MESS THIS UP."* to *"DON'T BE SO HARD ON YOURSELF. (Starting is a win)"*.

---

## 🛠️ Built With

- **HTML5, CSS3 & Vanilla JavaScript (ES6+)** — Zero frameworks or external dependencies; runs natively in any browser.
- **HTML5 Canvas & Web Audio API (`rain.js`)** — Real-time procedural rain particles on the window glass and synthesized pink/brown noise rain audio with distant thunder.
- **CSS Camera Transforms & Dynamic Filters** — Smooth `scale()` / `translate()` camera zoom into the laptop screen and dynamic `saturate()` / `brightness()` room mood transitions.
- **Google Fonts Typography** — `Cormorant Garamond` (literary titles & inner monologue), `Reenie Beanie` (journal handwriting), `Caveat` (sticky note & checklist), and `Special Elite` (typewriter hover labels).

---

## 📁 Project Structure

```text
devpost-hackathon-project/
├── index.html            # Main 16:9 room scene, Chrome laptop UI, notepad, journal & breathing modals
├── style.css             # Dark-navy atmospheric styling, S7/B1 pill & ripple UI, camera rig transforms
├── game.js               # Narrative state machine, puzzle interactions, tab manager & journal spreads
├── rain.js               # Procedural Canvas rain animation + Web Audio API rain & thunder synthesizer
├── desk_bg.png           # Clean late-night study desk & laptop illustration
└── devpost/              # Product & technical design docs + Devpost submission copy
    ├── scope.md
    ├── prd.md
    ├── spec.md
    └── submission.md
```
