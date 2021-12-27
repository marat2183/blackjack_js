const PlayerService = class {
    constructor(){
        this.cards = [];
        this.points = 0
    }

    getPlayerCards = () => this.cards;

    getPoints = () => this.points;

    
    addCards = (cards) => {
        this.cards = [...this.cards, ...cards]
    }

    updatePoints = (points) => {
        this.points = points;
    }
    
    resetCards = () => {
        this.cards = [];
    }
}

export default PlayerService
