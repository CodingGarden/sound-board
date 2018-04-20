const soundsElement = document.querySelector('#sounds');

(async () => {
  const sounds = await getSounds();
  addSoundsToPage(sounds);
})();

async function getSounds() {
  const response = await fetch('./sounds.json');
  const json = await response.json();
  return json;
}

function addSoundsToPage(sounds) {
  const players = [];

  sounds.forEach(sound => {
    const soundDiv = document.createElement('div');
    soundDiv.className = 'sound';
    const soundTitle = document.createElement('h2');
    soundTitle.textContent = sound.title;
    soundDiv.appendChild(soundTitle);

    const player = document.createElement('audio');
    player.setAttribute('src', `sounds/${sound.src}`)
    soundDiv.appendChild(player);
    players.push({ player, soundDiv });

    soundDiv.addEventListener('mousedown', () => {
      soundDiv.style.background = '#0941a1';
      player.currentTime = 0;
      player.play();
    });

    soundDiv.addEventListener('mouseup', () => {
      soundDiv.style.background = '';
    });

    soundsElement.appendChild(soundDiv);
  });

  document.querySelector('#stopButton').addEventListener('click', stopAll);

  const keyCodes = {
    65: 0,
    83: 1,
    68: 2,
    70: 3,
    71: 4,
    72: 5,
    74: 6,
    75: 7,
    76: 8,
    186: 9,
    222: 10,
    90: 11
  }

  document.addEventListener('keydown', (event) => {
    const playerIndex = keyCodes[event.keyCode];
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv) {
      playerAndDiv.soundDiv.style.background = '#0941a1';
      playerAndDiv.player.currentTime = 0;
      playerAndDiv.player.play();
    }
  });

  document.addEventListener('keyup', (event) => {
    const playerIndex = keyCodes[event.keyCode];
    const playerAndDiv = players[playerIndex];
    if (playerAndDiv) {
      playerAndDiv.soundDiv.style.background = '';
    }
  });

  function stopAll() {
    players.forEach(({player}) => {
      player.pause();
    });
  }
}
