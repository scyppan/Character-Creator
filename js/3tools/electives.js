// 1. ensure each elective checkbox has its listener
function attachelectivelisteners() {
  document
    .querySelectorAll('input[id^="field_electives"]')
    .forEach(cb => {
      if (!cb._elistener) {
        cb.addEventListener('change', () => {
          enforcelimits();
          updatelimits();
        });
        cb._elistener = true;
      }
    });
}

// 2. tally how many are checked per group
function countchecked() {
  const counts = {};
  for (let y = 1; y <= 7; y++) {
    counts[y] = document.querySelectorAll(
      `input[id^="field_electives${y}--"]:checked`
    ).length;
  }
  return counts;
}

// 3. enforce absolute limit by unchecking excess
function enforcelimits() {
  for (let y = 1; y <= 7; y++) {
    const max = parseInt(
      document.getElementById(`field_electivelimits${y}`)?.value,
      10
    ) || 0;
    const boxes = Array.from(
      document.querySelectorAll(`input[id^="field_electives${y}--"]`)
    );
    const checked = boxes.filter(cb => cb.checked);
    if (checked.length > max) {
      checked.slice(max).forEach(cb => { cb.checked = false; });
    }
  }
}

// 4. adjust descriptions and disable extras when max reached
function updatelimits() {
  for (let y = 1; y <= 7; y++) {
    const max   = parseInt(
      document.getElementById(`field_electivelimits${y}`)?.value, 10
    ) || 0;
    const descEl  = document.getElementById(`frm_desc_field_electives${y}`);
    const count   = document.querySelectorAll(
      `input[id^="field_electives${y}--"]:checked`
    ).length;
    const newTxt  = count >= max
      ? 'Elective limit reached!'
      : `Pick ${max - count} more`;

    if (descEl && descEl.textContent !== newTxt) {
      descEl.textContent = newTxt;
    }

    document.querySelectorAll(`input[id^="field_electives${y}--"]`)
      .forEach(cb => {
        const shouldDisable = count >= max && !cb.checked;
        if (cb.disabled !== shouldDisable) {
          cb.disabled = shouldDisable;
        }
      });
  }
}

// 5. ceaseless poller every ½s
function poolelectives() {
  enforcelimits();
  attachelectivelisteners();
  updatelimits();
}

// 6. initialize observer and bind handlers
function initelectivesobserver() {
  const obs = new MutationObserver(() => {
    enforcelimits();
    attachelectivelisteners();
    updatelimits();
  });
  obs.observe(document.body, { childList: true, subtree: true });

  ['field_school','field_currentyear'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      enforcelimits();
      attachelectivelisteners();
      updatelimits();
    });
  });

  enforcelimits();
  attachelectivelisteners();
  updatelimits();

  setInterval(poolelectives, 500);

  return obs;
}
