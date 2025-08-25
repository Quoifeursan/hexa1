// Fonction pour démarrer le jeu
function startGame() {
  window.location.href = 'game.html';
}

// Fonction pour afficher les règles
function showRules() {
  document.getElementById('rules').showModal();
}

// Fonction pour afficher l'histoire
function showLore() {
  document.getElementById('lore').showModal();
}

// Fonction pour fermer les modales
function closeModal(modalId) {
  document.getElementById(modalId).close();
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  // Ajout des event listeners pour les boutons
  const playButton = document.getElementById('playButton');
  const rulesButton = document.getElementById('rulesButton');
  const loreButton = document.getElementById('loreButton');
  
  if (playButton) {
    playButton.addEventListener('click', startGame);
  }
  
  if (rulesButton) {
    rulesButton.addEventListener('click', showRules);
  }
  
  if (loreButton) {
    loreButton.addEventListener('click', showLore);
  }
});