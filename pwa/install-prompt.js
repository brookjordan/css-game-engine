export function addInstallPWAModal(beforeInstallPromptEvent) {
  let promptModal = document.createElement('div');
  promptModal.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    z-index: 999999999;
    transform: translateX(-50%);
    background: white;
    padding: 1.5em 2em;
    font-size: 0.8em;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
    border-radius: 3px;
    display: flex;
  `;
  promptModal.innerHTML = `
    <button
      class="install-pwa-accept"
      type="button"
      style="
        width: 100%;
        font-size: 1.5em;
        border-radius: 3px;
      "
    >
      Add to my home&nbsp;screen
    </button>

    <button
      class="install-pwa-decline"
      type="button"
      style="
        width: 100%;
        font-size: 1.5em;
        border-radius: 3px;
        margin-left: 0.5em;
        color: #999;
      "
    >
      No thanks.
    </button>
  `;

  let killPrompt = () => { document.body.removeChild(promptModal); };
  promptModal.querySelector('.install-pwa-decline').addEventListener('click', killPrompt);
  promptModal.querySelector('.install-pwa-accept')
    .addEventListener('click', () => {
      killPrompt();
      beforeInstallPromptEvent.prompt();
    });
  document.body.appendChild(promptModal);
}
