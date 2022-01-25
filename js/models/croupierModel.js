const CroupierModel = class {
    constructor(){
        this.cards = [];
    }

    getCards = () => this.cards;

    addCards = (cards) => {
        this.cards = [...this.cards, ...cards]
    }
    
    resetCards = () => {
        this.cards = [];
    }
}

export default CroupierModel