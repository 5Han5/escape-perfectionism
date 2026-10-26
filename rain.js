/* ==========================================================================
   rain.js — Rainy window visuals (canvas) + rain ambience (audio)
   - RainWindow: draws a night city, bokeh lights, falling rain, droplets on
     the glass and occasional soft lightning into any <canvas>.
   - RainAudio: plays `rain.mp3` from the project folder if it exists,
     otherwise synthesizes rain with the Web Audio API (no files needed).
   ========================================================================== */
(function () {
  'use strict';

  const rand = (a, b) => a + Math.random() * (b - a);

  class RainWindow {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.intensity = opts.intensity ?? 1;
      this.wind = opts.wind ?? 0.16;
      this.lightning = opts.lightning ?? true;
      this.onFlash = opts.onFlash || null;
      this.running = false;
      this.dpr = 1;
      this.drops = [];
      this.beads = [];
      this.lights = [];
      this.flash = 0;
      this.nextFlash = rand(10, 22);
      this.backdrop = document.createElement('canvas');
      this._loop = this._loop.bind(this);
      this._resize = this._resize.bind(this);
      if (window.ResizeObserver) new ResizeObserver(this._resize).observe(canvas);
      window.addEventListener('resize', this._resize);
      this._resize();
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = this.canvas.getBoundingClientRect();
      const w = Math.max(2, Math.round(r.width * dpr));
      const h = Math.max(2, Math.round(r.height * dpr));
      if (w === this.canvas.width && h === this.canvas.height) return;
      this.canvas.width = w;
      this.canvas.height = h;
      this.dpr = dpr;
      this._seed();
    }

    _dropCount() {
      const { width: w, height: h } = this.canvas;
      const area = (w * h) / (this.dpr * this.dpr);
      return Math.round(Math.min(900, Math.max(40, (area / 650) * this.intensity)));
    }

    _newDrop(anyY) {
      const { width: w, height: h } = this.canvas;
      const z = Math.random(); // 0 = far, 1 = near
      const len = (8 + z * 20) * this.dpr;
      return {
        x: rand(-0.15 * w, 1.05 * w),
        y: anyY ? rand(0, h) : rand(-h * 0.3, -len),
        len,
        v: (700 + z * 900) * this.dpr,
        z
      };
    }

    _seed() {
      const { width: w, height: h } = this.canvas;
      const dpr = this.dpr;
      this.drops = Array.from({ length: this._dropCount() }, () => this._newDrop(true));

      const beadCount = Math.round(Math.min(220, Math.max(12, (w * h) / (dpr * dpr) / 2600)));
      this.beads = Array.from({ length: beadCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.8, 2.8) * dpr,
        vy: Math.random() < 0.25 ? rand(8, 45) * dpr : 0
      }));

      this.lights = Array.from({ length: 14 }, () => {
        const warm = Math.random() < 0.6;
        return {
          x: rand(0, w),
          y: rand(h * 0.45, h * 0.95),
          r: rand(10, 38) * dpr,
          c: warm ? '255, 196, 120' : '130, 175, 255',
          a: rand(0.08, 0.2),
          p: rand(0, Math.PI * 2),
          s: rand(0.3, 0.9)
        };
      });

      this._buildBackdrop();
    }

    _buildBackdrop() {
      const { width: w, height: h } = this.canvas;
      const dpr = this.dpr;
      const b = this.backdrop;
      b.width = w;
      b.height = h;
      const g = b.getContext('2d');

      const sky = g.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#060b1e');
      sky.addColorStop(0.55, '#111b40');
      sky.addColorStop(1, '#1c295a');
      g.fillStyle = sky;
      g.fillRect(0, 0, w, h);

      // Two layers of city silhouettes (far = lighter, near = darker)
      const layers = [
        { color: '#141e44', min: 0.15, max: 0.35, lit: 0.06 },
        { color: '#0a1028', min: 0.22, max: 0.5, lit: 0.12 }
      ];
      layers.forEach((L) => {
        let x = -10 * dpr;
        while (x < w) {
          const bw = rand(0.05, 0.12) * w;
          const bh = rand(L.min, L.max) * h;
          const top = h - bh;
          g.fillStyle = L.color;
          g.fillRect(x, top, bw, bh);
          const cell = 5 * dpr;
          for (let wy = top + cell; wy < h - cell; wy += cell * 2) {
            for (let wx = x + cell; wx < x + bw - cell; wx += cell * 2) {
              if (Math.random() < L.lit) {
                g.fillStyle = Math.random() < 0.75 ? 'rgba(255, 205, 130, 0.55)' : 'rgba(150, 190, 255, 0.4)';
                g.fillRect(wx, wy, cell * 0.8, cell * 0.9);
              }
            }
          }
          x += bw + rand(0, 6) * dpr;
        }
      });

      const fog = g.createLinearGradient(0, h * 0.5, 0, h);
      fog.addColorStop(0, 'rgba(40, 60, 115, 0)');
      fog.addColorStop(1, 'rgba(40, 60, 115, 0.45)');
      g.fillStyle = fog;
      g.fillRect(0, 0, w, h);
    }

    setIntensity(v) {
      this.intensity = v;
      const target = this._dropCount();
      while (this.drops.length < target) this.drops.push(this._newDrop(false));
      this.drops.length = target;
    }

    start() {
      if (this.running) return;
      this.running = true;
      this._last = performance.now();
      requestAnimationFrame(this._loop);
    }

    stop() {
      this.running = false;
    }

    _loop(now) {
      if (!this.running) return;
      const dt = Math.min(0.05, (now - this._last) / 1000);
      this._last = now;
      this._update(dt, now / 1000);
      this._draw(now / 1000);
      requestAnimationFrame(this._loop);
    }

    _update(dt) {
      const { width: w, height: h } = this.canvas;
      for (let i = 0; i < this.drops.length; i++) {
        const d = this.drops[i];
        d.y += d.v * dt;
        d.x += d.v * this.wind * dt;
        if (d.y - d.len > h) this.drops[i] = this._newDrop(false);
      }
      for (const b of this.beads) {
        if (b.vy) {
          b.y += b.vy * dt;
          if (b.y - b.r > h) {
            b.y = -b.r;
            b.x = rand(0, w);
          }
        }
      }
      if (this.lightning) {
        this.nextFlash -= dt;
        if (this.nextFlash <= 0) {
          this.flash = 1;
          this.nextFlash = rand(18, 40);
          if (this.onFlash) this.onFlash();
        }
      }
      if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 1.8);
    }

    _draw(t) {
      const ctx = this.ctx;
      const { width: w, height: h } = this.canvas;
      const dpr = this.dpr;

      ctx.drawImage(this.backdrop, 0, 0);

      // Soft bokeh city lights
      for (const L of this.lights) {
        const a = L.a * (0.7 + 0.3 * Math.sin(t * L.s + L.p));
        const grad = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r);
        grad.addColorStop(0, `rgba(${L.c}, ${a})`);
        grad.addColorStop(1, `rgba(${L.c}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(L.x, L.y, L.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Falling rain — far layer then near layer
      ctx.lineCap = 'round';
      [[0, 0.55, 'rgba(170, 195, 245, 0.22)', 1], [0.55, 1.01, 'rgba(205, 222, 255, 0.38)', 1.4]].forEach(([lo, hi, col, lw]) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = lw * dpr;
        ctx.beginPath();
        for (const d of this.drops) {
          if (d.z < lo || d.z >= hi) continue;
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - d.len * this.wind, d.y - d.len);
        }
        ctx.stroke();
      });

      // Droplets clinging to / sliding down the glass
      for (const b of this.beads) {
        ctx.fillStyle = 'rgba(175, 200, 245, 0.16)';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lightning flash
      if (this.flash > 0) {
        const f = this.flash > 0.75 || (this.flash < 0.55 && this.flash > 0.4) ? this.flash : this.flash * 0.4;
        ctx.fillStyle = `rgba(200, 215, 255, ${f * 0.22})`;
        ctx.fillRect(0, 0, w, h);
      }
    }
  }

  /* ------------------------------------------------------------------------
     RainAudio
     ------------------------------------------------------------------------ */
  const RainAudio = {
    ctx: null,
    mode: null, // 'file' | 'synth'
    started: false,
    muted: false,
    muffled: false,
    volume: 0.6,
    fileEl: null,

    start() {
      if (this.started) return;
      this.started = true;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        this.ctx = new AC();
        if (this.ctx.state === 'suspended') this.ctx.resume();
      }
      this._tryFile().then((ok) => {
        if (!ok && this.ctx) this._startSynth();
      });
    },

    _tryFile() {
      return new Promise((resolve) => {
        let done = false;
        const finish = (v) => { if (!done) { done = true; resolve(v); } };
        const a = new Audio('rain.mp3');
        a.loop = true;
        a.volume = 0;
        a.addEventListener('error', () => finish(false), { once: true });
        a.play().then(() => {
          if (done) { a.pause(); return; }
          this.fileEl = a;
          this.mode = 'file';
          this._apply();
          finish(true);
        }).catch(() => finish(false));
        setTimeout(() => finish(false), 1500);
      });
    },

    _noise(type, seconds) {
      const ctx = this.ctx;
      const len = Math.floor(seconds * ctx.sampleRate);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      if (type === 'pink') {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < len; i++) {
          const w = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + w * 0.0555179;
          b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.969 * b2 + w * 0.153852;
          b3 = 0.8665 * b3 + w * 0.3104856;
          b4 = 0.55 * b4 + w * 0.5329522;
          b5 = -0.7616 * b5 - w * 0.016898;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
          b6 = w * 0.115926;
        }
      } else if (type === 'brown') {
        let last = 0;
        for (let i = 0; i < len; i++) {
          const w = Math.random() * 2 - 1;
          last = (last + 0.02 * w) / 1.02;
          d[i] = last * 3.5;
        }
      } else {
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      return buf;
    },

    _startSynth() {
      const ctx = this.ctx;
      this.mode = 'synth';
      this.master = ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(ctx.destination);

      this.tone = ctx.createBiquadFilter();
      this.tone.type = 'lowpass';
      this.tone.frequency.value = 5200;
      this.tone.connect(this.master);

      const pink = this._noise('pink', 5);
      this.brownBuf = this._noise('brown', 5);
      this.dripBuf = this._noise('white', 0.08);

      // Body of the rain
      const s1 = ctx.createBufferSource();
      s1.buffer = pink; s1.loop = true;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 350;
      const g1 = ctx.createGain(); g1.gain.value = 0.6;
      s1.connect(hp).connect(g1).connect(this.tone);
      s1.start();

      // Shimmering patter layer with slow swell
      const s2 = ctx.createBufferSource();
      s2.buffer = pink; s2.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = 0.6;
      const g2 = ctx.createGain(); g2.gain.value = 0.2;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.08;
      lfo.connect(lfoGain).connect(g2.gain);
      s2.connect(bp).connect(g2).connect(this.tone);
      s2.start(0, 2.3); lfo.start();

      // Low rumble of distant rain
      const s3 = ctx.createBufferSource();
      s3.buffer = this.brownBuf; s3.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 200;
      const g3 = ctx.createGain(); g3.gain.value = 0.45;
      s3.connect(lp).connect(g3).connect(this.master);
      s3.start();

      // Individual drips on the glass / sill
      this._dripTimer = setInterval(() => this._drip(), 55);
      this._apply();
    },

    _drip() {
      if (!this.ctx || Math.random() > 0.5) return;
      const ctx = this.ctx;
      const t = ctx.currentTime + Math.random() * 0.05;
      const src = ctx.createBufferSource();
      src.buffer = this.dripBuf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = rand(1800, 6000);
      bp.Q.value = rand(4, 10);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(rand(0.04, 0.14), t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + rand(0.04, 0.1));
      src.connect(bp).connect(g).connect(this.tone);
      src.start(t);
      src.stop(t + 0.12);
    },

    thunder() {
      if (!this.ctx || this.muted || !this.mode) return;
      const ctx = this.ctx;
      const t = ctx.currentTime + rand(0.6, 1.4);
      const buf = this.brownBuf || (this.brownBuf = this._noise('brown', 5));
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(280, t);
      lp.frequency.exponentialRampToValueAtTime(60, t + 3.2);
      const g = ctx.createGain();
      const peak = 0.9 * this._targetVolume();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.6);
      src.connect(lp).connect(g).connect(ctx.destination);
      src.start(t);
      src.stop(t + 3.8);
    },

    _targetVolume() {
      if (this.muted) return 0;
      return this.muffled ? this.volume * 0.55 : this.volume;
    },

    _apply() {
      const v = this._targetVolume();
      if (this.mode === 'synth' && this.master) {
        const now = this.ctx.currentTime;
        this.master.gain.setTargetAtTime(v, now, 0.8);
        this.tone.frequency.setTargetAtTime(this.muffled ? 1500 : 5200, now, 0.8);
      } else if (this.mode === 'file' && this.fileEl) {
        const el = this.fileEl;
        clearInterval(this._fade);
        this._fade = setInterval(() => {
          const diff = v - el.volume;
          if (Math.abs(diff) < 0.02) { el.volume = v; clearInterval(this._fade); return; }
          el.volume = Math.min(1, Math.max(0, el.volume + Math.sign(diff) * 0.02));
        }, 40);
      }
    },

    setMuffled(on) { this.muffled = on; this._apply(); },
    setVolume(v) { this.volume = v; this._apply(); },
    toggleMute() {
      this.muted = !this.muted;
      if (!this.started && !this.muted) this.start();
      this._apply();
      return this.muted;
    }
  };

  window.RainWindow = RainWindow;
  window.RainAudio = RainAudio;
})();
