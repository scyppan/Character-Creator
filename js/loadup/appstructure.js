function createAppStructure() {
  // 1) Outer wrapper (column)
  const appWrapper = document.createElement('div');
  appWrapper.id = 'app-wrapper';
  appWrapper.className = 'app-wrapper';

  // 2) Row container: sidebar + main content
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';
  appContainer.className = 'app-container';

  const sidebar = document.createElement('div');
  sidebar.id = 'app-sidebar';
  sidebar.className = 'app-sidebar';

  const mainContent = document.createElement('div');
  mainContent.id = 'app-main-content';
  mainContent.className = 'app-main-content';

  appContainer.appendChild(sidebar);
  appContainer.appendChild(mainContent);

  // 3) Footer (optional full-width)
  const footer = document.createElement('div');
  footer.id = 'app-footer';
  footer.className = 'app-footer';

  // Assemble
  appWrapper.appendChild(appContainer);
  appWrapper.appendChild(footer);

  // 4) Insert under <article> as second child
  const article = document.querySelector('article');
  if (!article) {
    console.warn('❌ <article> element not found.');
    return;
  }

  const second = article.children[1];
  if (second) {
    article.insertBefore(appWrapper, second);
  } else {
    article.appendChild(appWrapper);
  }

  console.log('✅ App structure created.');
}

function insertFormidableFormIntoApp() {
  const form = document.querySelector('form.frm-show-form');
  const panel = document.querySelector('#panel-identity'); // or whichever panel you want

  if (!form) {
    console.warn('❌ No Formidable form found.');
    return;
  }

  if (!panel) {
    console.warn('❌ No target panel found to insert form.');
    return;
  }

  // Move the entire form into the panel
  panel.appendChild(form);

  console.log('✅ Formidable form inserted into main panel.');
}
