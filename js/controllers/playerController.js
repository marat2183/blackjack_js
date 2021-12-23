import PlayerService from "../services/playerService.js";
import CardController from "./cardController.js";


const PlayerController = class{
    constructor(hitBtn, stopBtn, playerCardsPoints, cardList){
        this.PlayerService = new PlayerService();
        this.CardController = new CardController()
        this.hitBtn = hitBtn;
        this.stopBtn = stopBtn;
        this.playerCardsPoints = playerCardsPoints;
        this.cardList = cardList
        this.addBtnsHandlers();
    }

    addBtnsHandlers = () => {
        this.hitBtn.addEventListener('click', () => {
            this.PlayerService.getCards(1);
            this.renderPlayerSection()
        });

        this.stopBtn.addEventListener('click', () => {
            this.hidePlayerBtns();
        });
    }

    showPlayerBtns = () => {
        this.hitBtn.style.display = 'inline-block';
        this.stopBtn.style.display = 'inline-block';
    }

    hidePlayerBtns = () => {
        this.hitBtn.style.display = 'none';
        this.stopBtn.style.display = 'none';
    }

    changePlayerSectionView = (cards, points) => {
        console.log(cards, points)
        if (cards.length >= 2 && points !== 21){
            this.playerCardsPoints.textContent = points;
            this.showPlayerBtns();
            return;
        }
        switch (cards.length){
            case 2:
                this.playerCardsPoints.textContent = "BJ";
                this.hidePlayerBtns();
                break;
            default:
                this.playerCardsPoints.textContent = points;
                this.hidePlayerBtns();
                break
        }
    }
    
    renderPlayerSection = () => {
        const cards = this.PlayerService.getPlayerCards()
        const cardsBlock = cards.map(card => this.CardController.createCard(card));
        this.cardList.innerHTML = ''
        this.cardList.append(...cardsBlock);
        try{
            const points = this.PlayerService.getPlayerPoints()
            this.changePlayerSectionView(cards, points)
        }
        catch{
            playerCardsPoints.textContent = 'X';
            this.hidePlayerBtns();
        }
    }
}


const hitBtn = document.querySelector('.player__btn--hit');
const stopBtn = document.querySelector('.player__btn--stop');
const playerCardsPoints = document.querySelector('.player__points-value');
const cardList = document.querySelector('.player__cards')

const controller = new PlayerController(hitBtn, stopBtn, playerCardsPoints, cardList)
controller.PlayerService.getCards(2);
controller.renderPlayerSection()
