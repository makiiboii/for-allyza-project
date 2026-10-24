# For Allyza ♡

A responsive, interactive romantic website dedicated to Allyza Lyka Capanang. The relationship counter starts on **April 12, 2024**.

## Run locally

1. Install Node.js (LTS recommended).
2. Open this folder in Antigravity or a terminal.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. You can deploy the project to Vercel by importing the project folder/repository. Vercel should detect Vite automatically.

## Customize the content

Most text and content lives in `src/data/loveContent.ts`:

- `girlfriendName`, `shortName`: names
- `relationshipStartDate`: start date (currently April 12, 2024)
- `timeline`: timeline cards
- `loveReasons`: clickable reasons
- `letters`: letters and their messages
- `quiz`: quiz questions, answer choices, and correct-answer indexes
- `gallery`: photo cards
- `futurePlans`: future memory ideas
- `finalLetter`: final letter text

The relationship timer updates automatically based on `relationshipStartDate`. Use a date/time string like `2024-04-12T00:00:00` and keep it in local time if you want the counter to align with your local midnight.

## Add real photos

1. Put your images inside `public/images/`, for example `public/images/our-first-date.jpg`.
2. In `src/data/loveContent.ts`, update the corresponding `image` field to `/images/our-first-date.jpg`.
3. For the timeline and gallery, add or update the entries in that same file.

Use your own photos or images you have permission to use. Placeholder cards are intentional until you add real memories.

## Add background music

Place an MP3 you have permission to use at `public/music/our-song.mp3`. The floating music button plays/pauses it after the visitor taps; audio does not autoplay.

## Design and implementation

- React + TypeScript + Vite
- Framer Motion animations
- Lucide icons
- Responsive CSS, including reduced-motion support

The initial version has no backend, analytics, login, or data collection. Most website content is configured in one file for easy future edits.
