import CroupierController from "./croupierController.js";

const PlayerController = class extends CroupierController {
    
    constructor(gameManagerService, cardSection, pointsSection, hitBtn, standBtn){
        super(gameManagerService, cardSection, pointsSection);
        this.hitBtn = hitBtn;
        this.standBtn = standBtn;
    }

    renderSection = () => {
        const cards = this.gameManagerService.getPlayerCards();
        const points = this.gameManagerService.calculatePlayerPoints(cards);
        const cardsBlock = cards.map(card => this.createCard(card));
        this.cards.innerHTML = '';
        this.cards.append(...cardsBlock);
        this.changePointsView(cards, points)
    }

    addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = () => {
        this.gameManagerService.addPlayerCards(1);
        this.renderSection(
            this.gameManagerService.player,
            this.playerCards, 
            this.playerPoints);
    }

    standBtnCallBack = () => this.removePlayerButtons();

    addPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
        this.addCardsButtonsHandlers();
    }

    removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }

    removePlayerButtons = () => {
        this.removeCardsButtonsHandlers();
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
        this.getCards()
    }

    changePointsView = (cards, points) => {
        if (points > 21){
            this.points.textContent = "X";
            this.removePlayerButtons();
            return;
        }
        if (cards.length >= 2 && points < 21){
            this.points.textContent = points;
            this.addPlayerButtons();
            return;
        }
        switch (cards.length){
            case 2:
                this.points.textContent = "BJ";
                this.removePlayerButtons()
                break;
            default:
                this.points.textContent = points;
                this.removePlayerButtons()
                break;
        }
    }
}

export default PlayerController;