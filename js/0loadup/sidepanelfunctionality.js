function initSidepanelClickHandlers(callback) {
  const items = document.querySelectorAll('.cc-sidepanel-item');
  if (!items.length) {
    console.warn('No sidepanel items found');
    return;
  }

  items.forEach(item => {
    item.addEventListener('click', event => {
      const label = event.currentTarget.textContent.trim();
      console.log(`🔖 Sidepanel item clicked: ${label}`);
      if (typeof callback === 'function') {
        callback(label, event.currentTarget);
      }
    });
  });
}