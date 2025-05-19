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

function onCharacteristicChange(event) {
  const input = event.currentTarget;
  const limit   = computeCharacteristicLimit();
  const spent   = computePointsSpent();

  if (spent > limit) {
    const overage = spent - limit;
    const curr    = parseInt(input.value, 10) || 0;
    input.value = Math.max(1, curr - overage);
  }

  updateCharacteristicUI();
}

function updateCharacteristicUI() {
  const limit   = computeCharacteristicLimit();
  const spent   = computePointsSpent();
  const remaining = Math.max(0, limit - spent);

  // toggle submit button
  const btn = getSubmitButton();
  if (btn) {
    btn.disabled = spent > limit;
  }

  // update the display text
  const disp = getCharacteristicLimitDisplay();
  if (disp) {
    if (spent > limit) {
      disp.textContent = `Spent too many points! Unspend ${spent - limit} point${spent - limit > 1 ? 's' : ''}`;
    } else {
      disp.textContent = `${remaining} point${remaining !== 1 ? 's' : ''} to spend`;
    }
  }
}

function initCharacteristicHandling() {
  const chars = getCharacteristicElements();
  const yearEl = getCurrentYearElement();

  if (!chars.length) {
    console.warn('❌ [characteristics] No inputs found');
    return;
  }

  // input change listeners
  chars.forEach(inp => {
    inp.addEventListener('change', onCharacteristicChange);
  });

  // recalc when year changes
  if (yearEl) {
    yearEl.addEventListener('change', updateCharacteristicUI);
  }

  // initial display
  updateCharacteristicUI();
  initSliderGradientHandling();
}

function updateSliderGradient(el) {
  const min = parseFloat(el.min) || 0;
  const max = parseFloat(el.max) || 100;
  const val = parseFloat(el.value) || 0;
  const pct = ((val - min) / (max - min)) * 100;

  // Read your CSS vars (fallback to sensible defaults)
  const sliderColor     = getComputedStyle(el).getPropertyValue('--slider-color').trim()     || '#007bff';
  const sliderBarColor  = getComputedStyle(el).getPropertyValue('--slider-bar-color').trim()  || '#e0e0e0';

  // Apply an inline background that will override any older inline style
  el.style.setProperty(
    'background',
    `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${pct}%, ${sliderBarColor} ${pct}% 100%)`,
    'important'
  );
}

function initSliderGradientHandling() {
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach(slider => {
    // When user drags it
    slider.addEventListener('input', () => updateSliderGradient(slider));
    // In case value is changed programmatically without firing 'input'
    slider.addEventListener('change', () => updateSliderGradient(slider));
    // Initial paint
    updateSliderGradient(slider);
  });
}
