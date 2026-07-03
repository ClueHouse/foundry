document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close-modal');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = mobileNav.style.display === 'block' ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = mobileNav.style.display === 'block' ? '0' : '1';
        spans[2].style.transform = mobileNav.style.display === 'block' ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });

    // Modal logic
    const showModal = (text) => {
        modalText.textContent = text;
        modal.style.display = 'block';
    };

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Button clicks
    document.querySelectorAll('.order-btn, .order-btn-header').forEach(btn => {
        btn.addEventListener('click', () => {
            showModal('Online ordering coming soon.');
        });
    });

    document.querySelector('.menu-btn').addEventListener('click', () => {
        showModal('Menu is currently being updated. Please check back soon!');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    } else {
                        // If target section does not exist, show a modal
                        const linkText = this.textContent.toLowerCase();
                        showModal(`The ${linkText} section is coming soon! Please check back later.`);
                    }
                    
                    // Close mobile nav if open
                    if (mobileNav.style.display === 'block') {
                        hamburger.click();
                    }
            }
        });
    });
});
