import PlayerService from "../services/playerService.js";
import CardController from "./cardController.js";

const PlayerController = class{
    constructor(){
        this.PlayerService = new PlayerService();
        this.CardController = new CardController()
    }

    renderPlayerSection(){
        const cards = this.PlayerService.get(2);
        const cardPoints = this.PlayerService.calcCardsPoints(cards);
        const cardsBlock = cards.map(card => this.CardController.createCard(card));
        const cardList = document.querySelector('.player__cards')
        cardList.innerHTML = ''
        cardList.append(...cardsBlock)
        const playerCardsPoints = document.querySelector('.player__points-value');
        playerCardsPoints.textContent = cardPoints;
    }

}

const controller = new PlayerController()
controller.renderPlayerSection()
// setInterval(controller.renderPlayerSection, 1000);
// setInterval(() => controller.renderPlayerSection(), 1000)