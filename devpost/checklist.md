---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [ ] **1. Room Viewport & Interactive Notepad with Task Paralysis**
  Becomes usable: A running browser escape room in a 16:9 Dark Dome aesthetic room. Clicking the notepad triggers the paralysis dilemma (Check phone vs Pick anything), unlocking the tasks where clicking "Finish 2 chapters" triggers the inner thought, clicking again shrinks it to 3 pages with the calming speech and deep blue highlighted next goal.
  Why now: Proves the whole path end to end on the first slice — HTML/CSS/JS scaffold, dark atmosphere, state handling, and the core emotional kernel of task paralysis right away.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > The to-do list and sticky notes`
  Spec ref: `spec.md > Components (1 & 2)`, `spec.md > Look and Feel`
  Build: Create base `index.html`, `style.css`, `game.js`. Render 16:9 viewport, desk, gloomy vignette, initial sticky note, and interactive notepad with paralysis choices and multi-click task shrinking.
  Verify (mechanical): Open `index.html` locally, verify elements render, trigger phone choice, trigger pick anything, click task once, click task second time and verify text/highlight states.
  Learner check: Open `index.html` in your browser, click the notepad, try both choices, and click "Finish 2 chapters" twice to confirm the dialogue and task shrink.
  Commit: `Add room viewport and interactive notepad with task paralysis`

- [ ] **2. Laptop Camera Zoom and Distraction Tab Closer**
  Becomes usable: Clicking the laptop smoothly glides the camera into the screen. 5 tabs appear; clicking '✕' on Reddit, YouTube, Discord closes them, leaving only lecture slides and specs, advancing the room state.
  Why now: Directly fulfills the goal established in Slice 1's dialogue ("clear unnecessary tabs on the laptop") and proves the CSS camera transform.
  PRD ref: `prd.md > Puzzles (Close the tabs)`, `prd.md > The Core Journey`
  Spec ref: `spec.md > Components (3. Laptop Zoom Surface)`
  Build: Add SVG/CSS laptop with click-to-zoom camera translation, browser window mockup, 5 tabs with click handlers, and completion status update.
  Verify (mechanical): Click laptop to zoom, close 3 tabs, verify tab count drops to 0 distractions and zoom-out works.
  Learner check: Click the laptop to zoom in, close the 3 distraction tabs, and see if the camera transition feels smooth.
  Commit: `Add laptop camera zoom and browser tab closer puzzle`

- [ ] **3. Desk Drawer & 3-Page Grounding Journal**
  Becomes usable: Clicking the desk drawer slides it open to reveal the journal; clicking places it on the desk. Clicking the desk journal opens the 3-page interactive modal with Option B hover-reveals (Pages 1 & 2) and the centered `( When in Panic )` tilted frames (Page 3).
  Why now: Introduces the core emotional storytelling artifact of the game, letting the player read the 8 clinical perfectionism traps and the grounding framework.
  PRD ref: `prd.md > Features and Behavior (Journal)`, `prd.md > Page 3: ( When in Panic )`
  Spec ref: `spec.md > Components (4. Journal Overlay Modal)`
  Build: Implement sliding drawer animation, desk placement, and 3-page modal with CSS hover-to-vanish handwriting effects, centered gray replacement text, and tilted organic frames on Page 3.
  Verify (mechanical): Slide drawer, inspect journal placement, toggle modal, verify hover state on Pages 1 & 2, verify Page 3 3 frames content.
  Learner check: Open the drawer, put the journal on the desk, flip through all 3 pages, and hover over the entries to test the fade-reveal.
  Commit: `Add sliding drawer and 3-page interactive journal`

- [ ] **4. Hold-to-Breathe Somatic Relief, Sticky Note Morph & Victory State**
  Becomes usable: Reading Page 3 unlocks the breathing circle. Holding mouse down for 3 seconds expands the circle, relieves chest tightness, brightens the room lighting, and morphs the sticky note into self-compassion (*"Done is better than perfect. Showing up counts."*), reaching the game's victory resolution.
  Why now: Connects the somatic anxiety mechanic to the final mental shift, completing the end-to-end playable escape room.
  PRD ref: `prd.md > Puzzles (Somatic Panic & Hold-to-Breathe)`, `prd.md > Room Victory State`
  Spec ref: `spec.md > Components (6. Breathing Controller)`, `spec.md > State Machine & Game Flow`
  Build: Add mouse hold/release timer, circle scale and glow animation, lighting brightness transition, sticky note morph CSS, and restart button.
  Verify (mechanical): Trigger breathe circle, hold for 3 seconds, verify brightness CSS change, verify sticky note text/color morph, verify victory message.
  Learner check: Hold the breathe button for 3 seconds, observe the room atmosphere brighten, and watch the sticky note transform.
  Commit: `Add breathing mechanic, room lighting shift, and sticky note morph victory`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — Slice 1 (Notepad paralysis and task shrink tested live in browser)
- [ ] Final kick-the-tires exploration and feedback completed — Slice 4 (Complete game playthrough from freeze to victory)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions
