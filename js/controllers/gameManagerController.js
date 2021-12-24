import GameManagerService from "../services/gameManagerService.js";
import PlayerService from "../services/playerService.js";
import DeckService from "../services/deckService.js";
import cardList from "../constansts.js";

const GameManagerController = class{
    constructor (gameManagerService, playerCardsSection, playerCardsPoints){
        this.gameManagerService = gameManagerService;
        this.playerCardsSection = playerCardsSection;
        this.playerCardsPoints = playerCardsPoints
    }

    renderPlayersSection = () => {
        const playerCards = this.gameManagerService.playerService.getPlayerCards();
        const playerPoints = this.gameManagerService.calculatePlayerPoints(playerCards);
        console.log(playerPoints)
        const cardsBlock = playerCards.map(card => this.createCard(card));
        this.playerCardsSection.innerHTML = ''
        this.playerCardsSection.append(...cardsBlock);
        this.playerCardsPoints.textContent = playerPoints
    }

    createCard = (card) => {
        const cardBlock = document.createElement('div');
        cardBlock.classList.add('card');
        if (card.type === 'defaultCard'){
            cardBlock.classList.add('card--default');
            return cardBlock
        }
        const cardTopSpan = this.#createCardTopSpan(card);
        const cardBottomSpan = this.#createCardBottomSpan(card);
        const cardImgs = this.#createCardImgs(card);
        cardBlock.append(cardTopSpan, ...cardImgs, cardBottomSpan)
        return cardBlock;
    }
    
    #getCardSpanColor = (card) => ['spades', 'clubs'].includes(card.type) ? 'card__value--black': 'card__value--red'

    #createCardTopSpan = (card) => {
        const colorStyle = this.#getCardSpanColor(card);
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--top', colorStyle)
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    #createCardBottomSpan = (card) => {
        const colorStyle = this.#getCardSpanColor(card);
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--bottom', colorStyle)
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    #createCardImgs = (card) => {
        const topImg = document.createElement('img')
        topImg.classList.add('card__type', 'card__type--top');
        topImg.setAttribute('src', `./img/${card.type}.svg`);
        const mainImg = document.createElement('img')
        mainImg.classList.add('card__type');
        mainImg.setAttribute('src', `./img/${card.type}.svg`);
        const bottomImg = document.createElement('img')
        bottomImg.classList.add('card__type', 'card__type--bottom');
        bottomImg.setAttribute('src', `./img/${card.type}.svg`);
        return [topImg, mainImg, bottomImg]
    }
}

const playerCardsSection = document.querySelector('.player__cards--player')
const playerCardsPoints = document.querySelector('.points__value--player')
const deckService = new DeckService(cardList)
const playerService = new PlayerService(deckService)
const gameManagerService = new GameManagerService(playerService)


const gameManagerController = new GameManagerController(gameManagerService, playerCardsSection, playerCardsPoints)


gameManagerController.gameManagerService.playerService.getNewCards(2);
gameManagerController.renderPlayersSection();