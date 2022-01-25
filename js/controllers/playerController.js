import CroupierController from "./croupierController.js";

const PlayerController = class extends CroupierController {
    
    renderSection = () => {
        const cards = this.gameManagerService.getPlayerCards();
        const points = this.gameManagerService.calculatePlayerPoints(cards);
        const cardsBlock = cards.map(card => this.createCard(card));
        this.cards.innerHTML = '';
        this.cards.append(...cardsBlock);
        this.changePointsView(cards, points)
    }
}

export default PlayerController;