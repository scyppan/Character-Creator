function initSidepanelClickHandlers(callback) {
// Normalize label → sectionKey (e.g. "Initial Interests" → "initial-interests")
  const sectionKey = label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    // if you want to strip out “with-” → “relationships-humans”
    .replace('with-', '');

  // Show only the matching fields
  showSectionFields(sectionKey);

  // (Optional) Highlight the active side-panel item
  document.querySelectorAll('.cc-sidepanel-item').forEach(item => {
    item.classList.toggle('active', item === el);
  });
}

