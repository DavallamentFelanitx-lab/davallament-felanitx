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

  const NAV_LINKS = [
    { href: "index.html", key: "inici" },
    {
      href: "historia.html",
      key: "historia",
      children: [
        { href: "historia.html#memoria", key: "historiaMemoria" },
        { href: "historia.html#cronologia", key: "historiaCronologia" },
        { href: "historia.html#protagonistes", key: "historiaProtagonistes" }
      ]
    },
    {
      href: "representacio.html",
      key: "representacio",
      children: [
        { href: "representacio.html#escenes", key: "repEscenes" },
        { href: "representacio.html#elements", key: "repElements" }
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
      href: "entitat.html",
      key: "entitat",
      children: [
        { href: "entitat.html#qui-som", key: "entQuiSom" },
        { href: "entitat.html#junta", key: "entJunta" },
        { href: "entitat.html#convocatories", key: "entConvocatories" }
      ]
    },
    { href: "galeria.html", key: "galeria" },
    {
      href: "contacte.html",
      key: "contacte",
      children: [
        { href: "contacte.html#informacio", key: "conInfo" },
        { href: "contacte.html#formulari", key: "conFormulari" }
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

  function getStoredLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved && I18N && I18N[saved]) return saved;
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
  function getLocalizedHeroSlides() {
    const d = dict().data && dict().data.heroSlides;
    return DATA.heroSlides.map((slide, i) => (d && d[i] ? { ...slide, ...d[i] } : slide));
  }

  function getLocalizedScenes() {
    const map = dict().data && dict().data.scenes;
    return DATA.scenes.map((s) => (map && map[s.id] ? { ...s, ...map[s.id] } : s));
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
    return DATA.news
      .map((n) => {
        const baseTs = getNewsTimestamp(n);
        const merged = map && map[n.id] ? { ...n, ...map[n.id] } : { ...n };
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
    return DATA.gallery.map((g) => (map && map[g.id] ? { ...g, ...map[g.id] } : g));
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
      const val = tKey(el.dataset.i18n);
      if (typeof val === "string") el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const val = tKey(el.dataset.i18nHtml);
      if (typeof val === "string") el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
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
              ${["ca", "es", "en", "de"]
                .map(
                  (code) =>
                    `<button type="button" data-lang="${code}" class="${code === currentLang ? "active" : ""}" aria-pressed="${code === currentLang}">${code.toUpperCase()}</button>`
                )
                .join("")}
            </div>
          </div>

          <div class="main-header">
            <a href="index.html" class="brand" aria-label="El Davallament de Felanitx">
              <img src="img/logo/logo.png" alt="Logo El Davallament de Felanitx">
            </a>

            <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav class="main-nav" id="main-nav" aria-label="Main navigation">
              ${NAV_LINKS.map((item) => {
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
                              `<a href="${sub.href}" role="menuitem">${escapeHtml((d.subnav && d.subnav[sub.key]) || sub.key)}</a>`
                          )
                          .join("")}
                      </div>
                    </div>`
                  : "";
                return `
                  <div class="nav-item${hasChildren ? " nav-item--has-sub" : ""}">
                    <a href="${item.href}" data-nav-key="${item.key}" class="${isActive ? "active" : ""}" ${isActive ? 'aria-current="page"' : ""}>
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

      if (window.scrollY > 60 && header) header.classList.add("scrolled");

      if (!scrollListenerBound) {
        scrollListenerBound = true;
        let isScrolled = window.scrollY > 60;
        window.addEventListener(
          "scroll",
          () => {
            const hdr = document.getElementById("site-header");
            if (!hdr) return;
            const y = window.scrollY;
            if (!isScrolled && y > 60) {
              isScrolled = true;
              hdr.classList.add("scrolled");
            } else if (isScrolled && y < 20) {
              isScrolled = false;
              hdr.classList.remove("scrolled");
            }
          },
          { passive: true }
        );
      }

      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          const open = nav.classList.toggle("open");
          toggle.setAttribute("aria-expanded", String(open));
        });
        nav.querySelectorAll("a").forEach((a) => {
          a.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
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
              <a href="index.html" class="footer-brand-name">${escapeHtml(d.footer.title)}</a>
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
            </div>

            <nav class="footer-sitemap" aria-label="Mapa del web">
              ${footerCols
                .map((col) => {
                  const extraLink =
                    col.key === "contacte"
                      ? `<li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>`
                      : "";
                  const children = Array.isArray(col.children) ? col.children : [];
                  return `
                    <div class="footer-col">
                      <a href="${col.href}" class="footer-col-title">${escapeHtml(d.nav[col.key])}</a>
                      <ul class="footer-sublinks">
                        ${children
                          .map(
                            (sub) =>
                              `<li><a href="${sub.href}">${escapeHtml((d.subnav && d.subnav[sub.key]) || sub.key)}</a></li>`
                          )
                          .join("")}
                        ${extraLink}
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
  }

  function openNewsArticle(articleId) {
    const item = getLocalizedNews().find((n) => n.id === articleId);
    if (!item) return;
    const ui = dict().ui;

    const html = `
      <img class="modal-hero-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
      <div class="modal-content">
        <div class="card-meta">
          <span class="badge badge--primary">${escapeHtml(item.category)}</span>
          <span>${escapeHtml(item.date)}</span>
          <span>·</span>
          <span>${escapeHtml(item.readTime)}${escapeHtml(ui.readTimeSuffix)}</span>
        </div>
        <h2>${escapeHtml(item.title)}</h2>
        <div class="article-body">
          ${item.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
        </div>
        ${
          item.poster
            ? `<figure style="margin:22px 0;text-align:center">
                <img src="${escapeHtml(item.poster)}" alt="${escapeHtml(item.title)}" style="max-height:520px;margin:0 auto;border-radius:8px;box-shadow:var(--shadow-md)">
              </figure>`
            : ""
        }
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
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid var(--border)">
          <button type="button" class="btn btn--outline btn--sm" id="copy-news-link">${escapeHtml(ui.copyLink)}</button>
          <button type="button" class="btn btn--sm" id="close-news-btn">${escapeHtml(ui.closeReading)}</button>
        </div>
      </div>
    `;
    openModal(html, item.title);
    document.getElementById("close-news-btn").addEventListener("click", closeModal);
    document.getElementById("copy-news-link").addEventListener("click", () => {
      const shareUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, "")}noticies.html?id=${encodeURIComponent(item.id)}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => showToast(ui.linkCopied));
      } else {
        showToast("noticies.html?id=" + item.id);
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
      if (closeBtn) closeBtn.textContent = dict().ui.closeLightbox;
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
        <button type="button" class="btn btn--sand btn--sm" id="lb-close">${escapeHtml(dict().ui.closeLightbox)}</button>
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
    document.getElementById("lb-counter").textContent = `${lbIndex + 1} / ${lbItems.length} · ${item.album}`;
    const img = document.getElementById("lb-img");
    img.src = item.src;
    img.alt = item.title;
    document.getElementById("lb-title").textContent = item.title;
    document.getElementById("lb-caption").textContent = item.caption;
    document.getElementById("lb-meta").textContent = `${item.location} · ${item.credit}`;
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
      document.body.classList.remove("modal-open");
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
              <div class="card-meta"><span>${escapeHtml(n.date)}</span> · <span>${escapeHtml(n.readTime)}</span></div>
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

    const homeMeetings = document.getElementById("home-meetings-list");
    if (homeMeetings) {
      homeMeetings.innerHTML = getLocalizedMeetings()
        .slice(0, 2)
        .map((m) => renderMeetingCard(m, false))
        .join("");
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
    const tabsEl = document.getElementById("scene-tabs");
    const panelEl = document.getElementById("scene-panel");
    if (!tabsEl || !panelEl) return;

    const scenes = getLocalizedScenes();
    const ui = dict().ui;

    function selectScene(index) {
      activeSceneIdx = index;
      const s = scenes[index];
      tabsEl.querySelectorAll("button").forEach((b, i) => {
        b.classList.toggle("active", i === index);
        b.setAttribute("aria-selected", String(i === index));
      });
      panelEl.innerHTML = `
        <img class="scene-detail-img" src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}">
        <div class="scene-detail-body">
          <span class="eyebrow">${escapeHtml(ui.sceneEyebrow(s.number, s.location))}</span>
          <h3>${escapeHtml(s.title)}</h3>
          <p style="color:var(--text-muted);margin-bottom:14px">${escapeHtml(s.fullDesc)}</p>
          <p style="font-size:0.94rem;color:var(--primary)"><strong>${escapeHtml(ui.atmosphereLabel)}</strong> ${escapeHtml(s.atmosphere)}</p>
          <div class="tags-row">
            ${s.characters.map((c) => `<span class="badge badge--primary">${escapeHtml(c)}</span>`).join("")}
          </div>
        </div>
      `;
    }

    tabsEl.innerHTML = scenes
      .map(
        (s, idx) => `
        <button type="button" role="tab" class="scene-tab-btn ${idx === activeSceneIdx ? "active" : ""}" aria-selected="${idx === activeSceneIdx}" data-scene-idx="${idx}">
          <span class="scene-tab-num">${escapeHtml(s.number)}</span>
          <span>
            <strong style="display:block;font-size:0.96rem">${escapeHtml(s.title)}</strong>
            <small style="opacity:0.78;font-size:0.8rem">${escapeHtml(s.location)}</small>
          </span>
        </button>`
      )
      .join("");

    tabsEl.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => selectScene(Number(btn.dataset.sceneIdx)));
    });
    selectScene(activeSceneIdx);
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

    const ui = dict().ui;
    const newsList = getLocalizedNews();
    let query = searchInput ? searchInput.value : "";

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

      countHost.textContent = ui.newsCount(filtered.length, newsList.length);

      if (!filtered.length) {
        gridHost.innerHTML = `
          <div class="empty-state" style="grid-column:1 / -1">
            <p style="margin-bottom:12px">${escapeHtml(ui.noNewsFound)}</p>
            <button type="button" class="btn btn--outline btn--sm" id="reset-news">${escapeHtml(ui.showAll)}</button>
          </div>`;
        document.getElementById("reset-news").addEventListener("click", () => {
          query = "";
          if (searchInput) searchInput.value = "";
          renderGrid();
        });
        return;
      }

      gridHost.innerHTML = filtered
        .map(
          (n) => `
          <article class="card">
            <div class="card-media">
              <img src="${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}" loading="lazy">
            </div>
            <div class="card-body">
              <div class="card-meta"><span>${escapeHtml(n.date)}</span> · <span>${escapeHtml(n.readTime)}</span></div>
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
    }

    if (searchInput) {
      searchInput.oninput = (e) => {
        query = e.target.value;
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
    const gridHost = document.getElementById("gallery-grid");
    const countHost = document.getElementById("gallery-count");

    const ui = dict().ui;
    const photos = getLocalizedGallery();
    const allLabel = ui.allCategory;
    const albums = [allLabel, ...Array.from(new Set(photos.map((g) => g.album)))];
    let activeAlbum = allLabel;

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
      const filtered = photos.filter((g) => activeAlbum === allLabel || g.album === activeAlbum);
      countHost.textContent = ui.galleryCount(filtered.length);

      gridHost.innerHTML = filtered
        .map(
          (g, idx) => `
          <button type="button" class="gallery-card" data-photo-idx="${idx}">
            <div class="gallery-thumb">
              <img src="${escapeHtml(g.src)}" alt="${escapeHtml(g.title)}" loading="lazy">
              <span class="gallery-zoom-pill">${escapeHtml(ui.zoomPill)}</span>
            </div>
            <div class="gallery-info">
              <div class="card-meta">
                <span class="badge badge--sand">${escapeHtml(g.album)}</span>
                <span>${escapeHtml(g.location)}</span>
              </div>
              <h3>${escapeHtml(g.title)}</h3>
              <p>${escapeHtml(g.caption)}</p>
            </div>
          </button>`
        )
        .join("");

      gridHost.querySelectorAll("[data-photo-idx]").forEach((btn) => {
        btn.addEventListener("click", () => openLightbox(filtered, Number(btn.dataset.photoIdx)));
      });
    }

    renderPills();
    renderGrid();
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
      image: raw.imatge || raw.image || "img/hero/hero1.jpg",
      poster: raw.cartell || raw.poster || "",
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
      album: raw.album || "General",
      year: String(raw.any !== undefined ? raw.any : raw.year || ""),
      location: raw.lloc || raw.location || "Felanitx",
      credit: raw.credit || "Associació El Davallament de Felanitx",
      src: raw.imatge || raw.src || "img/hero/hero1.jpg",
      caption: raw.descripcio || raw.caption || ""
    };
  }

  async function loadExternalYaml(page) {
    if (!window.SimpleYAML || window.location.protocol === "file:") return;
    const tasks = [];

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

    renderLayout();
    applyStaticTranslations();
    await loadExternalYaml(currentPage);
    renderCurrentPage(true);
  });
})();
