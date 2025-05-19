function syncEntryTitle() {
  const inputEl = document.getElementById('field_5syv4');
  const titleEl = document.querySelector('h2.wp-block-post-title');
  if (!inputEl || !titleEl) return;

  inputEl.addEventListener('input', () => {
    titleEl.textContent = inputEl.value;
  });

    titleEl.textContent = inputEl.value;
}

