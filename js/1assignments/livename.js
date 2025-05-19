function syncEntryTitle() {
  const inputEl = document.getElementById('field_5syv4');
  const titleEl = document.querySelector('h2.entry-title');
  if (!inputEl || !titleEl) return;

  inputEl.addEventListener('input', () => {
    titleEl.textContent = inputEl.value;
  });

    titleEl.textContent = inputEl.value;
}

