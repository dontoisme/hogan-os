import { useThemeStore } from '@/stores/themeStore';

export type SoundType =
  | 'startup'
  | 'windowOpen'
  | 'windowClose'
  | 'click'
  | 'error'
  | 'minimize'
  | 'startMenu'
  | 'notification';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume: number = 0.15,
  delay: number = 0,
) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

function playSweep(
  startFreq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume: number = 0.12,
) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.05);
}

// --- Individual sound functions ---

function playStartup() {
  // Major chord arpeggio: C5 → E5 → G5 → C6
  playTone(523.25, 0.3, 'square', 0.1, 0);       // C5
  playTone(659.25, 0.3, 'square', 0.1, 0.15);     // E5
  playTone(783.99, 0.3, 'square', 0.1, 0.3);      // G5
  playTone(1046.5, 0.5, 'square', 0.12, 0.45);    // C6 (longer)
}

function playWindowOpen() {
  // Quick ascending two-note
  playTone(523.25, 0.08, 'square', 0.1, 0);       // C5
  playTone(659.25, 0.1, 'square', 0.1, 0.06);     // E5
}

function playWindowClose() {
  // Quick descending two-note
  playTone(659.25, 0.08, 'square', 0.1, 0);       // E5
  playTone(392.0, 0.1, 'square', 0.1, 0.06);      // G4
}

function playClick() {
  // Very short pulse
  playTone(800, 0.03, 'square', 0.08);
}

function playError() {
  // Low bonk with quick repeat
  playTone(200, 0.15, 'square', 0.15, 0);
  playTone(160, 0.2, 'square', 0.12, 0.12);
}

function playMinimize() {
  // Descending sweep
  playSweep(800, 200, 0.15, 'square', 0.1);
}

function playStartMenu() {
  // Short chirp
  playSweep(400, 800, 0.06, 'square', 0.08);
}

function playNotification() {
  // Friendly two-note ascending ding
  playTone(880, 0.12, 'sine', 0.1, 0);            // A5
  playTone(1108.73, 0.18, 'sine', 0.1, 0.1);      // C#6
}

const soundMap: Record<SoundType, () => void> = {
  startup: playStartup,
  windowOpen: playWindowOpen,
  windowClose: playWindowClose,
  click: playClick,
  error: playError,
  minimize: playMinimize,
  startMenu: playStartMenu,
  notification: playNotification,
};

export function playRetroSound(sound: SoundType) {
  if (!useThemeStore.getState().soundEnabled) return;

  try {
    soundMap[sound]();
  } catch {
    // Silently fail if AudioContext is unavailable
  }
}
