/**
 * NAVIGATION.JS
 * Gestion du menu hamburger et de la navigation mobile
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

/**
 * Initialise la navigation
 */
function initNavigation() {
  const toggle = document.querySelector('.navigation__toggle');
  const menu = document.querySelector('.navigation__menu');
  const menuLinks = document.querySelectorAll('.navigation__menu a');
  const body = document.body;
  
  // Créer l'overlay pour le menu mobile
  createOverlay();
  const overlay = document.querySelector('.navigation-overlay');
  
  if (!toggle || !menu) return;
  
  // Toggle du menu au clic sur le hamburger
  toggle.addEventListener('click', () => {
    toggleMenu(toggle, menu, overlay, body);
  });
  
  // Fermer le menu au clic sur l'overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMenu(toggle, menu, overlay, body);
    });
  }
  
  // Fermer le menu au clic sur un lien
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Attendre un peu avant de fermer pour que l'animation soit visible
      setTimeout(() => {
        closeMenu(toggle, menu, overlay, body);
      }, 300);
    });
  });
  
  // Fermer le menu avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu(toggle, menu, overlay, body);
    }
  });
  
  // Marquer le lien actif selon la page courante
  setActiveLink();
  
  // Gérer le resize de la fenêtre
  handleResize(toggle, menu, overlay, body);
}

/**
 * Créer l'overlay pour le menu mobile
 */
function createOverlay() {
  if (document.querySelector('.navigation-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.className = 'navigation-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
}

/**
 * Toggle le menu (ouvrir/fermer)
 */
function toggleMenu(toggle, menu, overlay, body) {
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    closeMenu(toggle, menu, overlay, body);
  } else {
    openMenu(toggle, menu, overlay, body);
  }
}

/**
 * Ouvrir le menu
 */
function openMenu(toggle, menu, overlay, body) {
  toggle.setAttribute('aria-expanded', 'true');
  menu.classList.add('navigation__menu--active');
  overlay?.classList.add('active');
  body.style.overflow = 'hidden'; // Empêcher le scroll du body
  
  // Focus sur le premier lien du menu pour l'accessibilité
  const firstLink = menu.querySelector('a');
  if (firstLink) {
    setTimeout(() => firstLink.focus(), 300);
  }
}

/**
 * Fermer le menu
 */
function closeMenu(toggle, menu, overlay, body) {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('navigation__menu--active');
  overlay?.classList.remove('active');
  body.style.overflow = ''; // Rétablir le scroll
}

/**
 * Marquer le lien actif selon l'URL courante
 */
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navigation__menu a');
  
  links.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    // Retirer toutes les classes active
    link.classList.remove('active');
    
    // Ajouter active au lien correspondant
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/**
 * Gérer le resize de la fenêtre
 * Fermer le menu si on passe en mode desktop
 */
function handleResize(toggle, menu, overlay, body) {
  let resizeTimer;
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    
    resizeTimer = setTimeout(() => {
      // Si on est en mode desktop (>= 1110px), fermer le menu
      if (window.innerWidth >= 1110) {
        closeMenu(toggle, menu, overlay, body);
      }
    }, 250);
  });
}

/**
 * Smooth scroll vers une ancre
 * Utile pour le bouton "About Me" qui scroll vers la section suivante
 */
function initSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Si c'est juste "#", ignorer
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Mettre le focus sur l'élément cible pour l'accessibilité
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }
    });
  });
}

// Initialiser le smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
});

/**
 * Trap focus dans le menu mobile quand il est ouvert
 * Pour une meilleure accessibilité au clavier
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab seul
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}

// Export pour utilisation dans d'autres fichiers si nécessaire
export { 
  initNavigation, 
  toggleMenu, 
  openMenu, 
  closeMenu, 
  setActiveLink,
  initSmoothScroll,
  trapFocus
};
