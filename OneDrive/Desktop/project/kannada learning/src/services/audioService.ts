/**
 * Centralized Audio Service for Kannada Buddy.
 * Supports:
 * - Direct audio file playback if available
 * - Web Speech API fallback (speechSynthesis with kn-IN language code)
 * - Playback rate control (0.75x, 1x, 1.25x)
 * - Event callbacks for UI play states
 */

class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private rate: number = 1.0;
  private playingId: string | null = null;
  private listeners: Set<(playingId: string | null) => void> = new Set();

  public subscribe(listener: (playingId: string | null) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.playingId));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setRate(rate: number) {
    this.rate = rate;
  }

  public getPlayingId(): string | null {
    return this.playingId;
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.playingId = null;
    this.notify();
  }

  public playSound(id: string, textToSpeak: string, audioUrl?: string) {
    if (this.isMuted) return;

    // Stop currently playing audio/speech
    this.stop();

    this.playingId = id;
    this.notify();

    // Check if audio file exists & attempt HTML5 Audio
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.playbackRate = this.rate;
      this.currentAudio = audio;

      audio.onended = () => {
        this.playingId = null;
        this.currentAudio = null;
        this.notify();
      };

      audio.onerror = () => {
        // Audio file missing or blocked -> fallback to Web Speech API
        this.speakFallback(textToSpeak);
      };

      audio.play().catch(() => {
        // Autoplay policy or fetch error -> fallback to Web Speech API
        this.speakFallback(textToSpeak);
      });
    } else {
      this.speakFallback(textToSpeak);
    }
  }

  private speakFallback(text: string) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      this.playingId = null;
      this.notify();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN'; // Kannada (India)
    utterance.rate = this.rate;

    // Search for explicit Kannada voice if available in browser
    const voices = window.speechSynthesis.getVoices();
    const knVoice = voices.find((v) => v.lang.includes('kn') || v.lang.includes('Kannada'));
    if (knVoice) {
      utterance.voice = knVoice;
    }

    utterance.onend = () => {
      this.playingId = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.playingId = null;
      this.notify();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const audioService = new AudioService();
