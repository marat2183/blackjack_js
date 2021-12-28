const CroupierController = class {

    constructor(gameManagerService, cardSection, pointsSection){
        this.gameManagerService = gameManagerService;
        this.cards = cardSection;
        this.points = pointsSection;
    }

    renderSection = () => {
        const cards = this.gameManagerService.getPlayerCards();
        const points = this.gameManagerService.calculatePlayerPoints(cards);
        const cardsBlock = cards.map(card => this.createCard(card));
        this.cards.innerHTML = ''
        this.cards.append(...cardsBlock);
        this.changePointsView(cards, points)
    }

    getCards = () => {
        let isEnd = false
        let croupierCards = this.gameManagerService.getCroupierCards(croupier)
        let croupierPoints = this.gameManagerService.calculatePlayerPoints(croupierCards);
        while (!isEnd && croupierPoints < 17){
            this.gameManagerService.addCroupierCards(1);
            this.renderPlayersSection(croupier, this.croupierCards, this.croupierPoints, true)
            croupierCards = this.gameManagerService.getCroupierCards(croupier)
            croupierPoints = this.gameManagerService.calculatePlayerPoints(croupierCards);
            if (croupierPoints >= 17){
                isEnd = true;
            }
        }
    }

    changePointsView = (cards, points) => {
        if (points > 21){
            this.points.textContent = "X";
            return
        }
        if (cards.length >= 2 && points < 21){
            this.points.textContent = points;
            return;
        }
        switch (cards.length){
            case 2:
                this.points.textContent = "BJ";
                break;
            default:
                this.points.textContent = points;
                break
        }
    }

    createCard = (card) => {
        const cardBlock = document.createElement('div');
        cardBlock.classList.add('card');
        if (card.type === 'defaultCard'){
            cardBlock.classList.add('card--default');
            return cardBlock
        }
        const cardTopSpan = this.createCardTopSpan(card);
        const cardBottomSpan = this.createCardBottomSpan(card);
        const cardImgs = this.createCardImgs(card);
        cardBlock.append(cardTopSpan, ...cardImgs, cardBottomSpan)
        return cardBlock;
    }
    

    getCardSpanColor = (card) => ['spades', 'clubs'].includes(card.type) ? 'card__value--black': 'card__value--red'

    createCardTopSpan = (card) => {
        const colorStyle = this.getCardSpanColor(card);
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--top', colorStyle)
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    createCardBottomSpan = (card) => {
        const colorStyle = this.getCardSpanColor(card);
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card__value', 'card__value--bottom', colorStyle)
        cardSpan.textContent = card.value;
        return cardSpan;
    }

    createCardImgs = (card) => {
        const topImg = document.createElement('img')
        topImg.classList.add('card__type', 'card__type--top');
        topImg.setAttribute('src', `./img/${card.type}.svg`);
        const mainImg = document.createElement('img')
        mainImg.classList.add('card__type');
        mainImg.setAttribute('src', `./img/${card.type}.svg`);
        const bottomImg = document.createElement('img')
        bottomImg.classList.add('card__type', 'card__type--bottom');
        bottomImg.setAttribute('src', `./img/${card.type}.svg`);
        return [topImg, mainImg, bottomImg]
    }
}

export default CroupierController;