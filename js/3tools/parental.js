function setRandomParental() {
  var genEl   = document.getElementById('field_generosity2');
  var wealthEl= document.getElementById('field_wealth2');
  var permEl  = document.getElementById('field_permissiveness');

  if (!genEl || !wealthEl || !permEl) {
    console.warn('❌ [parental] Missing one or more parental fields');
    return;
  }

  if (!genEl.value) {
    genEl.value = randBetween(1, 10);
    console.log('🎲 [parental] generosity →', genEl.value);
  }
  if (!wealthEl.value) {
    wealthEl.value = randBetween(1, 10);
    console.log('🎲 [parental] wealth →', wealthEl.value);
  }
  if (!permEl.value) {
    permEl.value = randBetween(1, 10);
    console.log('🎲 [parental] permissiveness →', permEl.value);
  }
}