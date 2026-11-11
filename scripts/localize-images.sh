#!/usr/bin/env bash
# Download the reference-site images into the repo with SEO filenames,
# then flip LOCAL to true in src/_data/images.js. Run once before launch, then commit.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p src/assets/img/ref
node -e '
const items = require("./src/_data/images.js")._items;
for (const v of Object.values(items)) console.log(v.remote + "\t" + v.file);
' | while IFS=$'\t' read -r url file; do
  echo "↓ $file"
  curl -fsSL --retry 2 -o "src/assets/img/ref/$file" "$url"
done
sed -i '' 's/^const LOCAL = false;/const LOCAL = true;/' src/_data/images.js 2>/dev/null || \
  sed -i 's/^const LOCAL = false;/const LOCAL = true;/' src/_data/images.js
echo "Done. Images localized — review, commit and push."
