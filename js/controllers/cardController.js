import CardService from '../services/cardService.js'


const CardController = class {
    constructor(){
        this.service = new CardService();
    }

    createCard = (card) => {
        const cardBlock = document.createElement('div');
        cardBlock.classList.add('card');
        const cardTopSpan = this.createCardTopSpan(card);
        const cardBottomSpan = this.createCardBottomSpan(card);
        const cardImgs = this.createCardImgs(card);
        cardBlock.append(cardTopSpan, ...cardImgs, cardBottomSpan)
        return cardBlock;
    }
    
    createCardTopSpan = (card) => {
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--top')
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    createCardBottomSpan = (card) => {
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--bottom')
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    createCardImgs = (card) => {
        let imgsSource = ''
        if (card.type === 'club'){
            imgsSource = './img/clubs.svg'
        }
        else if (card.type === 'hearts'){
            imgsSource = './img/hearts.svg'
        }
        else if (card.type === 'pique'){
            imgsSource = './img/pique.svg'
        }
        else{
            imgsSource = './img/diamonds.svg'
        }
        const topImg = document.createElement('img')
        topImg.classList.add('card__type', 'card__type--top');
        topImg.setAttribute('src', imgsSource);
        const mainImg = document.createElement('img')
        mainImg.classList.add('card__type');
        mainImg.setAttribute('src', imgsSource);
        const bottomImg = document.createElement('img')
        bottomImg.classList.add('card__type', 'card__type--bottom');
        bottomImg.setAttribute('src', imgsSource);
        return [topImg, mainImg, bottomImg]
    }
}

export default CardController;