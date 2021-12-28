import cardList from "../constants.js";

const DeckModel = class {
    constructor (cardList){
        this.cards = cardList
    }

    shuffle = () => this.cards.sort(() => Math.random() - 0.5)

    removeCard = () => this.cards.pop();

    reset = () => {
        this.cards = cardList;
        this.shuffle(this.cards);
    }
}


export default DeckModel;