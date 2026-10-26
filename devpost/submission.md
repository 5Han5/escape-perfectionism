# Devpost Submission Copy & Demo Guide — Escape Perfectionism

You can copy and paste the sections below directly into your Devpost submission form.

---

## Tagline / Elevator Pitch (Under 200 characters)
A 2D first-person escape room about the freeze of perfectionism. Break task paralysis, shrink overwhelming goals, quiet digital and mental noise, and learn that starting is the real win.

---

## Story (Devpost Markdown Description)

### Inspiration
Most games reward finishing everything with a 100% perfect score. Real life doesn't work like that—and for anyone living with perfectionism, the pressure to do things "perfectly" is the exact reason we freeze and can't start at all.

We wanted to build a short, deeply personal interactive experience for anyone who has ever stared at an impossible to-do list at 2:14 AM, felt their chest tighten, and escaped into their phone or browser tabs because starting felt too scary. Building **Escape Perfectionism** was both a way to process that pattern honestly and a way to hand players gentle, real-world tools they can use the moment they close the game.

### What it does
**Escape Perfectionism** is a 5-minute, first-person 2D point-and-click escape room set at a Computer Science student's desk on a rainy night:

1. **Recognize the Pressure:** A sticky note on the wall reads *"DON'T MESS THIS UP."*—capturing the harsh rules we write to push ourselves that end up paralyzing us instead.
2. **Break Task Paralysis:** Clicking the to-do notepad brings up 3 hovering choices (*Check my phone first*, *Do something fun instead*, or *Just pick one*). Trying to avoid the stress only makes the task feel heavier; choosing **Just pick one** unlocks the list.
3. **Shrink the Task:** Instead of trying to *"Finish 2 chapters"* in one night, clicking the task shrinks it into *"Read the first 3 pages of chapter 1"*—teaching that the real first step is simply opening the book to page 1.
4. **Clear Digital Clutter:** Clicking the laptop smoothly zooms the camera into a browser crowded with 6 tabs. You close the distractions (`Search`, `Discord`, `LinkedIn`) while keeping only your CS essentials (`Algorithms.pdf`, `GitHub`, `Lecture slides`).
5. **Decode the Inner Critic:** Even with a clean screen, the mind stays noisy and the room dims. Opening the **Grounding Journal** lets you hover over handwritten thoughts to reveal the psychology underneath (*all-or-nothing thinking, constant comparison, conditional self-worth, imposter syndrome*) and read a 3-step panic guide.
6. **Calm Your Chest (Hold-to-Breathe):** Holding a water-ripple breathing orb for 3 seconds calms physical tension, warms the room's lighting, and transforms the wall sticky note into:
   > *"DON'T BE SO HARD ON YOURSELF. (Starting is a win)"*

### How we built it
- **Vanilla HTML5, CSS3, and ES6 JavaScript:** Built with zero external frameworks so the entire game runs instantaneously by opening `index.html`.
- **CSS Camera Rig & Atmospheric Filters:** Used hardware-accelerated CSS `transform: scale() translate()` to glide the camera into the laptop screen, paired with CSS custom properties (`--room-sat`, `--room-bright`) that desaturate the room when mental clutter peaks and warm it when you breathe.
- **Procedural Rain & Web Audio Synthesizer (`rain.js`):** Built an HTML5 Canvas rain simulation for the bedroom window alongside a zero-asset Web Audio API synthesizer that generates soothing rain noise and distant thunder in real time.
- **Typography & Tactile UI:** Combined `Cormorant Garamond` for inner-voice monologue, `Reenie Beanie` and `Caveat` for handwritten journal entries and sticky notes, and custom CSS art for the spiral grounding notebook and tear-off checklist pad.

### Challenges we ran into
- **Making invisible feelings visible and playable:** Perfectionism happens inside your head. Turning internal states—like choosing paralysis, tab-switching avoidance, and chest tightness—into tactile point-and-click puzzles without feeling clinical or preachy required careful iteration on both the UI and the inner-monologue writing.
- **Calibrating the 16:9 viewport and camera zoom:** Aligning the interactive Chrome browser screen, lifted desk props, and rainy window inside a responsive 16:9 stage so that zooming into the laptop felt seamless took multiple passes of coordinate tuning.

### Accomplishments that we're proud of
- Crafting an emotionally honest story where **starting**—even reading a single sentence—is celebrated as the victory.
- Designing the 2-page spread **Grounding Journal** that fits every handwritten worry and its decoded insight cleanly on each page without scrolling.
- Building a complete, atmospheric experience (including rain visuals and audio) with zero heavy external dependencies.

### What we learned
- Small, concrete mechanics (shrinking a task with two clicks, closing 3 distraction tabs, holding a circle for 3 seconds) communicate emotional truths much more powerfully than long walls of text.
- Designing with warmth and simplicity makes mental-health themes approachable and comforting.

### What's next for Escape Perfectionism
- **Full Voiceover Narration ("Nika"):** Adding a soft, late-night inner-monologue voiceover generated with Google AI Studio (Gemini TTS) so the character whispers her thoughts aloud as you play.
- **More Perfectionism Cycles:** Adding playable chapters for creative block, group-project control anxiety, and imposter syndrome.

---

## 🎥 2-Minute Demo Video Recording Guide

Record your browser window in full-screen (`F11`) at `16:9` with system audio enabled:

1. **0:00 – 0:20 | Title Screen & Intro Story:**
   - Show the rainy title screen, briefly click **About the Game** and **← Back**, then click **Start** (rain sound begins) and click through the 4 intro lines as the camera walks up to the desk.
2. **0:20 – 0:35 | The Harsh Sticky Note:**
   - Click the yellow sticky note on the right wall (*"DON'T MESS THIS UP."*) to show the inner monologue reaction.
3. **0:35 – 1:00 | Notepad Paralysis & Shrinking the Task:**
   - Click the **To-Do List** notepad on the right desk. Show the 3 choices hovering above it.
   - Click *📱 Check my phone first* once to show the honest feedback, then click **⚡ Just pick one**.
   - In the opened checklist, click **Finish 2 chapters** twice to shrink it into **Read the first 3 pages of chapter 1** (turning light green).
4. **1:00 – 1:25 | Laptop Zoom & Closing Distraction Tabs:**
   - Click the **Laptop** in the center. Click through `Search`, `Discord`, and `LinkedIn` briefly to show the distraction thoughts, then click `✕` on those 3 tabs until only `Algorithms.pdf`, `GitHub`, and `Lecture slides` remain and the camera zooms back out.
5. **1:25 – 1:45 | The Grounding Journal:**
   - Notice the room dim and the journal glow on the left. Click the **Grounding Journal**.
   - Hover over the handwritten notes on Spread 1 (`1. Pressure`) and Spread 2 (`2. Critic`) to reveal the blue insights, then flip to Spread 3 (`3. Panic`).
6. **1:45 – 2:00 | Hold-to-Breathe & Victory:**
   - Click **Close your eyes & breathe**, press and hold the water-ripple circle for 3 seconds, and show the ending banner (*"Starting Is the Real Win."*) along with the green morphed sticky note on the wall.
