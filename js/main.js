/* ==========================================================================
   ASSOCIACIÓ EL DAVALLAMENT DE FELANITX — Controlador principal + i18n (CA/ES/EN/DE)
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.DAVALLAMENT_DATA;
  const I18N = window.I18N;
  const CONTACT_EMAIL = "davallamentfelanitx@gmail.com";
  const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/davallament_felanitx/",
    facebook: "https://www.facebook.com/davallamentdefelanitx/"
  };
  const STORAGE_KEY_LANG = "davallament_felanitx_lang_v1";
  const STORAGE_KEY_AUTOTRANS = "davallament_autotrans_news_v1";
  const NEWS_PER_PAGE = 6;
  const USE_CLEAN_URLS =
    window.location.protocol.startsWith("http") &&
    !["127.0.0.1", "localhost"].includes(window.location.hostname);

  function formatHref(href) {
    if (!USE_CLEAN_URLS || !href) return href;
    const str = String(href);
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(str)) return str;
    if (/^index\.html($|[?#])/.test(str)) {
      return str.replace(/^index\.html/, "./");
    }
    return str.replace(/^([a-z0-9_-]+)\.html($|[?#])/i, "$1$2");
  }

  function cleanCurrentAddressBar() {
    if (!USE_CLEAN_URLS || !window.history || !window.history.replaceState) return;
    const path = window.location.pathname;
    let nextPath = path;
    if (path.endsWith("/index.html")) {
      nextPath = path.slice(0, -10);
    } else if (path.endsWith(".html")) {
      nextPath = path.slice(0, -5);
    }
    if (nextPath !== path) {
      window.history.replaceState(null, "", nextPath + window.location.search + window.location.hash);
    }
  }

  function rewriteStaticLinks() {
    if (!USE_CLEAN_URLS) return;
    document.querySelectorAll("a[href]").forEach((a) => {
      const raw = a.getAttribute("href");
      const next = formatHref(raw);
      if (next !== raw) a.setAttribute("href", next);
    });
  }
  let openNewsArticleId = null;
  const inFlightTranslations = new Set();

  function loadAutoTransCache() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_AUTOTRANS) || "{}");
    } catch (_) {
      return {};
    }
  }

  function saveAutoTransCache(cache) {
    try {
      localStorage.setItem(STORAGE_KEY_AUTOTRANS, JSON.stringify(cache));
    } catch (_) {}
  }

  function hashNewsContent(n) {
    const str = [n.title, n.excerpt, n.category, n.date, ...(n.tags || []), ...(n.body || [])].join("|");
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return String(h);
  }

  async function translateTextChunk(text, targetLang) {
    const clean = String(text || "").trim();
    if (!clean) return "";
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ca&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(clean)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          return data[0].map((seg) => (Array.isArray(seg) ? seg[0] : "")).join("");
        }
      }
    } catch (_) {}
    try {
      const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean.slice(0, 480))}&langpair=ca|${encodeURIComponent(targetLang)}`;
      const res2 = await fetch(url2);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.responseData && data2.responseData.translatedText) {
          return data2.responseData.translatedText;
        }
      }
    } catch (_) {}
    return clean;
  }

  async function ensureAutoTranslatedNews(lang) {
    if (!lang || lang === "ca" || !Array.isArray(DATA.news)) return;
    if (currentPage !== "inici" && currentPage !== "noticies") return;

    const manualMap = (I18N && I18N[lang] && I18N[lang].data && I18N[lang].data.news) || {};
    const cache = loadAutoTransCache();
    const pending = DATA.news.filter((n) => {
      if (manualMap[n.id]) return false;
      const cacheKey = `${lang}:${n.id}:${hashNewsContent(n)}`;
      return !cache[cacheKey] && !inFlightTranslations.has(cacheKey);
    });

    if (!pending.length) return;

    let changed = false;
    await Promise.all(
      pending.map(async (n) => {
        const cacheKey = `${lang}:${n.id}:${hashNewsContent(n)}`;
        inFlightTranslations.add(cacheKey);
        try {
          const [title, excerpt, category, date, tags, body] = await Promise.all([
            translateTextChunk(n.title, lang),
            translateTextChunk(n.excerpt, lang),
            translateTextChunk(n.category, lang),
            translateTextChunk(n.date, lang),
            Promise.all((n.tags || []).map((t) => translateTextChunk(t, lang))),
            Promise.all((n.body || []).map((p) => translateTextChunk(p, lang)))
          ]);
          const latestCache = loadAutoTransCache();
          latestCache[cacheKey] = { title, excerpt, category, date, tags, body };
          saveAutoTransCache(latestCache);
          changed = true;
        } finally {
          inFlightTranslations.delete(cacheKey);
        }
      })
    );

    if (changed && currentLang === lang) {
      renderCurrentPage(false);
      if (openNewsArticleId) {
        const modal = document.getElementById("shared-modal-backdrop");
        if (modal && modal.classList.contains("open")) {
          openNewsArticle(openNewsArticleId);
        }
      }
    }
  }

  const NAV_LINKS = [
    { href: "index.html", key: "inici" },
    {
      href: "historia.html",
      key: "historia",
      children: [
        { href: "historia.html#memoria", key: "historiaMemoria" },
        { href: "historia.html#cronologia", key: "historiaCronologia" }
      ]
    },
    {
      href: "representacio.html",
      key: "representacio",
      children: [
        { href: "representacio.html#text", key: "repText" },
        { href: "representacio.html#banda-sonora", key: "repBandaSonora" },
        { href: "representacio.html#escenes", key: "repEscenes" }
      ]
    },
    {
      href: "entitat.html",
      key: "entitat",
      children: [
        { href: "entitat.html#qui-som", key: "entQuiSom" },
        { href: "entitat.html#junta", key: "entJunta" }
        // { href: "entitat.html#convocatories", key: "entConvocatories" }
      ]
    },
    {
      href: "noticies.html",
      key: "noticies",
      children: [
        { href: "noticies.html#destacada", key: "notDestacada" },
        { href: "noticies.html#llistat", key: "notTotes" }
      ]
    },
    {
      href: "galeria.html",
      key: "galeria",
      children: [
        { href: "galeria.html#fotografies", key: "galFotos" },
        { href: "galeria.html#multimedia", key: "galMultimedia" }
      ]
    }
  ];

  let currentPage = "inici";
  let currentLang = "ca";
  let heroTimer = null;
  let activeSceneIdx = 0;

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const SUPPORTED_LANGS = ["ca", "es", "en"];

  function getStoredLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved && SUPPORTED_LANGS.includes(saved) && I18N && I18N[saved]) return saved;
    } catch (_) {}
    return "ca";
  }

  function dict() {
    return (I18N && I18N[currentLang]) || I18N.ca;
  }

  function resolveKey(obj, path) {
    return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }

  function tKey(path) {
    const val = resolveKey(dict(), path);
    return val !== undefined ? val : resolveKey(I18N.ca, path);
  }

  function showToast(message) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function getQueryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (_) {
      return null;
    }
  }

  /* ------------------------------------------------------------------------
     Localized Data Getters (combinen YAML/base + traduccions ES/EN/DE per id)
     ------------------------------------------------------------------------ */
  function hashHeroSlide(s) {
    const str = [s.kicker, s.title, s.subtitle].join("|");
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return String(h);
  }

  function getLocalizedHeroSlides() {
    const autoCache = currentLang !== "ca" ? loadAutoTransCache() : null;
    const d = dict().data && dict().data.heroSlides;
    return DATA.heroSlides.map((slide, i) => {
      if (autoCache) {
        const key = `hero:${currentLang}:${hashHeroSlide(slide)}`;
        if (autoCache[key]) return { ...slide, ...autoCache[key] };
      }
      if (!slide._fromYaml && d && d[i]) return { ...slide, ...d[i] };
      return slide;
    });
  }

  async function ensureAutoTranslatedHero(lang) {
    if (!lang || lang === "ca" || currentPage !== "inici" || !Array.isArray(DATA.heroSlides)) return;
    const cache = loadAutoTransCache();
    const pending = DATA.heroSlides.filter((s) => {
      const key = `hero:${lang}:${hashHeroSlide(s)}`;
      return !cache[key] && !inFlightTranslations.has(key);
    });
    if (!pending.length) return;

    let changed = false;
    await Promise.all(
      pending.map(async (s) => {
        const key = `hero:${lang}:${hashHeroSlide(s)}`;
        inFlightTranslations.add(key);
        try {
          const [kicker, title, subtitle] = await Promise.all([
            translateTextChunk(s.kicker, lang),
            translateTextChunk(s.title, lang),
            translateTextChunk(s.subtitle, lang)
          ]);
          const latest = loadAutoTransCache();
          latest[key] = { kicker, title, subtitle };
          saveAutoTransCache(latest);
          changed = true;
        } finally {
          inFlightTranslations.delete(key);
        }
      })
    );

    if (changed && currentLang === lang) {
      initHomePage();
    }
  }

  function getLocalizedScenes() {
    const map = dict().data && dict().data.scenes;
    return DATA.scenes.map((s) => (map && map[s.id] ? { ...s, ...map[s.id] } : s));
  }

  function hashRepSection(s) {
    const str = [s.eyebrow, s.title, ...(s.paragraphs || []), s.quote, s.quoteCite].join("|");
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return String(h);
  }

  function getLocalizedRepSections() {
    const autoCache = currentLang !== "ca" ? loadAutoTransCache() : null;
    return (DATA.repSections || []).map((s) => {
      if (autoCache) {
        const key = `rep:${currentLang}:${s.id}:${hashRepSection(s)}`;
        if (autoCache[key]) return { ...s, ...autoCache[key] };
      }
      return s;
    });
  }

  async function ensureAutoTranslatedRepSections(lang) {
    if (!lang || lang === "ca" || currentPage !== "representacio" || !Array.isArray(DATA.repSections)) return;
    const cache = loadAutoTransCache();
    const pending = DATA.repSections.filter((s) => {
      const key = `rep:${lang}:${s.id}:${hashRepSection(s)}`;
      return !cache[key] && !inFlightTranslations.has(key);
    });
    if (!pending.length) return;

    let changed = false;
    await Promise.all(
      pending.map(async (s) => {
        const key = `rep:${lang}:${s.id}:${hashRepSection(s)}`;
        inFlightTranslations.add(key);
        try {
          const [eyebrow, title, paragraphs, quote, quoteCite] = await Promise.all([
            translateTextChunk(s.eyebrow, lang),
            translateTextChunk(s.title, lang),
            Promise.all((s.paragraphs || []).map((p) => translateTextChunk(p, lang))),
            translateTextChunk(s.quote, lang),
            translateTextChunk(s.quoteCite, lang)
          ]);
          const latest = loadAutoTransCache();
          latest[key] = { eyebrow, title, paragraphs, quote, quoteCite };
          saveAutoTransCache(latest);
          changed = true;
        } finally {
          inFlightTranslations.delete(key);
        }
      })
    );

    if (changed && currentLang === lang) {
      renderRepresentacioSections();
    }
  }

  function getLocalizedTimeline() {
    const list = dict().data && dict().data.timeline;
    return DATA.timeline.map((item, i) => (list && list[i] ? { ...item, ...list[i] } : item));
  }

  function getLocalizedProtagonists() {
    const list = dict().data && dict().data.protagonists;
    return DATA.protagonists.map((item, i) => (list && list[i] ? { ...item, ...list[i] } : item));
  }

  const MONTH_MAP = {
    gener: 1, enero: 1, january: 1, januar: 1,
    febrer: 2, febrero: 2, february: 2, februar: 2,
    marc: 3, marzo: 3, march: 3, marz: 3,
    abril: 4, april: 4,
    maig: 5, mayo: 5, may: 5, mai: 5,
    juny: 6, junio: 6, june: 6, juni: 6,
    juliol: 7, julio: 7, july: 7, juli: 7,
    agost: 8, agosto: 8, august: 8,
    setembre: 9, septiembre: 9, september: 9,
    octubre: 10, october: 10, oktober: 10,
    novembre: 11, noviembre: 11, november: 11,
    desembre: 12, diciembre: 12, december: 12, dezember: 12
  };

  function getNewsTimestamp(item) {
    if (item.isoDate) {
      const ts = Date.parse(item.isoDate);
      if (!Number.isNaN(ts)) return ts;
    }
    const raw = String(item.date || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const yearMatch = raw.match(/\b(19\d{2}|20\d{2})\b/);
    if (!yearMatch) return 0;
    const year = Number(yearMatch[1]);
    let month = 1;
    for (const [name, num] of Object.entries(MONTH_MAP)) {
      if (raw.includes(name)) {
        month = num;
        break;
      }
    }
    const dayMatch = raw.match(/\b([1-2]?\d|3[01])\b/);
    const day = dayMatch ? Number(dayMatch[1]) : 1;
    return Date.UTC(year, month - 1, day);
  }

  function getLocalizedNews() {
    const map = dict().data && dict().data.news;
    const autoCache = currentLang !== "ca" ? loadAutoTransCache() : null;
    return DATA.news
      .map((n) => {
        const baseTs = getNewsTimestamp(n);
        let override = map && map[n.id] ? map[n.id] : null;
        if (!override && autoCache) {
          const key = `${currentLang}:${n.id}:${hashNewsContent(n)}`;
          if (autoCache[key]) override = autoCache[key];
        }
        const merged = override ? { ...n, ...override } : { ...n };
        merged._ts = baseTs || getNewsTimestamp(merged);
        return merged;
      })
      .sort((a, b) => b._ts - a._ts);
  }

  function getLocalizedBoard() {
    const map = dict().data && dict().data.board;
    return (DATA.board || []).map((m) => (map && map[m.id] ? { ...m, ...map[m.id] } : m));
  }

  function getLocalizedMeetings() {
    const map = dict().data && dict().data.meetings;
    return (DATA.meetings || [])
      .map((m) => {
        const baseTs = getNewsTimestamp(m);
        const merged = map && map[m.id] ? { ...m, ...map[m.id] } : { ...m };
        merged._ts = baseTs || getNewsTimestamp(merged);
        return merged;
      })
      .sort((a, b) => {
        const aUp = a.status === "proxima" ? 1 : 0;
        const bUp = b.status === "proxima" ? 1 : 0;
        if (aUp !== bUp) return bUp - aUp;
        return b._ts - a._ts;
      });
  }

  function getLocalizedGallery() {
    const map = dict().data && dict().data.gallery;
    return DATA.gallery.map((g) => {
      if (g._fromYaml) return g;
      return map && map[g.id] ? { ...g, ...map[g.id] } : g;
    });
  }

  function getLocalizedVideos() {
    const map = dict().data && dict().data.videos;
    return (DATA.videos || []).map((v) => (map && map[v.id] ? { ...v, ...map[v.id] } : v));
  }

  function extractYouTubeId(input) {
    const raw = String(input || "").trim();
    if (!raw) return "";
    if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
    ];
    for (const re of patterns) {
      const m = raw.match(re);
      if (m) return m[1];
    }
    return "";
  }

  /* ------------------------------------------------------------------------
     Apply Static DOM Translations
     ------------------------------------------------------------------------ */
  function applyStaticTranslations() {
    const d = dict();
    document.documentElement.lang = currentLang;

    if (d.pageTitles && d.pageTitles[currentPage]) {
      document.title = d.pageTitles[currentPage];
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (el.dataset.origText === undefined) el.dataset.origText = el.textContent;
      if (currentLang === "ca") {
        el.textContent = el.dataset.origText;
        return;
      }
      const val = tKey(el.dataset.i18n);
      if (typeof val === "string") el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      if (el.dataset.origHtml === undefined) el.dataset.origHtml = el.innerHTML;
      if (currentLang === "ca") {
        el.innerHTML = el.dataset.origHtml;
        return;
      }
      const val = tKey(el.dataset.i18nHtml);
      if (typeof val === "string") el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      if (el.dataset.origPh === undefined) el.dataset.origPh = el.getAttribute("placeholder") || "";
      if (currentLang === "ca") {
        el.setAttribute("placeholder", el.dataset.origPh);
        return;
      }
      const val = tKey(el.dataset.i18nPlaceholder);
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });
  }

  /* ------------------------------------------------------------------------
     Shared Header & Footer (amb el logo oficial img/logo/logo.png)
     ------------------------------------------------------------------------ */
  let scrollListenerBound = false;

  function renderLayout() {
    const d = dict();

    const headerHost = document.getElementById("site-header-host");
    if (headerHost) {
      headerHost.innerHTML = `
        <a class="skip-link" href="#main-content">${escapeHtml(d.skipLink)}</a>
        <header class="site-header" id="site-header">
          <div class="top-bar">
            <div class="language-selector" role="group" aria-label="Language">
              ${SUPPORTED_LANGS
                .map(
                  (code) =>
                    `<button type="button" data-lang="${code}" class="${code === currentLang ? "active" : ""}" aria-pressed="${code === currentLang}">${code.toUpperCase()}</button>`
                )
                .join("")}
            </div>
          </div>

          <div class="main-header">
            <a href="${formatHref("index.html")}" class="brand" aria-label="El Davallament de Felanitx">
              <img src="img/logo/logo.png" alt="Logo El Davallament de Felanitx">
            </a>

            <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav class="main-nav" id="main-nav" aria-label="Main navigation">
              ${NAV_LINKS.filter((item) => !item.footerOnly).map((item) => {
                const isActive = item.key === currentPage;
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                const chevron = hasChildren
                  ? `<svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`
                  : "";
                const subMenu = hasChildren
                  ? `<div class="nav-dropdown" role="menu">
                      <div class="nav-dropdown-inner">
                        ${item.children
                          .map(
                            (sub) =>
                              `<a href="${formatHref(sub.href)}" role="menuitem">${escapeHtml((d.subnav && d.subnav[sub.key]) || sub.key)}</a>`
                          )
                          .join("")}
                      </div>
                    </div>`
                  : "";
                return `
                  <div class="nav-item${hasChildren ? " nav-item--has-sub" : ""}">
                    <a href="${formatHref(item.href)}" data-nav-key="${item.key}" class="${isActive ? "active" : ""}" ${isActive ? 'aria-current="page"' : ""}>
                      ${escapeHtml(d.nav[item.key])}${chevron}
                    </a>
                    ${subMenu}
                  </div>`;
              }).join("")}
            </nav>
          </div>
        </header>
      `;

      const header = document.getElementById("site-header");
      const toggle = document.getElementById("menu-toggle");
      const nav = document.getElementById("main-nav");

      if (window.scrollY > 80 && header) header.classList.add("scrolled");

      if (!scrollListenerBound) {
        scrollListenerBound = true;
        let isScrolled = window.scrollY > 80;
        let ticking = false;
        window.addEventListener(
          "scroll",
          () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
              ticking = false;
              const hdr = document.getElementById("site-header");
              if (!hdr) return;
              const y = window.scrollY;
              if (!isScrolled && y > 80) {
                isScrolled = true;
                hdr.classList.add("scrolled");
              } else if (isScrolled && y < 30) {
                isScrolled = false;
                hdr.classList.remove("scrolled");
              }
            });
          },
          { passive: true }
        );
      }

      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          const open = nav.classList.toggle("open");
          toggle.setAttribute("aria-expanded", String(open));
          document.body.classList.toggle("menu-open", open);
        });
        nav.querySelectorAll("a").forEach((a) => {
          a.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
          });
        });
      }

      headerHost.querySelectorAll(".language-selector button").forEach((btn) => {
        btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
      });
    }

    const footerHost = document.getElementById("site-footer-host");
    if (footerHost) {
      const footerCols = NAV_LINKS.filter((item) => item.key !== "inici");
      footerHost.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-top-bar">
              <a href="${formatHref("index.html")}" class="footer-brand" aria-label="${escapeHtml(d.footer.title)}">
                <img src="img/logo/logo-blanc.png" alt="Logo El Davallament de Felanitx" class="footer-logo">
              </a>
              <div class="footer-social" aria-label="Xarxes socials">
                <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram @davallament_felanitx" title="Instagram · @davallament_felanitx">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook Davallament de Felanitx" title="Facebook · Davallament de Felanitx">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <a href="mailto:${CONTACT_EMAIL}" class="footer-email">${CONTACT_EMAIL}</a>
            </div>

            <nav class="footer-sitemap" aria-label="Mapa del web">
              ${footerCols
                .map((col) => {
                  const children = Array.isArray(col.children) ? col.children : [];
                  return `
                    <div class="footer-col">
                      <a href="${formatHref(col.href)}" class="footer-col-title">${escapeHtml(d.nav[col.key])}</a>
                      <ul class="footer-sublinks">
                        ${children
                          .map(
                            (sub) =>
                              `<li><a href="${formatHref(sub.href)}">${escapeHtml(sub.label || (d.subnav && d.subnav[sub.key]) || sub.key)}</a></li>`
                          )
                          .join("")}
                      </ul>
                    </div>`;
                })
                .join("")}
            </nav>

            <div class="footer-bottom">
              <span>${escapeHtml(d.footer.copy)}</span>
            </div>
          </div>
        </footer>
      `;
    }
  }

  function switchLanguage(lang) {
    if (!I18N || !I18N[lang] || lang === currentLang) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch (_) {}

    renderLayout();
    applyStaticTranslations();
    renderCurrentPage();
    ensureAutoTranslatedHero(currentLang);
    ensureAutoTranslatedNews(currentLang);
    ensureAutoTranslatedRepSections(currentLang);
    showToast(dict().toastLang);
  }

  /* ------------------------------------------------------------------------
     Shared Modals & Lightbox
     ------------------------------------------------------------------------ */
  function openModal(htmlContent, ariaLabel) {
    let backdrop = document.getElementById("shared-modal-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "shared-modal-backdrop";
      backdrop.className = "modal-backdrop";
      backdrop.setAttribute("role", "dialog");
      backdrop.setAttribute("aria-modal", "true");
      backdrop.innerHTML = `<div class="modal-dialog" id="shared-modal-dialog"></div>`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });
    }
    backdrop.setAttribute("aria-label", ariaLabel || "Dialog");
    const dialog = document.getElementById("shared-modal-dialog");
    dialog.innerHTML = `
      <button type="button" class="modal-close" id="shared-modal-close" aria-label="Close">✕</button>
      ${htmlContent}
    `;
    dialog.scrollTop = 0;
    document.getElementById("shared-modal-close").addEventListener("click", closeModal);
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => backdrop.classList.add("open"));
  }

  function closeModal() {
    const backdrop = document.getElementById("shared-modal-backdrop");
    if (backdrop) {
      backdrop.classList.remove("open");
      document.body.classList.remove("modal-open");
    }
    openNewsArticleId = null;
  }

  function openNewsArticle(articleId) {
    const item = getLocalizedNews().find((n) => n.id === articleId);
    if (!item) return;
    openNewsArticleId = articleId;
    const ui = dict().ui;

    const allNewsPhotos = [item.image, item.poster, item.extraImage].filter(Boolean);
    const lightboxPhotos = allNewsPhotos.map((src) => ({
      src,
      title: item.title,
      album: item.category || "Notícies",
      caption: item.date || "",
      location: item.source || "Felanitx",
      credit: "Associació El Davallament de Felanitx"
    }));

    const extraPhotos = [item.poster, item.extraImage].filter(Boolean);
    const extraPhotosHtml =
      extraPhotos.length === 1
        ? `<figure style="margin:22px 0;text-align:center">
            <img class="news-zoomable" data-news-zoom="1" src="${escapeHtml(extraPhotos[0])}" alt="${escapeHtml(item.title)}" title="${escapeHtml(ui.zoomPill || "Ampliar")}" style="max-height:520px;margin:0 auto;border-radius:8px;box-shadow:var(--shadow-md)">
          </figure>`
        : extraPhotos.length >= 2
        ? `<div class="article-gallery">
            ${extraPhotos
              .map(
                (src, i) =>
                  `<figure><img class="news-zoomable" data-news-zoom="${i + 1}" src="${escapeHtml(src)}" alt="${escapeHtml(item.title)}" title="${escapeHtml(ui.zoomPill || "Ampliar")}" loading="lazy"></figure>`
              )
              .join("")}
          </div>`
        : "";

    const html = `
      <img class="modal-hero-img news-zoomable" data-news-zoom="0" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" title="${escapeHtml(ui.zoomPill || "Ampliar")}">
      <div class="modal-content">
        <div class="card-meta">
          <span class="badge badge--primary">${escapeHtml(item.category)}</span>
          <span>${escapeHtml(item.date)}</span>
        </div>
        <h2>${escapeHtml(item.title)}</h2>
        <div class="article-body">
          ${item.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
        </div>
        ${extraPhotosHtml}
        ${
          item.sourceUrl
            ? `<p style="font-size:0.88rem;color:var(--text-muted);margin:14px 0 18px">
                <strong>${escapeHtml(ui.sourceLabel || "Font:")}</strong>
                <a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer" style="color:var(--primary);font-weight:600;text-decoration:underline">${escapeHtml(item.source || item.sourceUrl)} ↗</a>
              </p>`
            : ""
        }
        <div class="tags-row" style="margin-bottom:22px">
          ${item.tags.map((tag) => `<span class="badge badge--sand">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div style="display:flex;flex-wrap:wrap;justify-content:flex-start;gap:12px;padding-top:16px;border-top:1px solid var(--border)">
          <button type="button" class="btn btn--outline btn--sm" id="copy-news-link">${escapeHtml(ui.copyLink)}</button>
        </div>
      </div>
    `;
    openModal(html, item.title);
    const dialog = document.getElementById("shared-modal-dialog");
    if (dialog) {
      dialog.querySelectorAll("[data-news-zoom]").forEach((imgEl) => {
        imgEl.addEventListener("click", () => {
          openLightbox(lightboxPhotos, Number(imgEl.dataset.newsZoom) || 0);
        });
      });
    }
    document.getElementById("copy-news-link").addEventListener("click", () => {
      const sharePage = formatHref("noticies.html");
      const shareUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, "")}${sharePage}?id=${encodeURIComponent(item.id)}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => showToast(ui.linkCopied));
      } else {
        showToast(`${sharePage}?id=` + item.id);
      }
    });
  }

  /* Lightbox */
  let lbItems = [];
  let lbIndex = 0;

  function ensureLightbox() {
    let lb = document.getElementById("shared-lightbox");
    if (lb) {
      const closeBtn = document.getElementById("lb-close");
      if (closeBtn) closeBtn.setAttribute("aria-label", dict().ui.closeLightbox || "Tancar");
      return lb;
    }
    lb = document.createElement("div");
    lb.id = "shared-lightbox";
    lb.className = "lightbox-backdrop";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = `
      <div class="lightbox-top">
        <span class="lightbox-counter" id="lb-counter"></span>
        <button type="button" class="lightbox-close" id="lb-close" aria-label="${escapeHtml(dict().ui.closeLightbox || "Tancar")}">✕</button>
      </div>
      <div class="lightbox-stage">
        <button type="button" class="lightbox-nav lightbox-prev" id="lb-prev" aria-label="Previous">❮</button>
        <img id="lb-img" src="" alt="">
        <button type="button" class="lightbox-nav lightbox-next" id="lb-next" aria-label="Next">❯</button>
      </div>
      <div class="lightbox-caption">
        <h3 id="lb-title"></h3>
        <p id="lb-caption"></p>
        <small id="lb-meta"></small>
      </div>
    `;
    document.body.appendChild(lb);
    document.getElementById("lb-close").addEventListener("click", closeLightbox);
    document.getElementById("lb-prev").addEventListener("click", () => stepLightbox(-1));
    document.getElementById("lb-next").addEventListener("click", () => stepLightbox(1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
    return lb;
  }

  function renderLightbox() {
    const item = lbItems[lbIndex];
    if (!item) return;
    const counterParts = [`${lbIndex + 1} / ${lbItems.length}`];
    if (item.album) counterParts.push(item.album);
    if (item.year) counterParts.push(item.year);
    document.getElementById("lb-counter").textContent = counterParts.join(" · ");
    const img = document.getElementById("lb-img");
    img.src = item.src;
    img.alt = item.title || item.album || "El Davallament de Felanitx";

    const titleEl = document.getElementById("lb-title");
    titleEl.textContent = item.title || "";
    titleEl.style.display = item.title ? "" : "none";

    const captionEl = document.getElementById("lb-caption");
    captionEl.textContent = item.caption || "";
    captionEl.style.display = item.caption ? "" : "none";

    const locText = item.location && item.location.trim().toLowerCase() !== "felanitx" ? item.location.trim() : "";
    const metaText = [locText, item.credit].filter(Boolean).join(" · ");
    const metaEl = document.getElementById("lb-meta");
    metaEl.textContent = metaText;
    metaEl.style.display = metaText ? "" : "none";
  }

  function openLightbox(items, startIndex) {
    lbItems = items;
    lbIndex = startIndex;
    const lb = ensureLightbox();
    renderLightbox();
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => lb.classList.add("open"));
  }

  function stepLightbox(delta) {
    if (!lbItems.length) return;
    lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
    renderLightbox();
  }

  function closeLightbox() {
    const lb = document.getElementById("shared-lightbox");
    if (lb) {
      lb.classList.remove("open");
      const modal = document.getElementById("shared-modal-backdrop");
      if (!modal || !modal.classList.contains("open")) {
        document.body.classList.remove("modal-open");
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("shared-lightbox");
    if (lb && lb.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    const modal = document.getElementById("shared-modal-backdrop");
    if (modal && modal.classList.contains("open") && e.key === "Escape") {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     PAGE: INICI (index.html)
     ------------------------------------------------------------------------ */
  function initHomePage() {
    const ui = dict().ui;
    const heroHost = document.getElementById("hero-carousel");
    if (heroHost) {
      if (heroTimer) clearInterval(heroTimer);
      const slidesData = getLocalizedHeroSlides();
      const slidesHtml = slidesData
        .map(
          (s, i) =>
            `<img src="${escapeHtml(s.src)}" class="slide ${i === 0 ? "active" : ""}" alt="${escapeHtml(s.title)}">`
        )
        .join("");

      heroHost.innerHTML = `
        ${slidesHtml}
        <div class="hero-overlay"></div>
        <div class="hero-caption-bar">
          <div class="hero-caption-inner">
            <span class="hero-kicker" id="hero-kicker">${escapeHtml(slidesData[0].kicker)}</span>
            <h1 class="hero-slide-title" id="hero-title">${escapeHtml(slidesData[0].title)}</h1>
            <p class="hero-slide-sub" id="hero-sub">${escapeHtml(slidesData[0].subtitle)}</p>
            <div class="hero-actions">
              <a href="${formatHref("galeria.html")}" class="btn btn--sand">${escapeHtml(ui.viewGallery)}</a>
            </div>
          </div>
        </div>
        <button type="button" class="carousel-btn prev" id="hero-prev" aria-label="Previous">❮</button>
        <button type="button" class="carousel-btn next" id="hero-next" aria-label="Next">❯</button>
        <div class="carousel-dots" id="hero-dots" aria-label="Slides"></div>
      `;

      const slideEls = heroHost.querySelectorAll(".slide");
      const dotsEl = document.getElementById("hero-dots");
      const kickerEl = document.getElementById("hero-kicker");
      const titleEl = document.getElementById("hero-title");
      const subEl = document.getElementById("hero-sub");
      let current = 0;

      slidesData.forEach((s, idx) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot" + (idx === 0 ? " active" : "");
        dot.setAttribute("aria-label", `${idx + 1}: ${s.title}`);
        dot.addEventListener("click", () => {
          showSlide(idx);
          restart();
        });
        dotsEl.appendChild(dot);
      });

      function showSlide(index) {
        slideEls.forEach((el, i) => el.classList.toggle("active", i === index));
        dotsEl.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === index));
        kickerEl.textContent = slidesData[index].kicker;
        titleEl.textContent = slidesData[index].title;
        subEl.textContent = slidesData[index].subtitle;
        current = index;
      }

      function next() {
        showSlide((current + 1) % slideEls.length);
      }

      function prev() {
        showSlide((current - 1 + slideEls.length) % slideEls.length);
      }

      function start() {
        heroTimer = setInterval(next, 5500);
      }

      function restart() {
        clearInterval(heroTimer);
        start();
      }

      document.getElementById("hero-next").addEventListener("click", () => {
        next();
        restart();
      });
      document.getElementById("hero-prev").addEventListener("click", () => {
        prev();
        restart();
      });
      start();
    }

    const homeNews = document.getElementById("home-news-grid");
    if (homeNews) {
      homeNews.innerHTML = getLocalizedNews()
        .slice(0, 3)
        .map(
          (n) => `
          <article class="card">
            <div class="card-media">
              <img src="${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}" loading="lazy">
            </div>
            <div class="card-body">
              <div class="card-meta"><span>${escapeHtml(n.date)}</span></div>
              <h3 class="card-title">${escapeHtml(n.title)}</h3>
              <p class="card-excerpt">${escapeHtml(n.excerpt)}</p>
              <div class="card-footer">
                <button type="button" class="card-action-btn" data-open-news="${escapeHtml(n.id)}">${escapeHtml(ui.readArticle)}</button>
              </div>
            </div>
          </article>`
        )
        .join("");

      homeNews.querySelectorAll("[data-open-news]").forEach((btn) => {
        btn.addEventListener("click", () => openNewsArticle(btn.dataset.openNews));
      });
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: HISTÒRIA (historia.html)
     ------------------------------------------------------------------------ */
  function initHistoriaPage() {
    const timelineEl = document.getElementById("timeline-list");
    if (timelineEl) {
      timelineEl.innerHTML = getLocalizedTimeline()
        .map(
          (item) => `
          <article class="timeline-item">
            <span class="timeline-year">${escapeHtml(item.year)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.text)}</p>
          </article>`
        )
        .join("");
    }

    const protagEl = document.getElementById("protagonists-grid");
    if (protagEl) {
      protagEl.innerHTML = getLocalizedProtagonists()
        .map(
          (p) => `
          <article class="info-card">
            <span class="badge badge--sand" style="margin-bottom:10px">${escapeHtml(p.role)}</span>
            <h3>${escapeHtml(p.name)}</h3>
            <p>${escapeHtml(p.desc)}</p>
          </article>`
        )
        .join("");
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: REPRESENTACIÓ (representacio.html)
     ------------------------------------------------------------------------ */
  function initRepresentacioPage() {
    renderRepresentacioSections();

    const tabsEl = document.getElementById("scene-tabs");
    const panelEl = document.getElementById("scene-panel");
    if (!tabsEl || !panelEl) return;

    const scenes = getLocalizedScenes();
    const d = dict();
    const ui = d.ui;

    if (!scenes.length) {
      tabsEl.innerHTML = "";
      panelEl.innerHTML = "";
      return;
    }

    if (activeSceneIdx >= scenes.length) activeSceneIdx = 0;

    function selectScene(index) {
      activeSceneIdx = index;
      const s = scenes[index];
      tabsEl.querySelectorAll("button").forEach((b, i) => {
        b.classList.toggle("active", i === index);
        b.setAttribute("aria-selected", String(i === index));
      });
      const chars = Array.isArray(s.characters) ? s.characters.filter(Boolean) : [];
      const sceneAudioHtml = buildAudioEmbedHtml(s.audioUrl, s.title, true);
      const allScenePhotos = [s.image, s.image2, s.image3].filter(Boolean);
      const sceneLightboxPhotos = allScenePhotos.map((src) => ({
        src,
        title: s.title || "",
        album: d.nav.representacio || "Representació",
        caption: s.fullDesc || "",
        location: s.location || "Felanitx",
        credit: "Associació El Davallament de Felanitx"
      }));

      const sceneMediaHtml = allScenePhotos.length
        ? `<div class="scene-carousel" id="scene-carousel">
            ${allScenePhotos
              .map(
                (src, i) =>
                  `<img class="scene-carousel-slide news-zoomable${i === 0 ? " active" : ""}" data-scene-zoom="${i}" src="${escapeHtml(src)}" alt="${escapeHtml(s.title || "")}" title="${escapeHtml(ui.zoomPill || "Ampliar")}">`
              )
              .join("")}
            ${
              allScenePhotos.length > 1
                ? `<button type="button" class="scene-carousel-btn prev" id="scene-prev" aria-label="Previous">❮</button>
                   <button type="button" class="scene-carousel-btn next" id="scene-next" aria-label="Next">❯</button>
                   <div class="scene-carousel-dots" id="scene-dots">
                     ${allScenePhotos
                       .map(
                         (_, i) =>
                           `<button type="button" class="dot${i === 0 ? " active" : ""}" data-slide-idx="${i}" aria-label="${i + 1}"></button>`
                       )
                       .join("")}
                   </div>`
                : ""
            }
          </div>`
        : "";

      panelEl.innerHTML = `
        ${sceneMediaHtml}
        <div class="scene-detail-body">
          ${s.location ? `<span class="eyebrow">${escapeHtml(s.location)}</span>` : ""}
          ${s.title ? `<h3>${escapeHtml(s.title)}</h3>` : ""}
          ${s.fullDesc ? `<p style="color:var(--text-muted);margin-bottom:14px">${escapeHtml(s.fullDesc)}</p>` : ""}
          ${s.atmosphere ? `<p style="font-size:0.94rem;color:var(--primary)"><strong>${escapeHtml(ui.atmosphereLabel)}</strong> ${escapeHtml(s.atmosphere)}</p>` : ""}
          ${
            chars.length
              ? `<div class="tags-row">
                  ${chars.map((c) => `<span class="badge badge--primary">${escapeHtml(c)}</span>`).join("")}
                </div>`
              : ""
          }
          ${sceneAudioHtml}
          <div class="scene-footer">
            <a href="${formatHref("galeria.html")}${s.galleryAlbum || s.title ? `?album=${encodeURIComponent(s.galleryAlbum || s.title)}` : ""}#fotografies" class="btn btn--outline btn--sm">${escapeHtml(ui.moreInGallery || "Veure més imatges a la Galeria →")}</a>
          </div>
        </div>
      `;

      let sceneSlideIdx = 0;
      const carouselEl = document.getElementById("scene-carousel");
      if (carouselEl && allScenePhotos.length > 1) {
        const slides = carouselEl.querySelectorAll(".scene-carousel-slide");
        const dots = carouselEl.querySelectorAll(".dot");
        function showSceneSlide(nextIdx) {
          sceneSlideIdx = (nextIdx + slides.length) % slides.length;
          slides.forEach((el, i) => el.classList.toggle("active", i === sceneSlideIdx));
          dots.forEach((el, i) => el.classList.toggle("active", i === sceneSlideIdx));
        }
        document.getElementById("scene-prev").addEventListener("click", (e) => {
          e.stopPropagation();
          showSceneSlide(sceneSlideIdx - 1);
        });
        document.getElementById("scene-next").addEventListener("click", (e) => {
          e.stopPropagation();
          showSceneSlide(sceneSlideIdx + 1);
        });
        dots.forEach((dot) => {
          dot.addEventListener("click", (e) => {
            e.stopPropagation();
            showSceneSlide(Number(dot.dataset.slideIdx));
          });
        });
        let touchStartX = 0;
        carouselEl.addEventListener("touchstart", (e) => {
          touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });
        carouselEl.addEventListener("touchend", (e) => {
          const dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 40) showSceneSlide(dx < 0 ? sceneSlideIdx + 1 : sceneSlideIdx - 1);
        }, { passive: true });
      }

      panelEl.querySelectorAll("[data-scene-zoom]").forEach((imgEl) => {
        imgEl.addEventListener("click", () => {
          openLightbox(sceneLightboxPhotos, Number(imgEl.dataset.sceneZoom) || 0);
        });
      });
    }

    tabsEl.innerHTML = scenes
      .map(
        (s, idx) => `
        <button type="button" role="tab" class="scene-tab-btn ${idx === activeSceneIdx ? "active" : ""}" aria-selected="${idx === activeSceneIdx}" data-scene-idx="${idx}">
          ${s.number ? `<span class="scene-tab-num">${escapeHtml(s.number)}</span>` : ""}
          <span>
            ${s.title ? `<strong style="display:block;font-size:0.96rem">${escapeHtml(s.title)}</strong>` : ""}
            ${s.location ? `<small style="opacity:0.78;font-size:0.8rem">${escapeHtml(s.location)}</small>` : ""}
          </span>
        </button>`
      )
      .join("");

    tabsEl.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => selectScene(Number(btn.dataset.sceneIdx)));
    });
    selectScene(activeSceneIdx);
  }

  function buildAudioEmbedHtml(rawUrl, title, compact) {
    const url = String(rawUrl || "").trim();
    if (!url) return "";

    // Spotify (track, album, playlist, episode, show)
    const spotifyMatch = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/i);
    if (spotifyMatch) {
      const kind = spotifyMatch[1].toLowerCase();
      const id = spotifyMatch[2];
      const height = compact
        ? (kind === "track" || kind === "episode" ? 80 : 152)
        : (kind === "track" || kind === "episode" ? 152 : 352);
      return `
        <div class="audio-embed audio-embed--spotify${compact ? " audio-embed--compact" : ""}">
          <iframe src="https://open.spotify.com/embed/${kind}/${id}?utm_source=generator" width="100%" height="${height}" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="${escapeHtml(title || "Spotify")}"></iframe>
        </div>`;
    }

    // YouTube playlist or video
    const ytListMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    const ytId = extractYouTubeId(url);
    if (ytListMatch && !ytId) {
      return `
        <div class="audio-embed audio-embed--youtube${compact ? " audio-embed--compact" : ""}">
          <iframe src="https://www.youtube.com/embed/videoseries?list=${escapeHtml(ytListMatch[1])}" title="${escapeHtml(title || "YouTube")}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>`;
    }
    if (ytId) {
      return `
        <div class="audio-embed audio-embed--youtube${compact ? " audio-embed--compact" : ""}">
          <iframe src="https://www.youtube.com/embed/${escapeHtml(ytId)}?rel=0" title="${escapeHtml(title || "YouTube")}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>`;
    }

    // Direct audio file (.mp3, .ogg, .wav, .m4a)
    if (/\.(mp3|ogg|wav|m4a|aac)(\?.*)?$/i.test(url)) {
      const safeSrc = normalizeAssetPath(url, "");
      return `
        <div class="audio-embed audio-embed--native${compact ? " audio-embed--compact" : ""}">
          <audio controls preload="metadata" src="${escapeHtml(safeSrc)}"></audio>
        </div>`;
    }

    return "";
  }

  function renderSingleRepSection(s, idx) {
    const ui = dict().ui;
    const isCream = idx % 2 === 1;
    const paragraphsHtml = (s.paragraphs || [])
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    const quoteHtml = s.quote
      ? `<blockquote class="quote-box">
          <p>${escapeHtml(s.quote)}</p>
          ${s.quoteCite ? `<cite>${escapeHtml(s.quoteCite)}</cite>` : ""}
        </blockquote>`
      : "";
    const links = [];
    if (s.spotifyUrl) {
      links.push(`
        <a href="${escapeHtml(s.spotifyUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--media btn--spotify">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.58 14.42a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.58-1.05 8.5-.6 11.66 1.34a.75.75 0 0 1 .25 1.03zm1.22-2.72a.94.94 0 0 1-1.29.31c-3.23-1.99-8.15-2.56-11.97-1.4a.94.94 0 0 1-.55-1.8c4.37-1.33 9.79-.68 13.5 1.6a.94.94 0 0 1 .31 1.29zm.11-2.84c-3.87-2.3-10.26-2.51-13.96-1.39a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.31-1.04 15.76 1.6a1.12 1.12 0 0 1-1.15 1.94z"/></svg>
          <span>${escapeHtml(ui.listenSpotify || "Escoltar a Spotify")}</span>
        </a>`);
    }
    if (s.youtubeUrl) {
      links.push(`
        <a href="${escapeHtml(s.youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--media btn--youtube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          <span>${escapeHtml(ui.listenYouTube || "Escoltar a YouTube")}</span>
        </a>`);
    }
    const buttonsHtml = links.length ? `<div class="media-link-buttons">${links.join("")}</div>` : "";
    const audioHtml = buildAudioEmbedHtml(s.audioUrl, s.title);

    if (s.image) {
      return `
        <section class="feature-band${isCream ? " feature-band--cream" : ""}" id="${escapeHtml(s.id)}">
          <div class="feature reverse">
            <div class="image">
              <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">
            </div>
            <div class="text">
              ${s.eyebrow ? `<span class="eyebrow">${escapeHtml(s.eyebrow)}</span>` : ""}
              <h2>${escapeHtml(s.title)}</h2>
              <div class="separator left"></div>
              ${paragraphsHtml}
              ${quoteHtml}
              ${buttonsHtml}
              ${audioHtml}
            </div>
          </div>
        </section>`;
    }
    return `
      <section class="section${isCream ? " section--cream" : ""}" id="${escapeHtml(s.id)}">
        <div class="container">
          <div style="max-width:860px">
            ${s.eyebrow ? `<span class="eyebrow">${escapeHtml(s.eyebrow)}</span>` : ""}
            <h2 class="section-title">${escapeHtml(s.title)}</h2>
            <div class="separator left"></div>
            <div class="article-body">${paragraphsHtml}</div>
            ${quoteHtml}
            ${buttonsHtml}
            ${audioHtml}
          </div>
        </div>
      </section>`;
  }

  function renderRepresentacioSections() {
    const topHost = document.getElementById("representacio-seccions-top");
    if (!topHost) return;
    const sections = getLocalizedRepSections();
    topHost.innerHTML = sections.map((s, i) => renderSingleRepSection(s, i)).join("");
    const escenesEl = document.getElementById("escenes");
    if (escenesEl) {
      escenesEl.classList.toggle("section--cream", sections.length % 2 === 1);
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: NOTÍCIES (noticies.html)
     ------------------------------------------------------------------------ */
  function normalizeSearchText(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function initNoticiesPage(openDeepLink) {
    const featuredHost = document.getElementById("news-featured");
    const searchInput = document.getElementById("news-search");
    const gridHost = document.getElementById("news-grid");
    const countHost = document.getElementById("news-count");
    const paginationHost = document.getElementById("news-pagination");

    const ui = dict().ui;
    const newsList = getLocalizedNews();
    let query = searchInput ? searchInput.value : "";
    let pageNum = 1;

    const lead = newsList[0];
    if (featuredHost && lead) {
      featuredHost.innerHTML = `
        <article class="featured-news">
          <div class="featured-news-media">
            <img src="${escapeHtml(lead.image)}" alt="${escapeHtml(lead.title)}">
          </div>
          <div class="featured-news-body">
            <div class="card-meta">
              <span class="badge badge--primary">${escapeHtml(ui.latestBadge)}</span>
              <span>${escapeHtml(lead.date)}</span>
            </div>
            <h2>${escapeHtml(lead.title)}</h2>
            <p style="color:var(--text-muted);margin-bottom:22px">${escapeHtml(lead.excerpt)}</p>
            <div>
              <button type="button" class="btn" data-open-news="${escapeHtml(lead.id)}">${escapeHtml(ui.readFullArticle)}</button>
            </div>
          </div>
        </article>
      `;
      featuredHost.querySelector("[data-open-news]").addEventListener("click", () => openNewsArticle(lead.id));
    }

    function renderPagination(totalItems) {
      if (!paginationHost) return;
      const totalPages = Math.ceil(totalItems / NEWS_PER_PAGE);
      if (totalPages <= 1) {
        paginationHost.innerHTML = "";
        return;
      }
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      paginationHost.innerHTML = `
        <button type="button" class="page-btn" data-page="${pageNum - 1}" ${pageNum <= 1 ? "disabled" : ""}>${escapeHtml(ui.prevPage || "← Anterior")}</button>
        ${pages
          .map(
            (p) =>
              `<button type="button" class="page-btn ${p === pageNum ? "active" : ""}" data-page="${p}" ${p === pageNum ? 'aria-current="page"' : ""}>${p}</button>`
          )
          .join("")}
        <button type="button" class="page-btn" data-page="${pageNum + 1}" ${pageNum >= totalPages ? "disabled" : ""}>${escapeHtml(ui.nextPage || "Següent →")}</button>
      `;
      paginationHost.querySelectorAll("[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = Number(btn.dataset.page);
          if (target < 1 || target > totalPages || target === pageNum) return;
          pageNum = target;
          renderGrid();
          const listTop = document.getElementById("llistat");
          if (listTop) listTop.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    function renderGrid() {
      const terms = normalizeSearchText(query).trim().split(/\s+/).filter(Boolean);
      const filtered = newsList.filter((n) => {
        if (!terms.length) return true;
        const haystack = normalizeSearchText(
          [
            n.title,
            n.excerpt,
            n.date,
            n.isoDate,
            n.category,
            n.source,
            ...(Array.isArray(n.tags) ? n.tags : []),
            ...(Array.isArray(n.body) ? n.body : [])
          ].join(" ")
        );
        return terms.every((term) => haystack.includes(term));
      });

      const totalPages = Math.max(1, Math.ceil(filtered.length / NEWS_PER_PAGE));
      if (pageNum > totalPages) pageNum = totalPages;

      countHost.textContent = ui.newsCount(filtered.length, newsList.length);

      if (!filtered.length) {
        gridHost.innerHTML = `
          <div class="empty-state" style="grid-column:1 / -1">
            <p style="margin-bottom:12px">${escapeHtml(ui.noNewsFound)}</p>
            <button type="button" class="btn btn--outline btn--sm" id="reset-news">${escapeHtml(ui.showAll)}</button>
          </div>`;
        if (paginationHost) paginationHost.innerHTML = "";
        document.getElementById("reset-news").addEventListener("click", () => {
          query = "";
          pageNum = 1;
          if (searchInput) searchInput.value = "";
          renderGrid();
        });
        return;
      }

      const startIdx = (pageNum - 1) * NEWS_PER_PAGE;
      const pageItems = filtered.slice(startIdx, startIdx + NEWS_PER_PAGE);

      gridHost.innerHTML = pageItems
        .map(
          (n) => `
          <article class="card">
            <div class="card-media">
              <img src="${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}" loading="lazy">
            </div>
            <div class="card-body">
              <div class="card-meta"><span>${escapeHtml(n.date)}</span></div>
              <h3 class="card-title">${escapeHtml(n.title)}</h3>
              <p class="card-excerpt">${escapeHtml(n.excerpt)}</p>
              <div class="card-footer">
                <button type="button" class="card-action-btn" data-open-news="${escapeHtml(n.id)}">${escapeHtml(ui.readArticle)}</button>
              </div>
            </div>
          </article>`
        )
        .join("");

      gridHost.querySelectorAll("[data-open-news]").forEach((btn) => {
        btn.addEventListener("click", () => openNewsArticle(btn.dataset.openNews));
      });

      renderPagination(filtered.length);
    }

    if (searchInput) {
      searchInput.oninput = (e) => {
        query = e.target.value;
        pageNum = 1;
        renderGrid();
      };
    }

    renderGrid();

    if (openDeepLink) {
      const deepId = getQueryParam("id");
      if (deepId) openNewsArticle(deepId);
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: L'ENTITAT (entitat.html) — Junta Directiva i Convocatòries
     ------------------------------------------------------------------------ */
  function renderMeetingCard(m, showAgenda) {
    const ui = dict().ui;
    const isUpcoming = m.status === "proxima";
    const statusBadge = isUpcoming
      ? `<span class="badge badge--upcoming">${escapeHtml(ui.meetingUpcoming)}</span>`
      : `<span class="badge badge--past">${escapeHtml(ui.meetingPast)}</span>`;

    return `
      <article class="meeting-card ${isUpcoming ? "" : "meeting-card--past"}">
        <div class="meeting-top">
          ${statusBadge}
          <span style="font-size:0.86rem;font-weight:600;color:var(--text-muted)">${escapeHtml(m.date)}</span>
        </div>
        <h3>${escapeHtml(m.title)}</h3>
        <p style="color:var(--text-muted);margin:0">${escapeHtml(m.summary)}</p>
        <div class="meeting-meta-grid">
          <div>
            <strong>${escapeHtml(ui.meetingDateLabel)}</strong>
            <span>${escapeHtml(m.date)}${m.time ? " · " + escapeHtml(m.time) : ""}</span>
          </div>
          <div>
            <strong>${escapeHtml(ui.meetingPlaceLabel)}</strong>
            <span>${escapeHtml(m.location)}</span>
          </div>
          <div>
            <strong>${escapeHtml(ui.meetingAudienceLabel)}</strong>
            <span>${escapeHtml(m.audience)}</span>
          </div>
        </div>
        ${
          showAgenda && Array.isArray(m.agenda) && m.agenda.length
            ? `<div class="meeting-agenda">
                <h4>${escapeHtml(ui.meetingAgendaLabel)}</h4>
                <ul>
                  ${m.agenda.map((pt) => `<li>${escapeHtml(pt)}</li>`).join("")}
                </ul>
              </div>`
            : `<div style="margin-top:12px"><a href="entitat.html#convocatories" class="link-arrow">${escapeHtml(ui.viewAgenda)}</a></div>`
        }
      </article>
    `;
  }

  function initEntitatPage() {
    const boardHost = document.getElementById("board-grid");
    if (boardHost) {
      boardHost.innerHTML = getLocalizedBoard()
        .map(
          (m) => `
          <article class="info-card">
            <span class="board-role">${escapeHtml(m.role)}</span>
            <h3>${escapeHtml(m.name)}</h3>
            <p>${escapeHtml(m.area)}</p>
          </article>`
        )
        .join("");
    }

    const meetingsHost = document.getElementById("meetings-list");
    if (meetingsHost) {
      const meetings = getLocalizedMeetings();
      if (!meetings.length) {
        meetingsHost.innerHTML = `<div class="empty-state"><p>${escapeHtml(dict().ui.noMeetings)}</p></div>`;
      } else {
        meetingsHost.innerHTML = meetings.map((m) => renderMeetingCard(m, true)).join("");
      }
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: GALERIA (galeria.html)
     ------------------------------------------------------------------------ */
  function initGaleriaPage() {
    const pillsHost = document.getElementById("gallery-albums");
    const yearSelect = document.getElementById("gallery-year");
    const gridHost = document.getElementById("gallery-grid");
    const countHost = document.getElementById("gallery-count");

    const ui = dict().ui;
    const photos = getLocalizedGallery();
    const allLabel = ui.allCategory;
    const allYearsLabel = ui.allYears || "Tots els anys";
    const albums = [allLabel, ...Array.from(new Set(photos.map((g) => (g.album || "").trim()).filter(Boolean)))];
    const years = Array.from(new Set(photos.map((g) => String(g.year || "").trim()).filter(Boolean))).sort((a, b) =>
      b.localeCompare(a, undefined, { numeric: true })
    );

    let activeAlbum = allLabel;
    let activeYear = "";

    const requestedAlbum = getQueryParam("album");
    if (requestedAlbum) {
      const targetNorm = normalizeSearchText(requestedAlbum).trim();
      const exactMatch = albums.find((a) => normalizeSearchText(a).trim() === targetNorm);
      const partialMatch =
        exactMatch ||
        albums.find((a) => {
          if (a === allLabel) return false;
          const aNorm = normalizeSearchText(a).trim();
          return aNorm.includes(targetNorm) || targetNorm.includes(aNorm);
        });
      if (partialMatch) activeAlbum = partialMatch;
    }

    const requestedYear = getQueryParam("any") || getQueryParam("year");
    if (requestedYear && years.includes(String(requestedYear).trim())) {
      activeYear = String(requestedYear).trim();
    }

    function renderYearSelect() {
      if (!yearSelect) return;
      yearSelect.innerHTML = [
        `<option value="">${escapeHtml(allYearsLabel)}</option>`,
        ...years.map((y) => `<option value="${escapeHtml(y)}"${y === activeYear ? " selected" : ""}>${escapeHtml(y)}</option>`)
      ].join("");
      yearSelect.value = activeYear;
      yearSelect.classList.toggle("active", Boolean(activeYear));
      yearSelect.onchange = () => {
        activeYear = yearSelect.value;
        yearSelect.classList.toggle("active", Boolean(activeYear));
        renderGrid();
      };
    }

    function renderPills() {
      pillsHost.innerHTML = albums
        .map(
          (a) =>
            `<button type="button" class="pill-btn ${a === activeAlbum ? "active" : ""}" data-album="${escapeHtml(a)}">${escapeHtml(a)}</button>`
        )
        .join("");
      pillsHost.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeAlbum = btn.dataset.album;
          renderPills();
          renderGrid();
        });
      });
    }

    function renderGrid() {
      const filtered = photos.filter((g) => {
        const albumMatch = activeAlbum === allLabel || (g.album || "").trim() === activeAlbum;
        const yearMatch = !activeYear || String(g.year || "").trim() === activeYear;
        return albumMatch && yearMatch;
      });
      countHost.textContent = ui.galleryCount(filtered.length);

      if (!filtered.length) {
        gridHost.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1">
            <p>${escapeHtml(ui.noPhotosFound || "No s'han trobat fotografies amb els filtres actuals.")}</p>
            <button type="button" class="btn btn--outline btn--sm" id="gallery-reset-filters" style="margin-top:12px">${escapeHtml(ui.showAll || "Mostrar totes")}</button>
          </div>`;
        const resetBtn = document.getElementById("gallery-reset-filters");
        if (resetBtn) {
          resetBtn.addEventListener("click", () => {
            activeAlbum = allLabel;
            activeYear = "";
            renderPills();
            renderYearSelect();
            renderGrid();
          });
        }
        return;
      }

      gridHost.innerHTML = filtered
        .map((g, idx) => {
          const hasMeta = Boolean(g.album || g.year);
          const hasInfo = Boolean(hasMeta || g.title || g.caption);
          const altText = g.title || g.album || "El Davallament de Felanitx";
          return `
          <button type="button" class="gallery-card" data-photo-idx="${idx}">
            <div class="gallery-thumb">
              <img src="${escapeHtml(g.src)}" alt="${escapeHtml(altText)}" loading="lazy">
              <span class="gallery-zoom-pill">${escapeHtml(ui.zoomPill)}</span>
            </div>
            ${
              hasInfo
                ? `<div class="gallery-info">
                    ${
                      hasMeta
                        ? `<div class="card-meta">
                            ${g.album ? `<span class="badge badge--sand">${escapeHtml(g.album)}</span>` : ""}
                            ${g.year ? `<span>${escapeHtml(g.year)}</span>` : ""}
                          </div>`
                        : ""
                    }
                    ${g.title ? `<h3>${escapeHtml(g.title)}</h3>` : ""}
                    ${g.caption ? `<p>${escapeHtml(g.caption)}</p>` : ""}
                  </div>`
                : ""
            }
          </button>`;
        })
        .join("");

      gridHost.querySelectorAll("[data-photo-idx]").forEach((btn) => {
        btn.addEventListener("click", () => openLightbox(filtered, Number(btn.dataset.photoIdx)));
      });
    }

    renderPills();
    renderYearSelect();
    renderGrid();

    const videosHost = document.getElementById("gallery-videos");
    if (videosHost) {
      const videos = getLocalizedVideos();
      videosHost.classList.toggle("video-grid--single", videos.length === 1);
      if (!videos.length) {
        videosHost.innerHTML = `<div class="empty-state"><p>${escapeHtml(ui.noVideos || "Properament publicarem nous vídeos.")}</p></div>`;
      } else {
        videosHost.innerHTML = videos
          .map((v) => {
            const ytId = extractYouTubeId(v.youtubeId || v.youtubeUrl);
            const watchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : (v.youtubeUrl || "#");
            const embedHtml = ytId
              ? `<iframe src="https://www.youtube.com/embed/${escapeHtml(ytId)}?rel=0" title="${escapeHtml(v.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`
              : `<div class="video-placeholder"><p>${escapeHtml(ui.videoUnavailable || "Vídeo pendent d'enllaçar.")}</p></div>`;
            return `
              <article class="video-card">
                <div class="video-frame">
                  ${embedHtml}
                </div>
                <div class="video-info">
                  <div class="card-meta">
                    ${v.year ? `<span class="badge badge--sand">${escapeHtml(v.year)}</span>` : ""}
                    ${v.source ? `<span>${escapeHtml(v.source)}</span>` : ""}
                  </div>
                  <h3>${escapeHtml(v.title)}</h3>
                  ${v.description ? `<p>${escapeHtml(v.description)}</p>` : ""}
                  ${
                    ytId
                      ? `<div class="video-footer">
                          <a href="${escapeHtml(watchUrl)}" target="_blank" rel="noopener noreferrer" class="link-arrow">${escapeHtml(ui.watchOnYouTube || "Veure a YouTube ↗")}</a>
                        </div>`
                      : ""
                  }
                </div>
              </article>`;
          })
          .join("");
      }
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: CONTACTE (contacte.html) — Enviament natiu via FormSubmit a davallamentfelanitx@gmail.com
     ------------------------------------------------------------------------ */
  function initContactePage() {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("contact-submit-btn");
    const statusBox = document.getElementById("contact-status");
    const nextInput = document.getElementById("contact-next-url");
    if (!form) return;

    // Actualitza _next dinàmicament a la URL actual (GitHub Pages o domini propi)
    if (nextInput && window.location.protocol.startsWith("http")) {
      const cleanUrl = `${window.location.origin}${window.location.pathname}?enviat=1`;
      nextInput.value = cleanUrl;
    }

    // Mostra confirmació quan FormSubmit redirigeix de tornada amb ?enviat=1
    if (getQueryParam("enviat") === "1" && statusBox) {
      const ui = dict().ui;
      statusBox.style.display = "block";
      statusBox.style.background = "#edf7ed";
      statusBox.style.border = "1px solid #b7dfb9";
      statusBox.style.color = "#1e4620";
      statusBox.textContent = ui.contactToast("");
    }

    form.onsubmit = () => {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = dict().ui.contactSending;
      }
      // Deixam que el navegador faci l'enviament POST natiu a FormSubmit (garanteix activació i lliurament)
    };
  }

  /* ------------------------------------------------------------------------
     YAML Data Loader
     ------------------------------------------------------------------------ */
  function normalizeAssetPath(p, fallback) {
    const raw = String(p || "").trim();
    if (!raw) return fallback || "";
    if (/^https?:\/\//i.test(raw)) return raw;
    return raw.replace(/^\/+/, "");
  }

  function normalizeNewsItem(raw, idx) {
    let body = [];
    if (Array.isArray(raw.cos)) body = raw.cos.map(String);
    else if (typeof raw.cos === "string" && raw.cos.trim()) body = raw.cos.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    else if (Array.isArray(raw.body)) body = raw.body.map(String);
    else if (raw.resum) body = [String(raw.resum)];

    const tags = Array.isArray(raw.etiquetes)
      ? raw.etiquetes
      : Array.isArray(raw.tags)
      ? raw.tags
      : [];

    return {
      id: raw.id || "noticia-" + (idx + 1),
      category: raw.categoria || raw.category || "Actualitat",
      date: raw.data || raw.date || "",
      isoDate: raw.dataIso || raw.isoDate || "",
      readTime: raw.lectura || raw.readTime || "3 min",
      featured: Boolean(raw.destacada !== undefined ? raw.destacada : raw.featured),
      image: normalizeAssetPath(raw.imatge || raw.image, "img/hero/hero1.jpg"),
      poster: normalizeAssetPath(raw.cartell || raw.imatge2 || raw.poster, ""),
      extraImage: normalizeAssetPath(raw.imatge3 || raw.extraImage, ""),
      source: raw.font || raw.source || "",
      sourceUrl: raw.fontUrl || raw.sourceUrl || "",
      title: raw.titol || raw.title || "Sense títol",
      excerpt: raw.resum || raw.excerpt || "",
      tags,
      body
    };
  }

  function normalizeBoardItem(raw, idx) {
    return {
      id: raw.id || "membre-" + (idx + 1),
      role: raw.carrec || raw.role || "",
      name: raw.nom || raw.name || "",
      area: raw.area || raw.tasca || ""
    };
  }

  function normalizeMeetingItem(raw, idx) {
    let agenda = [];
    if (Array.isArray(raw.ordreDelDia)) agenda = raw.ordreDelDia.map(String);
    else if (Array.isArray(raw.agenda)) agenda = raw.agenda.map(String);
    return {
      id: raw.id || "reunio-" + (idx + 1),
      title: raw.titol || raw.title || "",
      status: String(raw.estat || raw.status || "proxima").toLowerCase(),
      date: raw.data || raw.date || "",
      isoDate: raw.dataIso || raw.isoDate || "",
      time: raw.hora || raw.time || "",
      location: raw.lloc || raw.location || "",
      audience: raw.adrecatA || raw.audience || "",
      summary: raw.resum || raw.summary || "",
      agenda
    };
  }

  function normalizeGalleryItem(raw, idx) {
    return {
      id: raw.id || "foto-" + (idx + 1),
      title: raw.titol || raw.title || "",
      album: raw.album || "",
      year: String(raw.any !== undefined ? raw.any : raw.year || "").trim(),
      location: raw.lloc || raw.location || "",
      credit: raw.credit || "",
      src: normalizeAssetPath(raw.imatge || raw.src, "img/hero/hero1.jpg"),
      caption: raw.descripcio || raw.caption || "",
      _fromYaml: true
    };
  }

  function normalizeTimelineItem(raw) {
    return {
      year: String(raw.any !== undefined ? raw.any : raw.year || ""),
      title: raw.titol || raw.title || "",
      text: raw.text || raw.descripcio || ""
    };
  }

  function normalizeVideoItem(raw, idx) {
    return {
      id: raw.id || "video-" + (idx + 1),
      title: raw.titol || raw.title || "",
      year: String(raw.any !== undefined ? raw.any : raw.year || ""),
      source: raw.font || raw.source || "",
      youtubeUrl: raw.youtubeUrl || raw.url || "",
      youtubeId: raw.youtubeId || "",
      description: raw.descripcio || raw.description || ""
    };
  }

  function normalizeSceneItem(raw, idx) {
    const chars = Array.isArray(raw.personatges)
      ? raw.personatges.map(String).filter(Boolean)
      : Array.isArray(raw.characters)
      ? raw.characters.map(String).filter(Boolean)
      : [];
    return {
      id: raw.id || "escena-" + (idx + 1),
      number: String(raw.numero !== undefined ? raw.numero : raw.number || ""),
      title: raw.titol || raw.title || "",
      location: raw.lloc || raw.location || "",
      image: normalizeAssetPath(raw.imatge || raw.image, ""),
      image2: normalizeAssetPath(raw.imatge2 || raw.image2, ""),
      image3: normalizeAssetPath(raw.imatge3 || raw.image3, ""),
      characters: chars,
      atmosphere: raw.atmosfera || raw.atmosphere || "",
      fullDesc: raw.descripcio || raw.fullDesc || raw.shortDesc || "",
      audioUrl: raw.audioUrl || "",
      galleryAlbum: raw.albumGaleria || raw.galleryAlbum || ""
    };
  }

  function normalizeRepSectionItem(raw, idx) {
    let paragraphs = [];
    if (Array.isArray(raw.paragrefs)) paragraphs = raw.paragrefs.map(String);
    else if (Array.isArray(raw.paragraphs)) paragraphs = raw.paragraphs.map(String);
    else if (typeof raw.paragrefs === "string" && raw.paragrefs.trim()) {
      paragraphs = raw.paragrefs.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    }
    return {
      id: raw.id || "seccio-" + (idx + 1),
      eyebrow: raw.etiqueta || raw.eyebrow || "",
      title: raw.titol || raw.title || "",
      image: normalizeAssetPath(raw.imatge || raw.image, ""),
      paragraphs,
      quote: raw.cita || raw.quote || "",
      quoteCite: raw.autorCita || raw.quoteCite || "",
      spotifyUrl: raw.spotifyUrl || "",
      youtubeUrl: raw.youtubeUrl || "",
      audioUrl: raw.audioUrl || ""
    };
  }

  function normalizeHeroSlideItem(raw) {
    return {
      src: normalizeAssetPath(raw.imatge || raw.src, "img/hero/hero1.jpg"),
      kicker: raw.etiqueta || raw.kicker || "",
      title: raw.titol || raw.title || "",
      subtitle: raw.subtitol || raw.subtitle || "",
      _fromYaml: true
    };
  }

  async function loadExternalYaml(page) {
    if (!window.SimpleYAML || window.location.protocol === "file:") return;
    const tasks = [];

    if (page === "inici") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/hero.yaml")
          .then((items) => {
            if (items && items.length) DATA.heroSlides = items.map(normalizeHeroSlideItem);
          })
          .catch(() => {})
      );
    }

    if (page === "representacio") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/representacio.yaml")
          .then((items) => {
            if (items && items.length) DATA.repSections = items.map(normalizeRepSectionItem);
          })
          .catch(() => {})
      );
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/escenes.yaml")
          .then((items) => {
            if (items && items.length) DATA.scenes = items.map(normalizeSceneItem);
          })
          .catch(() => {})
      );
    }

    if (page === "historia") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/cronologia.yaml")
          .then((items) => {
            if (items && items.length) DATA.timeline = items.map(normalizeTimelineItem);
          })
          .catch(() => {})
      );
    }

    if (page === "inici" || page === "noticies") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/noticies.yaml")
          .then((items) => {
            if (items && items.length) DATA.news = items.map(normalizeNewsItem);
          })
          .catch(() => {})
      );
    }

    if (page === "entitat") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/junta.yaml")
          .then((items) => {
            if (items && items.length) DATA.board = items.map(normalizeBoardItem);
          })
          .catch(() => {})
      );
    }

    if (page === "inici" || page === "entitat") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/convocatories.yaml")
          .then((items) => {
            if (items && items.length) DATA.meetings = items.map(normalizeMeetingItem);
          })
          .catch(() => {})
      );
    }

    if (page === "galeria") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/galeria.yaml")
          .then((items) => {
            if (items && items.length) DATA.gallery = items.map(normalizeGalleryItem);
          })
          .catch(() => {})
      );
    }

    if (page === "galeria") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/multimedia.yaml")
          .then((items) => {
            if (items && items.length) DATA.videos = items.map(normalizeVideoItem);
          })
          .catch(() => {})
      );
    }

    if (tasks.length) await Promise.all(tasks);
  }

  function renderCurrentPage(isInitial) {
    if (currentPage === "inici") initHomePage();
    else if (currentPage === "historia") initHistoriaPage();
    else if (currentPage === "representacio") initRepresentacioPage();
    else if (currentPage === "noticies") initNoticiesPage(Boolean(isInitial));
    else if (currentPage === "entitat") initEntitatPage();
    else if (currentPage === "galeria") initGaleriaPage();
    else if (currentPage === "contacte") initContactePage();
  }

  /* ------------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", async () => {
    currentPage = document.body.dataset.page || "inici";
    currentLang = getStoredLang();

    cleanCurrentAddressBar();
    renderLayout();
    applyStaticTranslations();
    rewriteStaticLinks();
    await loadExternalYaml(currentPage);
    renderCurrentPage(true);
    rewriteStaticLinks();
    ensureAutoTranslatedHero(currentLang);
    ensureAutoTranslatedNews(currentLang);
    ensureAutoTranslatedRepSections(currentLang);
  });
})();
