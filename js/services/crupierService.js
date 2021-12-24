import CardService from './cardService.js'


const CrupierService = class{
    
    constructor(){
        this.hand = []
        this.cardService = new CardService()
        this.points = 0
    }

    getCrupierCards = () => {
        return this.hand;
    }

    getCrupierPoints = () => {
        if (this.points <= 21){
            return this.points
        }
        throw new Error("Points more then 21")
    }

    getCards = (numberOfcards, defaultCard=false) => {
        const cards = this.cardService.get(numberOfcards, defaultCard);
        this.updateCards(cards);
        this.updatePoints(cards);
    }
    
    updateCards = (cards) => {
        if (this.hand.length === 2){
            this.hand = [this.hand[0], ...cards]
            return
        }
        this.hand = [...this.hand, ...cards]
    }
    
    updatePoints = () => {
        const updatedPoints = this.cardService.getSumPoints(this.hand)
        this.points = updatedPoints;
    }

    resetHand = () => {
        this.hand = [];
        this.points = 0;
    }
}


export default CrupierService