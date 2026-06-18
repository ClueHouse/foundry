const EMAIL = "thefoundry@rkdb.nz";

function encodeMail(body) {
  return encodeURIComponent(body);
}

function setStartEmailLinks() {
  const links = document.querySelectorAll(".email-start");

  if (!links.length) {
    return;
  }

  const subject = "Hand Me The Problem";

  const body = `Hi, I'm Rob.

I own The Foundry.

The Foundry was built to make having a website effortless.

You're almost ready to launch.

There is no obligation.

In a few sentences, tell me who you are, where you are, and what you'd like your customers to know.

I'll do some homework and come back with a few mockups.

If one feels right, we'll refine it together.

If not, tell me why. We'll go from there.

________________________________________
`;

  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeMail(body)}`;
  });
}

function setConceptEmailLinks() {
  const links = document.querySelectorAll(".email-concept");

  if (!links.length) {
    return;
  }

  const concept =
    document.querySelector("[data-concept]")?.dataset.concept ||
    "A Foundry Possibility";

  const subject = `Foundry Concept Interest - ${concept}`;

  const body = `I like this direction: ${concept}

Tell me who you are, where you are, and what you'd like your customers to know.

What do you like about this example?

Anything else you'd like me to know?

________________________________________
`;

  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeMail(body)}`;
  });
}

function setupFoundryOverlay() {
  const foundryToggle = document.getElementById("foundryToggle");
  const foundryToggleMobile = document.getElementById("foundryToggleMobile");
  const foundryOverlay = document.getElementById("foundryOverlay");
  const foundryClose = document.getElementById("foundryClose");
  const siteBlurWrap = document.getElementById("siteBlurWrap");

  if (!foundryOverlay || !foundryClose || !siteBlurWrap) {
    return;
  }

  function setExpanded(value) {
    if (foundryToggle) {
      foundryToggle.setAttribute("aria-expanded", value);
    }

    if (foundryToggleMobile) {
      foundryToggleMobile.setAttribute("aria-expanded", value);
    }
  }

  function openFoundryOverlay() {
    foundryOverlay.classList.add("is-open");
    siteBlurWrap.classList.add("is-blurred");
    foundryOverlay.setAttribute("aria-hidden", "false");
    setExpanded("true");
  }

  function closeFoundryOverlay() {
    foundryOverlay.classList.remove("is-open");
    siteBlurWrap.classList.remove("is-blurred");
    foundryOverlay.setAttribute("aria-hidden", "true");
    setExpanded("false");
  }

  if (foundryToggle) {
    foundryToggle.addEventListener("click", openFoundryOverlay);
  }

  if (foundryToggleMobile) {
    foundryToggleMobile.addEventListener("click", openFoundryOverlay);
  }

  foundryClose.addEventListener("click", closeFoundryOverlay);

  foundryOverlay.addEventListener("click", function (event) {
    if (event.target === foundryOverlay) {
      closeFoundryOverlay();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && foundryOverlay.classList.contains("is-open")) {
      closeFoundryOverlay();
    }
  });
}

function setupFoundryCareModal() {
  const foundryModal = document.getElementById("foundrycare-definitions");
  const foundryModalOpen = document.querySelector(".foundry-care-button");
  const foundryModalClose = document.querySelector(".foundry-modal-close");

  if (!foundryModal || !foundryModalOpen || !foundryModalClose) {
    return;
  }

  function openFoundryModal() {
    const foundryModalPanel = foundryModal.querySelector(".foundry-modal-panel");

    foundryModal.classList.add("is-open");
    foundryModal.setAttribute("aria-hidden", "false");

    if (foundryModalPanel) {
      foundryModalPanel.scrollTop = 0;
    }

    requestAnimationFrame(function () {
      const modalTitle = document.getElementById("foundrycare-definitions-title");

      if (modalTitle) {
        modalTitle.setAttribute("tabindex", "-1");
        modalTitle.focus();
      }
    });
  }

  function closeFoundryModal() {
    foundryModal.classList.remove("is-open");
    foundryModal.setAttribute("aria-hidden", "true");
    foundryModalOpen.focus();
  }

  foundryModalOpen.addEventListener("click", openFoundryModal);
  foundryModalClose.addEventListener("click", closeFoundryModal);

  foundryModal.addEventListener("click", function (event) {
    if (event.target === foundryModal) {
      closeFoundryModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && foundryModal.classList.contains("is-open")) {
      closeFoundryModal();
    }
  });
}

function setupPageTransitions() {
  document.body.classList.add("page-loaded");

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      link.hasAttribute("target")
    ) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();

      document.body.classList.add("page-exit");

      setTimeout(() => {
        window.location.href = href;
      }, 550);
    });
  });
}

setStartEmailLinks();
setConceptEmailLinks();
setupFoundryOverlay();
setupFoundryCareModal();
setupPageTransitions();
