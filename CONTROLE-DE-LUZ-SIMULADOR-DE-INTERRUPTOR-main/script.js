const lamp = document.getElementById('lamp');
const toggleButton = document.getElementById('toggleButton');
const counterElement = document.getElementById('counter');
const room = document.getElementById('room');

let isLightOn = false;
let counter = 0;

toggleButton.addEventListener('click', () => {
  lamp.classList.add('fade-out');

  setTimeout(() => {
    if (!isLightOn) {
      lamp.src = 'img/lampada ligada.png';
      lamp.alt = 'Lâmpada acesa';
      toggleButton.textContent = 'Desligar';
      counter++;
      counterElement.textContent = counter;
      room.classList.add('lit');
    } else {
      lamp.src = 'img/lampada_apagada.png';
      lamp.alt = 'Lâmpada apagada';
      toggleButton.textContent = 'Ligar';
      room.classList.remove('lit');
    }

    lamp.onload = () => lamp.classList.remove('fade-out');
    setTimeout(() => lamp.classList.remove('fade-out'), 300);

    isLightOn = !isLightOn;
  }, 200);
});
