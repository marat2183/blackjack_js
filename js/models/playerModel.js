import CroupierModel from "./croupierModel.js";


const PlayerModel = class extends CroupierModel{
    constructor(){
        super();
        this.bet = 0;
        this.balance = 10000
    }


    getBet = () => this.bet;

    getBalance = () => this.balance;

    addBet = (bet) => {
        this.bet += bet;
    } 
    
    updateBalance = (balance) => {
        this.balance = balance;
    }

    resetBet = () => {
        this.bet = 0;
    }

}

export default PlayerModel
