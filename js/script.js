//By Radcircles
// Variables globales
let isMenuOpen = false;
const menuDeroulant = document.querySelector('.Menu-deroulant');
const nav = document.querySelector('nav');

// Effet de machine à écrire
const typewriterWords = ['développeur', 'étudiant en informatique', 'passionné d informatique'];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter-text');

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentWord = typewriterWords[currentWordIndex];
    
    if (isDeleting) {
        // Supprimer des caractères
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % typewriterWords.length;
            setTimeout(typeWriter, 500); // Pause avant le prochain mot
            return;
        }
        setTimeout(typeWriter, 50);
    } else {
        // Ajouter des caractères
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause avant de supprimer
            return;
        }
        setTimeout(typeWriter, 100);
    }
}

// Menu hamburger - Ouvrir
function hamburg() {
    if (!menuDeroulant) return;
    
    isMenuOpen = true;
    menuDeroulant.style.display = 'block';
    menuDeroulant.classList.add('active');
    
    // Animation d'ouverture
    setTimeout(() => {
        menuDeroulant.style.opacity = '1';
        menuDeroulant.style.transform = 'translateY(0)';
    }, 10);
    
    // Bloquer le scroll du body
    document.body.style.overflow = 'hidden';
}

// Menu hamburger - Fermer
function ferme() {
    if (!menuDeroulant) return;
    
    isMenuOpen = false;
    menuDeroulant.style.opacity = '0';
    menuDeroulant.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        menuDeroulant.style.display = 'none';
        menuDeroulant.classList.remove('active');
    }, 300);
    
    // Restaurer le scroll du body
    document.body.style.overflow = 'auto';
}

// Fermer le menu en cliquant à l'extérieur
function handleOutsideClick(event) {
    if (isMenuOpen && menuDeroulant && !menuDeroulant.contains(event.target) && !event.target.classList.contains('hamburg')) {
        ferme();
    }
}

// Effet de scroll sur la navigation
function handleNavScroll() {
    if (!nav) return;
    
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
}

// Animation au scroll (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 1s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec animation
    const animatedElements = document.querySelectorAll('.project-card, .container li, form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Gestion du formulaire de contact
function initContactForm() {
    const form = document.querySelector('form');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation simple
        if (!nom || !prenom || !email || !message) {
            showMessage(errorMessage, 'Veuillez remplir tous les champs correctement.');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(errorMessage, 'Veuillez entrer une adresse email valide.');
            return;
        }
        
        // Simulation d'envoi réussi
        showMessage(confirmationMessage, 'Merci pour votre message ! Je vous répondrai bientôt.');
        form.reset();
        
    });
}

// Afficher les messages de confirmation/erreur
function showMessage(element, text) {
    if (!element) return;
    
    // Cacher tous les messages d'abord
    const allMessages = document.querySelectorAll('#confirmationMessage, #errorMessage');
    allMessages.forEach(msg => {
        msg.style.display = 'none';
        msg.style.opacity = '0';
    });
    
    // Afficher le message requis
    element.textContent = text;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
    
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }, 5000);
}

// Smooth scrolling pour les liens d'ancrage
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Effet parallax subtil sur l'image de profil
function initParallaxEffect() {
    const profileImage = document.querySelector('.image img');
    if (!profileImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        profileImage.style.transform = `translateY(${rate}px) scale(1)`;
    });
}

// Gestion du thème (optionnel)
function initThemeToggle() {
    // Détection de la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Écouter les changements de préférence
    prefersDark.addEventListener('change', (e) => {
        // Ici vous pouvez ajouter une logique pour basculer le thème
        console.log('Thème système changé:', e.matches ? 'sombre' : 'clair');
    });
}

// Animation des éléments au hover
function initHoverAnimations() {
    // Animation des cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animation des icônes sociales
    const socialIcons = document.querySelectorAll('.reseau-sociaux a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Gestion du redimensionnement de la fenêtre
function handleResize() {
    // Fermer le menu mobile si on passe en desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        ferme();
    }
    
    // Ajuster les animations selon la taille d'écran
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Désactiver certaines animations sur mobile pour les performances
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }
}

// Performance: Throttle pour les événements fréquents
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialisé ✨');
    
    // Initialiser toutes les fonctionnalités
    setTimeout(typeWriter, 1000); // Démarrer l'animation de frappe après 1s
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffect();
    initThemeToggle();
    initHoverAnimations();
    
    // Événements
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', throttle(handleNavScroll, 10));
    window.addEventListener('resize', throttle(handleResize, 250));
    
    // Animation d'entrée pour les éléments principaux
    setTimeout(() => {
        const mainElements = document.querySelectorAll('.content, .image');
        mainElements.forEach((el, index) => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        });
    }, 100);
});

// Préchargement des images pour de meilleures performances
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

// Gestion des erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // En production, vous pourriez envoyer cette erreur à un service de monitoring
});

// Exposer les fonctions globalement pour les gestionnaires d'événements inline
window.hamburg = hamburg;
window.ferme = ferme;

// Initialisation du préchargement des images
document.addEventListener('DOMContentLoaded', preloadImages);