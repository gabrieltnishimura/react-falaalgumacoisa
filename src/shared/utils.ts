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

const timeToDuration = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const remainingSeconds = Math.floor(timeInSeconds - (minutes * 60));
  const padLeft = (str: any, pad: string, length: number) => {
    return (new Array(length + 1).join(pad) + str).slice(-length);
  }
  return `${minutes}:${padLeft(remainingSeconds, '0', 2)}`;
}

const isEmail = (text: string): boolean => {
  if (!text) {
    return false;
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

export {
  getAudioFormat,
  timeToDuration,
  isEmail,
};
