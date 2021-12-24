import cardList from "../constansts.js";

const DeckService = class {
    constructor (cardList){
        this.cardList = cardList;
        this.numberOfCards = 52;
    }

    getRandomCard = (num) => {
        const resultCardList = []
        for (let i = 0; i < num; i++){
            const cardNum = Math.floor(Math.random() * this.numberOfCards);
            const newCard = this.cardList[cardNum]
            resultCardList.push(newCard)
            this.cardList = this.cardList.filter((card) => card !== newCard)
            this.numberOfCards = this.cardList.length;
        }
        return resultCardList
    }

    updateDeck = () => {
        this.cardList = cardList;
        this.numberOfCards = 52;
    }
}


export default DeckService;