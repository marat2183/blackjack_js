import CardService from './cardService.js'


const PlayerService = class{
    constructor(){
        this.hand = [];
        this.cardService = new CardService();
        this.points = 0;
        this.bet = 0;
        this.balance = 1000;
    }

    getPlayerCards = () => {
        return this.hand;
    }

    getPlayerBalance = () => {
        return this.balance;
    }

    getPlayerBet = () => {
        return this.bet
    }

    getPlayerPoints = () => {
        if (this.points <= 21){
            return this.points
        }
        throw new Error("Points more then 21")
    }

    getCards = (num) => {
        const cards = this.cardService.get(num);
        this.updateCards(cards);
        this.updatePoints(cards);
    }
    
    updateCards = (cards) => {
        this.hand = [...this.hand, ...cards]
    }
    
    updatePoints = () => {
        const updatedPoints = this.cardService.getSumPoints(this.hand)
        this.points = updatedPoints;
    }

    updateBalance = (bet) => this.balance = this.balance - bet;

    updateBet = (bet) => {
        this.bet = this.bet + bet;
        this.updateBalance(bet)
    }

    resetBet(bet){
        this.bet = 0;
        this.balance = this.balance + bet;
    }

    resetHand = () => {
        this.hand = [];
        this.points = 0;
    }
}


export default PlayerService
