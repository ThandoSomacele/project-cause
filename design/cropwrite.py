import zlib, struct, sys, pngread as P
def write(path, img, x0,y0,x1,y1, scale=1):
    w,h = x1-x0, y1-y0
    rows=bytearray()
    for y in range(y0,y1):
        for _ in range(scale):
            rows.append(0)
            for x in range(x0,x1):
                r,g,b = P.rgb(img,x,y)
                for _ in range(scale): rows += bytes((r,g,b))
    W,H = w*scale, h*scale
    def chunk(t,d):
        c = struct.pack('>I',len(d))+t+d
        return c+struct.pack('>I', zlib.crc32(t+d)&0xffffffff)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', W,H,8,2,0,0,0))
    png += chunk(b'IDAT', zlib.compress(bytes(rows),6))
    png += chunk(b'IEND', b'')
    open(path,'wb').write(png)
if __name__=='__main__':
    src,dst,x0,y0,x1,y1 = sys.argv[1],sys.argv[2],*map(int,sys.argv[3:7])
    sc = int(sys.argv[7]) if len(sys.argv)>7 else 1
    write(dst, P.load(src), x0,y0,x1,y1, sc)
    print(dst)
