// AOS is initialized in each HTML file's inline script after the library loads.
// This file handles all interactive behavior only.

const loader = document.getElementById('loader');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// --- Loader Functions ---

function hideLoader() {
    loader.style.transition = '0.8s ease-in-out';
    loader.style.opacity = '0';
    loader.style.filter = 'blur(10px)';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 800);
}

function showLoader() {
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    loader.style.filter = 'blur(0px)';
}

// --- Event Listeners ---

// 1. Initial Page Load: Hide loader once page is ready
window.addEventListener('load', () => {
    hideLoader();
});

// 2. Page Exit Transition: Show loader when navigating away
window.addEventListener('beforeunload', () => {
    showLoader();
});

// 3. Smooth Internal Scrolling & Menu Auto-Close
// Handles same-page anchor links (e.g. #programs)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetID = this.getAttribute('href');
        // Skip if it's just "#" with no target
        if (targetID === '#') return;

        const targetElement = document.querySelector(targetID);
        if (targetElement) {
            e.preventDefault();
            showLoader();

            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'auto'
                });
                hideLoader();
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fas fa-bars';
            }, 700);
        }
    });
});

// 4. Navigation Drawer Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// 5. Close menu on any nav link or join button click
document.querySelectorAll('.nav-links a, .join-btn').forEach(element => {
    element.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').className = 'fas fa-bars';
    });
});
