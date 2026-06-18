const EMAIL = "thefoundry@rkdb.nz";

function encodeMail(value) {
  return encodeURIComponent(value);
}

function setStartEmailLinks() {
  const links = document.querySelectorAll(".email-start");

  if (!links.length) return;

  const subject = "Hand Me The Problem";

  const body = `Hi, I'm Rob.

The Foundry was built to make having a website effortless.

In a few sentences, tell me who you are, where you are, and what you'd like your customers to know.

I'll do some homework and come back with a few mockups.

If one feels right, we'll refine it together.

If not, tell me why. We'll go from there.

---`;

  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeMail(subject)}&body=${encodeMail(body)}`;
  });
}

function setConceptEmailLinks() {
  const links = document.querySelectorAll(".email-concept");

  if (!links.length) return;

  const concept =
    document.querySelector("[data-concept]")?.dataset.concept ||
    "A Foundry Possibility";

  const subject = `Foundry Concept Interest - ${concept}`;

  const body = `I like this direction: ${concept}

Tell me who you are, where you are, and what you'd like your customers to know.

What do you like about this example?

Anything else you'd like me to know?

---`;

  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeMail(subject)}&body=${encodeMail(body)}`;
  });
}

function setupFoundryOverlay() {
  const exploreButton = document.getElementById("foundryExplore");
  const overlay = document.getElementById("foundryOverlay");
  const closeButton = document.getElementById("foundryClose");
  const blurWrap = document.getElementById("siteBlurWrap");

  if (!exploreButton || !overlay || !closeButton || !blurWrap) return;

  function openOverlay() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");

    blurWrap.classList.add("is-blurred");

    exploreButton.setAttribute("aria-expanded", "true");
  }

  function closeOverlay() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");

    blurWrap.classList.remove("is-blurred");

    exploreButton.setAttribute("aria-expanded", "false");
  }

  exploreButton.addEventListener("click", openOverlay);

  closeButton.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });

  if (window.location.hash === "#explore") {
    openOverlay();
  }
}

function setupFoundryCareModal() {
  const modal = document.getElementById("foundrycare-definitions");
  const openButton = document.querySelector(".foundry-care-button");
  const closeButton = document.querySelector(".foundry-modal-close");

  if (!modal || !openButton || !closeButton) return;

  const panel = modal.querySelector(".foundry-modal-panel");
  const title = document.getElementById("foundrycare-definitions-title");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    if (panel) {
      panel.scrollTop = 0;
    }

    requestAnimationFrame(() => {
      if (title) {
        title.setAttribute("tabindex", "-1");
        title.focus();
      }
    });
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    openButton.focus();
  }

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function setupPageTransitions() {
  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      link.hasAttribute("target")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();

      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setStartEmailLinks();
  setConceptEmailLinks();
  setupFoundryOverlay();
  setupFoundryCareModal();
  setupPageTransitions();
});
