# roblox-noob-costume-software
Software for the noob costume, in case the hardware doesn't work. It's a web soundboard for a DIY Roblox boombox that plays through a Bluetooth speaker, and it installs on an iPhone as an app that works offline.

## Features
- One button per sound, split into **Songs** and **SFX**
- Pressing a button stops the current sound and plays the new one; pressing the same button again restarts it
- Seek bar to jump to any point in whatever is playing, with a `current / total` time display
- Play/pause button, plus a volume slider on computers (iPhones use the phone's volume buttons)
- Installs to the iPhone home screen and works with **no internet** once saved
- Big buttons that work on a phone, and the player stays pinned to the top of the screen

## Files
```
index.html      the dashboard (HTML + CSS + JS, no dependencies)
sounds.js       the list of sounds shown as buttons
sw.js           saves all files on the phone for offline use
manifest.json   app name/icon for the home screen
icon.png        app icon
sw.test.js      check: `node sw.test.js`
songs/          music (mp3)
sfx/            sound effects (mp3)
```

## Install on iPhone
You only need internet the first time.
1. Commit and push everything to GitHub.
2. On GitHub, go to Settings → Pages, then set the source to `main` / root. Wait a minute for the site to go live.
3. On the iPhone, open the Pages URL in **Safari** (`https://mmoundraty.github.io/roblox-noob-costume-software/`).
4. Tap **Share → Add to Home Screen**.
5. Open the **Boombox** app from the home screen **once while online**, and wait until it says **✓ Ready offline**.
6. Test it: turn on Airplane Mode (Bluetooth can stay on), open the app, and play a song.

Tips:
- Sounds play even when the ring/silent switch is on silent. Set loudness with the phone's volume buttons.
- Audio may stop if you lock the phone or switch apps. Keep the app open on screen.

**On a computer:** double-click `index.html`. Offline saving only works from the https site, not from a double-clicked file.

## Adding or changing a sound
1. Put the mp3 in `songs/` or `sfx/`.
2. Add one line to `sounds.js`:
   ```js
   { name: 'Button Label', file: 'sfx/my_sound.mp3' },
   ```
   Browsers can't list a folder's files, so a sound only shows up once it's in this list.
3. In `sw.js`, bump `VERSION` (for example `'v1'` → `'v2'`). Without this, the phone keeps playing its old saved copy.
4. Run `node sw.test.js`. It catches typos in file names, which would otherwise break offline saving.
5. Push, then open the app once while online. Close it and open it again to pick up the update.
