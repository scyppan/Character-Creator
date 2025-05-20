  const assignments = [
    // Identity
    { selector: '#frm_field_7510_container', section: 'identity' },
    { selector: '#frm_field_7571_container', section: ['identity', 'education'] },
    { selector: '#frm_field_7551_container', section: 'identity' },
    { selector: '#frm_field_7554_container', section: 'identity' },
    { selector: '#frm_field_7553_container', section: 'identity' },
    { selector: '#frm_field_7555_container', section: 'identity' },
    { selector: '#frm_field_7556_container', section: 'identity' },
    { selector: '#frm_field_7557_container', section: 'identity' },
    { selector: '#frm_field_7558_container', section: 'identity' },
    { selector: '#frm_field_7785_container', section: 'identity' },
    { selector: '#frm_field_8088_container', section: 'identity' },

    // Parentage
    { selector: '#frm_field_7789_container', section: 'parentage' },
    { selector: '#frm_field_7555_container', section: 'parentage' },
    { selector: '#frm_field_7556_container', section: 'parentage' },
    { selector: '#frm_field_7557_container', section: 'parentage' },
    { selector: '#frm_field_7558_container', section: 'parentage' },
    { selector: '#frm_field_7787_container', section: 'parentage' },
    { selector: '#frm_field_7799_container', section: 'parentage' },
    { selector: '#frm_field_7565_container', section: 'parentage' },

    // Initial Interests
    { selector: '#frm_field_7791_container', section: 'initial-interests' },

    // Equipment
    { selector: '#frm_field_7746_container', section: 'equipment' },
    { selector: '#frm_field_8635_container', section: 'equipment' },
    { selector: '#frm_field_7735_container', section: 'equipment' },
    { selector: '#frm_field_7727_container', section: 'equipment' },
    { selector: '#frm_field_7731_container', section: 'equipment' },
    { selector: '#frm_field_8650_container', section: 'equipment' },

    // Relationships with Creatures
    { selector: '#frm_field_8060_container', section: 'relationships-creatures' },

    // Inventory
    { selector: '#frm_field_7728_container', section: 'inventory' },

    // Spells
    { selector: '#frm_field_7748_container', section: 'spells' },

    // Proficiencies
    { selector: '#frm_field_7838_container', section: 'proficiencies' },

    // Potion Knowledge
    { selector: '#frm_field_8047_container', section: 'potion-knowledge' },

    // Relationships with Humans
    { selector: '#frm_section_7779-0', section: 'relationships-humans' },
    { selector: '#frm_field_7779_container', section: 'relationships-humans' },

    // Notes
    { selector: '#frm_field_8408_container', section: 'notes' },
    { selector: '#frm_field_7776_container', section: 'notes' },

    // Personality
    { selector: '#frm_field_7650_container', section: 'personality' },

    // Characteristics
    { selector: '#frm_field_7585_container', section: 'characteristics' },

    // Education
    { selector: '#frm_field_7511_container', section: 'education' },
    { selector: '#frm_field_7515_container', section: 'education' },
    { selector: '#frm_field_7514_container', section: 'education' },
    { selector: '#frm_field_7609_container', section: 'education' },
    { selector: '#frm_field_7608_container', section: 'education' },
    { selector: '#frm_field_7615_container', section: 'education' },
    { selector: '#frm_field_7616_container', section: 'education' },
    { selector: '#frm_field_7622_container', section: 'education' },
    { selector: '#frm_field_7623_container', section: 'education' },
    { selector: '#frm_field_7630_container', section: 'education' },
    { selector: '#frm_field_7629_container', section: 'education' },
    { selector: '#frm_field_7636_container', section: 'education' },
    { selector: '#frm_field_7637_container', section: 'education' },
    { selector: '#frm_field_7643_container', section: 'education' },
    { selector: '#frm_field_7644_container', section: 'education' },

    // Eminence
    { selector: '#frm_field_7671_container', section: 'eminence' }
  ];

function assignSectionClasses(assignments) {
  if (!Array.isArray(assignments)) return;

  assignments.forEach(({ selector, section }) => {
    const el = document.querySelector(selector);
    if (!el || !section) return;

    // Normalize to an array of strings
    const sections = Array.isArray(section) ? section : [section];

    // Add a class for each one
    sections.forEach(sec => {
      el.classList.add(`cc-section-${sec}`);
    });
  });

  clearInlineDisplayForSection('education');
}

function showSectionFields(sectionKey) {
  // build the class we want to match
  const keepClass = `cc-section-${sectionKey.toLowerCase()}`;
  
  // find everything with a cc-section-... class
  const allSectionEls = document.querySelectorAll('[class*="cc-section-"]');

  allSectionEls.forEach(el => {
    if (el.classList.contains(keepClass)) {
        //console.log(el, "show");
      el.classList.remove('hidden');
    } else {
        //console.log(el, "hide");
      el.classList.add('hidden');
    }
  });
}

function clearInlineBlockDisplayForSection(sectionKey) {
  const selector = `.cc-section-${sectionKey.toLowerCase()}`;
  document.querySelectorAll(selector).forEach(el => {
    // Only clear if inline display is exactly "block"
    if (el.style.display === 'block') {
      el.style.removeProperty('display');
      console.log(`🧹 Cleared inline display:block on`, el);
    }
  });
}