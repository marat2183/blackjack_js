import cardList from '../constansts.js';


const CardService = class {
    
    constructor(){
        this.numberOfCards = 52;
        this.cardList = cardList;
    }

    get = (numberOfcards, defaultCard=false) => {
        if (defaultCard){
            const newCard = {
                type: 'defaultCard',
                value: '',
                points: 0
            }
            return [newCard];
        }
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

    getDefault = () => {
        const newCard = {
            type: 'defalut',
            value: 'default',
            points: 0
        }
    }

    getCardsValues = (cardObjectList) => cardObjectList.map(card => card.value);

    getPoints = (cardObjectList) => cardObjectList.map(card => card.points);

    getSumPoints(cardObjectList){
        const cardsValues = this.getCardsValues(cardObjectList)
        const cardsPoints = this.getPoints(cardObjectList)
        if (!cardsValues.includes('A')){
            return cardsPoints.reduce((a,b)=>a+b)
        }
        const filteredCardsValues = cardObjectList.filter((card) => card.value !== 'A');
        const filteredCardsPoints = this.getPoints(filteredCardsValues)
        const numOfAces = cardObjectList.length - filteredCardsValues.length
        let resultSum = filteredCardsPoints.reduce((a,b)=>a+b);
        for (let i = 0; i < numOfAces; i++){
            if ((resultSum + 11) <= 21){
                resultSum = resultSum + 11
                continue;
            }
            resultSum = resultSum + 1;
        }
        return resultSum;
    };
}

export default CardService