const getAudioFormat = (() => {
  const preferredFormat = 'audio/ogg; codecs=opus';
  const audio = document.createElement('audio');
  const format = audio.canPlayType(preferredFormat)
    ? preferredFormat
    : 'audio/wav';
  return function getAudioFormat() {
    return format;
  };
})();

export {
  getAudioFormat,
};
