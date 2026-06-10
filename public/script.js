const EMAIL = "foundry@rkdb.nz";

function encodeMail(body) {
  return encodeURIComponent(body).replace(/%20/g, "+");
}

function setStartEmailLinks() {
  const links = document.querySelectorAll(".email-start");
  const subject = "Hand Me The Problem";
const body = `You're only a few clicks away from having a website.

There is no obligation.

I'll do some homework and come back with a few mockups.

If one feels right, we'll refine it together.

If not, no harm done.

In a few sentences, tell me who you are, where you are, and what you'd like your customers to know.
`;
  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeMail(body)}`;
  });
}

function setConceptEmailLinks() {
  const concept = document.querySelector("[data-concept]")?.dataset.concept || "A Foundry Possibility";
  const links = document.querySelectorAll(".email-concept");
  const subject = `Foundry Concept Interest - ${concept}`;
  const body = `I like this direction: ${concept}

Tell me who you are and I'll spend a little time getting to know your business.

Business name:

Business address:

What do you do?

What do you like about this example?

Anything else you'd like me to know?
`;
  links.forEach((link) => {
    link.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeMail(body)}`;
  });
}

setStartEmailLinks();
setConceptEmailLinks();
