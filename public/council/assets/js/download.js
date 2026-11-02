/* The download page: detect the visitor's platform, lead with it, list the rest.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TO PUBLISH A RELEASE: set `url`, `size`, `version` and `sha256` on the
 * platform below. The sha256 is the same value as in ../../updates.json, and
 * the page prints it beside the button so a reader can check the file they
 * received. Leave `url` null and the button stays "Coming soon".
 *
 * Then update ../../updates.json to match, which is what already-installed
 * copies of the app read to find out they are out of date, and run
 * `npm run check:council` — it fails if the two files disagree about a version,
 * a URL, a size or a sha256. Without it the page can offer a build that no
 * installed app will ever update itself to. The Linux `.deb` is not an app
 * update: its hash is `alt.sha256` here and `deb` in the manifest, which the
 * updater ignores.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Deliberately not reading the GitHub releases API. Doing so would put a network
 * request in front of the one thing this page exists to do, and would show
 * whatever happens to be tagged — including the content-pack releases, which are
 * corpus data and not the app.
 */
(function () {
  "use strict";

  var PLATFORMS = [
    {
      id: "ios",
      name: "iPhone & iPad",
      // 16, and read off the build rather than assumed. The deployment target
      // moved from 15 to 16 when flutter_gemma was added for on-device
      // generation; it requires 16, and the devices that stop at 15 — the
      // iPhone 6s, 7 and first SE — have 2 GB of RAM and could not have run a
      // local model anyway. A reader on 15 following the TestFlight link would
      // install TestFlight and only then learn the build will not run.
      requires: "iOS 16 or later",
      cta: "Join the TestFlight beta",
      url: "https://testflight.apple.com/join/JZ1k29YE",
      size: null,
      version: "2026.8.2",
      note: "Distributed through TestFlight while it is in beta.",
      icon:
        '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M12 7c1-.56 1.5-2 1.5-3.5"/>',
    },
    {
      id: "android",
      name: "Android",
      // 7, not 8: the APK's own minSdkVersion is 24, which is Android 7.0, so
      // the earlier figure was turning away devices the build installs on.
      requires: "Android 7 or later",
      cta: "Download APK",
      url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.10.29/Council-android.apk",
      size: "153 MB",
      version: "2026.10.29",
      sha256: "7f32c540da4225f3d9e62e41b1a2bb79eb00f768e9d7ad24968d0516505f1675",
      // Only true of the 2026.8.2 pre-release, which was debug-signed: Android
      // refuses to install a build signed with a different key over it. Every
      // build from 2026.10.29 on carries the permanent release key.
      note:
        "Have 2026.8.2 installed? Uninstall it first. It was signed with a " +
        "temporary key, so Android will not update over it. This is needed once.",
      icon:
        '<path d="M5 16V9a7 7 0 0 1 14 0v7"/><path d="M3 16h18a0 0 0 0 1 0 0v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a0 0 0 0 1 0 0Z"/><path d="m7 5-1.5-2.5M17 5l1.5-2.5"/><circle cx="9" cy="11" r=".6" fill="currentColor"/><circle cx="15" cy="11" r=".6" fill="currentColor"/>',
    },
    {
      id: "macos",
      name: "macOS",
      requires: "macOS 12 or later · Apple silicon",
      cta: "Download for Mac",
      url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.10.29/Council-macos.dmg",
      size: "56 MB",
      version: "2026.10.29",
      sha256: "d87bf940eba99f1f9ca399675db36b169119969d122d1534ca5471eb2c71b5b4",
      note:
        "Signed but not yet notarised. On first launch, right-click the app " +
        "and choose Open.",
      icon:
        '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M2 20h20"/>',
    },
    {
      id: "windows",
      name: "Windows",
      requires: "Windows 10 or later · x64",
      cta: "Download for Windows",
      url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.10.29/Council-windows-setup.exe",
      size: "72 MB",
      version: "2026.10.29",
      sha256: "79d6607069aa34ec704dbfc13e6680ab8b95247ae9dccf3d530112284f0f670d",
      note:
        "The installer is unsigned, so SmartScreen will warn on first run. " +
        "Choose More info, then Run anyway.",
      icon:
        '<path d="M3 5.5 10.5 4v7.5H3zM12 3.8 21 2.5v9H12zM3 13h7.5v7L3 18.5zM12 13h9v8.5L12 20.2z"/>',
    },
    {
      id: "linux",
      name: "Linux",
      // glibc 2.34 is measured, not assumed: it is the highest GLIBC_ symbol
      // the binary and its bundled libraries actually reference. The CI runner
      // image ships 2.35, so taking the floor from the image would have
      // needlessly excluded 2.34 distributions — RHEL 9 among them.
      requires: "x64 · glibc 2.34 or later",
      cta: "Download AppImage",
      url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.10.29/Council-linux-x86_64.AppImage",
      size: "65 MB",
      version: "2026.10.29",
      sha256: "aac10ff07b55ffadb8d12b4e386045d0baa74b0aa835e4d5ef6dd756c46fbc70",
      note: "Make it executable with chmod +x, then run it.",
      // The AppImage leads because it runs on any distribution; Debian and
      // Ubuntu users are better served by the .deb. Its checksum is not an
      // update input — updates.json keeps it under `deb`, which the app skips.
      alt: {
        label: "Debian / Ubuntu package (.deb, 57 MB)",
        url: "https://github.com/SpencerSmithSite/council/releases/download/v2026.10.29/Council-linux-amd64.deb",
        sha256: "111f5570020337d96fc1f7770396b9e9aac7636de39053aaa4e97d6035b1a5c8",
      },
      icon:
        '<path d="M9 3.5c0-1 1.3-1.5 3-1.5s3 .5 3 1.5v4c0 2 3 4 3 8a6 6 0 0 1-12 0c0-4 3-6 3-8Z"/><circle cx="10.5" cy="6" r=".6" fill="currentColor"/><circle cx="13.5" cy="6" r=".6" fill="currentColor"/>',
    },
  ];

  /** Best guess at the visitor's platform, or null when it is not clear.
   *
   *  iPadOS is checked before macOS on purpose: since iPadOS 13 an iPad reports
   *  itself as a Mac, and the only reliable tell is that Macs do not have a
   *  touchscreen. Getting this wrong offers a .dmg to someone on an iPad. */
  function detect() {
    var ua = navigator.userAgent || "";
    var platform =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      "";
    var touch = navigator.maxTouchPoints > 1;

    if (/iPhone|iPod/.test(ua)) return "ios";
    if (/iPad/.test(ua)) return "ios";
    if (/Mac/.test(platform + ua) && touch) return "ios"; // iPadOS in disguise
    if (/Android/i.test(ua)) return "android";
    if (/Mac/i.test(platform) || /Mac OS X/.test(ua)) return "macos";
    if (/Win/i.test(platform) || /Windows/.test(ua)) return "windows";
    if (/Linux|X11|CrOS/i.test(platform + ua)) return "linux";
    return null;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function icon(p) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      p.icon +
      "</svg>"
    );
  }

  /** The download control — a real link when there is something to link to, and
   *  an honestly disabled button when there is not. Never a live-looking button
   *  that goes nowhere. */
  function button(p, primary) {
    var cls = "btn " + (primary ? "btn--primary" : "btn--ghost");
    if (p.url) {
      return (
        '<a class="' + cls + '" href="' + esc(p.url) + '">' + esc(p.cta) + "</a>"
      );
    }
    return (
      '<button class="' +
      cls +
      '" type="button" disabled aria-disabled="true">Coming soon</button>'
    );
  }

  function meta(p) {
    var bits = [];
    if (p.version) bits.push("Version " + esc(p.version));
    if (p.size) bits.push(esc(p.size));
    if (!p.url) bits.push("Not yet released");
    return bits.join(" · ");
  }

  /** The meta line, dropped entirely when there is nothing to put in it. An
   *  empty <p> still carries its margin and would open a gap under the button —
   *  which is the normal case for TestFlight, where the version and size are
   *  Apple's to state, not ours. */
  function metaLine(p, cls) {
    var text = meta(p);
    return text ? '<p class="' + cls + '">' + text + "</p>" : "";
  }

  /** sha256 beside a download. A short prefix is visible; the full hash is in
   *  the disclosure and on the copy button. Only a 64-character hex digest is
   *  rendered, and every value is escaped. Empty when the platform has no
   *  checksum — TestFlight, and anything still unreleased. */
  function checksumMarkup(hash) {
    if (!/^[0-9a-f]{64}$/.test(hash || "")) return "";
    var full = String(hash).toLowerCase();
    return (
      '<div class="checksum">' +
      '<details class="checksum__details">' +
      '<summary><span class="checksum__label">sha256</span> <code>' +
      esc(full.slice(0, 12)) +
      "…</code></summary>" +
      '<p class="checksum__full"><code>' +
      esc(full) +
      "</code></p>" +
      "</details>" +
      '<button class="checksum__copy" type="button" data-sha256="' +
      esc(full) +
      '">Copy</button>' +
      "</div>"
    );
  }

  /** A second download for platforms that ship more than one package format.
   *  Only Linux has one — the AppImage runs anywhere and leads, with the .deb
   *  offered beside it. Suppressed while the platform is unreleased, so it can
   *  never appear next to a Coming soon button. */
  function altLink(p) {
    if (!p.url || !p.alt || !p.alt.url) return "";
    return (
      '<p class="alt-format"><a href="' +
      esc(p.alt.url) +
      '">' +
      esc(p.alt.label) +
      "</a></p>" +
      checksumMarkup(p.alt.sha256)
    );
  }

  function markCopied(button) {
    button.textContent = "Copied";
    window.setTimeout(function () {
      button.textContent = "Copy";
    }, 1600);
  }

  /** Select the full digest when the clipboard is unavailable, so it can still
   *  be copied by hand. */
  function revealHash(button) {
    var root = button.parentNode;
    if (!root) return;
    var details = root.querySelector("details");
    var code = root.querySelector(".checksum__full code");
    if (details) details.open = true;
    if (!code) return;
    var range = document.createRange();
    range.selectNodeContents(code);
    var selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function copyChecksum(button) {
    var value = button.getAttribute("data-sha256") || "";
    if (!/^[0-9a-f]{64}$/.test(value)) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(function () {
        markCopied(button);
      }).catch(function () {
        revealHash(button);
      });
      return;
    }
    revealHash(button);
  }

  var primaryEl = document.getElementById("primary");
  var listEl = document.getElementById("platforms");

  var detected = detect();
  var lead = null;
  PLATFORMS.forEach(function (p) {
    if (p.id === detected) lead = p;
  });

  if (lead) {
    primaryEl.innerHTML =
      '<div class="primary__card">' +
      '<div class="primary__icon">' +
      icon(lead) +
      "</div>" +
      '<div class="primary__text">' +
      '<p class="primary__eyebrow">Looks like you are on</p>' +
      "<h2>" +
      esc(lead.name) +
      "</h2>" +
      '<p class="primary__requires">' +
      esc(lead.requires) +
      "</p>" +
      (lead.note ? '<p class="primary__note">' + esc(lead.note) + "</p>" : "") +
      "</div>" +
      '<div class="primary__action">' +
      button(lead, true) +
      metaLine(lead, "primary__meta") +
      checksumMarkup(lead.sha256) +
      altLink(lead) +
      "</div>" +
      "</div>";
  } else {
    // Detection failed — say so rather than guessing, and let the full list do
    // the work.
    primaryEl.innerHTML =
      '<div class="primary__card primary__card--unknown">' +
      "<div class=\"primary__text\"><h2>Choose your platform</h2>" +
      '<p class="primary__requires">Your device was not recognised, so here is everything.</p></div>' +
      "</div>";
  }

  listEl.innerHTML = PLATFORMS.map(function (p) {
    return (
      '<li class="platform' +
      (p.id === detected ? " platform--current" : "") +
      '">' +
      '<div class="platform__icon">' +
      icon(p) +
      "</div>" +
      '<div class="platform__text">' +
      "<h3>" +
      esc(p.name) +
      (p.id === detected ? ' <span class="badge">Your device</span>' : "") +
      "</h3>" +
      "<p>" +
      esc(p.requires) +
      "</p>" +
      metaLine(p, "platform__meta") +
      "</div>" +
      '<div class="platform__action">' +
      button(p, false) +
      checksumMarkup(p.sha256) +
      altLink(p) +
      "</div>" +
      "</li>"
    );
  }).join("");

  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.classList && node.classList.contains("checksum__copy")) {
        copyChecksum(node);
        return;
      }
      node = node.parentNode;
    }
  });
})();
