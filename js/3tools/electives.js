// 1. ensure each elective checkbox has its listener
function attachelectivelisteners() {
  document
    .querySelectorAll('input[id^="field_electives"]')
    .forEach(cb => {
      if (!cb._elistener) {
        cb.addEventListener('change', () => {
          countchecked();
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

// 3. adjust descriptions and disable extras when max reached
function updatelimits() {
  const counts = countchecked();
  for (let y = 1; y <= 7; y++) {
    const max   = parseInt(document.getElementById(`field_electivelimits${y}`)?.value,10) || 0;
    const desc  = document.getElementById(`frm_desc_field_electives${y}`);
    const count = counts[y];
    if (desc) {
      desc.textContent = count >= max
        ? 'Elective limit reached!'
        : `Pick ${max - count} more`;
    }
    document.querySelectorAll(`input[id^="field_electives${y}--"]`)
      .forEach(cb => cb.disabled = count >= max && !cb.checked);
  }
}

// 4a. ceaseless poller every ½s
function poolelectives() {
  attachelectivelisteners();
  updatelimits();
}

// tweak init to launch it
function initelectivesobserver() {
  const obs = new MutationObserver(() => {
    attachelectivelisteners();
    updatelimits();
  });
  obs.observe(document.body, { childList: true, subtree: true });

  ['field_school','field_currentyear'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      attachelectivelisteners();
      updatelimits();
    });
  });

  // initial
  attachelectivelisteners();
  updatelimits();

  // new: perpetual check
  setInterval(poolelectives, 500);

  return obs;
}