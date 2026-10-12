# Builds responsive WebP hero images for the service-area pages from Locationimages/ plus the 2x-enhanced Monroe1/FR1 images in Locationimages/enhanced/ (EDSR super-resolution; the originals Monroe1.png and FR1.png in the project root are not modified).
# Run from the project root: python3 scripts/optimize-location-images.py
import json, os
from PIL import Image
SRC = {  # page slug -> original file (note the original Carleton file is spelled "Carelton")
    'dearborn-heights': 'Locationimages/Dearbornheights.png', 'dearborn': 'Locationimages/Dearborn.png', 'monroe': 'Locationimages/enhanced/Monroe1_x2.png',
    'carleton': 'Locationimages/Carelton.png', 'downriver': 'Locationimages/enhanced/FR1_x2.png', 'metro-detroit': 'Locationimages/Metrodetroit.png',
}
OUT = 'site/assets/img/loc'; os.makedirs(OUT, exist_ok=True)
manifest = {}
for slug, f in SRC.items():
    im = Image.open(f).convert('RGB')
    widths = [w for w in (640, 1024, 1600, 1920) if w < im.width]
    if im.width <= 1920 and im.width not in widths: widths.append(im.width)  # never upscale
    widths = sorted(set(widths))
    for w in widths:
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        r.save(f'{OUT}/loc-{slug}-{w}.webp', 'WEBP', quality=(68 if slug in ('monroe', 'downriver') else 76), method=6)
    manifest[slug] = {'widths': widths, 'w': widths[-1], 'h': round(im.height * widths[-1] / im.width), 'source': [im.width, im.height]}
json.dump(manifest, open('src/loc-images.json', 'w'), indent=1)
print(json.dumps(manifest))
