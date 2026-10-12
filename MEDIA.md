# Patch Master media inventory

Originals live in `Videos/` and are never modified. Web versions are in `site/assets/video/` (MP4) and `site/assets/img/media/` (WebP). All clips were inspected frame by frame. All video is portrait (the 1920x1080 files carry a -90 degree rotation flag, so they are 1080x1920; `Hero.mov` is 720x1280).

| Original | What it shows (verified) | Orientation | Web file | Used |
|---|---|---|---|---|
| `IMG_1470.MOV` (16.7s) | Man taping/finishing a long hung-drywall wall with a handheld taping tool | Portrait | `hero.mp4` (2s to 14s) | **Home hero**; Our Work "Taping & Finishing"; stills on Home, Drywall Installation, Dearborn Heights, Metro Detroit |
| `Hero.mov` (21s) | Plaster skim/repair on a cracked archway wall. **Instagram watermark moves around the frame and carries a music credit; last ~4s is an Instagram end card.** | Portrait 720x1280 | Still only (`plaster-arch`, clean frame at 0.1s) | Home "Holes, Cracks and Damaged Plaster", Plaster Repair page. Video **not** used (watermark) |
| `IMG_1489.MOV` (13s) | Man applying joint compound to drywall seams with a knife | Portrait | `work-finishing-1.mp4` | Our Work; stills on Home, Services, Basement/Garage/House page |
| `IMG_0001.MOV` (4s) | Man pole-sanding a wall | Portrait | `work-sanding-1.mp4` | Our Work "Wall Sanding" |
| `IMG_8261.MOV` (9.5s) | Two workers on stilts finishing a ceiling, open building interior | Portrait | `work-ceiling.mp4` | Our Work; Home work strip |
| `IMG_8611.MOV` (19s) | Worker on a scissor lift finishing a tall wall, large open building | Portrait | `work-high-wall.mp4` (0 to 15s) | Our Work; stills on Home, Drywall Installation, Dearborn Heights, Metro Detroit |
| `IMG_9531.MOV` (33s) | Close-up hand sanding of a drywall corner | Portrait | `work-sanding-2.mp4` (0 to 14s) | Our Work "Hand Sanding"; Home work strip |
| `IMG_9532.MOV` (29s) | Pole sanding in a room, heavy motion blur | Portrait | none | Not used (blurry) |
| `IMG_9895.MOV` (7s) | Man on stilts finishing the wall-to-ceiling line in a painted room | Portrait | `work-finishing-2.mp4` | Our Work; stills on Home, Basement/Garage/House page, locations |
| `Jeremyowner.JPG` | Jeremy standing in a room of hung, partly finished drywall | Portrait 3:4 | `jeremy.webp` | Home About, About page |
| `Jonas-son.JPG` | Jonas from behind in a Patch Master shirt, with a laser level | Portrait 9:16 | `jonas.webp` | Home About, About page |
| `5C2E52A2-...JPG` | Patch Master work truck, phone number on the door sign | Portrait 9:16 | `truck.webp` | About page ("At a Glance") |

No photo of Lillian was supplied, so none is shown.

## Not claimed
- No clip is labeled with a city, a customer or a job name.
- "Basement", "garage" and "dustless" are not used as captions: the footage does not show them clearly. (Some rooms may be basements, and the sanding clips do not show dust collection.)
- `IMG_8261` and `IMG_8611` look like larger commercial interiors, and `IMG_8261` shows crew in other shirts. Confirm these are Patch Master jobs before launch.

## Re-encoding (ffmpeg)
```
# video: portrait 720x1280, H.264, no audio, faststart
ffmpeg -ss START -t SECONDS -i Videos/FILE.MOV -an \
  -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -preset slow -crf 28 \
  -profile:v high -pix_fmt yuv420p -movflags +faststart site/assets/video/NAME.mp4
# still: grab a frame, convert to WebP with Pillow (480/800/full-width variants)
ffmpeg -ss TIME -i Videos/FILE.MOV -frames:v 1 -q:v 1 frame.png
```
After adding stills, regenerate `src/media-sizes.json` (widths of each WebP) and register them in `src/data.mjs` (`stills`, `slotStill`, `gallery`), then run `node build.mjs`.
