import DeckService from './deckService.js'
import cardList from '../constansts.js';

const PlayerService = class {
    constructor(deckService){
        this.cards = [];
        this.deckService = deckService;
    }

    getPlayerCards = () => {
        return this.cards;
    }

    getNewCards = (numberOfcards) => {
        const cards = this.deckService.getRandomCard(numberOfcards);
        this.updateCards(cards);
    }
    
    updateCards = (cards) => {
        this.cards = [...this.cards, ...cards]
    }
    
    resetCards = () => {
        this.cards = [];
    }
}

export default PlayerService
