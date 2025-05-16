const assignments = [
  // Identity
  { selector: '#frm_field_7510_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7571_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7551_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7554_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7553_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7555_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7556_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7557_container', panelId: 'panel-identity' },
  { selector: '#frm_field_7558_container', panelId: 'panel-identity' },
  { selector: '#frm_field_8088_container', panelId: 'panel-identity' },

  // Parentage (with Birthday section)
  { selector: '#frm_field_7789_container', panelId: 'panel-parentage' },
  { selector: '#frm_field_7787_container', panelId: 'panel-parentage' },
  { selector: '#frm_field_7799_container', panelId: 'panel-parentage' },
  { selector: '#frm_field_7565_container', panelId: 'panel-parentage' },

  // Initial Interests
  { selector: '#frm_field_7791_container', panelId: 'panel-initial-interests' },

  // Equipment
  { selector: '#frm_field_7746_container', panelId: 'panel-equipment' },
  { selector: '#frm_field_8635_container', panelId: 'panel-equipment' },
  { selector: '#frm_field_7735_container', panelId: 'panel-equipment' },
  { selector: '#frm_field_7727_container', panelId: 'panel-equipment' },
  { selector: '#frm_field_7731_container', panelId: 'panel-equipment' },
  { selector: '#frm_field_8650_container', panelId: 'panel-equipment' },

  // Relationships with Creatures
  { selector: '#frm_field_8060_container', panelId: 'panel-relationships-creatures' },

  // Inventory
  { selector: '#frm_field_7728_container', panelId: 'panel-inventory' },

  // Spells
  { selector: '#frm_field_7748_container', panelId: 'panel-spells' },

  // Proficiencies
  { selector: '#frm_field_7838_container', panelId: 'panel-proficiencies' },

  // Potion Knowledge
  { selector: '#frm_field_8047_container', panelId: 'panel-potion-knowledge' },

  // Relationships with Humans
  { selector: '#frm_section_7779-0', panelId: 'panel-relationships-humans' },

  // Notes
  { selector: '#frm_field_8408_container', panelId: 'panel-notes' },
  { selector: '#frm_field_7776_container', panelId: 'panel-notes' },

  // Personality
  { selector: '#frm_field_7650_container', panelId: 'panel-personality' },

  // Characteristics
  { selector: '#frm_field_7585_container', panelId: 'panel-characteristics' },

  // Education
  { selector: '#frm_field_7511_container', panelId: 'panel-education' },

  // Eminence
  { selector: '#frm_field_7671_container', panelId: 'panel-eminence' }
];



// 2) move existing elements into your panels
const assignElementsToPanels = () => {
  assignments.forEach(({ selector, panelId }) => {
    const elem  = document.querySelector(selector);
    const panel = document.getElementById(panelId);
    if (elem && panel) panel.appendChild(elem);
  });
};

const deferMove = (selector, panelId) => {
  window.addEventListener('load', () => {
    const el    = document.querySelector(selector);
    const panel = document.getElementById(panelId);
    if (el && panel) panel.appendChild(el);
  });
};

deferMove('#frm_field_8088_container', 'panel-identity');