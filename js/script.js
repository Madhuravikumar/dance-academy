/* ==========================================================================
   Aarudra Natiyalaya — Bharatanatyam Academy — Scripts
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Temple door opening animation ---------- */
  const doors = document.getElementById("templeDoors");
  const body = document.body;

  body.classList.add("no-scroll");

  window.addEventListener("load", function () {
    // Hold the closed doors briefly, then open them.
    setTimeout(function () {
      if (doors) doors.classList.add("open");
      body.classList.remove("no-scroll");
    }, 900);

    // Remove doors from the layout once the animation finishes.
    setTimeout(function () {
      if (doors) doors.classList.add("done");
    }, 2700);
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("siteNavbar");
  const onScrollNav = function () {
    if (window.scrollY > 60) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav);

  /* ---------- Close mobile menu on link click ---------- */
  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const collapseEl = document.getElementById("mainNav");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (collapseEl.classList.contains("show") && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll(".stat-num");
  const runCounter = function (el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1800;
    const start = performance.now();
    const step = function (now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("en-IN");
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Active nav link on scroll (scroll spy) ---------- */
  const sections = document.querySelectorAll("section[id], header[id]");
  const spy = function () {
    const scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector('#mainNav .nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove("active"); });
        link.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", spy);

  /* ---------- Back to top ---------- */
  const backBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) backBtn.classList.add("show");
    else backBtn.classList.remove("show");
  });
  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Contact form handling ---------- */
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      successMsg.classList.add("show");
      form.reset();
      form.classList.remove("was-validated");
      setTimeout(function () { successMsg.classList.remove("show"); }, 5000);
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
