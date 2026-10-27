# A Magical Birthday Surprise Website for Vidhii ❤️🎂

A premium, romantic, cinematic birthday surprise website designed and built with love for **Vidhii**.

---

## ✨ Features & Highlights

1. **Accurate Countdown & Automatic Surprise Unlock**
   - Precise countdown timer targeted for **28 October 2026 at 12:00 AM (midnight), Indian Standard Time (IST, UTC+5:30)**.
   - Calculates time remaining using the true timestamp (`Date.now() >= targetTimestamp`).
   - Keeps the main birthday surprise securely locked until the clock strikes midnight.
   - Automatically unlocks the glowing **"Open Your Birthday Surprise 🎁"** button at 12:00 AM IST.
   - If the website is opened after the birthday timestamp, it immediately presents the unlocked surprise.
   - Includes a discrete testing mode toggle (`✨ Preview Unlock (Testing Mode)` or `?test=unlock`) to test the celebration experience ahead of time!

2. **Cinematic Opening & Romantic Aesthetic**
   - Midnight-blue, royal deep-purple, rose gold, and champagne gold palette.
   - Glowing opening sequence: *"For Someone Very Special..."* transitioning into *"For My Vidhii ❤️"*.
   - Starfield and floating heart particle canvas animation at 60 FPS.
   - Desktop heart-shaped custom cursor with luminous trailing dust particles.

3. **Interactive 3D Layered Birthday Cake & Wishes**
   - Layered birthday cake with glowing, flickering candles.
   - Interactive candles: Vidhii can tap/click each candle to blow it out with a realistic rising smoke puff.
   - **"Make a Wish ✨"** button that blows out candles, triggers a shower of colorful ribbons, golden stars, and floating hearts, and reveals a personal celebratory toast.

4. **Special Birthday Poetry in Roman Hindi & Quotes**
   - Typewriter line-by-line reveal of the original Hindi poem:
     ```text
     Chaand se roshan teri har ek raat ho,
     Teri har khushi mere liye ek khaas baat ho.

     Teri muskaan kabhi kam na ho,
     Tere sapno ka aasmaan kabhi kam na ho.

     Har janamdin laaye khushiyon ki saugaat,
     Tere chehre par rahe hamesha muskaan ki barsaat.

     Dua hai meri, tera har sapna sach ho jaaye,
     Aur zindagi ka har khoobsurat pal tere naam ho jaaye.

     Happy Birthday, Vidhii ❤️
     Tu hamesha khush rahe, bas yahi meri dua hai.
     ```
   - Highlighted romantic quote: *"Some people make ordinary moments feel magical. For me, that person is you, Vidhii. ❤️"*
   - **"Read One More Message 💌"** button revealing a deeply sincere, personal sealed letter modal.

5. **Wall of Precious Memories (10 Photographs)**
   - All 10 uploaded photographs displayed with care:
     - `1.jpg` – That Radiant Smile ✨
     - `2.jpg` – Grace, Tradition & Beauty 🌸
     - `3.jpg` – Lost in Serenity & Blue Skies ☁️
     - `4.jpg` – Dreamy Stairway Moments 💫
     - `5.jpg` – My Favourite Shy Smile 💕
     - `6.jpg` – Sunny Garden Balcony 🌺
     - `7.jpg` – A Timeless Portrait ✨
     - `8.jpg` – Yellow Blossom & Pure Joy ☀️
     - `9.jpg` – A Heart Made Just For You ❤️
     - `10.jpg` – Hello to Another Gorgeous Year 💖
   - Mix of handcrafted decorative frames: Vintage Polaroid with handwritten captions, Royal Gold Filigree, Rose Gold Shimmer, and Glowing Glassmorphism cards.
   - Full interactive Lightbox modal with zoom, previous/next buttons, rotate orientation tool, and keyboard arrow navigation.

6. **Music Player with Dual-Engine Playback**
   - Floating audio widget with play/pause, equalizer visualizer bars, and status indicator.
   - Plays immediately upon Vidhii clicking the surprise button (adhering to browser autoplay policies).
   - Configured to use `assets/happy-birthday.mp3`.
   - **Enchanted Web Audio API Synthesizer Fallback**: If you haven't added an mp3 file yet, the site automatically plays a sweet music-box / celesta chime version of "Happy Birthday to You" with zero silence and zero errors!

---

## 📁 Project Structure

```
├── index.html              # Semantic HTML5 layout
├── style.css               # Luxury romantic styling & responsive animations
├── script.js               # Logic (Countdown, Web Audio, Particles, Gallery, Cake)
├── README.md               # Documentation and guides
├── assets/
│   ├── images/
│   │   ├── 1.jpg ... 10.jpg      # The 10 precious memory photos
│   │   └── 1.jpeg ... 10.jpeg    # High compatibility fallbacks
│   └── happy-birthday.mp3       # Optional custom birthday audio (Place your mp3 here!)
```

---

## 🎵 How to Add Your Own Birthday Song

1. Place your desired audio file in the `assets/` folder and name it:
   ```
   assets/happy-birthday.mp3
   ```
2. When the website loads, it will automatically play your audio track. If the file is not yet placed there, the website's built-in enchanted music box synthesizer plays the romantic "Happy Birthday" melody seamlessly.

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Double click on `index.html` in your file explorer to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using a Local Web Server (Recommended)
You can run a lightweight local server:

**Using Python (already installed):**
```bash
python -m http.server 8080
```
Then open your browser and navigate to:
```
http://localhost:8080
```

---

---

## 🚀 How to Deploy to Render

### Quick Deploy via Render Blueprint
1. Go to the [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** > **Blueprint**.
3. Select your repository `abhayzalpe5-web/vidhii-birthday-surprise`.
4. Render will automatically read `render.yaml` and configure the static site.
5. Click **Apply** to deploy!

### Alternative: Manual Static Site Setup on Render
1. In [Render Dashboard](https://dashboard.render.com/), click **New +** > **Static Site**.
2. Connect `vidhii-birthday-surprise`.
3. Set:
   - **Name**: `vidhii-birthday-surprise`
   - **Branch**: `main`
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.`
4. Click **Create Static Site**.
5. Your site will be live at `https://vidhii-birthday-surprise.onrender.com`!

---

## 🌐 How to Deploy to GitHub Pages for Vidhii

To share the live link with Vidhii via GitHub Pages:

1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
3. Click **Save**.
4. GitHub Pages will be live at `https://abhayzalpe5-web.github.io/vidhii-birthday-surprise/`.

---

## 🛠️ Testing & Customization

- **Instant Unlock Preview**: Click the discrete button labeled `✨ Preview Unlock (Testing Mode)` on the countdown card or visit `index.html?test=unlock`.
- **Change Target Birthday Date**: Open `script.js` and edit the first line:
  ```javascript
  targetDate: new Date("2026-10-28T00:00:00+05:30"),
  ```
