import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import {TicTacToeGame} from "./game.js";
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create one game instance
const game = new TicTacToeGame();

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/move", (req, res) => {
    const slot = req.body.index;
    console.log(`slot: ${slot}`);

    const moveResult = game.addMove(slot);
    console.log(`moveResult: ${moveResult}`);

    return res.json({
        ...game.getState(),
        validMove: moveResult.validMove
    });
});

app.get("/GameOver", (req, res) => {
    console.log("Game over");
    game.reset();
    res.render("index.ejs");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});