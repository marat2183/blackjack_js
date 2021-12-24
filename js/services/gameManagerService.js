const GameManagerService = class{
    constructor(playerService){
        this.playerService = playerService;
    }

    calculatePlayerPoints = (cards) => {
        let result = 0;
        for (let i = 0; i < cards.length; i++){
            if (cards[i].type !== 'A'){
                result = result + cards[i].points
            }
            else{
                const temp = result + 11 <= 21 ? 11 : 1
                result = result + temp
            }
        }
        return result;
    }

}


export default GameManagerService