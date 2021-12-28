const GameManagerService = class{
    constructor(player, deck, croupier){
        this.player = player;
        this.deck = deck;
        this.croupier = croupier;
    }


    getPlayerCards = () => this.#getCardsFromPlayer(this.player);

    getCroupierCards = () => this.#getCardsFromPlayer(this.croupier);
    
    addPlayerCards = (numOfCards) => this.#addCardsToPlayer(numOfCards, this.player);
    
    addCroupierCards = (numOfCards) => this.#addCardsToPlayer(numOfCards, this.croupier);

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

    #getCardsFromPlayer = player => player.getCards()
    
    #addCardsToPlayer = (numOfCards, player) => {
        const newCards = this.#getRandomCards(numOfCards);
        player.addCards(newCards);
    }

    #getRandomCards = (num) => {
        const resultCardList = []
        for (let i = 0; i < num; i++){
            const cardNum = Math.floor(Math.random() * this.deck.cards.length);
            const newCard = this.deck.cards[cardNum]
            resultCardList.push(newCard)
            this.cards = this.deck.cards.filter((card) => card !== newCard)
        }
        return resultCardList;
    }
}


export default GameManagerService