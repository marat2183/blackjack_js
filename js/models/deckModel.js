import cardList from "../constants.js";

const DeckModel = class {
    constructor (cardList){
        this.cards = cardList;
    }

    reset = () => {
        this.cards = cardList;
    }
}


export default DeckModel;