// Gestionnaire de modales
class ModalManager {
  constructor() {
    this.modals = {};
    this.initModals();
  }

  // Initialiser les modales
  initModals() {
    // Récupérer toutes les modales
    const modalElements = document.querySelectorAll('.game-modal');
    modalElements.forEach(modal => {
      this.modals[modal.id] = modal;
    });
  }

  // Afficher une modale
  showModal(modalId) {
    audioManager.playClickSound();
    const modal = this.modals[modalId];
    if (modal) {
      modal.showModal();
    }
  }

  // Fermer une modale
  closeModal(modalId) {
    audioManager.playClickSound();
    const modal = this.modals[modalId];
    if (modal) {
      modal.close();
      // Retirer le focus du bouton pour éviter la fermeture par Espace
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }
  }

  // Fermer toutes les modales
  closeAllModals() {
    Object.values(this.modals).forEach(modal => {
      modal.close();
    });
  }

  // Afficher les règles
  showRules() {
    this.showModal('rules');
  }

  // Afficher l'histoire
  showLore() {
    this.showModal('lore');
  }

  // Fermer les règles
  closeRules() {
    this.closeModal('rules');
  }

  // Fermer l'histoire
  closeLore() {
    this.closeModal('lore');
  }

  // Initialiser les event listeners des modales
  initModalEventListeners() {
    // Fermer les modales avec la touche Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Fermer les modales en cliquant à l'extérieur
    Object.values(this.modals).forEach(modal => {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.close();
        }
      });
    });
  }
}

// Instance globale du gestionnaire de modales
const modalManager = new ModalManager();