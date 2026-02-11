(() => {
  "use strict";

  // --- Language config ---
  var LANG_KEY = "w2e-lang";
  var LANG_LABELS = {
    en: "EN", zh: "繁中", "zh-cn": "简中",
    ja: "JA", ko: "KO", es: "ES", it: "IT", fr: "FR"
  };
  var HTML_LANG_MAP = {
    en: "en", zh: "zh-Hant", "zh-cn": "zh-Hans",
    ja: "ja", ko: "ko", es: "es", it: "it", fr: "fr"
  };

  var currentLang = localStorage.getItem(LANG_KEY) || "en";
  if (!W2E_I18N[currentLang]) currentLang = "en";

  var langBtn = document.getElementById("langBtn");
  var langCurrent = document.getElementById("langCurrent");
  var langMenu = document.getElementById("langMenu");
  var langDropdown = document.getElementById("langDropdown");

  function setLanguage(lang) {
    if (!W2E_I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    var strings = W2E_I18N[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (strings[key]) el.textContent = strings[key];
    });

    langCurrent.textContent = LANG_LABELS[lang] || lang.toUpperCase();
    document.documentElement.lang = HTML_LANG_MAP[lang] || lang;

    // Update active state in menu
    langMenu.querySelectorAll("li").forEach(function (li) {
      li.classList.toggle("active", li.getAttribute("data-lang") === lang);
    });
  }

  // Toggle dropdown
  langBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
  });

  // Select language
  langMenu.addEventListener("click", function (e) {
    var li = e.target.closest("li[data-lang]");
    if (!li) return;
    setLanguage(li.getAttribute("data-lang"));
    langDropdown.classList.remove("open");
  });

  // Close dropdown on outside click
  document.addEventListener("click", function () {
    langDropdown.classList.remove("open");
  });

  // Initialize
  setLanguage(currentLang);

  // --- Scroll Animations (Intersection Observer) ---
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // --- Animated Counter for Stats ---
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;

    var duration = 1800;
    var start = performance.now();

    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(tick);
  }

  var statNumbers = document.querySelectorAll(".stat-number[data-count]");
  if ("IntersectionObserver" in window && statNumbers.length) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    statNumbers.forEach(function (el) { statsObserver.observe(el); });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
