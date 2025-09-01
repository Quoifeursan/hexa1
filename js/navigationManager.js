// Gestionnaire de navigation
class NavigationManager {
  constructor() {
    this.currentPage = 'index';
  }

  // Démarrer le jeu
  startGame() {
    audioManager.playClickSound();
    
    // Animation de transition de 3 secondes
    const overlay = document.getElementById('fadeOverlay');
    if (overlay) {
      overlay.classList.add('fade-to-black');
      overlay.style.pointerEvents = 'all';
    }

    // Fondu du volume de la musique de fond pendant 3 secondes
    audioManager.fadeOutBackgroundMusic(3000);

    // Redirection vers la page de jeu après l'animation de 3 secondes
    setTimeout(() => {
      window.location.href = 'game.html';
    }, 3000);
  }

  // Retourner à la page d'accueil
  goToHome() {
    audioManager.playClickSound();
    
    // Animation de transition
    const overlay = document.getElementById('fadeOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    }

    // Redirection vers la page d'accueil après l'animation
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  }

  // Obtenir la page actuelle
  getCurrentPage() {
    return this.currentPage;
  }

  // Définir la page actuelle
  setCurrentPage(page) {
    this.currentPage = page;
  }
}

// Instance globale du gestionnaire de navigation
const navigationManager = new NavigationManager();
