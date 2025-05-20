function syncEntryTitle() {
  const inputEl = document.getElementById('field_5syv4');
  const titleEl = document.querySelector('h2.wp-block-post-title');
  if (!inputEl || !titleEl) return;

  inputEl.addEventListener('input', () => {
    if(inputEl.value!=''){
      titleEl.textContent = inputEl.value;
    }else{
      titleEl.textContent=="Character Creator 25";
    }
  });

    if(inputEl.value!=''){
      titleEl.textContent = inputEl.value;
    }else{
      titleEl.textContent=="Character Creator 25";
    }
}

