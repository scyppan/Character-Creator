// js/3tools/traits.js

/**
 * Collect all trait checkboxes (ids “field_traits-0” … “field_traits-22”).
 * @returns {HTMLInputElement[]}
 */
function getTraitElements() {
  return Array.from(
    document.querySelectorAll('input[id^="field_traits-"]')
  );
}

/**
 * @returns {HTMLSelectElement|null}
 */
function getBloodStatusElement() {
  return document.getElementById('field_bloodstatus');
}

/**
 * @returns {HTMLInputElement|null}
 */
function getPermissivenessElement() {
  return document.getElementById('field_permissiveness');
}

/**
 * @returns {HTMLElement|null}
 */
function getTraitLimitDisplayElement() {
  return document.getElementById('traitselectionlimit');
}

/**
 * Compute the raw trait-pick limit based on blood-status + permissiveness.
 * @returns {number}
 */
function calculateBaseTraitLimit() {
  var base = 0;
  var bloodEl = getBloodStatusElement();
  var permEl  = getPermissivenessElement();

  if (bloodEl) {
    switch (bloodEl.value) {
      case 'Pureblood':                 base = 0; break;
      case 'Wizard-Raised Halfblood':   base = 1; break;
      case 'Muggle-Raised Halfblood':   base = 2; break;
      case 'Muggleborn':                base = 3; break;
      default:                          base = 0;
    }
  }

  if (permEl) {
    var val = parseInt(permEl.value, 10);
    if (!isNaN(val)) {
      if (val < 4)  base--;
      if (val > 6)  base++;
    }
  }

  return base < 0 ? 0 : base;
}

/**
 * Compute how many picks remain (base - checked).
 * @returns {number}
 */
function calculateTraitRemaining() {
  var traits = getTraitElements();
  var checked = traits.filter(cb => cb.checked).length;
  var base    = calculateBaseTraitLimit();
  var rem     = base - checked;
  return rem < 0 ? 0 : rem;
}

/**
 * Enforce the max picks: if user has checked more than base limit,
 * uncheck extras (starting from the last checkbox).
 */
function enforceMaxPicks() {
  var traits       = getTraitElements();
  var checkedCount = traits.filter(cb => cb.checked).length;
  var baseLimit    = calculateBaseTraitLimit();
  var toRemove     = checkedCount - baseLimit;

  for (var i = traits.length - 1; i >= 0 && toRemove > 0; i--) {
    if (traits[i].checked) {
      traits[i].checked = false;
      toRemove--;
    }
  }
}

/**
 * Enable/disable trait checkboxes and update the "Pick X more" text.
 */
function updateTraitUI() {
  // 1) If over limit, uncheck extras
  enforceMaxPicks();

  // 2) Enable/disable based on remaining
  var traits = getTraitElements();
  var rem    = calculateTraitRemaining();

  if (rem <= 0) {
    traits.forEach(cb => cb.disabled = !cb.checked);
  } else {
    traits.forEach(cb => cb.disabled = false);
  }

  // 3) Update display text
  var display = getTraitLimitDisplayElement();
  if (display) {
    display.textContent = 'Pick ' + rem + ' more';
  }
}

/**
 * Wire up listeners on blood-status, permissiveness, and each trait,
 * then do an initial UI update.
 */
function initTraitHandling() {
  var traits = getTraitElements();
  var bloodEl = getBloodStatusElement();
  var permEl  = getPermissivenessElement();

  if (!traits.length) {
    console.warn('❌ [traits] No trait inputs found');
  }

  // On any trait change
  traits.forEach(cb => cb.addEventListener('change', updateTraitUI));

  // If base-changing fields update
  if (bloodEl) bloodEl.addEventListener('change', updateTraitUI);
  if (permEl)  permEl.addEventListener('change', updateTraitUI);

  // Initial pass
  updateTraitUI();
}
