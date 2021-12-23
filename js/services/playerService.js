import CardService from './cardService.js'


const PlayerService = class{
    constructor(){
        this.hand = []
        this.CardService = new CardService()
        this.points = 0
    }

    getPlayerCards = () => {
        return this.hand
    }

    getPlayerPoints = () => {
        if (this.points <= 21){
            return this.points
        }
        throw new Error("Points more then 21")
    }

    getCards = (num) => {
        const cards = this.CardService.get(num);
        this.updateCards(cards);
        this.updatePoints(cards);
    }
    
    updateCards = (cards) => {
        this.hand = [...this.hand, ...cards]
    }
    
    updatePoints = () => {
        const updatedPoints = this.CardService.getSumPoints(this.hand)
        this.points = updatedPoints;
    }

    resetHand = () => {
        this.hand = [];
        this.points = 0;
    }
}


export default PlayerService
