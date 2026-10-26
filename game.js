/* ==========================================================================
   Escape Perfectionism - Game State Machine & Interactions
   Follows devpost/spec.md and devpost/prd.md
   ========================================================================== */

const gameState = {
  currentStep: 'WALK_UP', // WALK_UP, DESK, TODO, SHRINK, LAPTOP, CLUTTER, JOURNAL, BREATHE, ENDING
  paralysisBroken: false,
  shrinkStage: 0,
  phoneDistractionCount: 0,
  closedTabsCount: 0,
  openTabs: [],
  activeTab: 'search',
  isLaptopZoomed: false,
  holdBreatheTimer: null,
  breatheProgressMs: 0
};

// DOM References
const dialogueText = document.getElementById('dialogueText');
const dialogueSubtext = document.getElementById('dialogueSubtext');
const gameStatusHint = document.getElementById('gameStatusHint');
const cameraRig = document.getElementById('cameraRig');
const btnZoomBack = document.getElementById('btnZoomBack');
const notepadOverlay = document.getElementById('notepadOverlay');
const paralysisBox = document.getElementById('paralysisBox');
const taskList = document.getElementById('taskList');
const task1 = document.getElementById('task1');
const tabCountText = document.getElementById('tabCountText');
const journalModalOverlay = document.getElementById('journalModalOverlay');
const journalGlow = document.getElementById('journalGlow');
const breatheModal = document.getElementById('breatheModal');
const breatheCircle = document.getElementById('breatheCircle');
const breatheLabel = document.getElementById('breatheLabel');
const breatheHint = document.getElementById('breatheHint');
const endingOverlay = document.getElementById('endingOverlay');
const stickyPaperContent = document.getElementById('stickyPaperContent');
const stickyMainText = document.getElementById('stickyMainText');
const stickySubText = document.getElementById('stickySubText');
const stickyHoverTag = document.getElementById('stickyHoverTag');

/**
 * Update the floating dialogue monologue (Spoken out loud in character's voice)
 */
function setDialogue(htmlText, color = '#f4a261', subtext = null) {
  dialogueText.style.color = color;
  dialogueText.innerHTML = htmlText;
  if (subtext !== null) {
    dialogueSubtext.textContent = subtext;
  }
}

/**
 * Step 1 & 2: Sticky Note on wall
 */
function onStickyNoteClick() {
  if (gameState.currentStep === 'ENDING') {
    setDialogue(
      `"Don't be so hard on yourself. One small, imperfect step is a real win."`,
      '#86efac',
      `(The harsh rule is now a kind one.)`
    );
    return;
  }

  setDialogue(
    `"DON'T MESS THIS UP." I wrote this to push myself. But it only makes me scared to start.`,
    '#f87171',
    `(This rule is too harsh. Let's keep going.)`
  );
}

/**
 * Step 3 & 4: Notepad & Task Paralysis (spec.md lines 45-52 & 131-140)
 */
function openNotepad() {
  if (gameState.isLaptopZoomed) zoomOutLaptop();

  if (!gameState.paralysisBroken) {
    notepadOverlay.classList.remove('active');
    if (paralysisBox) paralysisBox.style.display = 'flex';
    setDialogue(
      `"Six big tasks. My chest feels tight. Where do I even start?"`,
      '#f4a261',
      `(Pick one way to deal with it.)`
    );
  } else {
    if (paralysisBox) paralysisBox.style.display = 'none';
    if (taskList) taskList.style.display = 'flex';
    notepadOverlay.classList.add('active');
  }
}

function closeNotepad() {
  notepadOverlay.classList.remove('active');
}

function choosePhone() {
  gameState.phoneDistractionCount++;
  setDialogue(
    `"Scrolling my phone will not fix this. It will only make me feel worse later."`,
    '#f87171',
    `(Avoiding makes the task feel bigger. Try "Just pick one".)`
  );
}

function chooseFun() {
  setDialogue(
    `"I'm looking for something fun because I want to run away from the stress. But the stress will still be here."`,
    '#f4a261',
    `(Running away does not help. Try "Just pick one".)`
  );
}

function choosePickAnything() {
  gameState.paralysisBroken = true;
  gameState.currentStep = 'TODO';

  if (paralysisBox) paralysisBox.style.display = 'none';
  if (taskList) taskList.style.display = 'flex';
  notepadOverlay.classList.add('active');

  setDialogue(
    `"Okay. It does not matter which one. Any start is a good start. Let's take the first task."`,
    '#84bbf7',
    `(Click "Finish 2 chapters".)`
  );
  gameStatusHint.textContent = 'Next: Make the first task smaller';
}

function handleTask1Click() {
  const chk = document.getElementById('task1Chk');
  const txt = document.getElementById('task1Text');

  if (gameState.shrinkStage === 0) {
    gameState.shrinkStage = 1;
    if (chk) chk.textContent = '[ ]';
    if (txt) txt.textContent = 'Finish 2 chapters (click again to shrink it)';
    task1.classList.add('selected-target');

    setDialogue(
      `"Two chapters is too much for one night. We are not superheroes. Can I make it smaller?"`,
      '#f4a261',
      `(Click the task again to shrink it.)`
    );
  } else if (gameState.shrinkStage === 1) {
    gameState.shrinkStage = 2;
    gameState.currentStep = 'SHRINK';

    if (chk) chk.textContent = '[ ]';
    if (txt) txt.innerHTML = '<s style="color:#64748b">Finish 2 chapters</s> ➔ Read the first 3 pages of chapter 1';
    task1.classList.remove('selected-target');
    task1.classList.add('shrunk');

    setDialogue(
      `"Better. Three pages is something I can really do. The very first step is just opening the book to page 1.<br><span class=\"next-goal-highlight\">Next step: clear the extra tabs on my laptop.</span>"`,
      '#86efac',
      `(Nice. You made it smaller. Now click the laptop.)`
    );
    gameStatusHint.textContent = 'Next: Click the laptop and close the distraction tabs';
  } else {
    setDialogue(
      `"Just open the book to page 1. That is enough for now.<br><span class=\"next-goal-highlight\">Next step: clear the extra tabs on my laptop.</span>"`,
      '#86efac',
      `(The task is small now. Click the laptop.)`
    );
  }
}

function onRetroCloseClick(event) {
  if (event) event.stopPropagation();
  zoomOutLaptop();
}

function handleOtherTask(taskName) {
  setDialogue(
    `"I want to jump to a different task. But jumping around is just another way to avoid starting. One thing at a time."`,
    '#f4a261',
    `(Stay with the first task.)`
  );
}

function resetNotepadState() {
  gameState.paralysisBroken = false;
  gameState.shrinkStage = 0;
  notepadOverlay.classList.remove('active');
  if (paralysisBox) paralysisBox.style.display = 'none';
  if (taskList) taskList.style.display = 'flex';
  const chk = document.getElementById('task1Chk');
  const txt = document.getElementById('task1Text');
  if (chk) chk.textContent = '[ ]';
  if (txt) txt.textContent = 'Finish 2 chapters';
  task1.className = 'task-entry';
  setDialogue(
    `"I have so much to do, and I do not know where to start."`,
    '#f4a261',
    `(Click the notepad on the right to look at your list.)`
  );
  gameStatusHint.textContent = 'Next: Open your to-do list';
}

/**
 * Step 5: Laptop Camera Zoom & Tab Closer (spec.md Step 5 & lines 18-19, 142-145)
 */
function onLaptopClick(event) {
  if (!gameState.isLaptopZoomed) {
    zoomInLaptop();
  }
}

function zoomInLaptop() {
  if (paralysisBox) paralysisBox.style.display = 'none';
  if (notepadOverlay.classList.contains('active')) closeNotepad();
  gameState.isLaptopZoomed = true;
  cameraRig.classList.add('zoomed-laptop');
  btnZoomBack.style.display = 'block';

  if (gameState.closedTabsCount < DISTRACTION_COUNT) {
    setDialogue(
      `"So many tabs: Search, Discord, LinkedIn. They keep stealing my focus."`,
      '#f4a261',
      `(Close the 3 distraction tabs with the ×.)`
    );
  } else {
    setDialogue(
      `"Only my CS PDF, GitHub repo, and lecture slides are left. Clean and calm."`,
      '#86efac',
      `(All the distractions are gone.)`
    );
  }
}

function zoomOutLaptop() {
  gameState.isLaptopZoomed = false;
  cameraRig.classList.remove('zoomed-laptop');
  btnZoomBack.style.display = 'none';
}

/* --------------------------------------------------------------------------
   Laptop browser tabs system (Matching Uploaded Screenshot:
   Search, Algorithms.pdf, GitHub, Lecture slides, Discord, LinkedIn)
   -------------------------------------------------------------------------- */
const LAPTOP_TABS = [
  {
    id: 'search',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#ea580c" stroke-width="2"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>`,
    label: 'Search',
    kind: 'distraction',
    url: 'seek.example',
    pull: {
      line: `"I keep Googling 'how to stop procrastinating' instead of opening my CS chapter."`,
      sub: `(Close this Search tab with the ×.)`
    },
    html: `
      <div class="google-home-page">
        <div class="google-wordmark">Google</div>
        <div class="google-search-pill">
          <span class="g-search-icon">🔍</span>
          <span class="g-search-placeholder">Search the web</span>
          <span class="g-mic-icon">🎙</span>
        </div>
        <div class="google-btn-row">
          <span class="g-btn-primary">Search</span>
          <span class="g-btn-secondary">Surprise me</span>
        </div>
      </div>`
  },
  {
    id: 'algos',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#2563eb" stroke-width="1.8"><path d="M4 2h5l4 4v8H4z"/><path d="M9 2v4h4"/></svg>`,
    label: 'Algorithms.pdf',
    kind: 'essential',
    url: 'course.uni.edu/cs301/Algorithms.pdf',
    html: `
      <div class="ink-doc-header">Algorithms.pdf · Chapter 1 (pp. 1–3)</div>
      <div class="ink-doc-sub">Topic: Break big problems into small ones</div>
      <div class="ink-doc-body">
        Big tasks feel scary. Small parts feel doable.<br>
        <b class="ink-golden">Rule:</b> Start first. Make it better later. Do not try to solve everything at once.
      </div>`
  },
  {
    id: 'github',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#dc2626" stroke-width="1.8"><circle cx="5" cy="4" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><path d="M5 6v4M12 8c0 2-3 2-7 2"/></svg>`,
    label: 'GitHub',
    kind: 'essential',
    url: 'github.com/cs301/project-2-dijkstra',
    html: `
      <div class="ink-doc-header">cs301 / project-2-dijkstra</div>
      <div class="ink-doc-sub">Goal: Find the shortest path in a graph</div>
      <div class="ink-doc-body">
        Write Dijkstra's algorithm in <code>graph.cpp</code>.<br>
        <i class="ink-cyan">Note: A working version that passes 80% of the tests is much better than a perfect one you never finish.</i>
      </div>`
  },
  {
    id: 'slides',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#0d9488" stroke-width="1.8"><rect x="2" y="3" width="12" height="8" rx="1"/><line x1="8" y1="11" x2="8" y2="14"/><line x1="5" y1="14" x2="11" y2="14"/></svg>`,
    label: 'Lecture slides',
    kind: 'essential',
    url: 'course.uni.edu/cs301/lecture-slides',
    html: `
      <div class="ink-doc-header">CS 301 · Lecture Slides</div>
      <div class="ink-doc-sub">Slide 1: Principle of Optimality</div>
      <div class="ink-doc-body">
        Every shortest path is built one edge at a time.<br>
        <b class="ink-golden">Reminder:</b> You only need to read the first 3 pages tonight.
      </div>`
  },
  {
    id: 'discord',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#d97706" stroke-width="1.8"><path d="M3 3h10v8H6l-3 3V3z"/></svg>`,
    label: 'Discord',
    kind: 'distraction',
    url: 'discord.com/channels/cs301-homework-help',
    pull: {
      line: `"Everyone else is stuck too. But reading 47 messages is not the same as starting."`,
      sub: `(Other people's worry is not your task. Close this tab.)`
    },
    html: `
      <div class="distraction-header purple"># cs301-homework-help [47 unread]</div>
      <div class="chat-line"><b>Alex:</b> is anyone else stuck on test case 4??</div>
      <div class="chat-line"><b>Sarah:</b> I rewrote Dijkstra from scratch 3 times lol</div>
      <div class="chat-line chat-typing">Maya is typing<span>.</span><span>.</span><span>.</span></div>`
  },
  {
    id: 'linkedin',
    iconSvg: `<svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#16a34a" stroke-width="1.8"><rect x="2" y="5" width="12" height="9" rx="1"/><path d="M6 5V3h4v2"/></svg>`,
    label: 'LinkedIn',
    kind: 'distraction',
    url: 'linkedin.com/feed',
    pull: {
      line: `"Scrolling through classmates' internship posts only makes me feel behind. It will not do my work."`,
      sub: `(Close this tab with the ×.)`
    },
    html: `
      <div class="distraction-header red">LinkedIn Feed · CS Network</div>
      <div class="distraction-title">"Thrilled to announce I solved 500 LeetCode problems and built 4 compilers this week!"</div>
      <div class="distraction-body">"Comparing your backstage to everyone else's highlight reel only feeds the freeze..."</div>`
  }
];

const DISTRACTION_COUNT = LAPTOP_TABS.filter(t => t.kind === 'distraction').length;

const tabBarEl = document.getElementById('screenTabs');
const tabPagesEl = document.getElementById('tabPages');
const browserUrlText = document.getElementById('browserUrlText');

function getOpenTabIds() {
  return LAPTOP_TABS.filter(t => gameState.openTabs.includes(t.id)).map(t => t.id);
}

/** Build the tab bar + pages from LAPTOP_TABS (also used to reset on restart). */
function renderLaptopTabs() {
  gameState.openTabs = LAPTOP_TABS.map(t => t.id);
  gameState.closedTabsCount = 0;
  gameState.activeTab = LAPTOP_TABS[0].id;

  tabBarEl.innerHTML = '';
  tabPagesEl.innerHTML = '';

  LAPTOP_TABS.forEach(tab => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'tabbtn-' + tab.id;
    btn.className = 'game-tab ' + tab.kind;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', 'page-' + tab.id);

    const inner = `
      <span class="tab-icon">${tab.iconSvg}</span>
      <span class="tab-label">${tab.label}</span>
      <span class="tab-close-x" role="button" aria-label="Close ${tab.label} tab" title="Close tab">×</span>
    `;
    btn.innerHTML = inner;

    btn.addEventListener('click', () => switchLaptopTab(tab.id));
    const x = btn.querySelector('.tab-close-x');
    if (x) x.addEventListener('click', (ev) => closeLaptopTab(ev, tab.id));
    tabBarEl.appendChild(btn);

    const page = document.createElement('div');
    page.id = 'page-' + tab.id;
    page.className = 'tab-page-view';
    page.setAttribute('role', 'tabpanel');
    page.innerHTML = tab.html;
    tabPagesEl.appendChild(page);
  });

  updateTabCounter();
  switchLaptopTab(gameState.activeTab, true);
}

function updateTabCounter() {
  const remaining = DISTRACTION_COUNT - gameState.closedTabsCount;
  if (remaining > 0) {
    tabCountText.textContent = remaining + ' distraction' + (remaining > 1 ? 's' : '') + ' open';
  } else {
    tabCountText.innerHTML = '<b style="color:#15803d">Clutter cleared!</b>';
  }
}

/** Show one tab's page. `silent` skips the in-character reaction (used on reset). */
function switchLaptopTab(tabId, silent = false) {
  if (!silent && !gameState.isLaptopZoomed) return;

  const tab = LAPTOP_TABS.find(t => t.id === tabId);
  if (!tab || !gameState.openTabs.includes(tabId)) return;

  gameState.activeTab = tabId;
  LAPTOP_TABS.forEach(t => {
    const btn = document.getElementById('tabbtn-' + t.id);
    const page = document.getElementById('page-' + t.id);
    const on = t.id === tabId;
    if (btn) {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
    }
    if (page) {
      page.classList.toggle('active', on);
      page.style.display = on ? 'block' : 'none';
    }
  });
  if (browserUrlText) browserUrlText.textContent = tab.url;
  tabPagesEl.scrollTop = 0;

  if (!silent && tab.kind === 'distraction' && tab.pull) {
    setDialogue(tab.pull.line, '#f4a261', tab.pull.sub);
  }
}

function closeLaptopTab(event, tabId) {
  if (!gameState.isLaptopZoomed) return;
  if (event) event.stopPropagation();

  const tab = LAPTOP_TABS.find(t => t.id === tabId);
  if (!tab || !gameState.openTabs.includes(tabId)) return;

  if (tab.kind === 'essential') {
    setDialogue(
      `"Wait—I need ${tab.label} for my CS assignment. Let me only close the distracting tabs (Search, Discord, LinkedIn)."`,
      '#84bbf7',
      `(Keep your CS study tabs open and close the distractions.)`
    );
    return;
  }

  const openIds = getOpenTabIds();
  const idx = openIds.indexOf(tabId);
  const wasActive = gameState.activeTab === tabId;
  const fallback = openIds[idx + 1] || openIds[idx - 1] || 'algos';

  gameState.openTabs = gameState.openTabs.filter(id => id !== tabId);
  gameState.closedTabsCount++;
  updateTabCounter();

  const btn = document.getElementById('tabbtn-' + tabId);
  const page = document.getElementById('page-' + tabId);
  if (page) {
    page.classList.remove('active');
    page.style.display = 'none';
  }
  if (btn) {
    btn.classList.add('closing');
    btn.disabled = true;
    setTimeout(() => { btn.style.display = 'none'; }, 220);
  }
  if (wasActive) switchLaptopTab(fallback, true);

  const remaining = DISTRACTION_COUNT - gameState.closedTabsCount;

  if (remaining > 0) {
    setDialogue(
      `"One less distraction. It already feels quieter."`,
      '#86efac',
      '(' + remaining + ' more to close)'
    );
  } else {
    gameState.currentStep = 'CLUTTER';

    setDialogue(
      `"All clear. Only my CS PDF, GitHub, and lecture slides are left. But my head is still full of worries."`,
      '#86efac',
      `(Next: open the journal on the left of the desk.)`
    );
    gameStatusHint.textContent = 'Next: Open your journal';

    if (journalGlow) journalGlow.classList.add('pulsing');

    setTimeout(() => {
      zoomOutLaptop();
      setDialogue(
        `"My head is still noisy. Let me write my worries out in my journal first."`,
        '#f4a261',
        `(Click the glowing journal on the left.)`
      );
    }, 1200);
  }
}

// Keyboard: arrow keys move between open tabs while zoomed into the laptop
tabBarEl.addEventListener('keydown', (ev) => {
  if (!gameState.isLaptopZoomed) return;
  if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
  const ids = getOpenTabIds();
  const i = ids.indexOf(gameState.activeTab);
  const next = ids[(i + (ev.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
  switchLaptopTab(next);
  const nb = document.getElementById('tabbtn-' + next);
  if (nb) nb.focus();
});

/**
 * Step 7: Authentic Open Spiral Journal (Font Reenie Beanie)
 */
const JOURNAL_SPREADS = [
  {
    spreadIndex: 1,
    leftDate: "OCTOBER 23 · 02:14 AM",
    leftSection: "The Pressure",
    leftPageNum: "p. 1",
    rightSection: "What It Really Means",
    rightDate: "HOVER TO READ",
    rightPageNum: "p. 2",
    leftHtml: `
      <div style="font-size: 11px; color: #64748b; font-style: italic; margin-bottom: 6px;">
        (Hover over each note to see what is really going on)
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"I got nothing done today. It is piling up on me."</div>
        <div class="j-revealed-insight">✦ Putting things off: Avoiding the work makes it feel bigger and scarier. Starting small makes it shrink.</div>
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"Everyone is doing better than me. They all have it together."</div>
        <div class="j-revealed-insight">✦ Comparing: You see other people's best moments. You only see your own messy ones.</div>
      </div>
    `,
    rightHtml: `
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"If I cannot do the whole project today, why even start?"</div>
        <div class="j-revealed-insight">✦ All or nothing: A small start is not "nothing". Any progress counts.</div>
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"I keep rewinding the 1-hour video to catch every word. 4 hours later, it is still not done."</div>
        <div class="j-revealed-insight">✦ Too much detail: Trying to catch everything stops you from finishing. Good enough is enough.</div>
      </div>
      <div style="margin-top: auto; font-size: 11px; color: #2563eb; font-weight: 600; text-align: right; padding-top: 6px;">
        👉 Click "Next Page →" to meet your inner critic
      </div>
    `
  },
  {
    spreadIndex: 2,
    leftDate: "OCTOBER 23 · 02:28 AM",
    leftSection: "The Inner Critic",
    leftPageNum: "p. 3",
    rightSection: "Worth & Body",
    rightDate: "HOVER TO READ",
    rightPageNum: "p. 4",
    leftHtml: `
      <div style="font-size: 11px; color: #64748b; font-style: italic; margin-bottom: 6px;">
        (Hover over each note to talk back to the harsh voice)
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"I do not trust anyone to do it right. But I do not trust myself either."</div>
        <div class="j-revealed-insight">✦ Needing control: If only you can do it right, and you do not trust yourself, you get stuck.</div>
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"Everyone works hard. I am just faking it. I am bad at everything."</div>
        <div class="j-revealed-insight">✦ Feeling like a fraud: This is a harsh voice, not the truth. You are more capable than it says.</div>
      </div>
    `,
    rightHtml: `
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"I only feel okay when everything is finished and perfect."</div>
        <div class="j-revealed-insight">✦ Worth tied to results: You deserve rest and peace even when things are not done.</div>
      </div>
      <div class="j-handwritten-block" onmouseenter="revealInsight(this)">
        <div class="j-quote-reenie">"I cannot relax. My chest feels tight."</div>
        <div class="j-revealed-insight">✦ Stress in the body: Worry shows up as a tight chest and short breaths. Slow breathing helps.</div>
      </div>
      <div style="margin-top: auto; font-size: 11px; color: #2563eb; font-weight: 600; text-align: right; padding-top: 6px;">
        👉 Click "Next Page →" to see what to do when you panic
      </div>
    `
  },
  {
    spreadIndex: 3,
    leftDate: "WHEN YOU PANIC",
    leftSection: "3 Small Steps",
    leftPageNum: "p. 5",
    rightSection: "Your Next Tiny Step",
    rightDate: "YOU ARE DOING FINE",
    rightPageNum: "p. 6",
    leftHtml: `
      <div style="font-size: 12px; font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">
        When it feels like too much, do these in order:
      </div>
      <div style="background: rgba(254, 243, 199, 0.75); border: 1.5px solid #d97706; border-radius: 8px; padding: 10px 12px; transform: rotate(-0.8deg); margin-bottom: 10px;">
        <b style="color: #92400e; font-size: 12.5px;">1. Close your eyes. Breathe.</b>
        <p style="color: #78350f; font-size: 11.5px; margin-top: 3px; line-height: 1.4;">Slow down. Feel your feet on the floor and the chair holding you up.</p>
      </div>
      <div style="background: rgba(236, 253, 245, 0.85); border: 1.5px solid #10b981; border-radius: 8px; padding: 10px 12px; transform: rotate(0.6deg);">
        <b style="color: #065f46; font-size: 12.5px;">2. Be kind to yourself.</b>
        <p style="color: #047857; font-size: 11.5px; margin-top: 3px; line-height: 1.4;">Do not use harsh words on yourself. Would you talk to a friend like this? Be gentle.</p>
      </div>
    `,
    rightHtml: `
      <div style="background: rgba(239, 246, 255, 0.9); border: 1.5px solid #3b82f6; border-radius: 8px; padding: 12px 14px; transform: rotate(-0.5deg); margin-bottom: 14px;">
        <b style="color: #1e40af; font-size: 12.5px;">3. Pick one tiny step.</b>
        <p style="color: #1d4ed8; font-size: 11.5px; margin-top: 3px; line-height: 1.45;">When you open your eyes, just read the first sentence on page 1. That is all. Starting is hard, so this is a big deal. It is enough. You are doing fine.</p>
      </div>
      <div style="text-align: center; margin-top: auto;">
        <button type="button" class="btn-start-breathe" onclick="startBreathingSession()">
          Close your eyes &amp; breathe
        </button>
      </div>
    `
  }
];

let currentJournalSpread = 1;

function renderJournalSpread(spreadNum) {
  currentJournalSpread = spreadNum;
  const spread = JOURNAL_SPREADS[spreadNum - 1];
  if (!spread) return;

  const leftDateStamp = document.getElementById('leftDateStamp');
  const leftSectionName = document.getElementById('leftSectionName');
  const leftSpreadContent = document.getElementById('leftSpreadContent');
  const leftPageIndicator = document.getElementById('leftPageIndicator');

  const rightDateStamp = document.getElementById('rightDateStamp');
  const rightSectionName = document.getElementById('rightSectionName');
  const rightSpreadContent = document.getElementById('rightSpreadContent');
  const rightPageIndicator = document.getElementById('rightPageIndicator');

  const btnPrevJournal = document.getElementById('btnPrevJournal');
  const btnNextJournal = document.getElementById('btnNextJournal');

  if (leftDateStamp) leftDateStamp.textContent = spread.leftDate;
  if (leftSectionName) leftSectionName.textContent = spread.leftSection;
  if (leftSpreadContent) leftSpreadContent.innerHTML = spread.leftHtml;
  if (leftPageIndicator) leftPageIndicator.textContent = spread.leftPageNum;

  if (rightDateStamp) rightDateStamp.textContent = spread.rightDate;
  if (rightSectionName) rightSectionName.textContent = spread.rightSection;
  if (rightSpreadContent) rightSpreadContent.innerHTML = spread.rightHtml;
  if (rightPageIndicator) rightPageIndicator.textContent = spread.rightPageNum;

  if (btnPrevJournal) {
    btnPrevJournal.disabled = (spreadNum === 1);
    btnPrevJournal.classList.toggle('disabled', spreadNum === 1);
  }
  if (btnNextJournal) {
    if (spreadNum === 3) {
      btnNextJournal.style.display = 'none';
    } else {
      btnNextJournal.style.display = 'inline-flex';
      btnNextJournal.disabled = false;
      btnNextJournal.classList.remove('disabled');
      btnNextJournal.textContent = `Next Page →`;
    }
  }

  for (let i = 1; i <= 3; i++) {
    const tabPill = document.getElementById('jtab-pill-' + i);
    if (tabPill) tabPill.classList.toggle('active', i === spreadNum);
  }
}

function nextJournalPage() {
  if (currentJournalSpread < 3) {
    flipJournalSpread(currentJournalSpread + 1);
  }
}

function prevJournalPage() {
  if (currentJournalSpread > 1) {
    flipJournalSpread(currentJournalSpread - 1);
  }
}

function flipJournalSpread(spreadNum) {
  renderJournalSpread(spreadNum);
  if (spreadNum === 3) {
    setDialogue(
      `"When I panic: breathe, be kind, and take one tiny step."`,
      '#86efac',
      `(Click the breathing button on the right page.)`
    );
  } else if (spreadNum === 2) {
    setDialogue(
      `"This is my harsh inner voice. When I say it out loud, it gets weaker."`,
      '#f4a261',
      `(Hover over each note, then turn the page.)`
    );
  } else {
    setDialogue(
      `"Every worry feels like failure before I even start. Let me see what is behind them."`,
      '#84bbf7',
      `(Hover over each note, then turn the page.)`
    );
  }
}

function revealInsight(el) {
  const ins = el.querySelector('.j-revealed-insight');
  if (ins) ins.classList.add('visible');
}

function openJournal() {
  if (paralysisBox) paralysisBox.style.display = 'none';
  if (gameState.isLaptopZoomed) zoomOutLaptop();
  if (notepadOverlay.classList.contains('active')) closeNotepad();

  journalModalOverlay.classList.add('active');
  if (journalGlow) journalGlow.classList.remove('pulsing');
  gameState.currentStep = 'JOURNAL';

  renderJournalSpread(currentJournalSpread || 1);

  setDialogue(
    `"My journal. When I understand my worries, they scare me less."`,
    '#84bbf7',
    `(Hover over each note, then turn the pages until the last one.)`
  );
  gameStatusHint.textContent = 'Next: Read the journal to the last page';
}

function closeJournal() {
  journalModalOverlay.classList.remove('active');
}

/**
 * Step 8: Hold-to-Breathe Somatic Relief (spec.md Component 6)
 */
function startBreathingSession() {
  closeJournal();
  breatheModal.classList.add('active');
  gameState.currentStep = 'BREATHE';
  setDialogue(
    `"My chest is tight. I will hold the circle for 3 seconds and let my body calm down."`,
    '#84bbf7',
    `(Press and hold the circle.)`
  );
  gameStatusHint.textContent = 'Next: Hold the circle for 3 seconds';
}

function onBreatheDown() {
  if (gameState.holdBreatheTimer) return;
  breatheCircle.classList.add('holding');
  breatheLabel.textContent = 'BREATHE IN...';
  breatheHint.textContent = 'Breathe in slowly... let your shoulders drop...';

  const startTime = Date.now();
  gameState.holdBreatheTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= 3000) {
      clearInterval(gameState.holdBreatheTimer);
      gameState.holdBreatheTimer = null;
      completeBreathingVictory();
    }
  }, 100);
}

function onBreatheUp() {
  if (gameState.holdBreatheTimer) {
    clearInterval(gameState.holdBreatheTimer);
    gameState.holdBreatheTimer = null;
    breatheCircle.classList.remove('holding');
    breatheLabel.textContent = 'HOLD';
    breatheHint.textContent = 'That is okay. Try again. Hold for 3 seconds.';
  }
}

function completeBreathingVictory() {
  breatheCircle.classList.remove('holding');
  breatheLabel.textContent = 'LET GO';
  breatheHint.textContent = 'Better. Your chest feels looser.';

  setTimeout(() => {
    breatheModal.classList.remove('active');
    triggerEndingVictory();
  }, 1000);
}

/**
 * Step 9: Ending & Victory (spec.md Step 9 & lines 75-77)
 */
function triggerEndingVictory() {
  gameState.currentStep = 'ENDING';

  document.documentElement.style.setProperty('--room-sat', '110%');
  document.documentElement.style.setProperty('--room-bright', '108%');

  stickyPaperContent.classList.add('morphed');
  stickyMainText.innerHTML = "DON'T BE SO HARD<br>ON YOURSELF.";
  stickySubText.textContent = "(Starting is a win)";
  stickyHoverTag.textContent = "Don't be so hard on yourself";

  setDialogue(
    `"My chest feels loose. The big mountain was just worry.<br>I only need to open to page 1. <b style=\"color:#86efac\">Starting is the real win.</b>"`,
    '#86efac',
    `(You did it. You took the first step.)`
  );
  gameStatusHint.textContent = 'Done: You started, one small step at a time';

  setTimeout(() => {
    endingOverlay.classList.add('active');
  }, 1500);
}

function restartEntireGame() {
  endingOverlay.classList.remove('active');
  document.documentElement.style.setProperty('--room-sat', '100%');
  document.documentElement.style.setProperty('--room-bright', '100%');
  stickyPaperContent.classList.remove('morphed');
  stickyMainText.innerHTML = "DON'T MESS<br>THIS UP.";
  stickySubText.textContent = "(Everything must be perfect)";
  stickyHoverTag.textContent = "Don't mess this up";

  renderLaptopTabs();
  gameState.currentStep = 'DESK';
  if (journalGlow) journalGlow.classList.remove('pulsing');
  closeJournal();
  zoomOutLaptop();

  resetNotepadState();
  renderJournalSpread(1);
}

// Click outside overlay to close
notepadOverlay.addEventListener('click', (ev) => {
  if (ev.target === notepadOverlay) closeNotepad();
});
journalModalOverlay.addEventListener('click', (ev) => {
  if (ev.target === journalModalOverlay) closeJournal();
});


/* ==========================================================================
   Rain Windows, Title Screen, Intro Sequence & Sound Management
   ========================================================================== */

const titleScreen = document.getElementById('titleScreen');
const titleMenu = document.getElementById('titleMenu');
const titleStartBtn = document.getElementById('titleStartBtn');
const titleAboutBtn = document.getElementById('titleAboutBtn');
const aboutPanel = document.getElementById('aboutPanel');
const aboutBackBtn = document.getElementById('aboutBackBtn');
const titleStory = document.getElementById('titleStory');
const storyLinesEl = document.getElementById('storyLines');
const walkRig = document.getElementById('walkRig');
const introShade = document.getElementById('introShade');
const soundToggle = document.getElementById('soundToggle');

let titleRain = null;
let roomRain = null;

const titleCanvas = document.getElementById('titleRainCanvas');
if (titleCanvas && window.RainWindow) {
  titleRain = new window.RainWindow(titleCanvas, {
    intensity: 1.15,
    wind: 0.18,
    onFlash: () => {
      if (window.RainAudio) window.RainAudio.thunder();
    }
  });
  titleRain.start();
}

const roomCanvas = document.getElementById('roomRainCanvas');
if (roomCanvas && window.RainWindow) {
  roomRain = new window.RainWindow(roomCanvas, {
    intensity: 0.95,
    wind: 0.14,
    onFlash: () => {
      if (window.RainAudio) window.RainAudio.thunder();
    }
  });
  roomRain.start();
}

if (titleAboutBtn && aboutPanel) {
  titleAboutBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    titleMenu.style.display = 'none';
    aboutPanel.classList.add('active');
  });
}
if (aboutBackBtn && aboutPanel) {
  aboutBackBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    aboutPanel.classList.remove('active');
    titleMenu.style.display = 'flex';
  });
}

const INTRO_STORY_LINES = [
  "Ever feel like everything has to be perfect before you can start?",
  "So you wait. And think. And the work does not get done.",
  "Tonight, you do not need to be perfect. You only need to start.",
  "It is 2:14 AM. It is raining. Let's take it one small step at a time."
];

let storyActive = false;
let storyIndex = 0;
let storyTimeout = null;

function showNextStoryLine() {
  if (!storyActive) return;

  if (storyIndex < INTRO_STORY_LINES.length) {
    const lineText = INTRO_STORY_LINES[storyIndex];
    const p = document.createElement('div');
    p.className = 'story-line' + (storyIndex === 0 ? ' accent' : '');
    p.textContent = lineText;
    storyLinesEl.appendChild(p);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => p.classList.add('visible'));
    });

    storyIndex++;
    storyTimeout = setTimeout(showNextStoryLine, 2200);
  } else {
    storyTimeout = setTimeout(transitionIntoRoom, 1800);
  }
}

function transitionIntoRoom() {
  if (!storyActive) return;
  storyActive = false;
  clearTimeout(storyTimeout);

  titleScreen.classList.add('fading-out');
  setTimeout(() => { if (titleRain) titleRain.stop(); }, 1300);

  if (walkRig) {
    if (introShade) introShade.classList.add('active');
    walkRig.classList.remove('pre-walk');
    walkRig.classList.add('walking');

    setTimeout(() => {
      walkRig.classList.remove('walking');
      walkRig.classList.add('arrived');
      if (introShade) introShade.classList.remove('active');
    }, 2400);
  }

  setTimeout(() => {
    setDialogue(
      `"I have so much to do, and I do not know where to start."`,
      '#f4a261',
      `(Click the notepad on the right to look at your list.)`
    );
    gameStatusHint.textContent = 'Next: Open your to-do list';
  }, 1200);
}

if (titleStartBtn) {
  titleStartBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();

    if (window.RainAudio) {
      window.RainAudio.start();
      if (soundToggle) soundToggle.textContent = window.RainAudio.muted ? '🔇' : '🔊';
    }

    titleMenu.style.display = 'none';
    titleStory.classList.add('active');
    storyActive = true;
    storyIndex = 0;
    storyLinesEl.innerHTML = '';
    showNextStoryLine();
  });
}

if (titleStory) {
  titleStory.addEventListener('click', () => {
    if (storyActive) {
      if (storyIndex < INTRO_STORY_LINES.length) {
        clearTimeout(storyTimeout);
        showNextStoryLine();
      } else {
        transitionIntoRoom();
      }
    }
  });
}

/* ==========================================================================
   Sound & Volume Controls (Global Widget)
   ========================================================================== */

function initVolumeControls() {
  const globalSlider = document.getElementById('globalVolumeSlider');
  const soundToggle = document.getElementById('soundToggle');

  function updateVolume(val) {
    const num = Math.max(0, Math.min(1, parseFloat(val)));
    if (window.RainAudio) {
      if (!window.RainAudio.started) window.RainAudio.start();
      window.RainAudio.setVolume(num);
    }
    if (globalSlider) globalSlider.value = num;
    
    const isMuted = (num === 0);
    if (soundToggle) soundToggle.textContent = isMuted ? '🔇' : '🔊';
  }

  if (globalSlider) {
    globalSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      updateVolume(e.target.value);
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.RainAudio) {
        const muted = window.RainAudio.toggleMute();
        soundToggle.textContent = muted ? '🔇' : '🔊';
      }
    });
  }
}

// Boot
initVolumeControls();
renderJournalSpread(1);
renderLaptopTabs();

window.addEventListener('mouseup', onBreatheUp);
window.addEventListener('touchend', onBreatheUp);
