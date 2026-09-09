"""Measure a hero render's anchors as percentages of its own width, so a build
screenshot at any viewport can be diffed directly against the 1425px design."""
import pngread as P

def orange(c):
    r,g,b=c; return r>190 and 90<g<175 and b<90
def bright(c,t=170):
    r,g,b=c; return r>t and g>t and b>t

def measure(path):
    img = P.load(path); W,H = img['w'], img['h']
    px = lambda x,y: P.rgb(img,x,y)
    s = lambda v: v/W*100                      # px -> % of width
    S = lambda f: int(f*W/100)                 # % of width -> px
    out = {'w':W, 'h':H, 'height': s(H)}

    # Text rows in the left column (headline, subhead, chips, form label).
    lo, hi = S(4.2), S(48)   # stay left of the mascot and phones
    rows = [y for y in range(0, min(H, S(52))) if any(bright(px(x,y)) for x in range(lo,hi,2))]
    runs, cur = [], [rows[0]]
    for y in rows[1:]:
        if y-cur[-1] <= 3: cur.append(y)
        else: runs.append((cur[0],cur[-1])); cur=[y]
    runs.append((cur[0],cur[-1]))
    runs = [r for r in runs if r[1]-r[0] >= 2]
    out['runs'] = [(s(a), s(b)) for a,b in runs]

    # Headline is the tallest run; subhead is the next run below it.
    head = max(runs, key=lambda r: r[1]-r[0])
    out['headTop'], out['headBottom'] = s(head[0]), s(head[1])
    below = [r for r in runs if r[0] > head[1]]
    if below:
        out['subheadTop'] = s(below[0][0])
        if len(below) > 1: out['chipsTop'] = s(below[1][0])

    # Email input: the orange 1px border, left of the filled button.
    ob = [(x,y) for y in range(S(35), min(H,S(50))) for x in range(S(4), S(40), 2) if orange(px(x,y))]
    if ob:
        ys = [y for _,y in ob]
        out['inputTop'], out['inputBottom'] = s(min(ys)), s(max(ys))
        out['inputLeft'] = s(min(x for x,_ in ob))

    # The pole: a narrow vertical orange bar below the headline, right of centre.
    y = S(29.5)
    if y < H:
        xs = [x for x in range(S(48), S(60)) if orange(px(x,y))]
        if xs: out['poleCentre'] = s((min(xs)+max(xs))/2); out['poleW'] = len(xs)

    # Bracket top rail and the arrowhead on its left vertical.
    for y in range(S(5), S(12)):
        xs = [x for x in range(S(50), W) if orange(px(x,y))]
        if len(xs) > S(14):
            out['railTop'] = s(y); out['railLeft'] = s(min(xs)); out['railRight'] = s(max(xs)); break
    best = None
    for y in range(S(12), S(18)):
        xs = [x for x in range(S(51), S(57)) if orange(px(x,y))]
        if len(xs) >= 6 and (best is None or len(xs) > best[1]):
            best = (y, len(xs), (min(xs)+max(xs))/2)
    if best: out['arrowY'], out['arrowCentre'] = s(best[0]), s(best[2])
    return out

if __name__ == '__main__':
    import sys
    a, b = measure(sys.argv[1]), measure(sys.argv[2])
    keys = ['height','headTop','headBottom','subheadTop','chipsTop','inputTop','inputBottom',
            'inputLeft','poleCentre','railTop','railLeft','railRight','arrowY','arrowCentre']
    print(f"{'anchor':<13}{'design':>9}{'build':>9}{'delta':>8}   (% of width; delta in design px)")
    for k in keys:
        va, vb = a.get(k), b.get(k)
        if va is None or vb is None:
            print(f'{k:<13}{"—":>9}{"—":>9}'); continue
        d = (vb-va)*1425/100
        flag = '' if abs(d) <= 4 else ('  <<<' if abs(d) > 12 else '  <')
        print(f'{k:<13}{va:9.3f}{vb:9.3f}{d:8.1f}{flag}')
