let flipped = false;
let lockBoard = false;
let pairs = 0;
let round = 1;
let firstCard;
let secondCard;

let cards = [{
  id: '0',
  file: '#',
  name: 'Coconut Shrimp',
}, {
  id: '1',
  file: '#',
  name: 'Oat Milk'
}, {
  id: '2',
  file: '#',
  name: 'Refrigerator'
}, {
  id: '3',
  file: '#',
  name: 'Diapers'
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
    let roundCounter = document.getElementById('counter').children[0];
    roundCounter.innerText = 'Round: ' + round;
    let pairsCounter = document.getElementById('counter').children[1];
    pairsCounter.innerText = 'Pairs: 0 of 4';
  }, 1500);
  if (round === 2) {
    setTimeout(() => {
      text = "Congrats! You made it past the first round. Be the first attendee to post your favorite Brand product in the event chat to win a $100 Brand card."
      announce(text);
  }, 4000);
  }
}

let announce = function(text) {
  let announcement = document.getElementById('live-region');
  announcement.innerText = text;
}

dealCards(shuffleCards(cards));