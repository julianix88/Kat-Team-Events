document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('.offer-tabs');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll('.offer-tab'));
  const panels = Array.from(
    document.querySelectorAll('.offer-subsection[role="tabpanel"]')
  );

  function activateTab(tab) {
    const targetId = tab.getAttribute('aria-controls');
    if (!targetId) return;

    tabs.forEach((t) => {
      const isSelected = t === tab;
      t.classList.toggle('offer-tab--active', isSelected);
      t.setAttribute('aria-selected', String(isSelected));
      t.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === targetId;
      panel.hidden = !isTarget;
    });
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute('tabindex', tab.classList.contains('offer-tab--active') ? '0' : '-1');

    tab.addEventListener('click', () => {
      activateTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      const { key } = event;
      let newIndex = index;

      if (key === 'ArrowRight') {
        newIndex = (index + 1) % tabs.length;
        tabs[newIndex].focus();
        event.preventDefault();
      } else if (key === 'ArrowLeft') {
        newIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[newIndex].focus();
        event.preventDefault();
      } else if (key === 'Home') {
        tabs[0].focus();
        event.preventDefault();
      } else if (key === 'End') {
        tabs[tabs.length - 1].focus();
        event.preventDefault();
      } else if (key === 'Enter' || key === ' ') {
        activateTab(tab);
        event.preventDefault();
      }
    });
  });
})
