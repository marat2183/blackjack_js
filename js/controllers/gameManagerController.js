import GameManagerService from "../services/gameManagerService.js";
import PlayerModel from "../models/playerModel.js";
import DeckModel from "../models/deckModel.js";
import cardList from "../constants.js";
import PlayerController from "./playerController.js";
import CroupierController from "./croupierController.js";


const GameManagerController = class{
    constructor (gameManagerService, playerController, croupierController, hitBtn, standBtn){
        this.gameManagerService = gameManagerService;
        this.playerController = playerController;
        this.croupierController = croupierController;
        this.hitBtn = hitBtn;
        this.standBtn = standBtn;
        
    }
    
    startGame = () => {
        this.gameManagerService.deck.shuffle();
        this.gameManagerService.addPlayerCards(2);
        const status = this.playerController.renderSection();
        this.playerRenderHandler(status);
        this.gameManagerService.addCroupierCards(2);
        this.croupierController.renderSection();
    }

    playerRenderHandler = (status) => {
        switch (status){
            case 'delete':
                this.#removePlayerButtons();
                break;
            default:
                this.#addPlayerButtons();
                break;
        }
    }

    #addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.#hitBtnCallback);
        this.standBtn.addEventListener('click', this.#standBtnCallBack);
    }

    #hitBtnCallback = () => {
        this.gameManagerService.addPlayerCards(1);
        const status = this.playerController.renderSection();
        this.playerRenderHandler(status);
    }

    #standBtnCallBack = () => {
        this.#removePlayerButtons();
    }

    #addPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
        this.#addCardsButtonsHandlers();
    }

    #removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }

    #removePlayerButtons = () => {
        this.#removeCardsButtonsHandlers();
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
        this.croupierController.getCards()
    }
}

const playerCardsSection = document.querySelector('.player__cards--player')
const playerCardsPoints = document.querySelector('.points__value--player')
const croupierCardsSection = document.querySelector('.player__cards--croupier')
const croupierCardsPoints = document.querySelector('.points__value--croupier')
const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');


const deckModel = new DeckModel(cardList)
const playerModel = new PlayerModel()
const croupierModel = new PlayerModel()
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
    standBtn
)


gameManagerController.startGame()