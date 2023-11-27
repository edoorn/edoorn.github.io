let flipped = false;
let lockBoard = false;
let pairs = 0;
let round = 1;
let firstCard;
let secondCard;

let cards = [{
  id: '0',
  file: 'concha.jpg',
  name: 'Concha',
}, {
  id: '1',
  file: 'oreja.jpg',
  name: 'Oreja'
}, {
  id: '2',
  file: 'cuerno.jpg',
  name: 'Cuerno'
}, {
  id: '3',
  file: 'nino_envuelto.jpg',
  name: 'Niño Envuelto'
}];

let congrats = [
  'Congrats!',
  'Nice job!',
  'Wow, impressive!',
  'Now we\'re cooking with gas!'
];

let sorry = [
  'Not a match.',
  'Sorry! Not a match.',
  'No luck.',
  'Better luck next time.'
];

let shuffleCards = function (cards) {
  let deck = cards.concat(cards);
  let shuffled = deck.sort(() => Math.random() - 0.5);
  return shuffled;
}

let showCard = function () {
  if (lockBoard) {
    return;
  }
  if (flipped) {
    lockBoard = true;
  }
  this.classList.add('hide');
  let card = this.nextSibling;
  card.classList.remove('hide');
  card.focus();

  if (!flipped) {
    flipped = true;
    firstCard = card;
    return;
  }
  secondCard = card;
  checkMatch();
}

let checkMatch = function () {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  if (isMatch) {
    pairs++;
    // let announcement = 'It\'s a match! You have ' + pairs + ' pair' + (pairs > 1 ? 's.' : '.');
    // announce(announcement);
    let pairsCounter = document.getElementById('counter').children[1];
    pairsCounter.innerText = 'Pairs: ' + pairs + ' of 4';
    resetBoard();
  } else {
    hideCards();
  }
}

let hideCards = function () {
  setTimeout(() => {
    firstCard.previousSibling.classList.remove('hide');
    firstCard.classList.add('hide');
    secondCard.previousSibling.classList.remove('hide');
    secondCard.classList.add('hide');
    if (pairs < cards.length) {
      secondCard.previousSibling.focus();
    }
    resetBoard();
  }, 1500);
}

let resetBoard = function () {
  firstCard = null;
  secondCard = null;
  flipped = false;
  lockBoard = false;
  if (pairs >= cards.length) {
    goToNextRound();
  }
}

let dealCards = function (cards, nextRound) {
  let spaces = document.getElementsByClassName('space');
  for (let i = 0; i < cards.length; i++) {
    if (nextRound) {
      spaces[i].children[0].classList.remove('hide');
      let discard = spaces[i].children[1];
      spaces[i].removeChild(discard);
    }
    let card = document.createElement('img');
    card.setAttribute('src', './img/' + cards[i].file);
    card.setAttribute('alt', cards[i].name);
    card.setAttribute('lang', 'es'); // Remove for English card names
    card.setAttribute('class', 'hide');
    card.setAttribute('data-id', cards[i].id);
    card.setAttribute('tabindex', '-1');
    spaces[i].appendChild(card);
    spaces[i].children[0].addEventListener('click', showCard);
  }
}

let goToNextRound = function () {
  pairs = 0;
  round++;
  setTimeout(() => {
    dealCards(shuffleCards(cards), true);
    // let announcement = congrats[Math.floor((Math.random() * congrats.length))]
    // + ' You\'re moving on to Round ' + round;
    // announce(announcement);
    let roundCounter = document.getElementById('counter').children[0];
    roundCounter.innerText = 'Round: ' + round;
    let pairsCounter = document.getElementById('counter').children[1];
    pairsCounter.innerText = 'Pairs: 0 of 4';
  }, 1500);
}

// let announce = function(text) {
//   // let announcement = document.getElementById('announce');
//   // announcement.innerText = text;
// }

dealCards(shuffleCards(cards));