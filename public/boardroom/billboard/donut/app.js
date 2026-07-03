document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    const overlays = {
        menu: {
            src: 'assets/images/menu.png',
            alt: 'A Hole In One signature donut menu'
        },
        catering: {
            src: 'assets/images/catering.png',
            alt: 'A Hole In One catering options'
        },
        reviews: {
            src: 'assets/images/reviews.png',
            alt: 'A Hole In One customer reviews'
        },
        contact: {
            src: 'assets/images/contact.png',
            alt: 'A Hole In One contact details and map'
        },
        order: {
            src: 'assets/images/order.png',
            alt: 'Online ordering coming soon'
        }
    };

    const setHeaderState = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    const closeMobileNav = () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        header.classList.remove('menu-open');
    };

    const openModal = (key) => {
        const overlay = overlays[key];
        if (!overlay) return;

        modalImage.src = overlay.src;
        modalImage.alt = overlay.alt;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeMobileNav();
        closeModal.focus({ preventScroll: true });
    };

    const closeOverlay = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        modalImage.removeAttribute('src');
        modalImage.alt = '';
    };

    window.addEventListener('scroll', setHeaderState);
    setHeaderState();

    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        header.classList.toggle('menu-open', isOpen);
    });

    document.querySelectorAll('[data-modal]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            openModal(trigger.dataset.modal);
        });
    });

    closeModal.addEventListener('click', closeOverlay);

    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close-modal]')) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeOverlay();
        }
    });
});
