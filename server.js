import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let gameMeta = { xMove: true };
let currentPlayer = "";
let isWinner = false;
let winner = "";
let available = [1,2,3,4,5,6,7,8,9];
let gameState  = {
    X : [],
    O: []
};

let winningCondition = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];



app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/move", (req, res) => {
    let slot = req.body.index;
    console.log(`slot: ${slot}`);
    let indexInAvalable = available.indexOf(parseInt(slot));
    if(indexInAvalable > -1){
        AddMove(slot, indexInAvalable);
        isWinner = checkWinningCondition(gameState, currentPlayer);
        winner = isWinner ? currentPlayer : "";
        return res.json({
            state: gameState,
            validMove : "true",
            currentPlayer : currentPlayer,
            available : available,
            winner : winner
        });
    }
    else{
        return res.json({
            state: gameState,
            validMove : "false",
            currentPlayer : currentPlayer,
            available : available,
            winner : winner
        });
    }
    
});

app.get("/GameOver", (req, res) => {
    console.log("Game over");
    gameMeta = { xMove: true };
    currentPlayer = "";
    isWinner = false;
    winner = "";
    available = [1,2,3,4,5,6,7,8,9];
    gameState  = {
        X : [],
        O: []
    };
    res.render("index.ejs");
});

app.listen(3000, () =>{
    console.log("Server started on port 3000");
})

function AddMove(slot, indexInAvalable) {
    if(!isWinner){
        available.splice(indexInAvalable, 1);
        currentPlayer = gameMeta.xMove ? "X": "O";
        console.log(`current player: ${currentPlayer}`);
        if(gameState[currentPlayer].length == 3){
            console.log(`available before push: ${available}`)
            available.push(gameState[currentPlayer][0]);
            console.log(`available after push: ${available}`)
            console.log(`gamestate ${currentPlayer} before: ${gameState[currentPlayer]}`)
            gameState[currentPlayer].splice(0, 1);
            gameState[currentPlayer].push(parseInt(slot))
            console.log(`gamestate ${currentPlayer} after: ${gameState[currentPlayer]}`)
        }
        else{
            gameState[currentPlayer].push(parseInt(slot));
        } 
        gameMeta.xMove = !gameMeta.xMove;
    }  
}

function checkWinningCondition(gameState, currentPlayer){
    if(gameState[currentPlayer].length > 2){
        for(let i = 0; i < winningCondition.length; i++){
            let flag = 1;
            for(let j = 0; j < winningCondition[i].length; j++){
                if(gameState[currentPlayer].indexOf(winningCondition[i][j]) < 0){
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