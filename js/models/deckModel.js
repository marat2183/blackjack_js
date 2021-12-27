import cardList from "../constants.js";

const DeckModel = class {
    constructor (cardList){
        this.cardList = cardList;
    }

    updateDeck = () => {
        this.cardList = cardList;
    }
}


export default DeckModel;