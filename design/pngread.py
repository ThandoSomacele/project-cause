import zlib, struct, sys

def load(path):
    d = open(path,'rb').read()
    assert d[:8] == b'\x89PNG\r\n\x1a\n'
    pos, idat, pal = 8, b'', None
    w=h=bd=ct=0
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos+4])[0]
        typ = d[pos+4:pos+8]; data = d[pos+8:pos+8+ln]
        if typ==b'IHDR': w,h,bd,ct = struct.unpack('>IIBB', data[:10])
        elif typ==b'PLTE': pal=data
        elif typ==b'IDAT': idat += data
        elif typ==b'IEND': break
        pos += 12+ln
    assert bd==8, 'only 8-bit supported'
    ch = {0:1,2:3,3:1,4:2,6:4}[ct]
    raw = zlib.decompress(idat)
    bpp, stride = ch, w*ch
    out = bytearray(h*stride); prev = bytearray(stride); i=0
    for y in range(h):
        f = raw[i]; i+=1
        line = bytearray(raw[i:i+stride]); i+=stride
        for x in range(stride):
            a = line[x-bpp] if x>=bpp else 0
            b = prev[x]; c = prev[x-bpp] if x>=bpp else 0
            if f==1: line[x]=(line[x]+a)&255
            elif f==2: line[x]=(line[x]+b)&255
            elif f==3: line[x]=(line[x]+(a+b)//2)&255
            elif f==4:
                p=a+b-c; pa,pb,pc=abs(p-a),abs(p-b),abs(p-c)
                pr = a if (pa<=pb and pa<=pc) else (b if pb<=pc else c)
                line[x]=(line[x]+pr)&255
        out[y*stride:(y+1)*stride]=line; prev=line
    return {'w':w,'h':h,'ch':ch,'ct':ct,'pal':pal,'px':bytes(out)}

def rgb(img, x, y):
    w,ch,ct = img['w'],img['ch'],img['ct']
    o = (y*w+x)*ch; p = img['px']
    if ct==3:
        idx=p[o]; return img['pal'][idx*3:idx*3+3]
    if ct in (0,4): v=p[o]; return (v,v,v)
    return (p[o],p[o+1],p[o+2])

def sample(path, pts):
    img = load(path)
    print(f"{path}  {img['w']}x{img['h']}")
    for name,(x,y) in pts.items():
        r,g,b = rgb(img, x, y)
        print('  %-20s #%02X%02X%02X' % (name, r, g, b))
