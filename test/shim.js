global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.createBuffer = jest.fn();
global.bufferStart = jest.fn();
global.createBufferSource = jest.fn(() => ({
  start: global.bufferStart
}));

global.AudioContext = function() {
  return {
    createBuffer: global.createBuffer,
    createBufferSource: global.createBufferSource
  };
};
