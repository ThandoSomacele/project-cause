"""Measure landmark boxes in a 1425-wide hero render (design or build)."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pngread import load, rgb

img = load(sys.argv[1]); w, h = img['w'], img['h']
label = sys.argv[2] if len(sys.argv) > 2 else sys.argv[1]

def box(name, pred, x0, x1, y0, y1, step=1):
    xs, ys = [], []
    for y in range(y0, min(y1, h), step):
        for x in range(x0, min(x1, w), step):
            if pred(rgb(img, x, y)):
                xs.append(x); ys.append(y)
    if not xs:
        print('  %-12s (none)' % name); return
    print('  %-12s x[%d..%d] y[%d..%d]' % (name, min(xs), max(xs), min(ys), max(ys)))

def orange(c):
    r, g, b = c; return r > 210 and 100 < g < 175 and b < 60
def white(c):
    r, g, b = c; return r > 200 and g > 200 and b > 200

print(label)
box('headline', white, 40, 700, 90, 430)
box('frame', orange, 700, w, 90, 440)
box('form-border', orange, 40, 700, 430, 700)
