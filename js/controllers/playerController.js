import CroupierController from "./croupierController.js";

const PlayerController = class extends CroupierController {
    
    renderSection = () => {
        const cards = this.gameManagerService.getPlayerCards();
        const points = this.gameManagerService.calculatePlayerPoints(cards);
        const cardsBlock = cards.map(card => this.createCard(card));
        this.cards.innerHTML = '';
        this.cards.append(...cardsBlock);
        const result = this.changePointsView(cards, points)
        return result
    }

    addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = () => {
        this.gameManagerService.addPlayerCards(1);
        this.renderSection();
    }

    standBtnCallBack = () => {
        this.removePlayerButtons();
    }

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
    }

    changePointsView = (cards, points) => {
        if (points > 21){
            this.points.textContent = "X";
            return 'delete';
        }
        if (cards.length >= 2 && points < 21){
            this.points.textContent = points;
            return 'add'
        }
        switch (cards.length){
            case 2:
                this.points.textContent = "BJ";
                return 'delete';
            default:
                this.points.textContent = points;
                return 'delete';
        }
    }
}

export default PlayerController;