function createPlayer(name){
    return {name};
}


const game = (()=>{

    let board = [];
    let currentPlayer = 1;

     function createBoard() {
        board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    function play(i, j) {
        if (board[i][j] === 0) { // Check if the cell is empty
            board[i][j] = currentPlayer;
            displayBoard();

             if (checkWin()) {
                console.log(`Player ${currentPlayer} wins!`);
                resetGame(); // Reset board and player
            } else if (isTie()) {
                console.log("It's a tie!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
            }
        } else {
            console.log("Cell already taken!");
        }
    }



    function displayBoard() {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i].join(" | "));
        }
        console.log("\n");
    }



    function checkWin() {
        // Check rows
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < board.length; j++) {
            if (board[0][j] === currentPlayer && board[1][j] === currentPlayer && board[2][j] === currentPlayer) {
                return true;
            }
        }

        // Check diagonals
        if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
            return true;
        }
        if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
            return true;
        }

        return false; // No win found
    }
    function isTie() {
        return board.every(row => row.every(cell => cell !== 0));
    }

    function resetGame() {
        createBoard();
        currentPlayer = 1; // Reset to Player 1 for a new game
    }

    createBoard();
    return{
        play
    };

})();

game();