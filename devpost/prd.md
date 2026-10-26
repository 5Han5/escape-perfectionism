---
doc: prd
status: approved
---

# Escape Perfectionism â€” Product Requirements

A first-person 2D browser escape-room game where a college CS student sits at a desk and experiences the freeze, dread, and escape-spirals of perfectionism, then learns a gentle way through it. Built for people who know the feeling of not being able to start.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`

## The Core Journey

1. **Arrival.** The player sees the character's point of view walking up to a desk. The scene settles. The character says: *"I should really get some stuff done."*
2. **The desk.** The player sees a drawer, a laptop with a mouse, a small to-do notepad, a book holder/organizer on the left, and sticky notes on the wall. Hovering over objects shows plain labels: "Journal" (once found), "To-do list", "Open drawer", "Laptop", etc.
3. **The to-do list & paralysis.** The player checks the list and clicks a task. The paralysis dialogue triggers: *"Should I really start with this one, or is it better to start another? Am I even going to finish this?"*
4. **Shrink the task puzzle.** Breaking down the impossible goal:
   - Dialogue: *"Two chapters is one big task, isn't it? Shall we shrink it and be more realistic? We aren't superheroes, the last time I checked."*
   - The text steps down to *"Finish studying the first 3 pages of chapter 1"*, then: *"A bit better, but the real first task is to open the book to page 1."*
   - Next concrete direction: *"Clear unnecessary tabs and keep only the lecture slides and assignment open."*
5. **Laptop zoom & close-the-tabs puzzle.** The view zooms into the laptop screen. The player closes distracting tabs, leaving only the course lecture slides and assignment tabs open.
6. **The journal thought.** The screen is clean, but the mind is still spinning. The character sighs: *"I feel overwhelmed and distracted by many thoughts. I will get to my journal and then after continue working on this task."*
7. **Finding / opening the journal (State logic):**
   - *If already explored earlier:* The journal is already on the desk; the player simply clicks it.
   - *If not yet found:* A thought prompts: *"Search for your journal and clear your thoughts."* The player opens the drawer, pulls out the journal, and sets it on the desk.
8. **Decoding the feelings (Journal pages).** Inside the journal, the player reads through handwritten reflections that decode the hidden reasons behind each feeling (e.g., imposter syndrome, comparison, fear of not being good enough).
9. **The last journal page.** The final page outlines the mindful shift for the next task: *Notice the feeling and why you might be feeling it, calm yourself down and be kind to yourself, set the next step after you open your eyes.*
10. **Quiet the chest tightness & breathing.** A short calming interaction (hold to breathe) settles the remaining tension.
11. **Ending.** With the mind clear, the player takes the real first step. The sticky note *"Don't mess this up"* changes to *"Don't be so hard on yourself"*, ending on the truth that action is the real victory.

## Screens and Layout

- **Desk scene (main surface).** Drawer, laptop and mouse, to-do notepad, left-side book holder/organizer, wall with sticky notes. The player moves between objects by clicking.
- **Dialogue and choice layer.** Character thoughts appear as text with 2â€“3 choice buttons.
- **To-do list view.** The notepad opens up to show the tasks and the shrink-the-task puzzle.
- **Laptop zoom view.** The camera zooms into the laptop screen for the close-the-tabs puzzle.
- **Journal view.** An open journal showing the character's written lines with the explanation of each feeling and the final "fix the pattern" page.
- **Ending view.** The settled desk with the changed sticky note and the closing message.

## Look and Feel

- **Reference:** Dark Dome â€” a studio making point-and-click escape-game stories with atmospheric, detailed, slightly unsettling art (https://darkdome.com). First-person POV, like inhabiting the character.
- **Related style references (for mood only):** Rusty Lake (https://rustylake.com), Amanita Design / Machinarium (https://amanita-design.net).
- **Proposed fonts (not yet confirmed):** handwritten journal and sticky notes in Caveat (https://fonts.google.com/specimen/Caveat); inner-voice thoughts in Cormorant Garamond italic (https://fonts.google.com/specimen/Cormorant+Garamond); small UI labels in Special Elite (https://fonts.google.com/specimen/Special+Elite).
- **Mood:** Quiet, a little eerie, emotionally honest, not horror.
- **Color:** Muted, cool, bluish tones (night-desk navy, deep blue, steel blue, blue fog), with a yellow sticky note and a little warmth as accents. Anxiety makes the screen gloomier and more desaturated, as if it is trying to get the player's attention. Progress lets subtle warmth back in.
- **Voice:** Inner-voice text, in the character's own words. The words "perfect" and "perfectionism" are never used in the character's thoughts.
- **Fonts and detailed styling:** not yet decided (see Open Questions).

## Features and Behavior

### The to-do list and sticky notes
- **Tasks:** finish 2 chapters; work on your 2 projects; prepare the study material for next week; finish half of the C++ course; start going to the gym; fix your sleeping schedule.
- **Sticky notes on the wall:** "Everyone else is already done", "Don't mess this up", "Assignment due tomorrow, get going."
- The goals are about a CS student in college and life in general.
- Hidden perfectionism: the game never says "perfect." The player only understands the pattern by sitting with the feelings in the journal.

### Paralysis and escape choices
- Thoughts about choosing, doubt, and dread appear in sequence.
- Picking a different task triggers "Maybe the other one?"
- The three choices are: check the phone, what's more fun, just pick anything.

### Journal (The Raw Thought Dump & Decoding)
- **Physical object:** Discovered in the drawer; placed onto the desk. Opened after laptop tabs are cleaned to calm mental noise.
- **Interaction mechanic (Option B):** Sentences appear in raw handwriting. Hovering over a sentence causes the handwriting to disappear, replaced centered in-place by clean, faded gray text explaining the feeling. Moving the mouse restores the handwritten line.
- **Page 1: Pressure, Comparison & Detail**
  1. *"Today was really hard, I haven't got anything done. It's only getting more accumulated on me."* : Procrastination & fear of failure
  2. *"People are doing way better than me. Everyone has their stuff together."* : Constant comparison
  3. *"If I can't do this whole project properly today, what's the point of starting?"* : All-or-nothing thinking
  4. *"I keep rewinding the 1 hour video to grasp every meaning of every word, it has been 4 hours and it's still not done."* : Fear of missing out on any information and obsessive detail
- **Page 2: Inner Critic, Control & Panic**
  1. *"I don't trust anyone else to do this right, but I don't trust myself either."* : Need for control & difficulty delegating
  2. *"Everyone works hard. Me? I'm just faking it, and I suck at everything."* : Intense self-criticism & imposter syndrome
  3. *"I only feel okay when everything is finished and flawless."* : Conditional self-worth
  4. *"I can't stand staying in this body... my chest feels tight."* : Physical anxiety & panic
- **Page 3: ( When in Panic )**
  - *Frame 1 (Tilt -1.8°):* **Close your eyes, breathe**
  - *Frame 2 (Tilt +1.5°):* **Calm yourself, be kind.** Don't throw mean words at yourself. Would you treat a child that way? Have some mercy.
  - *Frame 3 (Tilt -1.2°):* **Think of the next tiny step you will take.** The step to take after you open your eyes: just read the first sentence on page 1. Fighting the paralysis and just doing that is enough, and it's not simple, reading 1 sentence is huge, trust me, it's okay and you're doing fine.

### Puzzles
- Shrink the task (to-do list).
- Close the tabs (laptop zoom).
- Quiet the chest tightness (hold to breathe).

- As a person who freezes when starting tasks, I want to feel the same dread inside the game so that I recognize the pattern.
  - [ ] On first load, the walking-to-the-desk intro plays and the character says "I should really get some stuff done."
  - [ ] Hovering over the journal, to-do list, and drawer shows the labels "Journal", "To-do list", and "Open drawer."
  - [ ] The three sticky notes are visible on the wall.
  - [ ] The to-do list shows all six tasks.
  - [ ] Choosing the phone or the fun option adds time pressure and makes the screen gloomier.
  - [ ] Choosing "just pick anything" starts the puzzles.
- As that person, I want to learn what each feeling means so that I can handle it next time.
  - [ ] The journal is first found in the drawer, then lands on the desk.
  - [ ] "Go to your journal" appears as a choice when feelings build.
  - [ ] Each journal entry explains why the thought or feeling happens.
  - [ ] The last page shows the three steps: notice the feeling and why, calm down and be kind to yourself, set the next step.
- As that person, I want to see that tiny action beats perfect planning so that I feel less hard on myself.
  - [ ] Shrink-the-task steps the text down to "open the book to page 1."
  - [ ] Close-the-tabs ends with only the lecture slides and assignment open.
  - [ ] The ending replaces "Don't mess this up" with "Don't be so hard on yourself."

## States and Boundaries

- **First use.** The intro plays and the player starts at the desk. No journal yet (it is hidden in the drawer).
- **Gloomy state.** The screen darkens and desaturates as dread builds, and eases as the player takes action.
- **Journal not found yet.** If the player never opens the drawer, the "Go to your journal" choice does not appear. (Assumption: the game nudges the player toward the drawer if they are stuck.)
- **Wasting time.** Phone and fun choices advance the clock and make the deadline note feel closer, but the game does not end in failure.
- **Persistence.** Nothing is saved. Refreshing starts over.

## Product Decisions

- Goals revolve around a CS student in college and life in general â€” makes it relatable and grounded.
- Sticky notes are pressure rules, not a motivational slogan â€” the insight comes later, not up front.
- Perfectionism is never named; it is hidden and discovered through the journal â€” because real perfectionism never uses that word.
- "Just pick anything" is the choice that works â€” action matters more than choosing the best option.
- The journal is discovered in a drawer â€” it should be found through play, not handed over.
- The ending shows relief, not triumph â€” an honest reflection of how it feels.
- Puzzles act out the feeling (shrink the task, close the tabs, quiet the chest) rather than being unrelated mini-games.

## What We're Building

- The walking-to-the-desk intro and the opening line.
- One desk scene with drawer, laptop, mouse, to-do notepad, organizer, and three sticky notes, with hover labels.
- The six-task to-do list.
- The choosing paralysis sequence with the three choices.
- Time-wasting consequences and the gloomier screen.
- Drawer to journal discovery.
- Journal entries and the final "fix the pattern" page.
- Puzzles: shrink the task, close the tabs, quiet the chest.
- The ending with the changed sticky note.

## Deferred From the POC

- Multiple task cycles with different patterns â€” beyond one cycle for 2â€“4 hours.
- Sound and inner-monologue audio â€” adds assets and time.
- Multiple endings â€” more branching than a PoC needs.
- Mobile layout.

## Possible Later Enhancements

- A full journal map of all feelings and their causes.
- More challenge types, such as the comparison spiral and the imposter spiral.
- Ambient background sound, since playing something in the background is part of the real experience.

## Non-Goals

- No perfect-run reward or high score; it would contradict the point of the game.
- No multiplayer or social features.
- No backend or saving.
- No medical or therapy claims. The game offers gentle insight, not treatment.

## Open Questions

- **Fonts, exact colors, and art style:** not yet decided. Can be settled in `4-spec`, but a short look-and-feel answer would help.
- **Journal entries:** exact wording of each entry and the feeling it explains. Can wait until the build.
- **Stuck player nudge:** how the game guides a player who never opens the drawer. Can wait until the build.

