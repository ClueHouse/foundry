const sortButton = document.getElementById('sortButton');
const backButton = document.getElementById('backButton');

const introPanel = document.getElementById('introPanel');
const sortPanel = document.getElementById('sortPanel');
const exploreScreen = document.getElementById("exploreScreen");

let isTransitioning = false;

function showSortPanel() {
    if (isTransitioning) {
        return;
    }

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
        introPanel.classList.remove('is-active');
        introPanel.setAttribute('aria-hidden', 'true');

        sortPanel.classList.add('is-active');
        sortPanel.setAttribute('aria-hidden', 'false');

        return;
    }

    isTransitioning = true;
    sortButton.disabled = true;

    document.body.classList.add('is-forging');

    window.setTimeout(() => {
        introPanel.classList.remove('is-active');
        introPanel.setAttribute('aria-hidden', 'true');

        sortPanel.classList.add('is-active');
        sortPanel.setAttribute('aria-hidden', 'false');
    }, 1093);

    window.setTimeout(() => {
        document.body.classList.remove('is-forging');

        sortButton.disabled = false;
        isTransitioning = false;
    }, 2358);
}

function showIntroPanel() {
    document.documentElement.classList.remove("restore-explore");
    document.body.classList.remove("explore-open");
    if (typeof exploreScreen !== "undefined" && exploreScreen) {
        exploreScreen.setAttribute("aria-hidden", "true");
    }
    if (isTransitioning) {
        return;
    }

    sortPanel.classList.remove("is-active");
    sortPanel.setAttribute("aria-hidden", "true");

    introPanel.classList.remove("is-active", "is-arriving", "home-return", "landing-enter");
    introPanel.setAttribute("aria-hidden", "true");

    void introPanel.offsetWidth;

    introPanel.classList.add("is-active", "landing-enter");
    introPanel.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
        introPanel.classList.remove("landing-enter");
    }, 1050);
}

sortButton.addEventListener('click', showSortPanel);
backButton.addEventListener('click', showIntroPanel);


/* =========================================================
   FOUNDRY DRAWER CONTROLLER
   ========================================================= */

const menuButton = document.querySelector('.menu-button');
const siteDrawer = document.getElementById('siteDrawer');
const menuBackdrop = document.getElementById('menuBackdrop');

const drawerHome = document.querySelector(
    '[data-drawer-action="home"]'
);

const drawerSite = document.querySelector(
    '[data-drawer-action="site"]'
);

function openDrawer() {
    document.body.classList.add('menu-open');

    menuButton.setAttribute('aria-label', 'Close menu');
    menuButton.setAttribute('aria-expanded', 'true');

    siteDrawer.setAttribute('aria-hidden', 'false');
    menuBackdrop.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
    document.body.classList.remove('menu-open');

    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.setAttribute('aria-expanded', 'false');

    siteDrawer.setAttribute('aria-hidden', 'true');
    menuBackdrop.setAttribute('aria-hidden', 'true');
}

function toggleDrawer() {
    if (document.body.classList.contains('menu-open')) {
        closeDrawer();
    } else {
        openDrawer();
    }
}

menuButton.setAttribute('aria-expanded', 'false');
menuButton.setAttribute('aria-controls', 'siteDrawer');

menuButton.addEventListener('click', toggleDrawer);

menuBackdrop.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
    if (
        event.key === 'Escape' &&
        document.body.classList.contains('menu-open')
    ) {
        closeDrawer();
        menuButton.focus();
    }
});


/* HOME */

drawerHome.addEventListener("click", () => {
    closeDrawer();

    window.setTimeout(() => {
        showIntroPanel();
    }, 600);
});


/* MAKE ME A SITE */

drawerSite.addEventListener('click', () => {
    closeDrawer();

    window.setTimeout(() => {
        if (typeof showSortPanel === 'function') {
            showSortPanel();
        }
    }, 380);
});


/* LET ME CHOOSE */

function showExploreScreen() {
    closeDrawer();

    document.body.classList.add("explore-open");

    introPanel.setAttribute("aria-hidden", "true");
    exploreScreen.setAttribute("aria-hidden", "false");
}

exploreButton.addEventListener("click", showExploreScreen);


/* Real navigation links close the drawer before the existing page transition runs. */
document.querySelectorAll('.drawer-link[href]').forEach((link) => {
    link.addEventListener('click', closeDrawer);
});

window.addEventListener('DOMContentLoaded', () => {
    introPanel.classList.remove('is-arriving', 'home-return');
    introPanel.classList.add('landing-enter');
    window.setTimeout(() => introPanel.classList.remove('landing-enter'), 1050);
});

/* Restore Explore when returning from a subpage via /#explore */
function restoreExploreFromHash() {
    if (window.location.hash === "#explore") {
        showExploreScreen();
    }
}

window.addEventListener("DOMContentLoaded", restoreExploreFromHash);
window.addEventListener("hashchange", restoreExploreFromHash);
