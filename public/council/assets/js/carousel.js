/* The home-page screenshot carousel.
 *
 * Slides are declared here rather than in the HTML so that an image, its alt
 * text and its caption stay in one place. Adding a screenshot is one entry.
 *
 * Scrolling is native — `scroll-snap-type: x mandatory` on the track — so the
 * thing works with a trackpad, a touchscreen and a scrollbar before any of this
 * runs. The script only adds the arrows, the dots and the focus dimming.
 */
(function () {
  "use strict";

  var SLIDES = [
    {
      src: "assets/img/screens/chat-answer.webp",
      alt: "An answer to 'Compare views on baptism', headed 'Comparison of Views on Baptism Across the Sources', quoting Augustine against the Donatists with numbered citations",
      title: "One question, every tradition",
      caption:
        "Ask once and the answer draws on all of them — here Augustine, Aquinas and the Westminster Confession on the same question.",
    },
    {
      src: "assets/img/screens/chat-sources.webp",
      alt: "The sources list beneath an answer: six numbered citations, each labelled with its tradition and author",
      title: "Every claim is footnoted",
      caption:
        "Each citation names the work, its tradition and its author, and opens the passage itself. The disclaimer under it is the app's own.",
    },
    {
      src: "assets/img/screens/read-shelf.webp",
      alt: "The Read shelf: a pinned work at the top, then works grouped under Scripture, Anglican, Baptist and Catholic headings",
      title: "A shelf, not a file browser",
      caption:
        "Everything installed, grouped by tradition. Swipe a work right to pin it to the top, left to star it.",
    },
    {
      src: "assets/img/screens/search.webp",
      alt: "Search results for 'justification' spanning Aquinas's Summa and Watson's Body of Divinity, each labelled with its tradition",
      title: "Full-text and semantic search",
      caption:
        "Exact phrases and proper names come from FTS5; meaning comes from on-device embeddings. The two rankings are fused.",
    },
    {
      src: "assets/img/screens/reader.webp",
      alt: "Thomas Watson's Body of Divinity open at the article on justification, with a provenance card naming the tradition, rights and source URL",
      title: "Provenance on every page",
      caption:
        "The reader shows which tradition a work belongs to, what its rights are and exactly where the text came from.",
    },
    {
      src: "assets/img/screens/reader-annotate.webp",
      alt: "A selected paragraph in the reader with a floating toolbar offering copy, share, highlight colours, a note and an AI question",
      title: "Mark it up as you read",
      caption:
        "Tap a passage for highlight colours, a note, a bookmark, or a question about that passage without losing your place.",
    },
    {
      src: "assets/img/screens/library.webp",
      alt: "The Library screen listing Creeds & Confessions at 8.5 MB (the app labels sizes in mebibytes) and several Bible translations, each with a description and a download button",
      title: "Take only what you need",
      caption:
        "Thirty-one collections, from 0.7 MB to 107 MB. Nothing downloads twice, however many collections a work belongs to.",
    },
    {
      src: "assets/img/screens/ai-backend.webp",
      alt: "The AI Backend screen offering search-only, Ollama with a host and model field, and your own API key",
      title: "You choose the engine",
      caption:
        "Search-only by default. Point it at Ollama on your own machine, or at a provider you hold the key for.",
    },
  ];

  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var track = root.querySelector("[data-carousel-track]");
  var dots = root.querySelector("[data-carousel-dots]");
  var prev = root.querySelector("[data-carousel-prev]");
  var next = root.querySelector("[data-carousel-next]");

  SLIDES.forEach(function (slide, i) {
    var fig = document.createElement("figure");
    fig.className = "slide";
    fig.innerHTML =
      '<div class="phone"><div class="phone__screen">' +
      '<img src="' +
      slide.src +
      '" alt="' +
      slide.alt.replace(/"/g, "&quot;") +
      '" width="600" height="1346" loading="' +
      (i === 0 ? "eager" : "lazy") +
      '"></div></div>' +
      '<figcaption class="slide__caption"><h3>' +
      slide.title +
      "</h3><p>" +
      slide.caption +
      "</p></figcaption>";
    track.appendChild(fig);

    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", slide.title);
    dot.addEventListener("click", function () {
      scrollTo(i);
    });
    dots.appendChild(dot);
  });

  var slides = Array.prototype.slice.call(track.children);
  var current = 0;

  function scrollTo(i) {
    var el = slides[i];
    if (!el) return;
    // Paint the new state *before* scrolling rather than waiting for the scroll
    // to settle. Deriving it only from the scroll event means the dots and the
    // arrows lag a smooth scroll by its whole duration — and freeze completely
    // wherever requestAnimationFrame is throttled, which is any background tab.
    paint(i);
    // Centre the slide in the track by hand. `scrollIntoView` would also scroll
    // the *page* vertically to reach it, which yanks the reader down to the
    // carousel every time they press an arrow.
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }

  /** Which slide is nearest the centre of the viewport right now. */
  function nearest() {
    var mid = track.scrollLeft + track.clientWidth / 2;
    var best = 0;
    var bestGap = Infinity;
    slides.forEach(function (el, i) {
      var gap = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid);
      if (gap < bestGap) {
        bestGap = gap;
        best = i;
      }
    });
    return best;
  }

  /** Reflect [index] — or, with no argument, whatever the track is scrolled to. */
  function paint(index) {
    current = index == null ? nearest() : index;
    slides.forEach(function (el, i) {
      el.classList.toggle("is-active", i === current);
    });
    Array.prototype.forEach.call(dots.children, function (d, i) {
      d.setAttribute("aria-selected", String(i === current));
    });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
  }

  prev.addEventListener("click", function () {
    scrollTo(current - 1);
  });
  next.addEventListener("click", function () {
    scrollTo(current + 1);
  });

  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(current - 1);
    }
  });

  // Coalesce scroll events; the handler would otherwise run on every pixel of a
  // trackpad flick. requestAnimationFrame is the right tool when the page is
  // being painted and the wrong one when it is not — it simply never fires in a
  // background tab, which would leave the dots frozen mid-swipe. So: rAF when
  // it is available, and a timeout as the floor.
  var queued = false;
  var frame =
    window.requestAnimationFrame ||
    function (fn) {
      return setTimeout(fn, 16);
    };
  track.addEventListener(
    "scroll",
    function () {
      if (queued) return;
      queued = true;
      frame(function () {
        queued = false;
        paint();
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", paint);
  paint();
})();
