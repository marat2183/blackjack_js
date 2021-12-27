import cardList from "../constants.js";

const DeckModel = class {
    constructor (cardList){
        this.cardList = cardList;
    }

    reset = () => {
        this.cardList = cardList;
    }
}


export default DeckModel;