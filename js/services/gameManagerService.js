const GameManagerService = class{
    constructor(playerService, deckService){
        this.playerService = playerService;
        this.deckService = deckService;
    }

    getPlayerPoints = () => this.playerService.getPoints();

    getPlayerCards = () => this.playerService.getPlayerCards();

    addCardsToPlayer = (numOfCards) => {
        const newCards = this.#getRandomCards(numOfCards);
        this.#updatePlayer(newCards)
    }

    hitCommand = () => this.addCardsToPlayer(1);

    standCommand = () => {
        // change state
    }


    #updatePlayer = (newCards) => {
        this.#updatePlayerCards(newCards);
        const updatedCards = this.getPlayerCards()
        const updatedPoints = this.#calculatePlayerPoints(updatedCards)
        this.#updatePlayerPoints(updatedPoints);
    }

    #updatePlayerCards = (cards) => this.playerService.addCards(cards);


    #updatePlayerPoints = (points) => this.playerService.updatePoints(points)

    #getRandomCards = (num) => {
        const resultCardList = []
        for (let i = 0; i < num; i++){
            const cardNum = Math.floor(Math.random() * this.deckService.numberOfCards);
            const newCard = this.deckService.cardList[cardNum]
            resultCardList.push(newCard)
            this.cardList = this.deckService.cardList.filter((card) => card !== newCard)
            this.numberOfCards = this.deckService.cardList.length;
        }
        return resultCardList;
    }

    #calculatePlayerPoints = (cards) => {
        let result = 0;
        for (let i = 0; i < cards.length; i++){
            if (cards[i].value !== 'A'){
                result = result + cards[i].points
            }
            else{
                const temp = result + 11 <= 21 ? 11 : 1
                result = result + temp
            }
        }
        return result;
    }
}


export default GameManagerService