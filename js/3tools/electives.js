function observeAndInitElectives() {
  var observer = new MutationObserver(function(mutations) {
    for (let mutation of mutations) {
      let needsInit = false;

      if (mutation.type === 'childList') {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === 1 && (
            node.classList.contains('frm_opt_container') ||
            node.querySelector('.frm_opt_container')
          )) {
            needsInit = true;
            break;
          }
        }
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        mutation.target.classList.contains('frm_opt_container')
      ) {
        needsInit = true;
      }

      if (needsInit) {
        labelProcessingState();
        waitForElectivesReady().then(setupElectiveHandling);
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  if (document.querySelector('.frm_opt_container')) {
    labelProcessingState();
    waitForElectivesReady().then(setupElectiveHandling);
  }

  function labelProcessingState() {
    for (let y = 1; y <= 7; y++) {
      const desc = document.getElementById(`frm_desc_field_electives${y}`);
      if (desc) desc.textContent = 'Processing...';
    }
  }

  function waitForElectivesReady(timeout = 3000, interval = 100) {
    return new Promise((resolve) => {
      const start = Date.now();

      function check() {
        let allReady = true;

        for (let y = 1; y <= 7; y++) {
          const limitEl = document.getElementById(`field_electivelimits${y}`);
          const checkboxes = document.querySelectorAll(`input[id^="field_electives${y}--"]`);
          if (!limitEl || checkboxes.length === 0) {
            allReady = false;
            break;
          }
        }

        if (allReady) {
          resolve();
        } else if (Date.now() - start > timeout) {
          console.warn('⏳ Elective load timed out');
          resolve();
        } else {
          setTimeout(check, interval);
        }
      }

      check();
    });
  }

  function setupElectiveHandling() {
    for (let y = 1; y <= 7; y++) {
      const checkboxes = Array.from(
        document.querySelectorAll(`input[id^="field_electives${y}--"]`)
      ).filter(el => el.type === 'checkbox');

      const limitEl = document.getElementById(`field_electivelimits${y}`);
      const descEl = document.getElementById(`frm_desc_field_electives${y}`);

      function update() {
        const max = parseInt(limitEl?.value || 0, 10);
        const count = checkboxes.reduce((sum, cb) => sum + (cb.checked ? 1 : 0), 0);
        if (descEl) {
          descEl.textContent = count >= max ? 'Elective limit reached!' : `Pick ${max - count} more`;
        }
        checkboxes.forEach(cb => {
          cb.disabled = count >= max && !cb.checked;
        });
      }

      checkboxes.forEach(cb => cb.addEventListener('change', update));
      if (limitEl) limitEl.addEventListener('change', update);
      update();
    }

    const school = document.getElementById('field_school');
    const year = document.getElementById('field_currentyear');

    function globalUpdate() {
      console.log('🔄 school/year changed, updating electives');
      if (typeof clearEducationInlineBlockDisplaysAsync === 'function') {
        clearEducationInlineBlockDisplaysAsync(20, 150);
      }
      setupElectiveHandling();
    }

    if (school) school.addEventListener('change', globalUpdate);
    if (year) year.addEventListener('change', globalUpdate);
  }
}