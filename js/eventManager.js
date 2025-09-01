// Gestionnaire d'événements
class EventManager {
  constructor() {
    this.buttons = {};
    this.initButtons();
  }

  // Initialiser les boutons
  initButtons() {
    // Boutons principaux
    this.buttons.playButton = document.getElementById('playButton');
    this.buttons.rulesButton = document.getElementById('rulesButton');
    this.buttons.loreButton = document.getElementById('loreButton');
    
    // Boutons de fermeture des modales
    this.buttons.closeRulesButton = document.getElementById('closeRulesButton');
    this.buttons.closeLoreButton = document.getElementById('closeLoreButton');
    
    // Boutons audio
    this.buttons.enableAudioButton = document.getElementById('enableAudioButton');
    this.buttons.closeAudioModalButton = document.getElementById('closeAudioModalButton');
  }

  // Initialiser tous les event listeners
  initEventListeners() {
    this.initMainButtonListeners();
    this.initModalButtonListeners();
    this.initAudioButtonListeners();
    modalManager.initModalEventListeners();
  }

  // Initialiser les event listeners des boutons principaux
  initMainButtonListeners() {
    if (this.buttons.playButton) {
      this.buttons.playButton.addEventListener('click', () => {
        navigationManager.startGame();
      });
    }
    
    if (this.buttons.rulesButton) {
      this.buttons.rulesButton.addEventListener('click', () => {
        modalManager.showRules();
      });
    }
    
    if (this.buttons.loreButton) {
      this.buttons.loreButton.addEventListener('click', () => {
        modalManager.showLore();
      });
    }
  }

  // Initialiser les event listeners des boutons de modales
  initModalButtonListeners() {
    if (this.buttons.closeRulesButton) {
      this.buttons.closeRulesButton.addEventListener('click', () => {
        modalManager.closeRules();
      });
    }
    
    if (this.buttons.closeLoreButton) {
      this.buttons.closeLoreButton.addEventListener('click', () => {
        modalManager.closeLore();
      });
    }
  }

  // Initialiser les event listeners des boutons audio
  initAudioButtonListeners() {
    if (this.buttons.enableAudioButton) {
      this.buttons.enableAudioButton.addEventListener('click', () => {
        audioManager.playClickSound();
        audioManager.startBackgroundMusic();
      });
    }
    
    if (this.buttons.closeAudioModalButton) {
      this.buttons.closeAudioModalButton.addEventListener('click', () => {
        audioManager.playClickSound();
        audioManager.hideAudioPermissionOverlay();
      });
    }
  }

}

// Instance globale du gestionnaire d'événements
const eventManager = new EventManager();
