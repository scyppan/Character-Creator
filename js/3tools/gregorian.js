
function checkGregorianGap() {
  const desc = document.getElementById('gregoriandesc');
  const dayEl   = document.getElementById('field_birthday');
  const monthEl = document.getElementById('field_birthmonth');
  const yearEl  = document.getElementById('field_birthyear');

  if (!desc || !dayEl || !monthEl || !yearEl) {
    console.warn('❌ [birthdate] Missing element(s); cannot check Gregorian gap');
    return;
  }

  const day   = parseInt(dayEl.value,   10);
  const month = parseInt(monthEl.value, 10);
  const year  = parseInt(yearEl.value,  10);

  if (month === 10 && year === 1582 && day > 4 && day < 15) {
    desc.classList.remove('hidden');
    console.log('📜 [birthdate] Showing Gregorian-gap description');
  } else {
    desc.classList.add('hidden');
    console.log('📜 [birthdate] Hiding Gregorian-gap description');
  }
}

/**
 * Wire up change listeners on birthdate fields
 * and perform an initial check.
 */
function initBirthdateHandling() {
  ['field_birthyear', 'field_birthmonth', 'field_birthday']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', checkGregorianGap);
      } else {
        console.warn(`❌ [birthdate] Input #${id} not found`);
      }
    });

  // initial visibility
  checkGregorianGap();
}