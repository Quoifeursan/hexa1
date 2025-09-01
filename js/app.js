// Application principale
class App {
  constructor() {
    this.isInitialized = false;
  }

  // Initialiser l'application
  init() {
    if (this.isInitialized) {
      console.warn('L\'application est déjà initialisée');
      return;
    }

    try {
      // Initialiser la musique de fond
      audioManager.startBackgroundMusic();
      
      // Initialiser les event listeners
      eventManager.initEventListeners();
      
      this.isInitialized = true;
      console.log('Application initialisée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'application:', error);
    }
  }
}

// Instance globale de l'application
const app = new App();

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  app.init();
});