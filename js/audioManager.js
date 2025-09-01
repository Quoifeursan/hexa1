// Gestionnaire audio amélioré
class AudioManager {
  constructor() {
    this.clickSound = document.getElementById('clickSound');
    this.backgroundSound = document.getElementById('backgroundSound');
    this.isAudioEnabled = true;
    this.volume = 0.1;
    this.backgroundVolume = 0.1;
    
    // Initialiser l'audio
    this.initAudio();
  }

  initAudio() {
    if (this.clickSound) {
      this.clickSound.volume = this.volume;
      
      // Gestion des erreurs audio
      this.clickSound.addEventListener('error', (e) => {
        console.warn('Erreur lors du chargement du son de clic:', e);
      });
      
      // Réinitialiser l'audio après la lecture
      this.clickSound.addEventListener('ended', () => {
        this.clickSound.currentTime = 0;
      });
    }

    if (this.backgroundSound) {
      this.backgroundSound.volume = this.backgroundVolume;
      
      // Gestion des erreurs audio pour le son de fond
      this.backgroundSound.addEventListener('error', (e) => {
        console.warn('Erreur lors du chargement du son de fond:', e);
      });
    }
  }

  playClickSound() {
    if (!this.isAudioEnabled || !this.clickSound) return;
    
    try {
      // Réinitialiser l'audio au début pour permettre la lecture multiple
      this.clickSound.currentTime = 0;
      
      // Jouer le son avec gestion de promesse
      const playPromise = this.clickSound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Erreur lors de la lecture du son:', error);
          // Désactiver l'audio en cas d'erreur persistante
          if (error.name === 'NotAllowedError') {
            this.isAudioEnabled = false;
          }
        });
      }
    } catch (error) {
      console.warn('Erreur lors de la lecture du son:', error);
    }
  }



  startBackgroundMusic() {
    if (!this.isAudioEnabled || !this.backgroundSound) return;
    
    try {
      // Démuter l'audio et essayer de jouer
      this.backgroundSound.muted = false;
      const playPromise = this.backgroundSound.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Succès - masquer l'overlay
          this.hideAudioPermissionOverlay();
        }).catch(error => {
          // Échec - afficher l'overlay d'autorisation
          if (error.name === 'NotAllowedError') {
            this.showAudioPermissionOverlay();
          }
        });
      }
    } catch (error) {
      // En cas d'erreur, afficher l'overlay
      this.showAudioPermissionOverlay();
    }
  }

  showAudioPermissionOverlay() {
    const overlay = document.getElementById('audioPermissionOverlay');
    if (overlay) {
      overlay.classList.remove('hidden');
    }
  }

  hideAudioPermissionOverlay() {
    const overlay = document.getElementById('audioPermissionOverlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }

  // Faire un fondu du volume de la musique de fond
  fadeOutBackgroundMusic(duration = 3000) {
    if (!this.backgroundSound || !this.isAudioEnabled) return;
    
    const startVolume = this.backgroundSound.volume;
    const targetVolume = 0;
    const steps = 60; // 60 étapes pour un fondu fluide
    const stepDuration = duration / steps;
    const volumeStep = startVolume / steps;
    
    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
      currentStep++;
      
      if (currentStep >= steps) {
        // Fin du fondu
        this.backgroundSound.volume = targetVolume;
        clearInterval(fadeInterval);
      } else {
        // Réduire le volume progressivement
        this.backgroundSound.volume = Math.max(0, startVolume - (volumeStep * currentStep));
      }
    }, stepDuration);
  }

  // Restaurer le volume de la musique de fond
  restoreBackgroundMusicVolume() {
    if (!this.backgroundSound || !this.isAudioEnabled) return;
    
    this.backgroundSound.volume = this.backgroundVolume;
  }

}

// Instance globale du gestionnaire audio
const audioManager = new AudioManager();