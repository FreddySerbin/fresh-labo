/**
 * MAIN.JS
 * Script principal pour le portfolio Alex Spencer
 * Gestion du smooth scroll, des animations et interactions générales
 */

document.addEventListener('DOMContentLoaded', () => {
  init();
});

/**
 * Initialisation principale
 */
function init() {
  initSmoothScroll();
  initScrollAnimations();
  initBackToTop();
  logWelcomeMessage();
}

/**
 * Smooth scroll pour les liens d'ancre
 */
function initSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Ignorer si c'est juste "#"
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculer la position avec un offset pour le header si nécessaire
        const headerHeight = 100; // Ajuster selon la hauteur du header
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Focus sur l'élément cible pour l'accessibilité
        setTimeout(() => {
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          
          // Retirer le tabindex après focus
          targetElement.addEventListener('blur', function() {
            this.removeAttribute('tabindex');
          }, { once: true });
        }, 500);
      }
    });
  });
}

/**
 * Animations au scroll
 * Ajoute une classe "visible" aux éléments quand ils entrent dans le viewport
 */
function initScrollAnimations() {
  // Vérifier si IntersectionObserver est supporté
  if (!('IntersectionObserver' in window)) {
    // Si pas supporté, rendre tous les éléments visibles immédiatement
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }
  
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -100px 0px', // déclencher un peu avant que l'élément soit visible
    threshold: 0.1 // 10% de l'élément doit être visible
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionnel : arrêter d'observer après l'animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observer tous les éléments avec la classe .animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

/**
 * Bouton retour en haut de page
 */
function initBackToTop() {
  // Créer le bouton s'il n'existe pas déjà
  let backToTopButton = document.querySelector('.back-to-top');
  
  if (!backToTopButton) {
    backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Retour en haut de page');
    document.body.appendChild(backToTopButton);
  }
  
  // Afficher/masquer le bouton selon la position du scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll vers le haut au clic
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Gestion du chargement des images lazy
 */
function initLazyLoading() {
  // Vérifier si IntersectionObserver est supporté
  if (!('IntersectionObserver' in window)) {
    // Charger toutes les images immédiatement
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
    return;
  }
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Charger l'image
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        // Ajouter une classe quand l'image est chargée
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
        
        // Arrêter d'observer cette image
        imageObserver.unobserve(img);
      }
    });
  });
  
  // Observer toutes les images avec data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * Détection du mode préféré (dark/light)
 * Utile pour une future implémentation du dark mode
 */
function detectColorScheme() {
  // Vérifier si le navigateur supporte prefers-color-scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Mode sombre détecté');
    // document.body.classList.add('dark-mode');
  }
  
  // Écouter les changements
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      console.log('Passage en mode sombre');
      // document.body.classList.add('dark-mode');
    } else {
      console.log('Passage en mode clair');
      // document.body.classList.remove('dark-mode');
    }
  });
}

/**
 * Amélioration de l'accessibilité au clavier
 */
function enhanceKeyboardAccessibility() {
  // Ajouter un indicateur visuel pour la navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

/**
 * Utilitaire : Debounce pour optimiser les événements
 */
function debounce(func, wait = 250) {
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

/**
 * Gestion du resize de la fenêtre
 */
function handleResize() {
  const debouncedResize = debounce(() => {
    // Mettre à jour les hauteurs calculées en CSS custom properties
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    
    console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
  }, 250);
  
  window.addEventListener('resize', debouncedResize);
  
  // Appel initial
  debouncedResize();
}

/**
 * Message de bienvenue dans la console
 */
function logWelcomeMessage() {
  const styles = [
    'color: #5FB4A2',
    'font-size: 16px',
    'font-weight: bold',
    'padding: 10px'
  ].join(';');
  
  console.log('%c👋 Bienvenue sur mon portfolio !', styles);
  console.log('%cDéveloppé par Alex Spencer', 'color: #33323D; font-size: 12px;');
  console.log('%cHTML5 • CSS3 • JavaScript Vanilla', 'color: #828282; font-size: 11px;');
}

/**
 * Gestion des erreurs JavaScript
 */
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript détectée:', e.message);
  // En production, on pourrait envoyer l'erreur à un service de tracking
});

/**
 * Détection de la connexion réseau
 */
function checkOnlineStatus() {
  window.addEventListener('online', () => {
    console.log('Connexion rétablie');
    // Afficher un message à l'utilisateur
  });
  
  window.addEventListener('offline', () => {
    console.log('Connexion perdue');
    // Afficher un message à l'utilisateur
  });
}

/**
 * Performance : Précharger les pages au survol des liens
 */
function initLinkPrefetch() {
  const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      
      // Vérifier si le lien n'est pas déjà préchargé
      if (!document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    }, { once: true });
  });
}

// Initialiser les fonctionnalités supplémentaires
document.addEventListener('DOMContentLoaded', () => {
  enhanceKeyboardAccessibility();
  handleResize();
  checkOnlineStatus();
  initLazyLoading();
  initLinkPrefetch();
  // detectColorScheme(); // Décommenter pour activer la détection du mode sombre
});

// Export pour utilisation dans d'autres fichiers si nécessaire
export {
  init,
  initSmoothScroll,
  initScrollAnimations,
  initBackToTop,
  initLazyLoading,
  debounce,
  handleResize,
  enhanceKeyboardAccessibility,
  detectColorScheme
};
