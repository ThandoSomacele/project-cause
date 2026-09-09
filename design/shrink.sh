#!/usr/bin/env bash
# Downscale an image so it can be read in-conversation (the limit is 2000px on
# the long edge; Retina screenshots land around 2880px and get rejected).
# Usage: design/shrink.sh <image> [maxpx]
set -euo pipefail
src="$1"; max="${2:-1800}"
out="design/incoming/$(basename "${src%.*}")-small.png"
mkdir -p design/incoming
sips -Z "$max" "$src" --out "$out" >/dev/null
printf '%s  ' "$out"; sips -g pixelWidth -g pixelHeight "$out" | tail -2 | tr '\n' ' '; echo
