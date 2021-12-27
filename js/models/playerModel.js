const PlayerModel = class {
    constructor(){
        this.cards = [];
    }

    getCards = () => this.cards;

    addCards = (cards) => {
        this.cards = [...this.cards, ...cards]
    }
    
    reset = () => {
        this.cards = [];
    }
}

export default PlayerModel
