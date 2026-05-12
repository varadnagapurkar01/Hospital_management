// ===================================
// VKVV HOSPITAL MANAGEMENT SYSTEM
// Dynamic JavaScript File
// ===================================

// ===== DYNAMIC DATA =====
const services = [
    {
        icon: 'fa-heart-pulse',
        title: 'Cardiology',
        description: 'Advanced heart care with state-of-the-art technology and expert cardiologists.'
    },
    {
        icon: 'fa-brain',
        title: 'Neurology',
        description: 'Comprehensive neurological care for brain and nervous system disorders.'
    },
    {
        icon: 'fa-bone',
        title: 'Orthopedics',
        description: 'Expert bone and joint care including surgeries and rehabilitation.'
    },
    {
        icon: 'fa-tooth',
        title: 'Dental Care',
        description: 'Complete dental solutions from routine checkups to advanced procedures.'
    },
    {
        icon: 'fa-eye',
        title: 'Ophthalmology',
        description: 'Specialized eye care services with modern diagnostic equipment.'
    },
    {
        icon: 'fa-baby',
        title: 'Pediatrics',
        description: 'Compassionate healthcare for infants, children, and adolescents.'
    },
    {
        icon: 'fa-x-ray',
        title: 'Radiology',
        description: 'Advanced imaging services including MRI, CT scan, and X-rays.'
    },
    {
        icon: 'fa-pills',
        title: 'Pharmacy',
        description: '24/7 pharmacy services with home delivery and online prescriptions.'
    }
];

const doctors = [
    {
        name: 'Dr. Rajesh Sharma',
        specialty: 'Cardiologist',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
        rating: 5
    },
    {
        name: 'Dr. Priya Patil',
        specialty: 'Neurologist',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
        rating: 5
    },
    {
        name: 'Dr. Amit Deshmukh',
        specialty: 'Orthopedic Surgeon',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
        rating: 4
    },
    {
        name: 'Dr. Sneha Kulkarni',
        specialty: 'Pediatrician',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
        rating: 5
    }
];

// ===== LOAD SERVICES DYNAMICALLY =====
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card fade-in">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// ===== LOAD DOCTORS DYNAMICALLY =====
function loadDoctors() {
    const doctorsGrid = document.getElementById('doctorsGrid');
    if (!doctorsGrid) return;
    
    doctorsGrid.innerHTML = doctors.map(doctor => {
        const stars = '★'.repeat(doctor.rating) + '☆'.repeat(5 - doctor.rating);
        return `
            <div class="doctor-card fade-in">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-img">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <p class="specialty">${doctor.specialty}</p>
                    <div class="rating">${stars}</div>
                    <div class="doctor-social">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== ANIMATED COUNTER =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString() + '+';
            }
        };
        updateCount();
    });
}

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
function setupCounterObserver() {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
}

// ===== MOBILE MENU TOGGLE =====
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// ===== ACTIVE NAVIGATION LINK =====
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .role-card, .doctor-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== WELCOME MESSAGE =====
function showWelcomeMessage() {
    console.log('%c🏥 Welcome to VKVV Hospital Management System!', 
        'color: #00b4d8; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ by VKVV IT World', 
        'color: #f72585; font-size: 14px;');
    console.log('%cPowered by AWS Cloud ☁️', 
        'color: #ff6b35; font-size: 12px;');
}

// ===== CURRENT TIME GREETING =====
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    console.log(`%c${greeting}! Welcome to VKVV Hospital 🌟`, 
        'color: #0077b6; font-size: 16px;');
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadDoctors();
    setupCounterObserver();
    setupMobileMenu();
    setupNavbarScroll();
    setupActiveNav();
    setupScrollReveal();
    showWelcomeMessage();
    setGreeting();
});