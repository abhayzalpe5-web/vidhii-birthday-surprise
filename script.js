/**
 * ==========================================================================
 * A MAGICAL BIRTHDAY SURPRISE FOR VIDHII ❤️
 * Master Controller: Countdown, Web Audio Melodies, Particle Canvas, 
 * Confetti Physics, Photo Lightbox, Interactive Cake & Typewriter Poetry.
 * ==========================================================================
 */

// 1. CONFIGURATION
const CONFIG = {
  // Target birthday: 28 October 2026 at 12:00 AM (midnight) IST (UTC+05:30)
  targetDate: new Date("2026-10-28T00:00:00+05:30"),

  // Audio file path provided by user or default
  audioPath: "assets/happy-birthday.mp3",

  // Gallery photo list - exactly 10 images
  photos: [
    {
      id: 1,
      filename: "1.jpg",
      fallback: "1.jpeg",
      frameClass: "frame-polaroid",
      caption: "That Radiant Smile ✨",
      description: "A smile so bright, it effortlessly lights up everything around it.",
      badge: "Memory #1",
      rotateDefault: 90 // was taken horizontally/tilted
    },
    {
      id: 2,
      filename: "2.jpg",
      fallback: "2.jpeg",
      frameClass: "frame-gold-border",
      caption: "Grace, Tradition & Beauty 🌸",
      description: "Draped in elegance and golden grace with that unforgettable warmth.",
      badge: "Special Memory",
      rotateDefault: 0
    },
    {
      id: 3,
      filename: "3.jpg",
      fallback: "3.jpeg",
      frameClass: "frame-glass-glow",
      caption: "Lost in Serenity & Blue Skies ☁️",
      description: "A peaceful afternoon under the open heavens, calm and breathtaking.",
      badge: "Pure Calm",
      rotateDefault: 0
    },
    {
      id: 4,
      filename: "4.jpg",
      fallback: "4.jpeg",
      frameClass: "frame-rose-card",
      caption: "Dreamy Stairway Moments 💫",
      description: "Captured in a gentle, candid dream that words can never fully capture.",
      badge: "Candid Magic",
      rotateDefault: 0
    },
    {
      id: 5,
      filename: "5.jpg",
      fallback: "5.jpeg",
      frameClass: "frame-polaroid",
      caption: "My Favourite Shy Smile 💕",
      description: "That sweet, playful glance when laughter and shy joy meet.",
      badge: "Cutest Smile",
      rotateDefault: 0
    },
    {
      id: 6,
      filename: "6.jpg",
      fallback: "6.jpeg",
      frameClass: "frame-gold-border",
      caption: "Sunny Garden Balcony 🌺",
      description: "Standing amidst the trees with a soft flower and quiet beauty.",
      badge: "Graceful Day",
      rotateDefault: 0
    },
    {
      id: 7,
      filename: "7.jpg",
      fallback: "7.jpeg",
      frameClass: "frame-glass-glow",
      caption: "A Timeless Portrait ✨",
      description: "Timeless simplicity and royal charm in every single detail.",
      badge: "Precious Moment",
      rotateDefault: 0
    },
    {
      id: 8,
      filename: "8.jpg",
      fallback: "8.jpeg",
      frameClass: "frame-rose-card",
      caption: "Yellow Blossom & Pure Joy ☀️",
      description: "Sunshine in human form with a lovely wildflower tucked in your hair.",
      badge: "Sun-kissed",
      rotateDefault: 90
    },
    {
      id: 9,
      filename: "9.jpg",
      fallback: "9.jpeg",
      frameClass: "frame-gold-border",
      caption: "A Heart Made Just For You ❤️",
      description: "The most beautiful gesture from the most wonderful person in the world.",
      badge: "Straight from Heart",
      rotateDefault: 0
    },
    {
      id: 10,
      filename: "10.jpg",
      fallback: "10.jpeg",
      frameClass: "frame-polaroid",
      caption: "Hello to Another Gorgeous Year 💖",
      description: "A glowing hello to another wonderful chapter filled with blessings and dreams.",
      badge: "Birthday Star",
      rotateDefault: 0
    }
  ]
};

// Global State
let isUnlocked = false;
let isPlayingAudio = false;
let isMuted = false;
let isAudioSynthActive = false;
let currentLightboxIndex = 0;
let currentLightboxRotation = 0;
let testModeOverride = false;

// Audio Context for Web Audio API fallback (Music Box Lullaby)
let audioCtx = null;
let synthIntervalId = null;

// DOM Elements
const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMins = document.getElementById("countdown-mins");
const countdownSecs = document.getElementById("countdown-secs");
const surpriseBtn = document.getElementById("surprise-btn");
const surpriseStatusText = document.getElementById("surprise-status-text");
const celebrationContainer = document.getElementById("main-celebration-content");
const floatingNav = document.getElementById("floating-nav");
const testModeBtn = document.getElementById("test-mode-btn");

// Music Controls
const musicPlayer = document.getElementById("music-player-widget");
const musicToggleBtn = document.getElementById("music-toggle-btn");
const musicAudioEl = document.getElementById("birthday-audio");
const musicSubText = document.getElementById("music-sub-text");

// Lightbox Elements
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxPrevBtn = document.getElementById("lightbox-prev");
const lightboxNextBtn = document.getElementById("lightbox-next");
const lightboxCloseBtn = document.getElementById("lightbox-close");
const lightboxRotateBtn = document.getElementById("lightbox-rotate");

// Letter Modal Elements
const letterModal = document.getElementById("letter-modal");
const readMoreBtn = document.getElementById("read-more-btn");
const closeLetterBtn = document.getElementById("close-letter-btn");

// Cake & Wish
const makeWishBtn = document.getElementById("make-wish-btn");
const candles = document.querySelectorAll(".candle");
const cakeToast = document.getElementById("cake-toast");

// ==========================================================================
// 2. COUNTDOWN & SURPRISE UNLOCK LOGIC
// ==========================================================================

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("test") === "unlock" || params.get("unlocked") === "true") {
    testModeOverride = true;
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const target = CONFIG.targetDate.getTime();
  const diff = target - now;

  // Check if birthday has arrived (or if test mode is enabled)
  if (diff <= 0 || testModeOverride) {
    // Unlocked State
    if (!isUnlocked) {
      triggerUnlockState();
    }

    if (countdownDays) countdownDays.textContent = "00";
    if (countdownHours) countdownHours.textContent = "00";
    if (countdownMins) countdownMins.textContent = "00";
    if (countdownSecs) countdownSecs.textContent = "00";

    if (surpriseStatusText) {
      surpriseStatusText.textContent = "✨ It is your special day! Click below to open your surprise!";
      surpriseStatusText.style.color = "var(--accent-gold)";
    }
    return;
  }

  // Still locked - calculate remaining time
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (countdownDays) countdownDays.textContent = String(days).padStart(2, "0");
  if (countdownHours) countdownHours.textContent = String(hours).padStart(2, "0");
  if (countdownMins) countdownMins.textContent = String(minutes).padStart(2, "0");
  if (countdownSecs) countdownSecs.textContent = String(seconds).padStart(2, "0");
}

function triggerUnlockState() {
  isUnlocked = true;
  if (!surpriseBtn) return;

  surpriseBtn.classList.remove("locked");
  surpriseBtn.classList.add("unlocked");
  surpriseBtn.removeAttribute("disabled");
  surpriseBtn.innerHTML = `
    <span class="btn-icon">🎁</span>
    <span class="btn-text">Open Your Birthday Surprise</span>
    <span class="sparkle-icon">✨</span>
  `;
}

function lockSurpriseState() {
  isUnlocked = false;
  testModeOverride = false;
  if (!surpriseBtn) return;

  surpriseBtn.classList.remove("unlocked");
  surpriseBtn.classList.add("locked");
  surpriseBtn.setAttribute("disabled", "true");
  surpriseBtn.innerHTML = `
    <span class="lock-icon">🔒</span>
    <span class="btn-text">Surprise Unlocks On Birthday</span>
  `;
  if (surpriseStatusText) {
    surpriseStatusText.textContent = "Surprise automatically unlocks on 28 October 2026, 12:00 AM IST ❤️";
    surpriseStatusText.style.color = "var(--text-muted)";
  }
  if (testModeBtn) {
    testModeBtn.innerHTML = "✨ Preview Unlock (Testing Mode)";
  }
}

// Button Click to Open Celebration
if (surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    if (!isUnlocked) return;
    openSurpriseCelebration();
  });
}

function openSurpriseCelebration() {
  // Show navigation bar
  if (floatingNav) {
    floatingNav.classList.add("visible");
  }

  // Reveal celebration content smoothly
  if (celebrationContainer) {
    celebrationContainer.classList.add("active");
  }

  // Smooth scroll down to celebration
  const celebrationSection = document.getElementById("celebration-section");
  if (celebrationSection) {
    celebrationSection.scrollIntoView({ behavior: "smooth" });
  }

  // Launch initial celebration confetti burst
  launchConfettiShower();

  // Start music automatically now that user interacted
  playBirthdayMusic();

  // Start typewriter poetry animation
  initPoetryAnimation();
}

// Dev Test Mode Toggle
if (testModeBtn) {
  testModeBtn.addEventListener("click", () => {
    if (testModeOverride || isUnlocked) {
      lockSurpriseState();
    } else {
      testModeOverride = true;
      triggerUnlockState();
      testModeBtn.innerHTML = "🔒 Relock Countdown (Testing Mode)";
    }
  });
}

// ==========================================================================
// 3. MUSIC & WEB AUDIO SYNTHESIZER
// ==========================================================================

function playBirthdayMusic() {
  isPlayingAudio = true;
  musicPlayer.classList.add("music-playing");
  musicToggleBtn.innerHTML = "⏸️";

  // Try playing the mp3 file
  if (musicAudioEl) {
    musicAudioEl.volume = isMuted ? 0 : 0.8;
    const playPromise = musicAudioEl.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          musicSubText.textContent = "Happy Birthday Song 🎵";
        })
        .catch(() => {
          // Fall back gracefully to synthesized music box
          startSynthesizedMusicBox();
        });
    }
  } else {
    startSynthesizedMusicBox();
  }
}

function pauseBirthdayMusic() {
  isPlayingAudio = false;
  musicPlayer.classList.remove("music-playing");
  musicToggleBtn.innerHTML = "▶️";

  if (musicAudioEl) {
    musicAudioEl.pause();
  }
  stopSynthesizedMusicBox();
}

function toggleBirthdayMusic() {
  if (isPlayingAudio) {
    pauseBirthdayMusic();
  } else {
    playBirthdayMusic();
  }
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleBirthdayMusic);
}

// Handle audio error (e.g. mp3 not found on disk)
if (musicAudioEl) {
  musicAudioEl.addEventListener("error", () => {
    console.info("Notice: 'assets/happy-birthday.mp3' not found yet. Using enchanted Music Box synthesizer fallback!");
    if (isPlayingAudio) {
      startSynthesizedMusicBox();
    }
  });
}

/**
 * Enchanted Music Box Celesta Synthesizer
 * Plays "Happy Birthday to You" with pure romantic chimes using Web Audio API
 */
const MELODY_NOTES = [
  // Happy Birthday to You
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 293.66, dur: 0.70, pause: 0.10 }, // D4
  { note: 261.63, dur: 0.70, pause: 0.10 }, // C4
  { note: 349.23, dur: 0.70, pause: 0.10 }, // F4
  { note: 329.63, dur: 1.20, pause: 0.30 }, // E4

  // Happy Birthday to You
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 293.66, dur: 0.70, pause: 0.10 }, // D4
  { note: 261.63, dur: 0.70, pause: 0.10 }, // C4
  { note: 392.00, dur: 0.70, pause: 0.10 }, // G4
  { note: 349.23, dur: 1.20, pause: 0.30 }, // F4

  // Happy Birthday Dear Vidhii
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 261.63, dur: 0.35, pause: 0.05 }, // C4
  { note: 523.25, dur: 0.70, pause: 0.10 }, // C5
  { note: 440.00, dur: 0.70, pause: 0.10 }, // A4
  { note: 349.23, dur: 0.70, pause: 0.10 }, // F4
  { note: 329.63, dur: 0.70, pause: 0.10 }, // E4
  { note: 293.66, dur: 1.10, pause: 0.30 }, // D4

  // Happy Birthday to You
  { note: 466.16, dur: 0.35, pause: 0.05 }, // Bb4
  { note: 466.16, dur: 0.35, pause: 0.05 }, // Bb4
  { note: 440.00, dur: 0.70, pause: 0.10 }, // A4
  { note: 349.23, dur: 0.70, pause: 0.10 }, // F4
  { note: 392.00, dur: 0.70, pause: 0.10 }, // G4
  { note: 349.23, dur: 1.50, pause: 0.80 }, // F4
];

function startSynthesizedMusicBox() {
  if (isAudioSynthActive) return;
  isAudioSynthActive = true;
  musicSubText.textContent = "Romantic Music Box Melody ✨";

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch (e) {
    console.warn("Web Audio not supported", e);
    return;
  }

  let noteIndex = 0;

  function scheduleNextNote() {
    if (!isAudioSynthActive || !isPlayingAudio) return;

    const current = MELODY_NOTES[noteIndex];
    playCelestaChime(current.note, current.dur);

    const totalDelay = (current.dur + current.pause) * 1000;
    noteIndex = (noteIndex + 1) % MELODY_NOTES.length;
    synthIntervalId = setTimeout(scheduleNextNote, totalDelay);
  }

  scheduleNextNote();
}

function stopSynthesizedMusicBox() {
  isAudioSynthActive = false;
  if (synthIntervalId) {
    clearTimeout(synthIntervalId);
    synthIntervalId = null;
  }
}

function playCelestaChime(freq, duration) {
  if (!audioCtx || isMuted) return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Warm chime harmonics (sine + bell-like decay)
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);

  // Attack & Exponential Decay like a music box
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.1);
}

// ==========================================================================
// 4. BACKGROUND STARS, HEARTS & PARTICLE CANVAS
// ==========================================================================

const bgCanvas = document.getElementById("bg-canvas");
let bgCtx = null;
let particles = [];
let animFrameId = null;

function initBackgroundCanvas() {
  if (!bgCanvas) return;
  bgCtx = bgCanvas.getContext("2d");

  function resize() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Create ambient particles: stars & subtle floating hearts
  const count = window.innerWidth < 768 ? 45 : 90;
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(true));
  }

  animateParticles();
}

function createParticle(randomY = false) {
  const isHeart = Math.random() < 0.28;
  return {
    x: Math.random() * (bgCanvas ? bgCanvas.width : 1000),
    y: randomY ? Math.random() * (bgCanvas ? bgCanvas.height : 1000) : (bgCanvas ? bgCanvas.height + 20 : 1020),
    size: isHeart ? (Math.random() * 8 + 8) : (Math.random() * 2.5 + 1),
    speedY: isHeart ? (Math.random() * 0.4 + 0.25) : (Math.random() * 0.2 + 0.08),
    speedX: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.6 + 0.2,
    alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
    isHeart: isHeart,
    color: isHeart
      ? (Math.random() < 0.5 ? "#ff6584" : "#ff8fab")
      : (Math.random() < 0.4 ? "#ffd700" : "#ffffff")
  };
}

function animateParticles() {
  if (!bgCtx || !bgCanvas) return;
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.y -= p.speedY;
    p.x += p.speedX;
    p.alpha += p.alphaSpeed;

    if (p.alpha <= 0.1 || p.alpha >= 0.85) {
      p.alphaSpeed *= -1;
    }

    if (p.y < -30) {
      particles[i] = createParticle(false);
      continue;
    }

    bgCtx.save();
    bgCtx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

    if (p.isHeart) {
      drawHeart(bgCtx, p.x, p.y, p.size, p.color);
    } else {
      bgCtx.fillStyle = p.color;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      bgCtx.fill();
    }
    bgCtx.restore();
  }

  animFrameId = requestAnimationFrame(animateParticles);
}

function drawHeart(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    x, y,
    x - size / 2, y,
    x - size / 2, y + topCurveHeight
  );
  // bottom left curve
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 2,
    x, y + (size + topCurveHeight) / 1.4,
    x, y + size
  );
  // bottom right curve
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight) / 1.4,
    x + size / 2, y + (size + topCurveHeight) / 2,
    x + size / 2, y + topCurveHeight
  );
  // top right curve
  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
}

// ==========================================================================
// 5. CONFETTI & CELEBRATION SHOWER
// ==========================================================================

const confettiCanvas = document.getElementById("confetti-canvas");
let confettiCtx = null;
let confettiPieces = [];
let confettiFrameId = null;

function initConfettiCanvas() {
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext("2d");
  function resize() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();
}

function launchConfettiShower() {
  if (!confettiCanvas || !confettiCtx) return;

  const count = 160;
  const colors = ["#ff6584", "#ffd700", "#ff8fab", "#9d4edd", "#ffffff", "#ff4b2b", "#ffecb3"];

  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
      y: window.innerHeight * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 16 + 8),
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      isHeart: Math.random() < 0.35,
      gravity: 0.32,
      opacity: 1
    });
  }

  if (!confettiFrameId) {
    animateConfetti();
  }
}

function animateConfetti() {
  if (!confettiCtx || !confettiCanvas) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const c = confettiPieces[i];
    c.x += c.vx;
    c.y += c.vy;
    c.vy += c.gravity;
    c.rotation += c.rotSpeed;
    c.vx *= 0.98;

    if (c.y > window.innerHeight - 20) {
      c.opacity -= 0.02;
    }

    if (c.opacity <= 0 || c.y > window.innerHeight + 100) {
      confettiPieces.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.globalAlpha = Math.max(0, c.opacity);
    confettiCtx.translate(c.x, c.y);
    confettiCtx.rotate((c.rotation * Math.PI) / 180);

    if (c.isHeart) {
      drawHeart(confettiCtx, -c.size / 2, -c.size / 2, c.size, c.color);
    } else {
      confettiCtx.fillStyle = c.color;
      confettiCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.5);
    }

    confettiCtx.restore();
  }

  if (confettiPieces.length > 0) {
    confettiFrameId = requestAnimationFrame(animateConfetti);
  } else {
    confettiFrameId = null;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ==========================================================================
// 6. INTERACTIVE CAKE & CANDLE BLOWING
// ==========================================================================

candles.forEach((candle) => {
  candle.addEventListener("click", () => {
    const flame = candle.querySelector(".flame");
    if (flame && !flame.classList.contains("blown-out")) {
      flame.classList.add("blown-out");

      // Spawn smoke puff
      const puff = document.createElement("div");
      puff.className = "smoke-puff";
      candle.appendChild(puff);
      setTimeout(() => puff.remove(), 1200);

      // Play soft chime
      if (audioCtx) playCelestaChime(880, 0.4);
    }
  });
});

if (makeWishBtn) {
  makeWishBtn.addEventListener("click", () => {
    // Blow out all candles
    candles.forEach((c) => {
      const flame = c.querySelector(".flame");
      if (flame && !flame.classList.contains("blown-out")) {
        flame.classList.add("blown-out");
        const puff = document.createElement("div");
        puff.className = "smoke-puff";
        c.appendChild(puff);
        setTimeout(() => puff.remove(), 1200);
      }
    });

    // Confetti shower
    launchConfettiShower();

    // Show celebratory banner
    if (cakeToast) {
      cakeToast.style.display = "block";
      cakeToast.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Play sparkling chime chord
    if (audioCtx) {
      playCelestaChime(523.25, 0.8);
      setTimeout(() => playCelestaChime(659.25, 0.8), 120);
      setTimeout(() => playCelestaChime(783.99, 0.8), 240);
      setTimeout(() => playCelestaChime(1046.50, 1.2), 360);
    }
  });
}

// ==========================================================================
// 7. TYPEWRITER POETRY ANIMATION
// ==========================================================================

let poetryAnimated = false;

function initPoetryAnimation() {
  if (poetryAnimated) return;
  poetryAnimated = true;

  const lines = document.querySelectorAll(".poem-line");
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("visible");
    }, index * 600 + 400);
  });
}

// ==========================================================================
// 8. GALLERY OF 10 PHOTOGRAPHS & LIGHTBOX
// ==========================================================================

function renderGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";

  CONFIG.photos.forEach((photo, idx) => {
    const card = document.createElement("div");
    card.className = `photo-card ${photo.frameClass}`;
    card.setAttribute("data-index", idx);

    // Frame pin/badge
    const pin = document.createElement("div");
    pin.className = "frame-pin";

    const badge = document.createElement("div");
    badge.className = "frame-badge";
    badge.textContent = photo.badge;

    // Image wrapper
    const imgWrapper = document.createElement("div");
    imgWrapper.className = "photo-img-wrapper";

    const img = document.createElement("img");
    img.className = "photo-img";
    img.src = `assets/images/${photo.filename}`;
    img.alt = `Vidhii - ${photo.caption}`;
    img.loading = "lazy";

    // Fallback if .jpg fails -> try .jpeg or root
    img.onerror = function () {
      if (!this.dataset.triedJpeg) {
        this.dataset.triedJpeg = "true";
        this.src = `assets/images/${photo.fallback}`;
      } else if (!this.dataset.triedRoot) {
        this.dataset.triedRoot = "true";
        this.src = photo.filename;
      }
    };

    const hint = document.createElement("div");
    hint.className = "photo-overlay-hint";
    hint.innerHTML = "<span>🔍 View Memory</span>";

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(hint);

    // Caption
    const caption = document.createElement("div");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;

    card.appendChild(pin);
    card.appendChild(badge);
    card.appendChild(imgWrapper);
    card.appendChild(caption);

    card.addEventListener("click", () => {
      openLightbox(idx);
    });

    galleryGrid.appendChild(card);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const photo = CONFIG.photos[index];
  if (!photo) return;

  currentLightboxRotation = photo.rotateDefault || 0;
  updateLightboxContent();

  if (lightboxModal) {
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  if (lightboxModal) {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function updateLightboxContent() {
  const photo = CONFIG.photos[currentLightboxIndex];
  if (!photo || !lightboxImg) return;

  lightboxImg.src = `assets/images/${photo.filename}`;
  lightboxImg.alt = photo.caption;
  lightboxImg.style.transform = `rotate(${currentLightboxRotation}deg)`;

  lightboxImg.onerror = function () {
    if (!this.dataset.triedJpeg) {
      this.dataset.triedJpeg = "true";
      this.src = `assets/images/${photo.fallback}`;
    } else {
      this.src = photo.filename;
    }
  };

  if (lightboxCaption) {
    lightboxCaption.textContent = `${photo.caption} - ${photo.description}`;
  }
  if (lightboxCounter) {
    lightboxCounter.textContent = `Memory ${currentLightboxIndex + 1} of ${CONFIG.photos.length}`;
  }
}

function nextLightboxPhoto() {
  currentLightboxIndex = (currentLightboxIndex + 1) % CONFIG.photos.length;
  currentLightboxRotation = CONFIG.photos[currentLightboxIndex].rotateDefault || 0;
  updateLightboxContent();
}

function prevLightboxPhoto() {
  currentLightboxIndex = (currentLightboxIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  currentLightboxRotation = CONFIG.photos[currentLightboxIndex].rotateDefault || 0;
  updateLightboxContent();
}

if (lightboxNextBtn) lightboxNextBtn.addEventListener("click", nextLightboxPhoto);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener("click", prevLightboxPhoto);
if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
if (lightboxRotateBtn) {
  lightboxRotateBtn.addEventListener("click", () => {
    currentLightboxRotation = (currentLightboxRotation + 90) % 360;
    if (lightboxImg) {
      lightboxImg.style.transform = `rotate(${currentLightboxRotation}deg)`;
    }
  });
}

// Close lightbox on backdrop click
if (lightboxModal) {
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
}

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (lightboxModal && lightboxModal.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxPhoto();
    if (e.key === "ArrowLeft") prevLightboxPhoto();
  }
  if (letterModal && letterModal.classList.contains("active")) {
    if (e.key === "Escape") closeLetterModal();
  }
});

// ==========================================================================
// 9. HEARTFELT LETTER MODAL
// ==========================================================================

function openLetterModal() {
  if (letterModal) {
    letterModal.classList.add("active");
    document.body.style.overflow = "hidden";
    launchConfettiShower();
  }
}

function closeLetterModal() {
  if (letterModal) {
    letterModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

if (readMoreBtn) readMoreBtn.addEventListener("click", openLetterModal);
if (closeLetterBtn) closeLetterBtn.addEventListener("click", closeLetterModal);
if (letterModal) {
  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) closeLetterModal();
  });
}

// ==========================================================================
// 10. CUSTOM DESKTOP CURSOR
// ==========================================================================

function initCustomCursor() {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    let lastTrailTime = 0;

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Sparkle trail throttle
      const now = Date.now();
      if (now - lastTrailTime > 60) {
        lastTrailTime = now;
        const trail = document.createElement("div");
        trail.className = "cursor-trail";
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 600);
      }
    });
  }
}

// ==========================================================================
// 11. INITIALIZATION & OBSERVERS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  checkUrlParams();
  initBackgroundCanvas();
  initConfettiCanvas();
  renderGallery();
  initCustomCursor();

  // Run countdown once immediately, then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "poetry-section") {
            initPoetryAnimation();
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  const poetrySection = document.getElementById("poetry-section");
  if (poetrySection) observer.observe(poetrySection);
});
