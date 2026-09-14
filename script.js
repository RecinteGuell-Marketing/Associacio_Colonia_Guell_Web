  function showPage(pageId, addHistory = true) {
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
    if (addHistory && window.location.hash !== '#' + pageId) {
      history.pushState({ page: pageId }, '', '#' + pageId);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  window.addEventListener('popstate', () => {
  const pageId = (window.location.hash || '#inici').replace('#', '');
  showPage(pageId, false);
  });

  window.addEventListener('DOMContentLoaded', () => {
    const initial = (window.location.hash || '#inici').replace('#', '');
    showPage(initial, false);
  });

  const mapConsentKey = 'recinteguell-google-maps-consent';

const googleMap = document.getElementById('google-map');
const mapPlaceholder = document.getElementById('map-placeholder');
const acceptMapButton = document.getElementById('accept-map-cookies');
const rejectMapButton = document.getElementById('reject-map-cookies');
const resetConsentButton = document.getElementById('reset-cookie-consent');

function loadGoogleMap() {
  if (!googleMap || !mapPlaceholder) return;

  if (!googleMap.src) {
    googleMap.src = googleMap.dataset.src;
  }

  googleMap.hidden = false;
  mapPlaceholder.hidden = true;
}

function blockGoogleMap() {
  if (!googleMap || !mapPlaceholder) return;

  googleMap.removeAttribute('src');
  googleMap.hidden = true;
  mapPlaceholder.hidden = false;
}

acceptMapButton?.addEventListener('click', () => {
  localStorage.setItem(mapConsentKey, 'accepted');
  loadGoogleMap();
});

rejectMapButton?.addEventListener('click', () => {
  localStorage.setItem(mapConsentKey, 'rejected');
  blockGoogleMap();
});

resetConsentButton?.addEventListener('click', () => {
  localStorage.removeItem(mapConsentKey);
  blockGoogleMap();
  alert('S’ha retirat el consentiment per carregar Google Maps.');
});

if (localStorage.getItem(mapConsentKey) === 'accepted') {
  loadGoogleMap();
} else {
  blockGoogleMap();
}