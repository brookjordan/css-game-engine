# Usage instructions

- Add the `pwa` folder and all of its contents into the root folder of your app.
- Add the `service-worker.js` file to the root of your app.
- Replace the images `pwa/icon-192x192.png` and `pwa/icon-192x192.png` with `png` images with the same dimensions of your app icon
- Open the `pwa/in manifest.webmanifest` file in a text editor and amend the lines above `DON’T EDIT` to be correct for your app.
- Open the `pwa/cache-details.js` file in a text editor and:
  - add all of the files you want pre-cached for your app to the `staticAssets` array
  - update `cacheName` to be the name of the cache
- Add the following lines to the head of `index.html`:
  - `<link rel="manifest" href="./pwa/manifest.webmanifest">`
- Add the following line before the closing `</body>` tag of `index.html`:
  - `<script src="./pwa/init.js" defer type="module">`
