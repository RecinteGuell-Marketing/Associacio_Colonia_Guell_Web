  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    } else {
      document.getElementById('inici').classList.add('active');
      pageId = 'inici';
    }
    document.querySelectorAll('.nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });
    if (history.replaceState) {
      history.replaceState(null, '', '#' + pageId);
    } else {
      window.location.hash = pageId;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('primary-nav').classList.remove('open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-page]');
    if (!el) return;
    e.preventDefault();
    showPage(el.dataset.page);
  });

  const toggle = document.getElementById('menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nav = document.getElementById('primary-nav');
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    const initial = (window.location.hash || '#inici').replace('#', '');
    showPage(initial);
  });