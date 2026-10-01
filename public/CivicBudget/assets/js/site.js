/* CivicBudget: the page's small behaviors. The page works without any of them: the clips keep
 * their native controls, the password can be selected, the menu is a plain disclosure, and the
 * form posts to Formspree. */
(function () {
  "use strict";

  /* ------------------------------------------------------------ clips --- */
  // Silent loops play while on screen, unless the reader prefers reduced motion, and each gets a
  // pause button, since moving content that lasts over five seconds must be stoppable (WCAG 2.2.2).
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("video[data-clip]").forEach(function (video) {
    video.removeAttribute("controls");
    var paused = still; // the reader's choice, kept across scrolling
    var button = document.createElement("button");
    button.type = "button";
    button.className = "clip__toggle";
    // The button sits on the video itself, so a long caption below cannot push it onto the text.
    var frame = document.createElement("div");
    frame.className = "clip__frame";
    video.parentNode.insertBefore(frame, video);
    frame.appendChild(video);
    frame.appendChild(button);

    // The visible word leads the name (WCAG 2.5.3), and the rest says which clip it is.
    var name = video.getAttribute("data-clip") || "clip";
    function label() {
      button.textContent = video.paused ? "Play" : "Pause";
      button.setAttribute("aria-label", (video.paused ? "Play" : "Pause") + " the " + name);
    }

    button.addEventListener("click", function () {
      if (video.paused) { paused = false; video.play().catch(function () {}); }
      else { paused = true; video.pause(); }
    });
    video.addEventListener("play", label);
    video.addEventListener("pause", label);
    label();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !paused) { video.play().catch(function () {}); }
          else if (!entry.isIntersecting && !video.paused) { video.pause(); }
        });
      }, { threshold: 0.5 }).observe(video);
    }
  });

  /* ------------------------------------------------------- warm demo --- */
  // The live demo sleeps when nobody uses it (its container scales to zero, and its free database
  // pauses), so the first visit waits about a minute. A reader who opens this page may well try it,
  // so one quiet POST to the demo's /health/wake starts it waking while they read: the request starts
  // a sleeping container, which wakes the database, and the endpoint wakes a database that paused
  // behind a running container. It never holds the database awake, and the request carries no
  // cookies or referrer. It is skipped for readers who asked to save data, and for
  // automated browsers, so crawlers and screenshot scripts do not spend the demo's free allowance.
  var demo = document.querySelector("a[data-demo]");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (demo && window.fetch && !saveData && !navigator.webdriver) {
    fetch(new URL("/health/wake", demo.href).href, {
      method: "POST", mode: "no-cors", cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer", keepalive: true
    }).catch(function () {});
  }

  /* --------------------------------------------------------- password --- */
  var copy = document.getElementById("copy-password");
  var password = document.getElementById("demo-password");
  var copyStatus = document.getElementById("copy-status");
  if (copy && password) {
    copy.hidden = false;
    copy.addEventListener("click", function () {
      var done = function (text) {
        copy.textContent = text;
        // The button's own text changing is not announced; the status region is.
        if (copyStatus) { copyStatus.textContent = text === "Copied" ? "Password copied" : "Password selected"; }
        setTimeout(function () { copy.textContent = "Copy"; if (copyStatus) { copyStatus.textContent = ""; } }, 2000);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(password.textContent).then(function () { done("Copied"); }, select);
      } else { select(); }
      function select() {
        var range = document.createRange();
        range.selectNodeContents(password);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        done("Selected");
      }
    });
  }

  /* ------------------------------------------------------------- menu --- */
  // The phone menu is a <details>; it closes when a link in it is chosen, and on Escape, which
  // returns focus to the button that opened it.
  var menu = document.querySelector(".nav__menu");
  if (menu) {
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) { menu.open = false; } });
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.open) { menu.open = false; menu.querySelector("summary").focus(); }
    });
  }

  /* ------------------------------------------------------------- form --- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && window.fetch) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      status.className = "form__status";
      status.textContent = "Sending...";

      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) { throw new Error(); }
          form.reset();
          status.className = "form__status form__status--ok";
          status.textContent = "Sent. Thank you; I will reply by email.";
        })
        .catch(function () {
          status.className = "form__status form__status--err";
          status.textContent = "That did not send. Please email CivicBudget@spencersmith.site instead.";
        })
        .finally(function () { button.disabled = false; });
    });
  }
})();
