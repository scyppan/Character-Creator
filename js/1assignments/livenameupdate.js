function bindInputToText(inputSelector, targetSelector, eventType = 'input') {
  const inputEl = document.querySelector(inputSelector);
  const targetEl = document.querySelector(targetSelector);
  if (!inputEl || !targetEl) return;

  inputEl.addEventListener(eventType, () => {
    targetEl.textContent = inputEl.value;
  });
}