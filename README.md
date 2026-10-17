# orebro-profile

Static landing page for Masood Ahmad (Örebro), served on
renvolve.biz / .info / .net / .org. Swedish default; `?lang=en`
or the header button switches to English.

## Photo
Save a square portrait as `assets/photo.jpg` (~600x600, <150 KB).
JS swaps it in automatically; until then the SVG placeholder shows.
Other path/format: change `photo` in `js/config.js`.

## Contact details
Edit `js/config.js` (single spot):
- `email` – default `masoodahmad991@renvolve.biz`
- `phone` – empty = hidden; set e.g. `'+46 ...'` to show
LinkedIn link lives in `index.html` (`#contact-linkedin`).

## Texts
Swedish in `index.html` (`data-i18n` keys); English in
`js/lang-en.js` (same keys).

## Styles
Edit `scss/`, then rebuild (compiled `css/main.css` is committed):
```
npx --yes sass@1.83.0 --no-source-map --style=compressed \
  scss/main.scss css/main.css
```

## Preview
```
python3 -m http.server 8791 --bind 127.0.0.1
```

## Deploy (notes, not done)
Copy the folder minus `scss/`, `README.md`, `.git` to each
domain's web root (same files for all 4), e.g.
`rsync -a --exclude scss --exclude .git --exclude README.md ./ host:/var/www/renvolve.biz/`.
Serve over HTTPS (e.g. Let's Encrypt per domain).
