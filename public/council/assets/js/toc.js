/* Highlight the contents entry for the section currently being read.
 *
 * By IntersectionObserver rather than a scroll handler doing getBoundingClientRect
 * on ten sections per frame. The root margin pins the "reading line" a fifth of
 * the way down the viewport: a section counts as current once its heading has
 * cleared the sticky nav, not when its last paragraph leaves the screen.
 */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  var sections = [];

  links.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    byId[id] = a;
    sections.push(el);
  });

  var visible = {};

  function paint() {
    // The topmost section currently intersecting wins. Without this, scrolling
    // fast through a short section leaves two entries lit at once.
    var current = sections.filter(function (s) {
      return visible[s.id];
    })[0];
    links.forEach(function (a) {
      a.removeAttribute("aria-current");
    });
    if (current && byId[current.id]) {
      byId[current.id].setAttribute("aria-current", "true");
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting;
      });
      paint();
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach(function (s) {
    observer.observe(s);
  });
})();
