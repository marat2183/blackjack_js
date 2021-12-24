import CrupierService from "../services/crupierService.js"
import CardController from "./cardController.js";

const CrupierController = class{
    constructor(cardList, crupierCardsPoints){
        this.crupierService = new CrupierService();
        this.cardList = cardList;
        this.cardController = new CardController();
        this.crupierCardsPoints = crupierCardsPoints;
    }

    renderCardSection = () => {
        const cards = this.crupierService.getCrupierCards();
        const cardsBlock = cards.map(card => this.cardController.createCard(card));
        this.cardList.innerHTML = ''
        this.cardList.append(...cardsBlock);
        try{
            const points = this.crupierService.getCrupierPoints()
            this.changeCrupierSectionView(cards, points)
        }
        catch{
            this.crupierCardsPoints.textContent = 'X';
        }
    }

    changeCrupierSectionView = (cards, points) => {
        if (cards.length >= 2 && points !== 21){
            this.crupierCardsPoints.textContent = points;
            return;
        }
        switch (cards.length){
            case 2:
                this.crupierCardsPoints.textContent = "BJ";
                break;
            default:
                this.crupierCardsPoints.textContent = points;
                break
        }
    }
}

const cardList = document.querySelector('.player__cards--crupier');
const crupierCardsPoints = document.querySelector('.points__value--crupier');
const controller = new CrupierController(cardList, crupierCardsPoints);

controller.crupierService.getCards(1);
controller.crupierService.getCards(1, true);
controller.renderCardSection();

setTimeout(() => {
    controller.crupierService.getCards(1);
    controller.renderCardSection();
}, 3000)




