const PlayerModel = class {
    constructor(){
        this.cards = [];
    }

    getPlayerCards = () => this.cards;

    addCards = (cards) => {
        this.cards = [...this.cards, ...cards]
    }
    
    resetCards = () => {
        this.cards = [];
    }
}

export default PlayerModel
