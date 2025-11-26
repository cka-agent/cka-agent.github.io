// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize section navigation highlighting
    initSectionNavHighlight();
    
    // Feature buttons functionality
    initFeatureButtons();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Mobile sidebar toggle if needed
    initMobileSidebar();
    
    // Search button functionality
    initSearchButton();
    
    // Make header sticky on scroll
    initStickyHeader();
});

// Initialize section navigation highlighting based on scroll position
function initSectionNavHighlight() {
    const sections = document.querySelectorAll('h2[id], .feature-buttons[id], section[id]');
    const navLinks = document.querySelectorAll('.side-nav a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Highlight the current section in navigation
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && 
                scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // If we're at the top of the page and no section is highlighted,
        // highlight the first nav item (likely "Home" or "Introduction")
        if (scrollPosition < 300) {
            navLinks.forEach((link, index) => {
                link.classList.remove('active');
                if (index === 0) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Run once on initial load
}

// Initialize feature buttons
function initFeatureButtons() {
    const featureButtons = document.querySelectorAll('.feature-button');
    const demoImages = document.querySelectorAll('.demo-image');
    
    featureButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Reset all buttons
            featureButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Mark this button as active
            button.classList.add('active');
            
            // If we have matching demo images, we could show/hide them based on selection
            // This is a simplified example - in a real app, you'd likely have more complex logic
            if (demoImages.length > 0) {
                const demoIndex = Math.floor(index / 4); // Assuming 4 buttons per row
                if (demoImages[demoIndex]) {
                    // You could change the image source or content here
                    // For now, just add a small animation
                    demoImages[demoIndex].style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        demoImages[demoIndex].style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
                
                // Update active state in navigation
                document.querySelectorAll('.side-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Initialize mobile sidebar functionality
function initMobileSidebar() {
    // This would be implemented if we had a mobile toggle button
    // For now, we're using CSS media queries to handle mobile layout
    
    // Example of how we might implement this:
    /*
    const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar-nav');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        });
    }
    */
}

// Initialize search button functionality
function initSearchButton() {
    const searchButton = document.querySelector('.search-button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // In a real app, you'd open a search modal or navigate to a search page
            alert('搜索功能将在未来版本中推出！');
        });
    }
}

// Make header sticky on scroll with a slight animation
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}