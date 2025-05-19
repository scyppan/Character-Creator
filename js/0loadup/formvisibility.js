function revealFormDiv() {
  const el = document.getElementById('formdiv');
  if (el) {
    el.classList.remove('hidden');
  } else {
    console.warn('❌ [ui] #formdiv not found');
  }
}