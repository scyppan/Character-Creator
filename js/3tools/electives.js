function observeAndInitElectives() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 &&
             (node.classList.contains('frm_opt_container') ||
              node.querySelector('.frm_opt_container'))
          ) {
            labelProcessingState();
            waitForElectivesReady().then(setupElectiveHandling);
          }
        });
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        mutation.target.classList.contains('frm_opt_container')
      ) {
        labelProcessingState();
        waitForElectivesReady().then(setupElectiveHandling);
      }
    });
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
    for (var y = 1; y <= 7; y++) {
      var desc = document.getElementById('frm_desc_field_electives' + y);
      if (desc) desc.textContent = 'Processing...';
    }
  }

  function waitForElectivesReady(timeout, interval) {
    timeout = timeout || 3000;
    interval = interval || 100;
    return new Promise(function(resolve) {
      var start = Date.now();
      (function check() {
        var allReady = true;
        for (var y = 1; y <= 7; y++) {
          var limitEl = document.getElementById('field_electivelimits' + y);
          var boxes = document.querySelectorAll('input[id^="field_electives' + y + '--"]');
          if (!limitEl || boxes.length === 0) {
            allReady = false;
            break;
          }
        }
        if (allReady || Date.now() - start > timeout) {
          resolve();
        } else {
          setTimeout(check, interval);
        }
      })();
    });
  }

  function setupElectiveHandling() {
    for (var y = 1; y <= 7; y++) {
      var checkboxes = Array.from(
        document.querySelectorAll('input[id^="field_electives' + y + '--"]')
      ).filter(function(el) { return el.type === 'checkbox'; });

      var limitEl = document.getElementById('field_electivelimits' + y);
      var descEl  = document.getElementById('frm_desc_field_electives' + y);

      function update() {
        var max   = parseInt(limitEl && limitEl.value, 10) || 0;
        var count = checkboxes.reduce(function(sum, cb) {
          return sum + (cb.checked ? 1 : 0);
        }, 0);
        if (descEl) {
          descEl.textContent = count >= max
            ? 'Elective limit reached!'
            : 'Pick ' + (max - count) + ' more';
        }
        checkboxes.forEach(function(cb) {
          cb.disabled = count >= max && !cb.checked;
        });
      }

      checkboxes.forEach(function(cb) {
        cb.addEventListener('change', update);
      });
      if (limitEl) {
        limitEl.addEventListener('change', update);
      }
      update();
    }
  }

  function handleSchoolChange() {
    labelProcessingState();
    if (typeof clearEducationInlineBlockDisplaysAsync === 'function') {
      clearEducationInlineBlockDisplaysAsync(20, 150);
    }
    waitForElectivesReady().then(function() {
      // uncheck all elective checkboxes once loaded
      for (var y = 1; y <= 7; y++) {
        var boxes = document.querySelectorAll('input[id^="field_electives' + y + '--"]');
        boxes.forEach(function(cb) {
          if (cb.checked) cb.checked = false;
        });
      }
      setupElectiveHandling();
    });
  }

  var schoolEl = document.getElementById('field_school');
  if (schoolEl) {
    schoolEl.addEventListener('change', handleSchoolChange);
  }

  var yearEl = document.getElementById('field_currentyear');
  if (yearEl) {
    yearEl.addEventListener('change', function() {
      console.log('🔄 current year changed, updating electives');
      if (typeof clearEducationInlineBlockDisplaysAsync === 'function') {
        clearEducationInlineBlockDisplaysAsync(20, 150);
      }
      setupElectiveHandling();
    });
  }

  return observer;
}