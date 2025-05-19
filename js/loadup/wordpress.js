// ——————————————————————————————————————
// Entry point: load assets, then wire up Formidable and app
// ——————————————————————————————————————
async function initApp() {
  console.log("🛠 Initializing Character Creator…");

  // 1) Load CSS & JS from your GitHub release
  await initCharCreatorLoader();
  console.log("✅ Assets loaded; waiting for Formidable…");

  // 2) Wait until Formidable is fully rendered…
  onFormidableFormReady(() => {
    console.log("🔥 All Formidable fields are ready and settled.");

    // 3) Build your app layout and inject the form
    createAppStructure();
    insertFormidableFormIntoApp();

    console.log("🚀 App is live!");
  });
}

// ——————————————————————————————————————
// Loader: pulls in CSS & JS via JSDelivr
// ——————————————————————————————————————
async function initCharCreatorLoader() {
  const version = 'a25.5.19.02';
  const base    = `https://cdn.jsdelivr.net/gh/scyppan/Character-Creator@${version}/`;

  const cssFiles = [
    'css/main.css'
  ];

  const jsFiles = [
    'js/loadup/appstructure.js',
    'js/loadup/formidableload.js'
  ];

  // inject CSS
  cssFiles.forEach(file => {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = `${base}${file}?v=${version}`;
    document.head.appendChild(link);
  });

  // inject JS in sequential order
  for (const file of jsFiles) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src   = `${base}${file}?v=${version}`;
      script.async = false;
      script.onload  = () => { console.log(`✓ Loaded ${file}`); resolve(); };
      script.onerror = () => reject(new Error('Failed to load ' + file));
      document.head.appendChild(script);
    });
  }

  console.log("🎉 CharCreator loader — all assets appended.");
}

// ——————————————————————————————————————
// Run initApp when the DOM is ready
// ——————————————————————————————————————
document.addEventListener('DOMContentLoaded', () =>
  initApp().catch(err => console.error('Initialization failed:', err))
);
