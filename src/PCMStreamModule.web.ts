import type {
  PCMStreamModuleEvents,
  PCMStreamModuleSpec,
  PlaybackState,
  PlaybackStats,
} from './PCMStream.types';

type Subscription = { remove: () => void };

/**
 * Web 端占位实现：
 * - Expo Web 无法加载原生模块（requireNativeModule('PCMStream') 会失败）
 * - 这里返回一组 no-op/降级实现，确保打包阶段不报错
 */
const PCMStreamWeb: PCMStreamModuleSpec & {
  addListener: (eventName: keyof PCMStreamModuleEvents | string, listener: (...args: any[]) => void) => Subscription;
} = {
  hello() {
    return 'PCMStream (web stub)';
  },

  // 播放相关
  initPlayer(_sampleRate?: number) {
    console.warn('[react-native-pcm-stream] initPlayer() is not supported on web.');
  },
  playPCMChunk(_chunk: Uint8Array) {
    console.warn('[react-native-pcm-stream] playPCMChunk() is not supported on web.');
  },
  stopPlayback() {
    // no-op
  },

  // 播放状态/统计
  getPlaybackState(): PlaybackState {
    return 'IDLE';
  },
  isPlaying() {
    return false;
  },
  getTotalDuration() {
    return 0;
  },
  getPlayedDuration() {
    return 0;
  },
  getRemainingDuration() {
    return 0;
  },
  getProgress() {
    return 0;
  },
  getPlaybackStats(): PlaybackStats {
    return {
      state: 'IDLE',
      isPlaying: false,
      totalDuration: 0,
      playedDuration: 0,
      remainingDuration: 0,
      progress: 0,
    };
  },

  // 录音相关
  startRecording(_sampleRate?: number, _frameSize?: number, _targetRate?: number) {
    console.warn('[react-native-pcm-stream] startRecording() is not supported on web.');
  },
  stopRecording() {
    // no-op
  },

  // 事件监听（简化版）
  addListener(_eventName, _listener) {
    console.warn('[react-native-pcm-stream] addListener() is not supported on web.');
    return { remove() {} };
  },
};

export default PCMStreamWeb;


