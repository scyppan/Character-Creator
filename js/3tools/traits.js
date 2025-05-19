function getTraitElements() {
  return Array.prototype.slice.call(
    document.querySelectorAll('input[id^="field_traits-"]')
  );
}

function getBloodStatusElement() {
  return document.getElementById('field_bloodstatus');
}

function getPermissivenessElement() {
  return document.getElementById('field_permissiveness');
}

function getTraitLimitDisplayElement() {
  return document.getElementById('traitselectionlimit');
}

function calculateTraitLimit() {
  var bloodEl = getBloodStatusElement();
  var permEl  = getPermissivenessElement();
  var traitlimit = 0;

  // 1) Blood-status base
  if (bloodEl) {
    switch (bloodEl.value) {
      case 'Pureblood':
        traitlimit = 0;
        break;
      case 'Wizard-Raised Halfblood':
        traitlimit = 1;
        break;
      case 'Muggle-Raised Halfblood':
        traitlimit = 2;
        break;
      case 'Muggleborn':
        traitlimit = 3;
        break;
      default:
        traitlimit = 0;
    }
  }

  // 2) Permissiveness adjustment
  if (permEl) {
    var permVal = parseInt(permEl.value, 10);
    if (!isNaN(permVal)) {
      if (permVal < 4) traitlimit--;
      if (permVal > 6) traitlimit++;
    }
  }

  // 3) Subtract checked traits
  var traits = getTraitElements();
  for (var i = 0; i < traits.length; i++) {
    if (traits[i].checked) traitlimit--;
  }

  // 4) Never negative
  if (traitlimit < 0) traitlimit = 0;

  return traitlimit;
}

function updateTraitUI() {
  var traits = getTraitElements();
  var limit  = calculateTraitLimit();

  if (limit <= 0) {
    // disable unchecked only
    for (var i = 0; i < traits.length; i++) {
      traits[i].disabled = !traits[i].checked;
    }
  } else {
    // enable all
    for (var i = 0; i < traits.length; i++) {
      traits[i].disabled = false;
    }
  }

  // update display
  var displayEl = getTraitLimitDisplayElement();
  if (displayEl) {
    displayEl.textContent = 'Pick ' + limit + ' more';
  }
}

function initTraitHandling() {
  var traits = getTraitElements();
  var bloodEl = getBloodStatusElement();
  var permEl  = getPermissivenessElement();

  if (!traits.length) {
    console.warn('❌ [traits] No trait inputs found');
  }

  // Trait checkboxes
  for (var i = 0; i < traits.length; i++) {
    traits[i].addEventListener('change', updateTraitUI);
  }

  // Blood-status & permissiveness
  if (bloodEl) bloodEl.addEventListener('change', updateTraitUI);
  if (permEl)  permEl.addEventListener('change', updateTraitUI);

  // Initial render
  updateTraitUI();
}