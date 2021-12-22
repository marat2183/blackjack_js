import CardService from './cardService.js'


const PlayerService = class{
    constructor(){
        this.hand = []
        this.CardService = new CardService()
        this.points = 0
    }

    getCardsList = () => this.hand

    get = (num) => this.CardService.get(num)
    
    calcCardsPoints = (cards) => this.CardService.getSumPoints(cards)

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


export default PlayerService
