import GameManagerService from "../services/gameManagerService.js";
import PlayerController from "./playerController.js";
import PlayerService from "../services/playerService.js";
import DeckService from "../services/deckService.js";
import cardList from "../constants.js";

const GameManagerController = class{
    constructor (gameManagerService, playerCardsSection, playerCardsPoints, playerController, hitBtn, standBtn){
        this.gameManagerService = gameManagerService;
        this.playerCardsSection = playerCardsSection;
        this.playerCardsPoints = playerCardsPoints;
        this.playerController = playerController;
        this.hitBtn = hitBtn;
        this.standBtn = standBtn
    }

    renderPlayersSection = () => {
        const playerCards = this.gameManagerService.getPlayerCards()
        const playerPoints = this.gameManagerService.getPlayerPoints()
        const cardsBlock = playerCards.map(card => this.#createCard(card));
        this.playerCardsSection.innerHTML = ''
        this.playerCardsSection.append(...cardsBlock);
        this.changePlayerPointsView(playerCards, playerPoints)
    }

    addPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
        this.addCardsButtonsHandlers();
    }

    removePlayerButtons = () => {
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
        this.removeCardsButtonsHandlers();

    }

    addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = () => {
        this.gameManagerService.hitCommand();
        this.renderPlayersSection();
    }

    standBtnCallBack = () => {
        this.removePlayerButtons();
        this.gameManagerService.standCommand();
    }

    removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }

    changePlayerPointsView = (cards, points) => {
        if (points > 21){
            this.playerCardsPoints.textContent = "X";
            this.removePlayerButtons(); 
            return
        }
        if (cards.length >= 2 && points !== 21){
            this.playerCardsPoints.textContent = points;
            this.addPlayerButtons();
            return;
        }
        switch (cards.length){
            case 2:
                this.playerCardsPoints.textContent = "BJ";
                this.removePlayerButtons();
                break;
            default:
                this.playerCardsPoints.textContent = points;
                this.removePlayerButtons();
                break
        }
    }

    #createCard = (card) => {
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
const gameManagerService = new GameManagerService(playerService, deckService)
const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');


const playerController = new PlayerController(hitBtn, standBtn);

const gameManagerController = new GameManagerController(
    gameManagerService, 
    playerCardsSection, 
    playerCardsPoints, 
    playerController,
    hitBtn,
    standBtn
)


gameManagerController.gameManagerService.addCardsToPlayer(2);
gameManagerController.renderPlayersSection();