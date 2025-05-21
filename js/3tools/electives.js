function observeAndInitElectives() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.classList.contains('frm_opt_container') || node.querySelector('.frm_opt_container')) {
              setupElectiveHandling();
            }
          }
        });
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        mutation.target.classList.contains('frm_opt_container')
      ) {
        setupElectiveHandling();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  // In case elements are already present
  if (document.querySelector('.frm_opt_container')) {
    setupElectiveHandling();
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