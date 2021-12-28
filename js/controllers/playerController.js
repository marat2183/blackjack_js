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