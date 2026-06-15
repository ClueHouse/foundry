const EMAIL = "thefoundry@rkdb.nz";

function encodeMail(body) {
  return encodeURIComponent(body);
}

function setStartEmailLinks() {
  const links = document.querySelectorAll(".email-start");
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
  const concept =
    document.querySelector("[data-concept]")?.dataset.concept ||
    "A Foundry Possibility";

  const links = document.querySelectorAll(".email-concept");
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
    if (event.key === "Escape") {
      closeFoundryOverlay();
    }
  });
}

setStartEmailLinks();
setConceptEmailLinks();
setupFoundryOverlay();
