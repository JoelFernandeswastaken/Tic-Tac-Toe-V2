export class TicTacToeGame {
    constructor() {
        this.reset();
    }

    reset() {
        this.gameMeta = { xMove: true };
        this.currentPlayer = "";
        this.isWinner = false;
        this.winner = "";
        this.available = [1,2,3,4,5,6,7,8,9];
        this.gameState  = {
            X : [],
            O: []
        };
        this.winningCondition = [
            [1,2,3],[4,5,6],[7,8,9],
            [1,4,7],[2,5,8],[3,6,9],
            [1,5,9],[3,5,7]
        ];
    }

    addMove(slot) {
        console.log(`available: ${this.available}`);
        let indexInAvailable = this.available.indexOf(parseInt(slot));
        if (indexInAvailable > -1 && !this.isWinner) {
            this.available.splice(indexInAvailable, 1);
            this.currentPlayer = this.gameMeta.xMove ? "X" : "O";

            if (this.gameState[this.currentPlayer].length == 3) {
                this.available.push(this.gameState[this.currentPlayer][0]);
                this.gameState[this.currentPlayer].splice(0, 1);
                this.gameState[this.currentPlayer].push(parseInt(slot));
            } else {
                this.gameState[this.currentPlayer].push(parseInt(slot));
            }

            this.isWinner = this.checkWinningCondition();
            this.winner = this.isWinner ? this.currentPlayer : "";

            this.gameMeta.xMove = !this.gameMeta.xMove;

            return { validMove: true };
        }
        return { validMove: false };
    }

    // checkWinningCondition() {
    //     if (this.gameState[this.currentPlayer].length > 2) {
    //         this.winningCondition.some(winningArray => 
    //             winningArray.every(position => this.gameState[this.currentPlayer].includes(position)));
    //     }
    //     return false;
    // }
    checkWinningCondition(){
        if(this.gameState[this.currentPlayer].length > 2){
            for(let i = 0; i < this.winningCondition.length; i++){
                let flag = 1;
                for(let j = 0; j < this.winningCondition[i].length; j++){
                    if(this.gameState[this.currentPlayer].indexOf(this.winningCondition[i][j]) < 0){
                        flag = 0;
                        break;
                    }
                }
                if(flag == 1)
                    return true
            }
            return false;
        }
        return false;
    }

    getState() {
        return {
            state: this.gameState,
            currentPlayer: this.currentPlayer,
            available: this.available,
            winner: this.winner
        };
    }
   
}