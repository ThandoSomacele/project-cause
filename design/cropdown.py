import zlib, struct, sys, pngread as P
src,dst,x0,y0,x1,y1,step = sys.argv[1],sys.argv[2],*map(int,sys.argv[3:8])
img=P.load(src)
rows=bytearray()
for y in range(y0,y1,step):
    rows.append(0)
    for x in range(x0,x1,step):
        rows+=bytes(P.rgb(img,x,y))
W=len(range(x0,x1,step)); H=len(range(y0,y1,step))
def chunk(t,d):
    c=struct.pack('>I',len(d))+t+d
    return c+struct.pack('>I', zlib.crc32(t+d)&0xffffffff)
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(bytes(rows),6))+chunk(b'IEND',b'')
open(dst,'wb').write(png); print(dst,W,'x',H)
