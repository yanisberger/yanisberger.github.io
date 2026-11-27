# Builds the hero's ASCII portrait for both themes from one photo.
# Usage: python3 scripts/make-ascii.py public/ProfilePicture.PNG src/data
# Writes portrait-dark.json (bright pixels = dense characters, for the charcoal theme)
# and portrait-light.json (dark pixels = dense characters). The wall is cut out by colour:
# it has almost no saturation, while skin, hair and sweater do.
import sys, json, math
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageChops
photo, out_dir = sys.argv[1], sys.argv[2]
src = Image.open(photo).convert('RGB')
w, h = src.size
src = src.crop((int(w*.12), int(h*.04), int(w*.88), int(h*.96)))
im = src.convert('L')
light = im.filter(ImageFilter.GaussianBlur(70))
im = Image.blend(im, ImageChops.subtract(im, light, scale=1, offset=140), 0.45)
im = ImageOps.autocontrast(im, cutoff=1)
im = im.filter(ImageFilter.UnsharpMask(radius=6, percent=180, threshold=2))
im = ImageEnhance.Contrast(im).enhance(1.35)
_, s, v = src.convert('HSV').split()
mask = ImageChops.lighter(Image.eval(s, lambda p: 255 if p > 38 else 0), Image.eval(v, lambda p: 255 if p < 95 else 0))
mask = mask.filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MedianFilter(15)).filter(ImageFilter.GaussianBlur(6))
cols = 84; rows = int(cols * im.height / im.width * 0.52)
im = im.resize((cols, rows), Image.LANCZOS); M = mask.resize((cols, rows), Image.LANCZOS)
ramp = " .:-=+*x#%@"
def grid(dark):
    out = []
    for y in range(rows):
        line = ''
        for x in range(cols):
            b = im.getpixel((x, y)) / 255; m = M.getpixel((x, y)) / 255
            nx = (x/cols - .5) / .5; ny = (y/rows - .42) / .62
            vig = max(0, 1 - max(0, math.hypot(nx, ny) - .55) / .45)
            if m < 0.35 or vig < 0.05: line += ' '; continue
            t = b ** 0.9 if dark else (1 - b) ** 0.6
            d = max(0.2 if dark else 0.24, t) * vig * min(1, m * 1.3)
            line += ramp[max(1, min(len(ramp)-1, int(d * len(ramp))))] if d > 0.08 else ' '
        out.append(line.rstrip())
    return out
json.dump(grid(True), open(out_dir + '/portrait-dark.json', 'w'))
json.dump(grid(False), open(out_dir + '/portrait-light.json', 'w'))

