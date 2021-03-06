import GameManagerService from "../services/gameManagerService.js";
import PlayerModel from "../models/playerModel.js";
import CroupierModel from "../models/croupierModel.js";
import DeckModel from "../models/deckModel.js";
import cardList from "../constants.js";
import PlayerController from "./playerController.js";
import CroupierController from "./croupierController.js";


const GameManagerController = class{
    constructor (
        gameManagerService, 
        playerController, 
        croupierController, 
        hitBtn, standBtn, 
        betBtn, 
        resetBtn, 
        chips, 
        balance,
        bet
    )
    {
        this.gameManagerService = gameManagerService;
        this.playerController = playerController;
        this.croupierController = croupierController;
        this.hitBtn = hitBtn;
        this.standBtn = standBtn;
        this.betBtn = betBtn;
        this.resetBtn = resetBtn;
        this.chips = chips;
        this.balance = balance;
        this.bet = bet;
    }

    WinFunctionHandler = (result) => {
        const playerBalance =  this.gameManagerService.getPlayerBalance();
        const playerBet = this.gameManagerService.getPlayerBet();
        switch (result){
            case 'player':
                this.gameManagerService.updatePlayerBalance(playerBalance + 1.5 * playerBet);
                console.log("Player win");
                break;
            case 'croupier':
                console.log("Croupier win");
                break;
            case 'draw':
                this.gameManagerService.updatePlayerBalance(playerBalance + playerBet);
                console.log('Draw');
                break;
        }
        this.renderBetsSection();
    }

    chooseWinner = () => {
        const playerCards = this.gameManagerService.getPlayerCards();
        const croupierCards = this.gameManagerService.getCroupierCards();
        const playerPoints = this.gameManagerService.calculatePlayerPoints(playerCards);
        const croupierPoints = this.gameManagerService.calculatePlayerPoints(croupierCards);
        const playerWinCondition = playerPoints <= 21;
        const playerLoseCondition = playerPoints > 21;
        const croupierWinCondition = croupierPoints <= 21;
        const croupierLoseCondition = croupierPoints > 21;
        if (playerLoseCondition && croupierLoseCondition){
            this.WinFunctionHandler('draw');
        }
        else if (playerWinCondition && croupierWinCondition){
            if (playerPoints < croupierPoints){
                this.WinFunctionHandler('croupier');
            }
            else if (croupierPoints < playerPoints){
                this.WinFunctionHandler('player');
            }
            else{
                this.WinFunctionHandler('draw');
            }
        }
        else if (playerLoseCondition && croupierWinCondition){
            this.WinFunctionHandler('croupier');
        }
        else if (croupierLoseCondition && playerWinCondition){
            this.WinFunctionHandler('player');
        }
    }


    startBetsAccepting = () => {
        this.#activateBetButtons();
        this.#activateChipsButtons();
        this.renderBetsSection();
    }

    endBetsAccepting = () => {
        this.#disableBetButtons();
        this.#disableChipsButtons();
        setTimeout(() => {
            this.startGame();
        }, 1000)
    }
    
    startGame = () => {
        this.gameManagerService.deck.shuffle();
        this.gameManagerService.addPlayerCards(2);
        this.playerController.renderSection();
        this.gameManagerService.addCroupierCards(2);
        this.croupierController.renderSection();
        const playerState = this.playerController.getState();
        const croupierState = this.croupierController.getState();
        if (!playerState.needCard || !croupierState.needCard){
            this.endGame();
            return;
        }
        this.gameLoop();
    }

    endGame = () => {
        console.log("GAME END!");
        this.chooseWinner();
        this.renderBetsSection();
        this.bet.textContent = 0;
    }

    gameLoop = () => {
        const playerState = this.playerController.getState();
        if (playerState.needCard){
            this.#addPlayerButtons();
            return;
        }
        this.#removePlayerButtons();
        this.croupierController.emulateGame()
        this.endGame();
        return;
    }
    
    renderBetsSection = () => {
        const balance = this.gameManagerService.getPlayerBalance();
        const bet = this.gameManagerService.getPlayerBet();
        this.balance.textContent = balance;
        this.bet.textContent = bet;
        return;
    }

    #activateChipsButtons = () => this.chips.addEventListener('click', this.#chipsButtonsCallback);

    #disableChipsButtons = () => this.chips.removeEventListener('click', this.#chipsButtonsCallback);

    #activateBetButtons = () => {
        this.betBtn.disabled = false;
        this.resetBtn.disabled = false;
        this.#addBetButtonsHandlers();
    }

    #disableBetButtons = () => {
        this.betBtn.disabled = true;
        this.resetBtn.disabled = true;
        this.#removeBetButtonsHandlers();
    }

    #addBetButtonsHandlers = () => {
        this.betBtn.addEventListener('click', this.#betBtnCallBack);
        this.resetBtn.addEventListener('click', this.#resetBtnCallBack);
    }

    #removeBetButtonsHandlers = () => {
        this.betBtn.removeEventListener('click', this.#betBtnCallBack);
        this.resetBtn.removeEventListener('click', this.#resetBtnCallBack);
    }

    #betBtnCallBack = () => {
        this.endBetsAccepting();
    }

    #resetBtnCallBack = () => {
        this.gameManagerService.resetPlayerBet();
        this.renderBetsSection()
    }

    #chipsButtonsCallback = (event) => {
        if (!(event.target.classList.contains('chip__value') || event.target.classList.contains('chip'))){
            return;
        }
        const betStr = event.target.textContent.trim();
        const betsValues = {
            '10': 10,
            '50': 50,
            '100': 100,
            '200': 200,
            '500': 500,
            '1K': 1000,
            '5K': 5000,
            '10K': 10000,
        }
        const betNumber =  typeof betsValues[betStr] === 'undefined' ? 0: betsValues[betStr];
        if ((this.gameManagerService.getPlayerBalance() - betNumber) < 0){
            //show error;
            return;
        }
        this.gameManagerService.addPlayerBet(betNumber);
        this.renderBetsSection();
    }

    #addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.#hitBtnCallback);
        this.standBtn.addEventListener('click', this.#standBtnCallBack);
    }

    #hitBtnCallback = () => {
        this.gameManagerService.addPlayerCards(1);
        this.playerController.renderSection();
        this.gameLoop();
    }

    #standBtnCallBack = () => {
        this.playerController.renderSection();
        this.playerController.setState({'needCard': false});
        this.gameLoop();
    }

    #addPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
        this.#addCardsButtonsHandlers();
    }

    #removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.#hitBtnCallback);
        this.standBtn.removeEventListener('click', this.#standBtnCallBack);
    }

    #removePlayerButtons = () => {
        this.#removeCardsButtonsHandlers();
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
    }
}

const playerCardsSection = document.querySelector('.player__cards--player')
const playerCardsPoints = document.querySelector('.points__value--player')
const croupierCardsSection = document.querySelector('.player__cards--croupier')
const croupierCardsPoints = document.querySelector('.points__value--croupier')
const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');
const betBtn = document.querySelector('.bet_button--bet');
const resetBtn = document.querySelector('.bet_button--reset');
const chips = document.querySelector('.chips-list');
const balance = document.querySelector('.bets__value--balance')
const bet = document.querySelector('.bets__value--bet')


const deckModel = new DeckModel(cardList)
const playerModel = new PlayerModel()
const croupierModel = new CroupierModel()
const gameManagerService = new GameManagerService(playerModel, deckModel, croupierModel)
const playerController = new PlayerController(
    gameManagerService, 
    playerCardsSection, 
    playerCardsPoints,
)

const croupierController = new CroupierController(
    gameManagerService,
    croupierCardsSection,
    croupierCardsPoints
)

const gameManagerController = new GameManagerController(
    gameManagerService,
    playerController,
    croupierController,
    hitBtn,
    standBtn,
    betBtn,
    resetBtn,
    chips,
    balance,
    bet
)

gameManagerController.startBetsAccepting()

