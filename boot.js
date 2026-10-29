// Resolves appearance and language before first paint (chapter 36.5, 50.1).
// External file because the Content-Security-Policy forbids inline scripts.
(function () {
  var KEY = 'tiewthai.prefs.v1';
  var prefs = {};
  try {
    var raw = window.localStorage.getItem(KEY);
    var parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && parsed.v === 1) prefs = parsed;
  } catch (e) {
    prefs = {};
  }
  var root = document.documentElement;
  var theme = prefs.theme === 'light' || prefs.theme === 'dark' ? prefs.theme : 'system';
  var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var transparency = prefs.transparency === 'solid' ? 'solid' : 'glass';
  var lang = prefs.locale === 'th' || prefs.locale === 'en' ? prefs.locale : null;
  if (!lang) {
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length && !lang; i++) {
      var l = String(langs[i]).toLowerCase();
      if (l.indexOf('th') === 0) lang = 'th';
      else if (l.indexOf('en') === 0) lang = 'en';
    }
  }
  root.setAttribute('lang', lang || 'th');
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.setAttribute('data-transparency', transparency);
  root.style.colorScheme = dark ? 'dark' : 'light';
  // The look (Appearance picker: Glass light, Glass dark, Light, Dark) is theme + transparency, both
  // applied above before first paint. The browser chrome follows it too (the canvas: pearl or deep
  // navy), so an explicit choice never flashes the OS colour. Kept in step with src/app/preferences.tsx.
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  for (var m = 0; m < metas.length; m++) {
    metas[m].setAttribute('content', dark ? '#0d1827' : '#f5f8fc');
    metas[m].removeAttribute('media');
  }
  // Text size preference (kept in sync with src/app/preferences.tsx: clamp 1..2).
  var scale = typeof prefs.textScale === 'number' && isFinite(prefs.textScale) ? Math.min(2, Math.max(1, prefs.textScale)) : 1;
  if (scale !== 1) root.style.fontSize = scale * 100 + '%';
  if (scale >= 1.5) root.setAttribute('data-text-scale', 'large');
})();
