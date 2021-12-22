import cardList from '../constansts.js';


const CardService = class {
    constructor(){
        this.numberOfCards = 52;
        this.cardList = cardList;
    }

    get(numberOfcards){
        const cardList = [];
        for (let i = 0; i < numberOfcards; i++){
            const cardNum = Math.floor(Math.random() * this.numberOfCards);
            const newCard = this.cardList[cardNum]
            cardList.push(newCard)
            this.cardList = this.cardList.filter((card) => card !== newCard)
            this.numberOfCards = this.cardList.length;
        }
        return cardList;
    };

    getCardsValues = (cardObjectList) => cardObjectList.map(card => card.value);

    getPoints = (cardObjectList) => cardObjectList.map(card => card.points);

    getSumPoints(cardObjectList){
        const cardValues = this.getCardsValues(cardObjectList)
        const cardsPoints = this.getPoints(cardObjectList)
        const tempSum = cardsPoints.reduce((a,b)=>a+b)
        if (!cardValues.includes('A')){
            return tempSum
        }
        return tempSum <= 21 ? tempSum: tempSum - 10;
    };
   
}

export default CardService