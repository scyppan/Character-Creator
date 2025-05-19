async function initapp() {
  const version = 'a25.5.19.012';
  const base    = `https://cdn.jsdelivr.net/gh/scyppan/Character-Creator@${version}/`;

  console.log(`🚀 [initapp] Starting Character Creator v${version}`);
  console.log(`🌐 [initapp] Base URL: ${base}`);

  const cssFiles = [
    'css/main.css'
  ];
  const jsFiles = [
    'js/0loadup/sidepanelloader.js',
    'js/0loadup/sidepanelfunctionality.js',
    'js/1assignments/livenameupdate.js',
    'js/1assignments/assignments.js'
  ];

  // 🎨 Inject CSS
  console.log('🎨 [initapp] Injecting CSS files…');
  cssFiles.forEach(file => {
    const href = `${base}${file}?v=${version}`;
    console.log(`🔗 [initapp] Adding CSS: ${file}`);
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
  console.log('✅ [initapp] All CSS files injected!');

  // 📥 Inject JS in sequential order
  console.log('📥 [initapp] Loading JS files sequentially…');
  for (const file of jsFiles) {
    await new Promise((resolve, reject) => {
      const src = `${base}${file}?v=${version}`;
      console.log(`⏳ [initapp] Loading JS: ${file}`);
      const script = document.createElement('script');
      script.src   = src;
      script.async = false;
      script.onload = () => {
        console.log(`✅ [initapp] Loaded JS: ${file}`);
        resolve();
      };
      script.onerror = () => {
        console.error(`❌ [initapp] Failed to load JS: ${file}`);
        reject(new Error('Failed to load ' + file));
      };
      document.head.appendChild(script);
    });
  }
  console.log('🎉 [initapp] All JS assets loaded!');

  // 🔧 Assign section classes
  console.log('🔧 [initapp] Assigning section classes…');
  assignSectionClasses(assignments);
  console.log('✅ [initapp] Section classes assigned!');

  // 🔘 Initialize side-panel click handlers
  console.log('🔘 [initapp] Initializing side-panel click handlers…');
  initSidepanelClickHandlers();
  console.log('✅ [initapp] Side-panel click handlers initialized!');

  // 🔍 Show default section
  console.log('🔍 [initapp] Showing default "identity" section…');
  showSectionFields('identity');
  console.log('✅ [initapp] Default section displayed!');

  // 🖊️ Sync entry title
  console.log('🖊️ [initapp] Syncing entry-title with input…');
  syncEntryTitle();
  console.log('✅ [initapp] Entry title syncing active!');

  console.log('🎉 [initapp] Initialization complete! Have fun 🎈');
}

// ──────────────────────────────────────────────
// Run initapp when the DOM is ready
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initapp()
    .catch(err => console.error('🔥 [initapp] Initialization failed:', err));
});
