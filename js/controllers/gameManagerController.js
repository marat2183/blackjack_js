import GameManagerService from "../services/gameManagerService.js";
import PlayerModel from "../models/playerModel.js";
import DeckModel from "../models/deckModel.js";
import cardList from "../constants.js";
import PlayerController from "./playerController.js";
import CroupierController from "./croupierController.js";


const GameManagerController = class{
    constructor (gameManagerService, playerController, croupierController){
        this.gameManagerService = gameManagerService;
        this.playerController = playerController;
        this.croupierController = croupierController;
        
    }
    
    startGame = () => {
        this.gameManagerService.addPlayerCards(2);
        this.playerController.renderSection();
        this.gameManagerService.addCroupierCards(2);
        this.croupierController.renderSection();
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
    hitBtn,
    standBtn
)

const croupierController = new CroupierController(
    gameManagerService,
    croupierCardsSection,
    croupierCardsPoints
)

const gameManagerController = new GameManagerController(
    gameManagerService,
    playerController,
    croupierController 
)
console.log(croupierController)
gameManagerController.startGame()