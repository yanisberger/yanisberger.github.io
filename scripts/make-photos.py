# Makes the web versions of the mountain photos shown under About.
# Usage: python3 scripts/make-photos.py
#
# Originals live in photos/originals/ (not deployed). For every photo listed in
# src/data/peaks.json this writes public/photos/<id>-640.jpg and <id>-1000.jpg,
# resized, re-encoded and without any metadata (no EXIF, no GPS).
import json, os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'photos', 'originals')
OUT = os.path.join(ROOT, 'public', 'photos')
WIDTHS = (640, 1000)

os.makedirs(OUT, exist_ok=True)
for peak in json.load(open(os.path.join(ROOT, 'src', 'data', 'peaks.json'), encoding='utf-8')):
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, peak['file']))).convert('RGB')
    for w in WIDTHS:
        copy = im.copy()
        copy.thumbnail((w, w * 2))
        path = os.path.join(OUT, f"{peak['id']}-{w}.jpg")
        copy.save(path, 'JPEG', quality=78, optimize=True, progressive=True)
        print(f"{path}  {copy.size[0]}x{copy.size[1]}  {os.path.getsize(path) // 1024} KB")
