import pngread, zlib, struct, sys
def load(f):
    img=pngread.load(f); return img
def crop(src, X0, X1, Y0, Y1, out):
    img=pngread.load(src); w,ch,px=img['w'],img['ch'],img['px']
    CW,CH=X1-X0+1, Y1-Y0+1
    rows=[]
    for y in range(Y0,Y1+1):
        row=bytearray([0])
        for x in range(X0,X1+1):
            o=(y*w+x)*ch; row+=bytes(px[o:o+3])
        rows.append(bytes(row))
    def chunk(t,d):
        c=struct.pack('>I',len(d))+t+d
        return c+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
    open(out,'wb').write(b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',CW,CH,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(b''.join(rows),9))+chunk(b'IEND',b''))
    return CW,CH
def findicon(src, px0,px1,py0,py1, bg):
    img=pngread.load(src); w,ch,p=img['w'],img['ch'],img['px']
    def at(x,y):
        o=(y*w+x)*ch; return (p[o],p[o+1],p[o+2])
    def isbg(c): return sum(abs(a-b) for a,b in zip(c,bg))<70
    cols=[x for x in range(px0,px1) if any(not isbg(at(x,y)) for y in range(py0,py1))]
    if not cols: return None
    # first contiguous cluster = the icon
    run=[cols[0]]
    for x in cols[1:]:
        if x-run[-1]>12: break
        run.append(x)
    x0,x1=run[0],run[-1]
    rows=[y for y in range(py0,py1) if any(not isbg(at(x,y)) for x in range(x0,x1+1))]
    return x0,x1,rows[0],rows[-1]
