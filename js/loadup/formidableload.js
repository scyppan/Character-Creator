function onFormidableFormReady(callback, options = {}) {
  const formSelector = options.selector || 'form.frm-show-form';
  const quietPeriod = options.quiet || 200; // milliseconds of no mutations
  const timeoutLimit = options.timeout || 5000; // maximum wait time in ms

  function initWatcher() {
    const form = document.querySelector(formSelector);
    if (!form) {
      console.warn('❌ Formidable form not found on page.');
      return;
    }

    let observer;
    let quietTimer;
    let hardTimeout;

    const stop = () => {
      if (observer) observer.disconnect();
      if (quietTimer) clearTimeout(quietTimer);
      if (hardTimeout) clearTimeout(hardTimeout);
    };

    const fireCallback = () => {
      stop();
      console.log('✅ Formidable form has finished rendering.');
      if (typeof callback === 'function') callback();
    };

    observer = new MutationObserver(() => {
      if (quietTimer) clearTimeout(quietTimer);
      quietTimer = setTimeout(fireCallback, quietPeriod);
    });

    observer.observe(form, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    hardTimeout = setTimeout(() => {
      console.warn('⚠️ Timeout waiting for form to settle.');
      fireCallback();
    }, timeoutLimit);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWatcher);
  } else {
    initWatcher();
  }
}

onFormidableFormReady(() => {
  console.log('🔥 All Formidable fields are ready and settled.');
  createAppStructure();
  insertFormidableFormIntoApp();
});
