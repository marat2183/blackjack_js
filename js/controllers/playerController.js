import PlayerService from "../services/playerService.js";
import CardController from "./cardController.js";


const PlayerController = class{
    constructor(hitBtn, standBtn, betBtn, resetBtn, chips, playerCardsPoints, cardList, playerBet, playerBalance){
        this.playerService = new PlayerService();
        this.cardController = new CardController()
        this.playerCardsPoints = playerCardsPoints;
        this.cardList = cardList;
        this.hitBtn = hitBtn;
        this.standBtn = standBtn;
        this.betBtn = betBtn;
        this.resetBtn = resetBtn;
        this.playerBet = playerBet;
        this.playerBalance = playerBalance;
        this.chips = chips
        this.addCardsBtnsHandlers();
    }

    // cards(hit, stand) btns
    showPlayerBtns = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
    }

    hidePlayerBtns = () => {
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
    }

    addCardsBtnsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = (event) => {
        this.playerService.getCards(1);
        this.renderCardSection();
    }

    standBtnCallBack = (event) => {
        this.hidePlayerBtns();
    }

    removeCardsBtnsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }

    // Chips btns
    addChipsBtnsHandlers = () => {
        this.chips.forEach((chip) => {
            chip.addEventListener('click', this.chipsBtnsCallback)
        }
    )};

    removeChipsBtnsHandlers = () => {
        this.chips.forEach((chip) => {
            chip.removeEventListener('click', this.chipsBtnsCallback)
        }
    )};

    chipsBtnsCallback = (event) => {
        const userBetStr = event.currentTarget.textContent.trim();
        const intBet = userBetStr.includes('K') ? Number(userBetStr.replace('K', '000')): Number(userBetStr)
        this.playerService.updateBet(intBet);
        this.renderBetsSection()
    }

    //Bets btns 
    addBetsBtnsHandlers = () => {
        this.betBtn.addEventListener('click', this.betBtnCallback)
        this.resetBtn.addEventListener('click', this.resetBtnCallback)
    }

    betBtnCallback = () => {
        this.betBtn.disabled = true;
        this.resetBtn.disabled = true;
        this.removeChipsBtnsHandlers();
    }

    resetBtnCallback = () => {
        this.playerService.resetBet(this.playerService.getPlayerBet());
        this.renderBetsSection();
    }

    removeBetsBtnsHandlers = () => {
        this.betBtn.removeEventListener('click', this.betBtnCallback)
        this.resetBtn.removeEventListener('click', this.resetBtnCallback)
    }

    changePlayerSectionView = (cards, points) => {
        if (cards.length >= 2 && points !== 21){
            this.playerCardsPoints.textContent = points;
            this.showPlayerBtns();
            return;
        }
        switch (cards.length){
            case 2:
                this.playerCardsPoints.textContent = "BJ";
                this.hidePlayerBtns();
                break;
            default:
                this.playerCardsPoints.textContent = points;
                this.hidePlayerBtns();
                break
        }
    }
    
    renderCardSection = () => {
        const cards = this.playerService.getPlayerCards()
        const cardsBlock = cards.map(card => this.cardController.createCard(card));
        this.cardList.innerHTML = ''
        this.cardList.append(...cardsBlock);
        try{
            const points = this.playerService.getPlayerPoints()
            this.changePlayerSectionView(cards, points)
        }
        catch{
            playerCardsPoints.textContent = 'X';
            this.hidePlayerBtns();
        }
    }

    renderBetsSection = () => {
        const playerBet = this.playerService.getPlayerBet();
        const playerBalance = this.playerService.getPlayerBalance();
        this.playerBet.textContent = playerBet;
        this.playerBalance.textContent = playerBalance;
    }
}



const playerCardsPoints = document.querySelector('.points__value--player');
const cardList = document.querySelector('.player__cards--player')
const playerBet = document.querySelector('.bets__value--bet');
const playerBalance = document.querySelector('.bets__value--balance')
const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');
const chips = document.querySelectorAll('.chip');
const betBtn = document.querySelector('.bet_button--bet');
const resetBtn = document.querySelector('.bet_button--reset');


const controller = new PlayerController(
                                        hitBtn, 
                                        standBtn,
                                        betBtn,
                                        resetBtn,
                                        chips, 
                                        playerCardsPoints, 
                                        cardList, 
                                        playerBet, 
                                        playerBalance
                                        )
controller.playerService.getCards(2);
controller.addChipsBtnsHandlers()
controller.addBetsBtnsHandlers()
controller.renderCardSection()
controller.renderBetsSection()
// controller.removeChipsBtnsHandlers();


 