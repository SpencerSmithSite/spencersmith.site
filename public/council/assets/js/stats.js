/* Fill the hero's numbers from the generated totals file.
 *
 * The markup carries the current figures as its own content, so the page is
 * correct with JavaScript off and correct in the moment before this file loads.
 * This exists so that regenerating the catalogue after a corpus rebuild updates
 * the headline numbers without anyone remembering to edit the HTML — the class
 * of staleness where the hero says 687 and the Sources page lists 700.
 *
 * Home and download only need these few counts. The full catalogue is about
 * 700 KB and is fetched by the sources page alone (`sources.js`). `totals.json`
 * is derived from `sources.json` by `node scripts/council-totals.mjs`.
 */
(function () {
  "use strict";

  var targets = document.querySelectorAll("[data-stat]");
  if (!targets.length) return;

  fetch("assets/data/totals.json")
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (t) {
      var values = {
        sources: t.sources.toLocaleString(),
        chars: Math.round(t.chars / 1e6) + " M",
        units: t.units.toLocaleString(),
        authors: t.authors.toLocaleString(),
        traditions: String(t.traditions),
        collections: String(t.collections),
      };
      targets.forEach(function (el) {
        var v = values[el.dataset.stat];
        if (v) el.textContent = v;
      });
    })
    .catch(function () {
      /* Leave the hand-written figures in place. A hero that silently keeps
       * working is better than one that blanks itself because a fetch failed. */
    });
})();
