import './assets';

import { Loopify, loopify } from './loopify';

function start(): void {
  const backstageLeft = document.getElementById('backstage-left');
  const backstageRight = document.getElementById('backstage-right');

  backstageLeft.classList.add('backstageLeftAnimation');
  backstageRight.classList.add('backstageRightAnimation');

  loopify('assets/audio/hello-audio-inicio.wav', (loop: Loopify) => {
    loop.play();

    setTimeout(() => {
      loop.stop();
    }, 1967);
  });

  setTimeout(() => {
    loopify('assets/audio/hello-audio-looped.wav', (loop: Loopify) => {
      loop.play();
    });
  }, 1000);
}

function startHandler(event: any): void {
  if (event.name === 'keyup' && event.keyCode !== 32) {
    return;
  }

  document.removeEventListener('keyup', startHandler);
  document.removeEventListener('click', startHandler);

  start();
}

document.addEventListener('keyup', startHandler);
document.addEventListener('click', startHandler);
