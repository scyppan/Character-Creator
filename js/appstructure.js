function createAppStructure() {
  // 1) outer wrapper (column)
  const appWrapper = document.createElement('div');
  appWrapper.id = 'app-wrapper';
  appWrapper.className = 'app-wrapper';

  // 2) row container for sidebar + main
  const appContainer = document.createElement('div');
  appContainer.id = 'app-container';
  appContainer.className = 'app-container';

  //  └─ sidebar
  const sidebar = document.createElement('div');
  sidebar.id = 'app-sidebar';
  sidebar.className = 'app-sidebar';

  //  └─ main content
  const mainContent = document.createElement('div');
  mainContent.id = 'app-main-content';
  mainContent.className = 'app-main-content';

  // assemble row
  appContainer.appendChild(sidebar);
  appContainer.appendChild(mainContent);

  // 3) footer full-width under container
  const footer = document.createElement('div');
  footer.id = 'app-footer';
  footer.className = 'app-footer';

  // assemble wrapper
  appWrapper.appendChild(appContainer);
  appWrapper.appendChild(footer);

  // 4) inject into the page under <article> as second child
  const article = document.querySelector('article');
  if (!article) return;

  const second = article.children[1];
  if (second) article.insertBefore(appWrapper, second);
  else        article.appendChild(appWrapper);
}


function createPanels() {
    var panels = [
        { id: 'panel-identity', title: 'Identity' },
        { id: 'panel-parentage', title: 'Parentage' },
        { id: 'panel-personality', title: 'Personality' },
        { id: 'panel-characteristics', title: 'Characteristics' },
        { id: 'panel-initial-interests', title: 'Initial Interests' },
        { id: 'panel-education', title: 'Education' },
        { id: 'panel-eminence', title: 'Eminence' },
        { id: 'panel-relationships-humans', title: 'Relationships with Humans' },
        { id: 'panel-equipment', title: 'Equipment' },
        { id: 'panel-inventory', title: 'Inventory' },
        { id: 'panel-relationships-creatures', title: 'Relationships with Creatures' },
        { id: 'panel-spells', title: 'Spells' },
        { id: 'panel-proficiencies', title: 'Proficiencies' },
        { id: 'panel-potion-knowledge', title: 'Potion Knowledge' },
        { id: 'panel-notes', title: 'Notes' }
    ];

    var sidebar = document.getElementById('app-sidebar');
    var content = document.getElementById('app-main-content');

    for (var i = 0; i < panels.length; i++) {
        var cfg = panels[i];

        // create the tab in the sidebar
        var tab = document.createElement('div');
        tab.className = 'app-tab';
        tab.textContent = cfg.title;
        tab.dataset.target = cfg.id;
        if (i === 0) tab.classList.add('active');
        sidebar.appendChild(tab);

        // create the content panel
        var panel = document.createElement('div');
        panel.id = cfg.id;
        panel.className = 'app-panel';
        if (i !== 0) panel.style.display = 'none';

        // add a heading
        var heading = document.createElement('h2');
        heading.textContent = cfg.title;
        panel.appendChild(heading);

        // add placeholder text
        var placeholder = document.createElement('p');
        placeholder.textContent = 'Placeholder content for ' + cfg.title + ' panel.';
        //panel.appendChild(placeholder);

        content.appendChild(panel);
    }

    // wire up click handlers
    var tabs = sidebar.getElementsByClassName('app-tab');
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].addEventListener('click', switchTab);
    }
}

// 4) show the selected panel, hide the rest
function switchTab() {
    var targetId = this.dataset.target;
    var sidebar = document.getElementById('app-sidebar');
    var tabs = sidebar.getElementsByClassName('app-tab');
    var content = document.getElementById('app-main-content');
    var panels = content.getElementsByClassName('app-panel');

    // activate clicked tab
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle('active', tabs[i] === this);
    }

    // show the matching panel, hide others
    for (var k = 0; k < panels.length; k++) {
        panels[k].style.display = (panels[k].id === targetId ? '' : 'none');
    }
}
