 function assignWrappers() {
    // The two selectors you want to wrap
    var selectors = [
      '#frm_field_7510_container',
      '#frm_field_7571_container'
    ];

    // Find the first one to know where to insert the wrapper
    var firstEl = document.querySelector(selectors[0]);
    if (!firstEl) return;

    // For debugging, see what parent is
    //console.log('Parent of firstEl:', firstEl.parentElement);

    var wrapper = document.createElement('div');
    wrapper.classList.add('cc-row');

    selectors.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add('cc-w-50');
        wrapper.appendChild(el);
      }
    });

    // YOUR working prepend location
    document.querySelector('#panel-identity').prepend(wrapper);
  }

  assignWrappers();