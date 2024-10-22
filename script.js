'use strict';

//elementleri seçip tanımladım
const btnInstruction = document.querySelector('.btn--instruction');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSetNames = document.querySelector('.btn--set-names');

// Oyuncu isimlerini alacak input alanlarını seçiyoruz
const player0NameInput = document.getElementById('input--0');
const player1NameInput = document.getElementById('input--1');

// Oyuncu isimlerinin görüneceği yerleri seçiyoruz
const player0NameDisplay = document.getElementById('name--0');
const player1NameDisplay = document.getElementById('name--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Başlangıç Koşullarını declare ettik
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // İsimleri sıfırladım
  player0NameDisplay.textContent = 'Player 1';
  player1NameDisplay.textContent = 'Player 2';

  // Input alanlarını görünür yaptım
  player0NameInput.style.display = 'inline';
  player1NameInput.style.display = 'inline';
  // reset sonrası input alanını boşaltıyoruz
  player0NameInput.value = '';
  player1NameInput.value = '';
};
init();

// Zarın Fonksiyonu
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold Butonu
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 75) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Yeni Oyun
btnNew.addEventListener('click', init);

// isim güncelleme alanı
btnSetNames.addEventListener('click', function () {
  const player0Name = player0NameInput.value.trim() || 'Player 1';
  const player1Name = player1NameInput.value.trim() || 'Player 2';

  player0NameDisplay.textContent = player0Name;
  player1NameDisplay.textContent = player1Name;

  // Inputları temizleme
  player0NameInput.style.display = 'none';
  player1NameInput.style.display = 'none';
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnInstructions = document.getElementById('open-instructions');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Talimat butonuna tıklama olayı
btnInstructions.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
