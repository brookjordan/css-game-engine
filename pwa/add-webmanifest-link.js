export function addWebmanifestLink() {
  let manifestLinkElement = document.createElement('link');
  manifestLinkElement.setAttribute('rel', 'manifest');
  manifestLinkElement.setAttribute('href', './pwa/manifest.webmanifest');
  document.head.appendChild(manifestLinkElement);
}
