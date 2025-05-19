
function getElectivesByYear() {
  const byYear = {};
  for (let y = 1; y <= 7; y++) {
    byYear[y] = Array.from(
      document.querySelectorAll(`input[id^="field_electives${y}--"]`)
    ).filter(el => el.type === 'checkbox');
  }
  return byYear;
}

function getElectiveLimitElement(year) {
  return document.getElementById(`field_electivelimits${year}`);
}

function getElectiveDescElement(year) {
  return document.getElementById(`frm_desc_field_electives${year}`);
}

function updateElectivesForYear(year, checkboxes) {
  const limitEl = getElectiveLimitElement(year);
  if (!limitEl) return;
  const max = parseInt(limitEl.value, 10) || 0;

  const checkedCount = checkboxes.reduce(
    (sum, cb) => sum + (cb.checked ? 1 : 0),
    0
  );

  const descEl = getElectiveDescElement(year);
  if (descEl) {
    if (checkedCount >= max) {
      descEl.textContent = 'Elective limit reached!';
    } else {
      descEl.textContent = `Pick ${max - checkedCount} more`;
    }
  }

  if (checkedCount >= max) {
    checkboxes.forEach(cb => {
      if (!cb.checked) cb.disabled = true;
    });
  } else {
    checkboxes.forEach(cb => {
      cb.disabled = false;
    });
  }
}

function updateAllElectives() {
  const byYear = getElectivesByYear();
  Object.entries(byYear).forEach(([year, boxes]) => {
    updateElectivesForYear(year, boxes);
  });
}

function initElectiveHandling() {
  const byYear = getElectivesByYear();

  Object.entries(byYear).forEach(([year, boxes]) => {
    boxes.forEach(cb =>
      cb.addEventListener('change', () => updateElectivesForYear(year, boxes))
    );
    const limitEl = getElectiveLimitElement(year);
    if (limitEl) {
      limitEl.addEventListener('change', () =>
        updateElectivesForYear(year, boxes)
      );
    }
  });

  updateAllElectives();
}