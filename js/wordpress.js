document.addEventListener('DOMContentLoaded', () => {
  createAppStructure();
  createPanels();
  assignElementsToPanels();
  assignWrappers();

  // move the file-upload (identity) after everything
  deferMove('#frm_field_8088_container', 'panel-identity');

  // now move the Formidable submit button into our footer
  (function moveSubmitToFooter() {
    const btn = document.querySelector('#frm_field_8376_container > div > button');
    const footer = document.getElementById('app-footer');
    if (btn && footer) footer.appendChild(btn);
  })();
});