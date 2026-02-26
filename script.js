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

  // --- Parallax glass blobs on scroll ---
  var glassBlobs = document.querySelectorAll(".glass-blob");
  if (glassBlobs.length) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.pageYOffset;
          glassBlobs.forEach(function (blob, i) {
            var speed = 0.03 + (i * 0.015);
            blob.style.transform = "translateY(" + (scrollY * speed) + "px)";
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Tilt effect on feature cards ---
  document.querySelectorAll(".feature-card, .roadmap-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "translateY(-10px) perspective(600px) rotateX(" + (y * -4) + "deg) rotateY(" + (x * 4) + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

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

  // --- Hamburger Menu ---
  var hamburger = document.getElementById("hamburger");
  var mobileOverlay = document.getElementById("mobileNavOverlay");

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener("click", function () {
      var isOpen = hamburger.classList.toggle("active");
      mobileOverlay.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile nav when a link is clicked
    mobileOverlay.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        mobileOverlay.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // --- Waitlist Form ---
  var waitlistForm = document.getElementById("waitlistFormEl");
  var waitlistSuccess = document.getElementById("waitlistSuccess");

  if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("waitlistEmail");
      if (!email || !email.value) return;

      // Store email in localStorage (replace with real backend later)
      var waitlist = JSON.parse(localStorage.getItem("w2e-waitlist") || "[]");
      if (waitlist.indexOf(email.value) === -1) {
        waitlist.push(email.value);
        localStorage.setItem("w2e-waitlist", JSON.stringify(waitlist));
      }

      // Track event if GA is available
      if (typeof gtag === "function") {
        gtag("event", "waitlist_signup", { email_domain: email.value.split("@")[1] });
      }

      // Show success message
      waitlistForm.style.display = "none";
      if (waitlistSuccess) waitlistSuccess.classList.add("show");
    });
  }

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close all other items
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        var otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // --- App Preview Carousel ---
  var carouselTrack = document.getElementById("carouselTrack");
  var prevBtn = document.getElementById("carouselPrev");
  var nextBtn = document.getElementById("carouselNext");
  var dotsContainer = document.getElementById("carouselDots");

  if (carouselTrack && prevBtn && nextBtn && dotsContainer) {
    var carouselSlides = carouselTrack.querySelectorAll(".preview-card");
    var carouselDots = dotsContainer.querySelectorAll(".carousel-dot");
    var currentSlide = 0;
    var totalSlides = carouselSlides.length;
    var autoplayInterval;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      carouselTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";

      // Update active states
      carouselSlides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === currentSlide);
      });
      carouselDots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentSlide);
      });
    }

    prevBtn.addEventListener("click", function () {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener("click", function () {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });

    // Dot navigation
    carouselDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goToSlide(i);
        resetAutoplay();
      });
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    carouselTrack.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
        resetAutoplay();
      }
    }, { passive: true });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 4000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();
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

  // --- Nav scroll effect ---
  var nav = document.querySelector(".nav");
  if (nav) {
    var navTicking = false;
    window.addEventListener("scroll", function () {
      if (!navTicking) {
        requestAnimationFrame(function () {
          nav.classList.toggle("scrolled", window.pageYOffset > 60);
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });
  }
})();
