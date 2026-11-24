/* ==========================================================================
   ASSOCIACIÓ EL DAVALLAMENT DE FELANITX — Controlador principal + i18n (CA/ES/EN/DE)
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.DAVALLAMENT_DATA;
  const I18N = window.I18N;
  const CONTACT_EMAIL = "davallamentfelanitx@gmail.com";
  const STORAGE_KEY_LANG = "davallament_felanitx_lang_v1";

  const NAV_LINKS = [
    { href: "index.html", key: "inici" },
    { href: "historia.html", key: "historia" },
    { href: "representacio.html", key: "representacio" },
    { href: "noticies.html", key: "noticies" },
    { href: "arxiu.html", key: "arxiu" },
    { href: "galeria.html", key: "galeria" },
    { href: "contacte.html", key: "contacte" }
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

  function getLocalizedNews() {
    const map = dict().data && dict().data.news;
    return DATA.news.map((n) => (map && map[n.id] ? { ...n, ...map[n.id] } : n));
  }

  function getAllPressItems() {
    const map = dict().data && dict().data.pressArchive;
    return DATA.pressArchive.map((p) => (map && map[p.id] ? { ...p, ...map[p.id] } : p));
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
              ${NAV_LINKS.map(
                (item) => `
                <a href="${item.href}" data-nav-key="${item.key}" class="${item.key === currentPage ? "active" : ""}" ${item.key === currentPage ? 'aria-current="page"' : ""}>
                  ${escapeHtml(d.nav[item.key])}
                </a>`
              ).join("")}
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
      footerHost.innerHTML = `
        <footer class="site-footer">
          <div class="container">
            <div class="footer-centered">
              <h3>${escapeHtml(d.footer.title)}</h3>
              <nav class="footer-nav" aria-label="Footer navigation">
                ${NAV_LINKS.map((item) => `<a href="${item.href}" data-nav-key="${item.key}">${escapeHtml(d.nav[item.key])}</a>`).join("")}
              </nav>
            </div>
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
        <div class="tags-row" style="margin-bottom:22px">
          ${item.tags.map((tag) => `<span class="badge badge--sand">#${escapeHtml(tag)}</span>`).join("")}
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

  function openPressClipping(itemId) {
    const item = getAllPressItems().find((p) => p.id === itemId);
    if (!item) return;
    const ui = dict().ui;

    const html = `
      <div class="modal-content">
        <div class="clipping-paper">
          <div class="clipping-masthead">
            <div class="outlet">${escapeHtml(item.outlet)}</div>
            <div class="submeta">
              <span>${escapeHtml(item.section || "Archive")}</span>
              <span>${escapeHtml(item.date)}</span>
              <span>Ref. ${escapeHtml(item.ref || "ARXIU")}</span>
            </div>
          </div>
          <h2 style="margin-top:0">${escapeHtml(item.headline)}</h2>
          <p style="color:var(--text-muted);margin-bottom:16px">${escapeHtml(item.summary)}</p>
          <blockquote class="clipping-quote">${escapeHtml(item.excerpt)}</blockquote>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-top:14px">
            <strong>${escapeHtml(ui.archiveNoteLabel)}</strong> ${escapeHtml(item.context || ui.archiveNoteDefault)}
          </p>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:20px">
          <button type="button" class="btn btn--sm" id="close-clipping-btn">${escapeHtml(ui.backToArchive)}</button>
        </div>
      </div>
    `;
    openModal(html, item.headline);
    document.getElementById("close-clipping-btn").addEventListener("click", closeModal);
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
              <span class="badge badge--overlay">${escapeHtml(n.category)}</span>
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

    const homePress = document.getElementById("home-press-list");
    if (homePress) {
      homePress.innerHTML = getAllPressItems()
        .slice(0, 3)
        .map(
          (p) => `
          <article class="press-row">
            <div class="press-outlet-col">
              <span class="press-outlet-name">${escapeHtml(p.outlet)}</span>
              <span class="press-date">${escapeHtml(p.date)}</span>
              <span class="press-ref">${escapeHtml(p.ref)}</span>
            </div>
            <div class="press-content-col">
              <h3>${escapeHtml(p.headline)}</h3>
              <p>${escapeHtml(p.summary)}</p>
            </div>
            <div>
              <button type="button" class="btn btn--outline btn--sm" data-open-press="${escapeHtml(p.id)}">${escapeHtml(ui.viewClipping)}</button>
            </div>
          </article>`
        )
        .join("");

      homePress.querySelectorAll("[data-open-press]").forEach((btn) => {
        btn.addEventListener("click", () => openPressClipping(btn.dataset.openPress));
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
  function initNoticiesPage(openDeepLink) {
    const featuredHost = document.getElementById("news-featured");
    const pillsHost = document.getElementById("news-categories");
    const searchInput = document.getElementById("news-search");
    const gridHost = document.getElementById("news-grid");
    const countHost = document.getElementById("news-count");

    const ui = dict().ui;
    const newsList = getLocalizedNews();
    const allLabel = ui.allCategory;
    const categories = [allLabel, ...Array.from(new Set(newsList.map((n) => n.category)))];
    let activeCategory = allLabel;
    let query = searchInput ? searchInput.value : "";

    const lead = newsList.find((n) => n.featured) || newsList[0];
    if (featuredHost && lead) {
      featuredHost.innerHTML = `
        <article class="featured-news">
          <div class="featured-news-media">
            <img src="${escapeHtml(lead.image)}" alt="${escapeHtml(lead.title)}">
          </div>
          <div class="featured-news-body">
            <div class="card-meta">
              <span class="badge badge--primary">${escapeHtml(ui.featuredPrefix + lead.category)}</span>
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

    function renderPills() {
      pillsHost.innerHTML = categories
        .map(
          (cat) =>
            `<button type="button" class="pill-btn ${cat === activeCategory ? "active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
        )
        .join("");
      pillsHost.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeCategory = btn.dataset.cat;
          renderPills();
          renderGrid();
        });
      });
    }

    function renderGrid() {
      const q = query.trim().toLowerCase();
      const filtered = newsList.filter((n) => {
        const matchCat = activeCategory === allLabel || n.category === activeCategory;
        const matchQ =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q));
        return matchCat && matchQ;
      });

      countHost.textContent = ui.newsCount(filtered.length, newsList.length);

      if (!filtered.length) {
        gridHost.innerHTML = `
          <div class="empty-state" style="grid-column:1 / -1">
            <p style="margin-bottom:12px">${escapeHtml(ui.noNewsFound)}</p>
            <button type="button" class="btn btn--outline btn--sm" id="reset-news">${escapeHtml(ui.showAll)}</button>
          </div>`;
        document.getElementById("reset-news").addEventListener("click", () => {
          activeCategory = allLabel;
          query = "";
          if (searchInput) searchInput.value = "";
          renderPills();
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
              <span class="badge badge--overlay">${escapeHtml(n.category)}</span>
            </div>
            <div class="card-body">
              <div class="card-meta"><span>${escapeHtml(n.date)}</span> · <span>${escapeHtml(n.readTime)}</span></div>
              <h3 class="card-title">${escapeHtml(n.title)}</h3>
              <p class="card-excerpt">${escapeHtml(n.excerpt)}</p>
              <div class="card-footer">
                <span style="font-size:0.8rem;color:var(--text-muted)">${escapeHtml(n.tags.slice(0, 2).join(" · "))}</span>
                <button type="button" class="card-action-btn" data-open-news="${escapeHtml(n.id)}">${escapeHtml(ui.readShort)}</button>
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

    renderPills();
    renderGrid();

    if (openDeepLink) {
      const deepId = getQueryParam("id");
      if (deepId) openNewsArticle(deepId);
    }
  }

  /* ------------------------------------------------------------------------
     PAGE: ARXIU DE PREMSA (arxiu.html)
     ------------------------------------------------------------------------ */
  let pressViewMode = "list";

  function initArxiuPage(openDeepLink) {
    const outletSelect = document.getElementById("press-outlet-filter");
    const decadeSelect = document.getElementById("press-decade-filter");
    const searchInput = document.getElementById("press-search");
    const listBtn = document.getElementById("view-list-btn");
    const gridBtn = document.getElementById("view-grid-btn");
    const resultsHost = document.getElementById("press-results");
    const countHost = document.getElementById("press-count");

    const ui = dict().ui;
    let selectedOutlet = "Tots";
    let selectedDecade = decadeSelect ? decadeSelect.value || "Totes" : "Totes";
    let query = searchInput ? searchInput.value : "";

    if (listBtn) listBtn.textContent = ui.listView;
    if (gridBtn) gridBtn.textContent = ui.gridView;

    function populateOutlets() {
      const items = getAllPressItems();
      const outlets = Array.from(new Set(items.map((p) => p.outlet))).sort();
      const current = outletSelect.value || "Tots";
      outletSelect.innerHTML =
        `<option value="Tots">${escapeHtml(ui.allOutlets)} (${outlets.length})</option>` +
        outlets.map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("");
      outletSelect.value = outlets.includes(current) ? current : "Tots";
      selectedOutlet = outletSelect.value;
    }

    function renderArchive() {
      const all = getAllPressItems();
      const q = query.trim().toLowerCase();
      const filtered = all.filter((p) => {
        const matchOutlet = selectedOutlet === "Tots" || p.outlet === selectedOutlet;
        const matchDecade = selectedDecade === "Totes" || p.decade === selectedDecade;
        const matchQ =
          !q ||
          p.headline.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.outlet.toLowerCase().includes(q) ||
          String(p.year).includes(q);
        return matchOutlet && matchDecade && matchQ;
      });

      countHost.textContent = ui.pressCount(filtered.length, all.length);

      if (!filtered.length) {
        resultsHost.className = "";
        resultsHost.innerHTML = `
          <div class="empty-state">
            <p style="margin-bottom:12px">${escapeHtml(ui.noPressFound)}</p>
            <button type="button" class="btn btn--outline btn--sm" id="reset-press">${escapeHtml(ui.showAllArchive)}</button>
          </div>`;
        document.getElementById("reset-press").addEventListener("click", () => {
          selectedOutlet = "Tots";
          selectedDecade = "Totes";
          query = "";
          outletSelect.value = "Tots";
          decadeSelect.value = "Totes";
          searchInput.value = "";
          renderArchive();
        });
        return;
      }

      if (pressViewMode === "list") {
        resultsHost.className = "press-list";
        resultsHost.innerHTML = filtered
          .map(
            (p) => `
            <article class="press-row">
              <div class="press-outlet-col">
                <span class="press-outlet-name">${escapeHtml(p.outlet)}</span>
                <span class="press-date">${escapeHtml(p.date)}</span>
                <span class="press-ref">${escapeHtml(p.ref)}</span>
              </div>
              <div class="press-content-col">
                <h3>${escapeHtml(p.headline)}</h3>
                <p>${escapeHtml(p.summary)}</p>
              </div>
              <div>
                <button type="button" class="btn btn--outline btn--sm" data-open-press="${escapeHtml(p.id)}">${escapeHtml(ui.readClipping)}</button>
              </div>
            </article>`
          )
          .join("");
      } else {
        resultsHost.className = "press-grid";
        resultsHost.innerHTML = filtered
          .map(
            (p) => `
            <article class="press-card">
              <div class="press-card-masthead">
                <span class="press-outlet-name">${escapeHtml(p.outlet)}</span>
                <span class="press-date">${escapeHtml(p.year)}</span>
              </div>
              <h3 class="card-title" style="font-size:1.35rem">${escapeHtml(p.headline)}</h3>
              <p class="card-excerpt" style="font-size:0.9rem">${escapeHtml(p.summary)}</p>
              <div class="card-footer">
                <span class="press-ref">${escapeHtml(p.date)}</span>
                <button type="button" class="card-action-btn" data-open-press="${escapeHtml(p.id)}">${escapeHtml(ui.openClipping)}</button>
              </div>
            </article>`
          )
          .join("");
      }

      resultsHost.querySelectorAll("[data-open-press]").forEach((btn) => {
        btn.addEventListener("click", () => openPressClipping(btn.dataset.openPress));
      });
    }

    outletSelect.onchange = (e) => {
      selectedOutlet = e.target.value;
      renderArchive();
    };
    decadeSelect.onchange = (e) => {
      selectedDecade = e.target.value;
      renderArchive();
    };
    searchInput.oninput = (e) => {
      query = e.target.value;
      renderArchive();
    };
    listBtn.onclick = () => {
      pressViewMode = "list";
      listBtn.classList.add("active");
      gridBtn.classList.remove("active");
      renderArchive();
    };
    gridBtn.onclick = () => {
      pressViewMode = "grid";
      gridBtn.classList.add("active");
      listBtn.classList.remove("active");
      renderArchive();
    };

    populateOutlets();
    renderArchive();

    if (openDeepLink) {
      const deepId = getQueryParam("id");
      if (deepId) openPressClipping(deepId);
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
      readTime: raw.lectura || raw.readTime || "3 min",
      featured: Boolean(raw.destacada !== undefined ? raw.destacada : raw.featured),
      image: raw.imatge || raw.image || "img/hero/hero1.jpg",
      title: raw.titol || raw.title || "Sense títol",
      excerpt: raw.resum || raw.excerpt || "",
      tags,
      body
    };
  }

  function normalizePressItem(raw, idx) {
    const year = Number(raw.any !== undefined ? raw.any : raw.year) || 2026;
    let decade = String(raw.epoca || raw.decade || "");
    if (!decade) {
      if (year >= 2026) decade = "2026";
      else if (year === 2025) decade = "2025";
      else if (year >= 2010) decade = "2010-2024";
      else if (year >= 1990) decade = "1990-2009";
      else decade = "1975-1989";
    }
    return {
      id: raw.id || "premsa-" + (idx + 1),
      outlet: raw.mitja || raw.outlet || "Premsa",
      date: raw.data || raw.date || String(year),
      year,
      decade,
      section: raw.seccio || raw.section || "Hemeroteca",
      ref: raw.ref || `FEL-PREMSA-${year}`,
      headline: raw.titular || raw.headline || "",
      summary: raw.resum || raw.summary || "",
      excerpt: raw.fragment || raw.excerpt || "",
      context: raw.context || ""
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

    if (page === "inici" || page === "arxiu") {
      tasks.push(
        window.SimpleYAML.fetchYamlList("data/arxiu-premsa.yaml")
          .then((items) => {
            if (items && items.length) DATA.pressArchive = items.map(normalizePressItem);
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
    else if (currentPage === "arxiu") initArxiuPage(Boolean(isInitial));
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
