(function() {
    'use strict';

    // Create mobile menu structure
    function createMobileMenu() {
        // Check if we're on mobile
        if (window.innerWidth > 991) return;

        // Create mobile menu HTML
        const mobileMenuHTML = `
            <!-- Mobile Menu Toggle Button -->
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <!-- Mobile Drawer Overlay -->
            <div class="mobile-drawer-overlay" id="mobileDrawerOverlay"></div>

            <!-- Mobile Side Drawer -->
            <div class="mobile-side-drawer" id="mobileSideDrawer">
                <!-- Drawer Header -->
                <div class="mobile-drawer-header">
                    <img src="img/fam1.jpg" alt="Famous Technology Logo">
                    <h6>Famous Technology and Industrial Services Limited</h6>
                </div>

                <!-- Drawer Menu -->
                <ul class="mobile-drawer-menu">
                    <li>
                        <a href="index.html" class="active">
                            <i class="fas fa-home"></i>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="about.html">
                            <i class="fas fa-info-circle"></i>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="service.html">
                            <i class="fas fa-tools"></i>
                            Services
                        </a>
                    </li>
                    <li class="mobile-drawer-dropdown">
                        <a href="#" class="dropdown-toggle">
                            <i class="fas fa-file-alt"></i>
                            Pages
                        </a>
                        <ul class="mobile-drawer-submenu">
                            <li>
                                <a href="certificates.html">
                                    <i class="fas fa-certificate"></i>
                                    Certificates
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="contact.html">
                            <i class="fas fa-envelope"></i>
                            Contact Us
                        </a>
                    </li>
                </ul>

                <!-- Drawer Footer -->
                <div class="mobile-drawer-footer">
                    <div class="contact-item">
                        <i class="fas fa-phone-alt"></i>
                        <span>+234 9067004758</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>famoustechnq@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Port Harcourt, Rivers State</span>
                    </div>
                </div>
            </div>
        `;

        // Find navbar and add mobile menu elements
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Remove default Bootstrap toggle if exists
            const defaultToggle = navbar.querySelector('.navbar-toggler');
            if (defaultToggle) {
                defaultToggle.remove();
            }

            // Insert mobile menu HTML after navbar
            navbar.insertAdjacentHTML('beforeend', mobileMenuHTML);
        }
    }

    // Initialize mobile menu functionality
    function initMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const drawer = document.getElementById('mobileSideDrawer');
        const overlay = document.getElementById('mobileDrawerOverlay');
        const dropdownToggles = document.querySelectorAll('.mobile-drawer-dropdown > a');

        if (!menuToggle || !drawer || !overlay) return;

        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            closeMenu();
        });

        // Handle dropdown toggles
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            });
        });

        // Close menu when clicking a non-dropdown link
        const menuLinks = document.querySelectorAll('.mobile-drawer-menu > li > a:not(.dropdown-toggle)');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Set active menu item based on current page
        setActiveMenuItem();
    }

    // Toggle menu open/close
    function toggleMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const drawer = document.getElementById('mobileSideDrawer');
        const overlay = document.getElementById('mobileDrawerOverlay');

        menuToggle.classList.toggle('active');
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('drawer-open');
    }

    // Close menu
    function closeMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const drawer = document.getElementById('mobileSideDrawer');
        const overlay = document.getElementById('mobileDrawerOverlay');

        menuToggle.classList.remove('active');
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('drawer-open');
    }

    // Set active menu item based on current page
    function setActiveMenuItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuLinks = document.querySelectorAll('.mobile-drawer-menu a');

        menuLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 991) {
            // Remove mobile menu elements on desktop
            const mobileElements = [
                document.getElementById('mobileMenuToggle'),
                document.getElementById('mobileSideDrawer'),
                document.getElementById('mobileDrawerOverlay')
            ];

            mobileElements.forEach(function(element) {
                if (element && element.parentNode) {
                    element.remove();
                }
            });

            document.body.classList.remove('drawer-open');
        } else {
            // Recreate mobile menu if it doesn't exist
            if (!document.getElementById('mobileMenuToggle')) {
                createMobileMenu();
                initMobileMenu();
            }
        }
    }

    // Initialize on page load
    function init() {
        if (window.innerWidth <= 991) {
            createMobileMenu();
            initMobileMenu();
        }

        // Handle window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                handleResize();
            }, 250);
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
