function initSidepanelClickHandlers() {
  const items = document.querySelectorAll('.cc-sidepanel-item');
  if (!items.length) {
    console.warn('No sidepanel items found');
    return;
  }

  items.forEach(item => {
    item.addEventListener('click', event => {
      const el = event.currentTarget;
      const label = el.textContent.trim();
      // normalize to your sectionKey format
      const sectionKey = label
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace('with-', '');

      // show/hide fields
      showSectionFields(sectionKey);

      // ADD ONLY: reusable highlight function call
      highlightSidepanelItem(el);

      // highlight active item (existing logic)
      items.forEach(i => i.classList.remove('active'));
      el.classList.add('active');
    });
  });
}

function highlightSidepanelItem(clickedEl, activeClass = 'active') {
  document.querySelectorAll('.cc-sidepanel-item').forEach(item => {
    item.classList.toggle(activeClass, item === clickedEl);
  });
}

