export interface Loopify {
  play: Function;
  stop: Function;
}

export function loopify(uri: string, callback: Function): void {
  const context: AudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  fetch(uri)
    .then(response => response.arrayBuffer())
    .then((buffer: ArrayBuffer) => {
      context.decodeAudioData(buffer, (audioBuffer: AudioBuffer) => {
        let source: AudioBufferSourceNode;

        function stop() {
          if (source) {
            source.stop();
            source = null;
          }
        }

        function play() {
          stop();

          source = context.createBufferSource();
          source.connect(context.destination);

          source.buffer = audioBuffer;
          source.loop = true;

          source.start(0);
        }

        callback({
          play: play,
          stop: stop,
        });
      });
    });
}
