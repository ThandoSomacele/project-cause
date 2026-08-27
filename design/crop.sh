#!/usr/bin/env bash
# Crop a region out of the full-page Figma render for 1:1 inspection.
# usage: ./design/crop.sh <x> <y> <w> <h> <out.png>
set -euo pipefail
SRC="$(dirname "$0")/raw/exports/page-full.png"
x=$1; y=$2; w=$3; h=$4; out=$5
cp "$SRC" "$out"
sips -c "$h" "$w" --cropOffset "$y" "$x" "$out" >/dev/null
echo "$out  ${w}x${h} @ ${x},${y}"
