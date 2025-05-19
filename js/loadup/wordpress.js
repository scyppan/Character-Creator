async function initCharCreatorLoader() {
  const version = 'a25.5.19.05';
  const base    = `https://cdn.jsdelivr.net/gh/scyppan/Character-Creator@${version}/`;

  const cssFiles = [
    'css/main.css'
  ];

  const jsFiles = [
    'js/loadup/sidepanelloader.js',
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
  initCharCreatorLoader().catch(err => console.error('Initialization failed:', err))
);
