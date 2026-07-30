/* Shared chrome: theme toggle, mobile nav, current-page marking.
 *
 * The *setting* of the theme does not happen here. It happens in a blocking
 * inline script in each page's <head>, because anything deferred runs after
 * first paint and a dark-mode reader would see a white flash on every
 * navigation. This file only handles the click, which can safely wait.
 */
(function () {
  "use strict";

  var KEY = "council-theme";
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  /** What the page is showing right now, whether chosen or inherited. */
  function effective() {
    return root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".js-theme").forEach(function (btn) {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  document.querySelectorAll(".js-theme").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {
        /* Private browsing refuses writes; the toggle still works for this
         * page, it just will not be remembered. Not worth surfacing. */
      }
      apply(next);
    });
  });

  apply(effective());

  /* Follow the system if — and only if — the reader has never chosen. Once they
   * have, their choice outranks the OS switching at sundown. */
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    var stored = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch (err) {
      /* ignore */
    }
    if (!stored) apply(e.matches ? "dark" : "light");
  });

  /* ------------------------------------------------------------------ nav -- */

  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    var mobile = window.matchMedia("(max-width: 720px)");

    function sync() {
      // Off small screens the menu is a plain row and must never stay hidden by
      // a stale `hidden` attribute left over from a narrow viewport.
      if (mobile.matches) {
        links.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      } else {
        links.hidden = false;
      }
    }

    sync();
    mobile.addEventListener("change", sync);

    toggle.addEventListener("click", function () {
      var open = links.hidden;
      links.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mobile.matches) sync();
    });
  }

  /* Mark the current page in the nav from the URL rather than hand-editing four
   * copies of the markup and getting one of them wrong. */
  var here = location.pathname.replace(/\/$/, "/index.html").split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    var target = a.getAttribute("href").split("/").pop();
    if (target === here) a.setAttribute("aria-current", "page");
  });
})();
