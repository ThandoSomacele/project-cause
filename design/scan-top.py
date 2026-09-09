import pngread, sys
path=sys.argv[1]
img=pngread.load(path); w,h,ch,px=img['w'],img['h'],img['ch'],img['px']
def p(x,y):
    o=(y*w+x)*ch; return (px[o],px[o+1],px[o+2])
def bright(c): return c[0]>110 and c[1]>110 and c[2]>110
def orange(c): return c[0]>150 and 70<c[1]<190 and c[2]<110 and c[0]-c[2]>90
def ink(c): return bright(c) or orange(c)
def green(c): return c[1]>110 and c[1]-c[0]>40 and c[1]-c[2]>25 and c[0]<140
XMAX=740
bands=[];inb=False
for y in range(h):
    n=sum(1 for x in range(0,XMAX) if ink(p(x,y)))
    a=n>2
    if a and not inb: st=y; inb=True
    elif not a and inb: bands.append((st,y-1)); inb=False
names=['L1','L2','L3','SUB']
D={'L1':(61.6,71.4,574.0),'L2':(None,71.4,669.2),'L3':(None,72.8,706.3),'SUB':(298.2,70.7,385.0)}
print(f"{'':4}{'top':>8}{'left':>8}{'right':>8}   |  design top/left/right   | delta")
for i,(a,b) in enumerate(bands[:4]):
    xs=[x for x in range(0,XMAX) for y in range(a,b+1) if ink(p(x,y))]
    n=names[i]; d=D[n]
    dt=f'{a-d[0]:+.1f}' if d[0] else '-'
    print(f'{n:4}{a:8.1f}{min(xs):8.1f}{max(xs):8.1f}   |{str(d[0]):>7} {d[1]:7.1f} {d[2]:7.1f}  | top {dt}  L {min(xs)-d[1]:+.1f}  R {max(xs)-d[2]:+.1f}')
ys=[y for y in range(320,410) for x in range(0,XMAX) if green(p(x,y))]
if ys:
    y0,y1=min(ys),max(ys)
    xs=sorted(set(x for x in range(0,XMAX) for y in range(y0,y1+1) if green(p(x,y))))
    segs=[];s0=xs[0];pr=xs[0]
    for x in xs[1:]:
        if x-pr>6: segs.append(s0); s0=x
        pr=x
    segs.append(s0)
    print(f'chips top {y0} (design 342.3)  x {segs}  design [72.1, 271.6, 456.4]')
def navy(c): return c[2]>=c[0] and c[2]<95 and c[0]<75 and c[1]<80
rows={}
for y in range(330,h):
    r=[x for x in range(0,XMAX) if not navy(p(x,y)) and sum(p(x,y))>150]
    if r: rows[y]=(min(r),max(r))
if rows:
    ks=sorted(rows)
    print(f'mascot ink x{min(v[0] for v in rows.values())}..{max(v[1] for v in rows.values())} top {ks[0]}   design x210..699 top 346')
