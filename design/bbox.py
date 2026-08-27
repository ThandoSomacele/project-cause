"""Print the opaque bounding box of an image as: left top width height (source px).

usage: bbox.py <file> [alpha_threshold] [probe_size]
"""
import sys, subprocess, tempfile, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pngread import load

src = sys.argv[1]
thresh = int(sys.argv[2]) if len(sys.argv) > 2 else 8
probe_size = sys.argv[3] if len(sys.argv) > 3 else '600'

probe = tempfile.mktemp(suffix='.png')
subprocess.run(['sips', '-Z', probe_size, '-s', 'format', 'png', src, '--out', probe],
               check=True, stdout=subprocess.DEVNULL)
info = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', src],
                      check=True, capture_output=True, text=True).stdout
sw = int([l for l in info.splitlines() if 'pixelWidth' in l][0].split(':')[1])
sh = int([l for l in info.splitlines() if 'pixelHeight' in l][0].split(':')[1])

img = load(probe); w, h, ch, p = img['w'], img['h'], img['ch'], img['px']
os.unlink(probe)
if ch != 4:
    print(0, 0, sw, sh); sys.exit()

minx, miny, maxx, maxy = w, h, -1, -1
for y in range(h):
    row = y * w * ch
    for x in range(w):
        if p[row + x * ch + 3] > thresh:
            if x < minx: minx = x
            if x > maxx: maxx = x
            if y < miny: miny = y
            if y > maxy: maxy = y
if maxx < 0:
    print(0, 0, sw, sh); sys.exit()

fx, fy = sw / w, sh / h
# Pad by one probe pixel each side so anti-aliased edges survive the crop.
left = max(0, int((minx - 1) * fx))
top = max(0, int((miny - 1) * fy))
right = min(sw, int((maxx + 2) * fx))
bottom = min(sh, int((maxy + 2) * fy))
print(left, top, right - left, bottom - top)
