import CardRepository from './cardRepository.js'
import CardRepository from './cardRepository.js'

const Player = class{
    constructor(){
        this.hand = []
        this.CardRepository = new CardRepository()
        this.points = 0
    }

    getCardsList = () => this.hand

    updateCards = () => {
        const card = this.CardRepository.get(1);
        this.hand = [...this.hand, card]
    }
    
    updatePoints = (points) => {
        this.points = points;
    }

    resetHand = () => {
        this.hand = [];
    }
}


export default Player