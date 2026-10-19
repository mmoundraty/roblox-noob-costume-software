# roblox-noob-costume-software
Software for the noob costume, in case the hardware doesn't work. It's a web soundboard for a DIY Roblox boombox that plays through a Bluetooth speaker.

## Features
- One button per sound, split into **Songs** and **SFX**
- Pressing a button stops the current sound and plays the new one; pressing the same button again restarts it
- Seek bar to jump to any point in whatever is playing, with a `current / total` time display
- Play/pause button and volume slider
- Big buttons that work on a phone, and the player stays pinned to the top of the screen

## Files
```
index.html   the whole dashboard (HTML + CSS + JS, no dependencies)
songs/       music (mp3)
sfx/         sound effects (mp3)
```

## Use
**On a computer:** double-click `index.html`.

**On a phone (recommended for the costume):**
1. Commit and push everything, including `songs/` and `sfx/`.
2. On GitHub, go to Settings → Pages, then set the source to `main` / root.
3. Open the Pages URL on the phone paired to the Bluetooth speaker.

## Adding a sound
1. Put the mp3 in `songs/` or `sfx/`.
2. Add one line to the `SOUNDS` list near the top of the script in `index.html`:
   ```js
   { name: 'Button Label', file: 'sfx/my_sound.mp3' },
   ```
   Browsers can't list a folder's files, so a sound only shows up once it's in this list.
