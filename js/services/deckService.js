import cardList from "../constants.js";

const DeckService = class {
    constructor (cardList){
        this.cardList = cardList;
        this.numberOfCards = this.cardList.length;
    }

    getCardByNumber = (num) => this.cardList[num];

    updateDeck = () => {
        this.cardList = cardList;
        this.numberOfCards = this.cardList.length;
    }
}


export default DeckService;