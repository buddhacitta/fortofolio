// Buddha Citta Portfolio - JavaScript Functions
// Using only vanilla JavaScript as per requirements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAgeCalculator();
    initializeParticles();
    initializeNavigation();
    initializeBlogSearch();
    initializeContactForm();
    initializeAnimations();
    initializeGlobalSearch();
});

// Global Search System
function initializeGlobalSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.querySelector('.global-search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.global-search-input');
    const searchLoading = document.querySelector('.search-loading');
    const searchResults = document.querySelector('.global-search-results');
    
    if (!searchIcon || !searchOverlay) return;
    
    // Blog data for search
    const blogData = [
        {
            title: "The Future of AI in Web Development",
            excerpt: "Exploring how artificial intelligence is revolutionizing the way we build websites and applications. From automated code generation to intelligent design systems, AI is reshaping the digital landscape.",
            url: "blog/ai-web-development.html",
            tags: ["AI", "Web Development", "Technology", "Future", "Automation"]
        },
        {
            title: "Building Cyberpunk UI with Pure CSS",
            excerpt: "Creating stunning futuristic interfaces using only CSS animations and effects. Learn the techniques behind glowing elements, animated backgrounds, and immersive user experiences.",
            url: "blog/cyberpunk-ui-css.html",
            tags: ["CSS", "UI Design", "Cyberpunk", "Frontend", "Animation"]
        },
        {
            title: "Life Lessons from Code",
            excerpt: "How programming principles can guide us through life's challenges and decisions. From debugging life problems to iterating on personal growth - code as a life philosophy.",
            url: "blog/life-lessons-code.html",
            tags: ["Philosophy", "Programming", "Life", "Wisdom", "Growth"]
        },
        {
            title: "The maxEdit Vision",
            excerpt: "Introducing maxEdit - the next generation AI-powered image editor for creative professionals. Revolutionizing 2D and 3D media editing with intelligent automation and futuristic tools.",
            url: "blog/maxedit-vision.html",
            tags: ["maxEdit", "Image Editing", "AI", "Creative Tools", "Innovation"]
        }
    ];
    
    // Open search overlay
    searchIcon.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        searchIcon.classList.add('active');
        searchInput.focus();
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
    });
    
    // Close search overlay
    searchClose.addEventListener('click', closeSearch);
    
    // Close on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
    
    function closeSearch() {
        searchOverlay.classList.remove('active');
        searchIcon.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        searchLoading.classList.remove('active');
    }
    
    // Search functionality
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            showNoResults('Please enter at least 2 characters to search.');
            return;
        }
        
        // Show loading animation
        searchResults.classList.remove('active');
        searchLoading.classList.add('active');
        
        // Simulate 5-second search with loading animation
        setTimeout(() => {
            searchLoading.classList.remove('active');
            
            // Filter blog posts based on search query
            const filteredBlogs = blogData.filter(blog => 
                blog.title.toLowerCase().includes(query) ||
                blog.excerpt.toLowerCase().includes(query) ||
                blog.tags.some(tag => tag.toLowerCase().includes(query))
            );
            
            // Display results with smooth animation
            displaySearchResults(filteredBlogs, query);
        }, 5000);
    }
    
    function displaySearchResults(blogs, query) {
        if (blogs.length === 0) {
            showNoResults(`No results found for "${query}"`);
            return;
        }
        
        const resultsHTML = blogs.map((blog, index) => `
            <div class="search-result-item" style="animation-delay: ${index * 0.1}s">
                <div class="search-result-title">${highlightText(blog.title, query)}</div>
                <div class="search-result-excerpt">${highlightText(blog.excerpt, query)}</div>
                <a href="${blog.url}" class="search-result-url">${blog.url}</a>
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
        searchResults.classList.add('active');
        
        // Add click handlers to result items
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const link = this.querySelector('.search-result-url');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    }
    
    function showNoResults(message) {
        searchResults.innerHTML = `
            <div class="no-results">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <div>${message}</div>
            </div>
        `;
        searchResults.classList.add('active');
    }
    
    function highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="background: rgba(0, 255, 255, 0.3); color: #00ffff; padding: 0 2px; border-radius: 2px;">$1</span>');
    }
}

// Real-time Age Calculator
function initializeAgeCalculator() {
    const birthDate = new Date('2003-09-26');
    const targetLifespan = 90; // Average of 80-100 years
    
    function updateAge() {
        const now = new Date();
        const ageInMilliseconds = now - birthDate;
        const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
        const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
        
        // Calculate progress percentage
        const progressPercentage = (ageInYears / targetLifespan) * 100;
        
        // Calculate remaining years
        const remainingYears = Math.max(0, targetLifespan - ageInYears);
        
        // Update DOM elements
        const currentAgeElement = document.getElementById('currentAge');
        const progressFillElement = document.getElementById('progressFill');
        const daysLivedElement = document.getElementById('daysLived');
        const lifeProgressElement = document.getElementById('lifeProgress');
        const remainingYearsElement = document.getElementById('remainingYears');
        
        if (currentAgeElement) {
            currentAgeElement.textContent = ageInYears.toFixed(1);
        }
        
        if (progressFillElement) {
            progressFillElement.style.width = `${Math.min(progressPercentage, 100)}%`;
        }
        
        if (daysLivedElement) {
            daysLivedElement.textContent = ageInDays.toLocaleString();
        }
        
        if (lifeProgressElement) {
            lifeProgressElement.textContent = `${progressPercentage.toFixed(1)}%`;
        }
        
        if (remainingYearsElement) {
            remainingYearsElement.textContent = `~${Math.floor(remainingYears)}`;
        }
    }
    
    // Update immediately and then every second
    updateAge();
    setInterval(updateAge, 1000);
}

// Particle System
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Blog Search Functionality (for blogs.html page)
function initializeBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Sample blog data - in a real scenario, this would come from actual blog files
    const blogData = [
        {
            title: "The Future of AI in Web Development",
            excerpt: "Exploring how artificial intelligence is revolutionizing the way we build websites and applications.",
            url: "blog/ai-web-development.html",
            tags: ["AI", "Web Development", "Technology", "Future"]
        },
        {
            title: "Building Cyberpunk UI with Pure CSS",
            excerpt: "Creating stunning futuristic interfaces using only CSS animations and effects.",
            url: "blog/cyberpunk-ui-css.html",
            tags: ["CSS", "UI Design", "Cyberpunk", "Frontend"]
        },
        {
            title: "Life Lessons from Code",
            excerpt: "How programming principles can guide us through life's challenges and decisions.",
            url: "blog/life-lessons-code.html",
            tags: ["Philosophy", "Programming", "Life", "Wisdom"]
        },
        {
            title: "The maxEdit Vision",
            excerpt: "Introducing maxEdit - the next generation AI-powered image editor for creative professionals.",
            url: "blog/maxedit-vision.html",
            tags: ["maxEdit", "Image Editing", "AI", "Creative Tools"]
        }
    ];
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Filter blog posts based on search query
        const filteredBlogs = blogData.filter(blog => 
            blog.title.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        // Display results
        displaySearchResults(filteredBlogs);
    });
    
    function displaySearchResults(blogs) {
        if (blogs.length === 0) {
            searchResults.innerHTML = `
                <div class="content-card">
                    <p style="text-align: center; color: #cccccc;">No blog posts found matching your search.</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = blogs.map(blog => `
            <div class="blog-item">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <a href="${blog.url}" class="blog-link">Read More →</a>
            </div>
        `).join('');
        
        searchResults.innerHTML = `
            <div class="content-card">
                <h3 style="color: #00ffff; margin-bottom: 1rem;">Search Results (${blogs.length})</h3>
                ${resultsHTML}
            </div>
        `;
    }
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.btn');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual Formspree submission)
        const formData = new FormData(this);
        
        // For demonstration, we'll use a timeout to simulate network request
        setTimeout(() => {
            // In real implementation, use fetch() to submit to Formspree
            fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormSuccess();
                } else {
                    showFormError();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormError();
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        }, 2000);
        
        function showFormSuccess() {
            const successMessage = document.createElement('div');
            successMessage.className = 'success';
            successMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
            contactForm.appendChild(successMessage);
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
        
        function showFormError() {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error';
            errorMessage.textContent = 'Failed to send message. Please try again later.';
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    });
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all content cards
    document.querySelectorAll('.content-card, .feature-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .content-card,
        .feature-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .content-card.animate-in,
        .feature-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .search-result-item {
            opacity: 0;
            transform: translateY(20px);
            animation: slideInResult 0.5s ease forwards;
        }
        
        @keyframes slideInResult {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function createGlowEffect(element) {
    element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
    element.style.borderColor = '#00ffff';
}

function removeGlowEffect(element) {
    element.style.boxShadow = '';
    element.style.borderColor = '';
}

// Matrix rain effect (optional Easter egg)
function initializeMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Initialize matrix rain on special occasions (uncomment to enable)
// initializeMatrixRain();