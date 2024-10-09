const gameboard = (() => {
    let board = [];

    const createBoard = () => {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    };

    const getBoard = () => board;

    const setCell = (i, j, value) => {
        if (board[i][j] === 0) {
            board[i][j] = value;
            return true; // success
        }
        return false; // Cell already taken
    };

    return { createBoard, getBoard, setCell };
})();



const displayController = (() => {
    const boardList = document.querySelector(".board-list");

    const displayBoard = (board) => {
        boardList.innerHTML =''; //clear board

        board.forEach(row => {
            const rowDiv = document.createElement('div');//seperate each row with a div

            row.forEach(element=>{
                var tile = document.createElement('li');
                switch(element){
                    case 1:
                        element = 'X'
                    case 2:
                        element = 'O';
                    default:
                        element ='';
                }
                tile.innerText = element;
                rowDiv.appendChild(tile);
            })
            boardList.appendChild(rowDiv);
        });
        console.log("\n");
    };

    const displayMessage = (message) => {
        console.log(message);
    };

    return { displayBoard, displayMessage };
})();




const game = (() => {
    let currentPlayer = 1;

    const play = (i, j) => {
        if (gameboard.setCell(i, j, currentPlayer)) {
            displayController.displayBoard(gameboard.getBoard());
            if (checkWin()) {
                displayController.displayMessage(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isTie()) {
                displayController.displayMessage("It's a tie!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
            }
        } else {
            displayController.displayMessage("Cell already taken!");
        }
    };

    const checkWin = () => {
        const board = gameboard.getBoard();

        // check rows
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
                return true;
            }
        }

        // Ccck columns
        for (let j = 0; j < board[0].length; j++) {
            if (board[0][j] === currentPlayer && board[1][j] === currentPlayer && board[2][j] === currentPlayer) {
                return true;
            }
        }

        // check diagonals
        if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
            return true;
        }
        if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
            return true;
        }

        return false;
    };

    const isTie = () => {
        const board = gameboard.getBoard();
        return board.every(row => row.every(cell => cell !== 0));
    };

    const resetGame = () => {
        gameboard.createBoard();
        currentPlayer = 1;
        displayController.displayBoard(gameboard.getBoard());
    };

    const start = () => {
        gameboard.createBoard();
        displayController.displayBoard(gameboard.getBoard());
    };

    return { play, start };
})();

window.game = game;
game.start();