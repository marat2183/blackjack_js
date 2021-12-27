import PlayerService from "../services/playerService.js";
import GameManagerService from "../services/gameManagerService.js";
import DeckService from "../services/deckService.js";
import cardList from "../constants.js";


const PlayerController = class{
    constructor(hitBtn, standBtn, gameManagerService){
        this.hitBtn = hitBtn;
        this.standBtn = standBtn;
        this.gameManagerService = gameManagerService
    }

    // cards(hit, stand) btns
    showPlayerButtons = () => {
        this.hitBtn.style.display = 'inline-block';
        this.standBtn.style.display = 'inline-block';
    }

    hidePlayerButtons = () => {
        this.hitBtn.style.display = 'none';
        this.standBtn.style.display = 'none';
    }

    addCardsButtonsHandlers = () => {
        this.hitBtn.addEventListener('click', this.hitBtnCallback);
        this.standBtn.addEventListener('click', this.standBtnCallBack);
    }

    hitBtnCallback = (event) => {
        this.gameManagerService.getCards(1);
        this.renderCardSection();
    }

    standBtnCallBack = (event) => {
        this.hidePlayerButtons();
    }

    removeCardsButtonsHandlers = () => {
        this.hitBtn.removeEventListener('click', this.hitBtnCallback);
        this.standBtn.removeEventListener('click', this.standBtnCallBack);
    }
}




const hitBtn = document.querySelector('.player__btn--hit');
const standBtn = document.querySelector('.player__btn--stand');


const playerService = new PlayerService()
const deckService = new DeckService(cardList)
const gameManagerService = new GameManagerService(playerService, deckService);

const controller = new PlayerController(hitBtn, standBtn, gameManagerService)
// controller.removeChipsButtonsHandlers();


 export default PlayerController