import cardList from '../constansts.js'



const CardRepository = class {
    constructor(){
        this.numberOfCards = 52
        this.cardList = cardList
    }

    get(numberOfcards){
        const cardList = [];
        for (let i = 0; i < numberOfcards; i++){
            const cardNum = Math.floor(Math.random() * this.numberOfCards);
            const newCard = this.cardList[cardNum]
            cardList.push(newCard)
        }
        return cardList;
    };

    
}

export default CardRepository