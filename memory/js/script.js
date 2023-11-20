let flipped = false;
let lockBoard = false;
let points = 0;
let level = 1;
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
  this.children[0].classList.add('hide');
  this.children[1].classList.remove('hide');

  if (!flipped) {
    flipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkMatch();
}

let checkMatch = function () {
  let isMatch = firstCard.children[1].dataset.id === secondCard.children[1].dataset.id;
  if (isMatch) {
    points++;
    let announcement = 'It\'s a match! You have ' + points + ' pair' + (points > 1 ? 's.' : '.');
    announce(announcement);
    disableCards();
  } else {
    let announcement = sorry[Math.floor((Math.random() * sorry.length))];
    announce(announcement);
    hideCards();
  }
}

let disableCards = function () {
  firstCard.setAttribute('disabled', '');
  secondCard.setAttribute('disabled', '');
  resetBoard();
}

let hideCards = function () {
  setTimeout(() => {
    firstCard.children[0].classList.remove('hide');
    firstCard.children[1].classList.add('hide');
    secondCard.children[0].classList.remove('hide');
    secondCard.children[1].classList.add('hide');
    resetBoard();
  }, 1500);
}

let resetBoard = function () {
  firstCard = null;
  secondCard = null;
  flipped = false;
  lockBoard = false;
  if (points >= cards.length) {
    levelUp();
  }
}

let dealCards = function (cards, nextLevel) {
  let spaces = document.getElementsByClassName('space');
  for (let i = 0; i < cards.length; i++) {
    spaces[i].children[0].classList.remove('hide');
    if (nextLevel) {
      let discard = spaces[i].children[1];
      spaces[i].removeAttribute('disabled');
      spaces[i].removeChild(discard);
    }
    let card = document.createElement('img');
    card.setAttribute('src', './img/' + cards[i].file);
    card.setAttribute('alt', cards[i].name);
    card.setAttribute('lang', 'es');
    card.setAttribute('class', 'hide');
    card.setAttribute('data-id', cards[i].id);
    spaces[i].appendChild(card); 
    spaces[i].addEventListener('click', showCard);
  }
}

let levelUp = function () {
  points = 0;
  level++;
  setTimeout(() => {
    let announcement = congrats[Math.floor((Math.random() * congrats.length))]
      + 'Level ' + level;
    announce(announcement);
    let caption = document.getElementById('level-caption');
    caption.innerText = caption.innerText.slice(0, -1) + level;
    dealCards(shuffleCards(cards), true);
  }, 1500);
}

let announce = function(text) {
  let announcement = document.getElementById('announce');
  announcement.innerText = text;
}

dealCards(shuffleCards(cards));