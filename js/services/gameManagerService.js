const GameManagerService = class{
    constructor(playerModel, deckModel){
        this.playerModel = playerModel;
        this.deckModel = deckModel;
    }


    getPlayerCards = () => this.playerModel.getPlayerCards();

    addCardsToPlayer = (numOfCards) => {
        const newCards = this.#getRandomCards(numOfCards);
        this.#updatePlayerCards(newCards);
    }

    hitCommand = () => this.addCardsToPlayer(1);

    standCommand = () => {
        // change state
    }

    calculatePlayerPoints = (cards) => {
        let result = 0;
        const filteredCards = cards.filter((card) => card.value !== "A")
        const filteredAcesCards = cards.filter((card) => card.value === "A")
        for (let card of filteredCards){
            result = result + card.points
        }
        for (let card of filteredAcesCards){
            let temp = result + 11 <= 21 ? card.points: 1;
            result = result + temp;
        }
        return result;
    }

    #updatePlayerCards = (cards) => this.playerModel.addCards(cards);

    #getRandomCards = (num) => {
        const resultCardList = []
        for (let i = 0; i < num; i++){
            const cardNum = Math.floor(Math.random() * this.deckModel.cardList.length);
            const newCard = this.deckModel.cardList[cardNum]
            resultCardList.push(newCard)
            this.cardList = this.deckModel.cardList.filter((card) => card !== newCard)
        }
        return resultCardList;
    }
}


export default GameManagerService