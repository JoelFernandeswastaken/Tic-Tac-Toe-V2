$(document).ready(function () {
    $(".cell").on("click", function () {
        const data_index = $(this).attr("data-index");
        const cell = $(this);
        console.log(`data-index: ${data_index}`);
        $.ajax({
            url : "/move",
            method : "POST",
            contentType : "application/json",
            data : JSON.stringify({index : data_index}),
            success : function(response){
                console.log("success:", response);
                if(response.validMove === "true"){
                    RenderBoard(response)
                }
                else{
                    alert("Invalid move");
                }
            },
            error: function(err){
                console.log("Error:", err)
            }
        })
    });
});


function RenderBoard(response){
    gameState = response.state;
    available = response.available;
    currentPlayer = response.currentPlayer;
    winner = response.winner;

    let xPositions = gameState["X"];
    let oPositions = gameState["O"];
    let winningPositions = gameState[winner];

    available.forEach(position => {
        $(`#c${position}`).text("");
        $(`#c${position}`).removeClass("greyOut");
    });

    console.log(`x positions length: ${xPositions.length}`);
    console.log(`o positions length: ${oPositions.length}`);

    xPositions.forEach(position => {
        $(`#c${position}`).text("X");
    });
    oPositions.forEach(position => {
        $(`#c${position}`).text("O");
    });
    if(response.winner != ""){
        winningPositions.forEach(position => {
            $(`#c${position}`).addClass("winner-position");
        });
        $("#winner").text(`Winner: ${response.winner}`)
        $("#result").removeClass("hidden");
    }
    
}

function GameOver(){
    $.ajax({
        url : "/GameOver",
        method : "GET",
        contentType : "application/json",
        success : function(response){
            console.log(response);
            window.location.href = "/"
        },
        error: function(err){
            console.log("Error:", err)
        }
    })
}