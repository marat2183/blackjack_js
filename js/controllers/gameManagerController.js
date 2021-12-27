import GameManagerService from "../services/gameManagerService.js";
import PlayerModel from "../models/playerModel.js";
import DeckModel from "../models/deckModel.js";
import cardList from "../constants.js";

const GameManagerController = class{
    constructor (gameManagerService, playerCardsSection, croupierCardsSection, playerCardsPoints, croupierCardsPoints, hitBtn, standBtn){
        this.gameManagerService = gameManagerService;
        this.playerCards = playerCardsSection;
        this.croupierCards = croupierCardsSection
        this.playerPoints = playerCardsPoints;
        this.croupierPoints = croupierCardsPoints;
        this.hitBtn = hitBtn;
        this.standBtn = standBtn
    }

    renderPlayersSection = (player, playerCardsBlock, playerPointsBlock) => {
        const playerCards = this.gameManagerService.getPlayerCards(player)
        const playerPoints = this.gameManagerService.calculatePlayerPoints(playerCards)
        const cardsBlock = playerCards.map(card => this.#createCard(card));
        playerCardsBlock.innerHTML = ''
        playerCardsBlock.append(...cardsBlock);
        this.changePlayerPointsView(playerCards, playerPoints, playerPointsBlock)
    }

    addPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
        this.addCardsButtonsHandlers();
    }

    removePlayerButtons = () => {
        this.removeCardsButtonsHandlers();
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
        this.getCardsToCroupier();

    }

    addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = () => {
        this.gameManagerService.hitCommand();
        this.renderPlayersSection(
            this.gameManagerService.player,
            this.playerCards, 
            this.playerPoints);
    }

    standBtnCallBack = () => {
        this.removePlayerButtons();
    }

    getCardsToCroupier = () => {
        const croupier = this.gameManagerService.croupier
        let croupierCards = this.gameManagerService.getPlayerCards(croupier)
        let croupierPoints = this.gameManagerService.calculatePlayerPoints(croupierCards);
        while (croupierPoints < 18){
            this.gameManagerService.standCommand();
            this.renderPlayersSection(croupier, this.croupierCards, this.croupierPoints)
            croupierCards = this.gameManagerService.getPlayerCards(croupier)
            croupierPoints = this.gameManagerService.calculatePlayerPoints(croupierCards);
        }
    }

    removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }

    changePlayerPointsView = (cards, points, playerPointsBlock) => {
        if (points > 21){
            playerPointsBlock.textContent = "X";
            this.removePlayerButtons(); 
            return
        }
        if (cards.length >= 2 && points < 21){
            playerPointsBlock.textContent = points;
            this.addPlayerButtons();
            return;
        }
        switch (cards.length){
            case 2:
                playerPointsBlock.textContent = "BJ";
                this.removePlayerButtons();
                break;
            default:
                playerPointsBlock.textContent = points;
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
const croupierCardsSection = document.querySelector('.player__cards--crupier')
const croupierCardsPoints = document.querySelector('.points__value--crupier')
const deckModel = new DeckModel(cardList)
const playerModel = new PlayerModel()
const croupierModel = new PlayerModel()
const gameManagerService = new GameManagerService(playerModel, deckModel, croupierModel)
const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');



const gameManagerController = new GameManagerController(
    gameManagerService, 
    playerCardsSection,
    croupierCardsSection, 
    playerCardsPoints,
    croupierCardsPoints,
    hitBtn,
    standBtn
)


gameManagerController.gameManagerService.addCardsToPlayer(2, gameManagerController.gameManagerService.player);
gameManagerController.renderPlayersSection(
    gameManagerController.gameManagerService.player,
    gameManagerController.playerCards, 
    gameManagerController.playerPoints
);