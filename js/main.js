(function () {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const en = window.LANG_EN || {};
  const sv = { docTitle: document.title };
  const toggle = document.getElementById('lang-toggle');

  function captureSwedish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      sv[el.dataset.i18n] = el.textContent.replace(/\s+/g, ' ').trim();
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      sv[el.dataset.i18nAlt] = el.alt;
    });
  }

  function applyLang(lang) {
    const map = lang === 'en' ? en : sv;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (map[el.dataset.i18n]) el.textContent = map[el.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      if (map[el.dataset.i18nAlt]) el.alt = map[el.dataset.i18nAlt];
    });
    document.title = map.docTitle;
    document.documentElement.lang = lang;
    toggle.textContent = lang === 'en' ? 'Svenska' : 'English';
    toggle.lang = lang === 'en' ? 'sv' : 'en';
    toggle.setAttribute('aria-label', lang === 'en' ? 'Byt till svenska' : 'Switch to English');
  }

  function setLang(lang) {
    applyLang(lang);
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url);
  }

  function showLink(id, href, text) {
    const link = document.getElementById(id);
    if (!link || !text) return;
    link.href = href;
    link.querySelector('span').textContent = text;
    link.hidden = false;
  }

  function loadPhoto() {
    if (!cfg.photo) return;
    const probe = new Image();
    probe.onload = function () { document.getElementById('photo').src = cfg.photo; };
    probe.src = cfg.photo;
  }

  captureSwedish();
  toggle.hidden = false;
  const start = new URLSearchParams(window.location.search).get('lang');
  if (start === 'en') applyLang('en');
  toggle.addEventListener('click', function () {
    setLang(document.documentElement.lang === 'en' ? 'sv' : 'en');
  });
  showLink('contact-email', 'mailto:' + cfg.email, cfg.email);
  showLink('contact-phone', 'tel:' + (cfg.phone || '').replace(/\s+/g, ''), cfg.phone);
  document.querySelector('.js-year').textContent = String(new Date().getFullYear());
  loadPhoto();
})();
