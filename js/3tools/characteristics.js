function getCharacteristicElements() {
  const ids = [
    'field_creativity',
    'field_equanimity',
    'field_charisma',
    'field_attractiveness',
    'field_strength',
    'field_agility',
    'field_intellect',
    'field_willpower',
    'field_fortitude'
  ];
  return ids
    .map(id => document.getElementById(id))
    .filter(el => el instanceof HTMLInputElement);
}

function getCurrentYearElement() {
  return document.getElementById('field_currentyear');
}

function getCharacteristicLimitDisplay() {
  return document.getElementById('characteristicselectionlimit');
}

function getSubmitButton() {
  return document.querySelector('.frm_button_submit.frm_final_submit');
}

function computeCharacteristicLimit() {
  const yearEl = getCurrentYearElement();
  const base = 8;
  if (!yearEl) return base;
  const y = parseInt(yearEl.value, 10);
  return isNaN(y) ? base : base + y;
}

function computePointsSpent() {
  return getCharacteristicElements().reduce((sum, input) => {
    const v = parseInt(input.value, 10);
    return sum + (isNaN(v) ? 0 : v - 1);
  }, 0);
}

function enforceCharacteristicLimit() {
  const limit = computeCharacteristicLimit();
  let spent   = computePointsSpent();
  const elems = getCharacteristicElements();

  if (spent <= limit) return;

  let changed = true;
  while (spent > limit && changed) {
    changed = false;
    for (let i = 0; i < elems.length && spent > limit; i++) {
      const input = elems[i];
      const val = parseInt(input.value, 10) || 1;
      if (val > 1) {
        input.value = val - 1;
        spent--;
        changed = true;
      }
    }
  }
}

function updateCharacteristicUI() {
  enforceCharacteristicLimit();

  const limit     = computeCharacteristicLimit();
  const spent     = computePointsSpent();
  const remaining = Math.max(0, limit - spent);

  const btn = getSubmitButton();
  if (btn) btn.disabled = spent > limit;

  const disp = getCharacteristicLimitDisplay();
  if (disp) {
    disp.textContent = `${remaining} point${remaining !== 1 ? 's' : ''} to spend`;
  }
}

function initCharacteristicHandling() {
  const elems  = getCharacteristicElements();
  const yearEl = getCurrentYearElement();

  if (!elems.length) {
    console.warn('❌ [characteristics] No inputs found');
    return;
  }

  elems.forEach(inp => inp.addEventListener('change', updateCharacteristicUI));
  if (yearEl) yearEl.addEventListener('change', updateCharacteristicUI);

  // initial display
  updateCharacteristicUI();
  initSliderGradientHandling();
}

function updateSliderGradient(el) {
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;
  const val = parseFloat(el.value) || 0;
  const pct = ((val - min) / (max - min)) * 100;

  const sliderColor    = getComputedStyle(el).getPropertyValue('--slider-color').trim()    || '#007bff';
  const sliderBarColor = getComputedStyle(el).getPropertyValue('--slider-bar-color').trim() || '#e0e0e0';

  el.style.setProperty(
    'background',
    `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${pct}%, ${sliderBarColor} ${pct}% 100%)`,
    'important'
  );
}

function initSliderGradientHandling() {
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach(slider => {
    slider.addEventListener('input', () => updateSliderGradient(slider));
    slider.addEventListener('change', () => updateSliderGradient(slider));
    updateSliderGradient(slider);
  });
}