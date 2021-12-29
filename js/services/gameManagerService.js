const GameManagerService = class{
    constructor(player, deck, croupier){
        this.player = player;
        this.deck = deck;
        this.croupier = croupier;
    }

    getPlayerCards = () => this.#getCardsFromPlayer(this.player);

    getPlayerBet = () => this.player.getBet();

    getPlayerBalance = () => this.player.getBalance();

    updatePlayerBalance = (balance) => {
        this.player.updateBalance(balance);
        console.log(balance);
    }

    addPlayerBet = (bet) => {
        const currentBalance = this.getPlayerBalance();
        this.player.addBet(bet);
        this.updatePlayerBalance(currentBalance - bet);
    }

    resetPlayerBet = () => {
        const currentBalance = this.getPlayerBalance();
        const currentBet = this.getPlayerBet()
        this.player.resetBet();
        this.updatePlayerBalance(currentBalance + currentBet)
    }

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
        const newCards = this.#getCardsFromDeck(numOfCards);
        player.addCards(newCards);
    }

    #getCardsFromDeck = (num) => {
        const resultCardList = []
        for (let i = 0; i < num; i++){
            if (this.deck.cards.length === 0){
                this.deck.reset();
            }
            const cardNum = this.deck.cards.length - 1;
            const newCard = this.deck.cards[cardNum]
            resultCardList.push(newCard)
            this.deck.removeCard();
        }
        return resultCardList;
    }
}


export default GameManagerService