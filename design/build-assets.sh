#!/usr/bin/env bash
# Turn the raw Figma pulls in design/raw into optimised, correctly-named assets
# under static/. Re-runnable; safe to run after dropping in new raw exports.
set -euo pipefail
cd "$(dirname "$0")/.."

RAW=design/raw
SVGO=./node_modules/.bin/svgo
OUT=static
mkdir -p "$OUT"/{brand,images,icons}

# resize <src> <max-edge> <dest.webp> [quality]
webp() {
	local src=$1 max=$2 dest=$3 q=${4:-82} tmp
	tmp=$(mktemp -t causeimg).png
	sips -Z "$max" -s format png "$src" --out "$tmp" >/dev/null
	cwebp -quiet -q "$q" -alpha_q 100 -m 6 "$tmp" -o "$dest"
	rm -f "$tmp"
	printf '  %-42s %s\n' "$dest" "$(du -h "$dest" | cut -f1)"
}

# resize <src> <max-edge> <dest.png>
png() {
	local src=$1 max=$2 dest=$3
	sips -Z "$max" -s format png "$src" --out "$dest" >/dev/null
	printf '  %-42s %s\n' "$dest" "$(du -h "$dest" | cut -f1)"
}

echo "brand"
# Flat #0A1538 silhouette with transparent cut-outs — used as a CSS mask so the
# same file paints navy in the nav and white in the footer.
png "$RAW/page/page_09.png" 320 "$OUT/brand/logo-mark.png"

echo "photography"
webp "$RAW/page/page_01.jpeg" 1400 "$OUT/images/worker-phone.webp"       # get-paid section
webp "$RAW/page/page_03.jpeg" 1000 "$OUT/images/electricians.webp"       # subscription card
webp "$RAW/page/page_04.jpeg" 1400 "$OUT/images/kitchen-consult.webp"    # subscription card
webp "$RAW/page/page_15.png"  2200 "$OUT/images/tools-flatlay.webp" 78   # final CTA ground

echo "product shots"
webp "$RAW/page/page_12.png" 1600 "$OUT/images/dashboard-quotes.webp"    # carousel slide
webp "$RAW/page/page_16.png" 1600 "$OUT/images/dashboard-requests.webp"  # carousel slide

echo "hero devices (transparent)"
# Each phone is a differently-rotated render centred on a 4096x2926 canvas that
# is mostly empty, and each has its own content box — so measure per image
# rather than sharing one crop, which clips the widest of them.
phone() {
	local src=$1 dest=$2 box tmp
	box=$(python3 design/bbox.py "$src" 8 600)
	tmp=$(mktemp -t causephone).png
	# shellcheck disable=SC2086
	set -- $box
	sips -c "$4" "$3" --cropOffset "$2" "$1" "$src" --out "$tmp" >/dev/null
	webp "$tmp" 700 "$dest" 88
	rm -f "$tmp"
}
phone "$RAW/hero/hero_01.png" "$OUT/images/phone-search.webp"    # orange Find.Connect screen
phone "$RAW/hero/hero_02.png" "$OUT/images/phone-results.webp"   # search results list
phone "$RAW/hero/hero_07.png" "$OUT/images/phone-profile.webp"   # provider profile

echo "mascot + hero frame"
# The mascot ships as vector so it stays sharp at any size. svgo at precision 1
# is visually identical to the 312KB original at a third of the bytes.
"$SVGO" -i "$RAW/hero/hero_s1.svg" -o "$OUT/images/mascot-pole.svg" --multipass -p 1 >/dev/null
printf '  %-42s %s (gzip %s)\n' "$OUT/images/mascot-pole.svg" \
	"$(du -h "$OUT/images/mascot-pole.svg" | cut -f1)" \
	"$(gzip -9 -c "$OUT/images/mascot-pole.svg" | wc -c | tr -d ' ')"

echo "icons"
icon() { "$SVGO" -i "$1" -o "$OUT/icons/$2" --multipass -p 2 >/dev/null; }
icon "$RAW/hero/hero_s2.svg"  check-circle.svg    # mint tick
icon "$RAW/hero/hero_s3.svg"  no-credits.svg
icon "$RAW/hero/hero_s4.svg"  no-confusion.svg
icon "$RAW/hero/hero_s7.svg"  speech.svg
icon "$RAW/hero/hero_s5.svg"  hero-frame.svg      # decorative orange bracket
icon "$RAW/page/page_s06.svg" banknote.svg        # no hidden fees
icon "$RAW/page/page_s09.svg" wrench.svg
icon "$RAW/page/page_s11.svg" credits.svg
icon "$RAW/page/page_s19.svg" jobs.svg
icon "$RAW/page/page_s20.svg" support.svg
printf '  %s icons\n' "$(ls "$OUT/icons" | wc -l | tr -d ' ')"

echo
echo "total shipped: $(du -sh "$OUT" | cut -f1)"
