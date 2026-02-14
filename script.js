// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Active navbar link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling (in case needed)
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
        border-bottom: 2px solid #667eea !important;
    }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 99;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transition: display 0.3s ease, opacity 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Gallery Carousel
const galleryData = [
    { img: 'https://via.placeholder.com/800x500?text=Campus+Life', label: 'Campus Life' },
    { img: 'https://via.placeholder.com/800x500?text=Classroom', label: 'Classroom' },
    { img: 'https://via.placeholder.com/800x500?text=Events', label: 'Events' },
    { img: 'https://via.placeholder.com/800x500?text=Networking', label: 'Networking' },
    { img: 'https://via.placeholder.com/800x500?text=Graduation', label: 'Graduation' },
    { img: 'https://via.placeholder.com/800x500?text=Facilities', label: 'Facilities' }
];

let currentGalleryIndex = 0;

function initGallery() {
    const galleryDots = document.getElementById('galleryDots');
    
    // Only run on home page where gallery exists
    if (!galleryDots) return;
    
    // Create dots
    galleryData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToGalleryImage(index));
        galleryDots.appendChild(dot);
    });
}

function updateGalleryDisplay() {
    const galleryImage = document.getElementById('galleryImage');
    const galleryLabel = document.getElementById('galleryLabel');
    
    // Only run on home page where gallery exists
    if (!galleryImage || !galleryLabel) return;
    
    galleryImage.style.opacity = '0';
    setTimeout(() => {
        galleryImage.src = galleryData[currentGalleryIndex].img;
        galleryLabel.textContent = galleryData[currentGalleryIndex].label;
        galleryImage.style.opacity = '1';
    }, 250);
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentGalleryIndex);
    });
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateGalleryDisplay();
}

function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateGalleryDisplay();
}

function goToGalleryImage(index) {
    currentGalleryIndex = index;
    updateGalleryDisplay();
}

document.getElementById('nextBtn')?.addEventListener('click', nextGalleryImage);
document.getElementById('prevBtn')?.addEventListener('click', prevGalleryImage);

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', initGallery);

// Auto-scroll gallery every 5 seconds
setInterval(() => {
    if (document.hidden) return;
    nextGalleryImage();
}, 5000);

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextGalleryImage();
    if (e.key === 'ArrowLeft') prevGalleryImage();
});


// News box animation - already handled by CSS animations
// Just ensure the boxes are visible when they come into view
const newsBoxes = document.querySelectorAll('.news-scroll-box');
const newsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.3
});

newsBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transition = 'opacity 0.6s ease';
    newsObserver.observe(box);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
});

// About Us Page Sidebar Navigation
document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    console.log('Found sidebar items:', sidebarItems.length);
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            console.log('Clicked section:', section);
            
            // Remove active class from all sidebar items and sections
            document.querySelectorAll('.sidebar-item').forEach(el => {
                el.classList.remove('active');
            });
            
            document.querySelectorAll('.content-section').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            const sectionElement = document.getElementById(section);
            console.log('Section element found:', section, sectionElement);
            if (sectionElement) {
                sectionElement.classList.add('active');
                console.log('Active class added to:', section);
            }
        });
    });
});

console.log('HNCC MBA Website loaded successfully!');
