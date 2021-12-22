import CardService from './cardService.js'


const CrupierService = class{
    constructor(){
        this.hand = []
        this.CardService = new CardService()
        this.points = 0
    }

    getCardsList = () => this.hand;

    updateCards = () => {
        const card = this.CardService.get(1);
        this.hand = [...this.hand, card]
    }
    
    updatePoints = () => {
        const cards = this.getCardsList()
        const updatedPoints = CardService.getSumPoints(cards)
        this.points = updatedPoints;
    }

    resetHand = () => {
        this.hand = [];
    }
}


export default CrupierService