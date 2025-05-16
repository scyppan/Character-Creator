// js/onload.js
document.addEventListener('DOMContentLoaded', onDomContentLoaded);

function onDomContentLoaded() {
  initializeApp();
}

function initializeApp() {
  createAppStructure();
  createPanels();
  assignElementsToPanels();
}
