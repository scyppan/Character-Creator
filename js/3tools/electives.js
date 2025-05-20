
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

  // 1) Year‐specific listeners
  Object.entries(byYear).forEach(([year, boxes]) => {
    // a) When any checkbox changes
    boxes.forEach(cb =>
      cb.addEventListener('change', () => updateElectivesForYear(year, boxes))
    );
    // b) When the limit input changes
    const limitEl = getElectiveLimitElement(year);
    if (limitEl) {
      limitEl.addEventListener('change', () =>
        updateElectivesForYear(year, boxes)
      );
    }
  });

  // 2) Global listeners on school and current year
  const schoolEl = document.getElementById('field_school');
  const yearEl   = document.getElementById('field_currentyear');

  if (schoolEl) {
    schoolEl.addEventListener('change', () => {
      console.log('🔄 school changed, updating all electives');
      clearEducationInlineBlockDisplaysAsync(10, 150);
      updateAllElectives();
    });
  }
  if (yearEl) {
    yearEl.addEventListener('change', () => {
      console.log('🔄 current year changed, updating all electives');
      clearEducationInlineBlockDisplaysAsync(10, 150);
      updateAllElectives();
    });
  }

  // 3) Initial population
  updateAllElectives();
}