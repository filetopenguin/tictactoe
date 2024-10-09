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
    let tiles = []; // Store tiles for later reference

    const displayBoard = (board) => {
        boardList.innerHTML = ''; // Clear board
        tiles = []; // Reset tiles array

        board.forEach((row, rowIndex) => {
            const rowDiv = document.createElement('div'); // Separate each row with a div

            row.forEach((element, colIndex) => {
                const tile = document.createElement('li');
                switch (element) {
                    case 1:
                        tile.innerText = 'X'; // Player 1
                        break;
                    case 2:
                        tile.innerText = 'O'; // Player 2
                        break;
                    default:
                        tile.innerText = ' '; // Empty
                        tile.style.cursor = 'pointer';
                        tile.addEventListener('click', () => {
                            game.play(rowIndex, colIndex); // Play on click of a tile
                        });
                }
                tiles.push(tile); // Store the tile in the array
                rowDiv.appendChild(tile);
            });
            boardList.appendChild(rowDiv);
        });
    };

    const displayMessage = (message) => {
        var msgDisplay = document.querySelector('.msg-display');
        msgDisplay.innerText = message;
        setTimeout(() => {
            msgDisplay.innerText = ''; // Clear the message after 1 seconds
        }, 2000); 
    };

    const disableClick = () => {
        tiles.forEach(tile => {
            tile.style.pointerEvents = 'none'; // Disable click events
        });
    };

    return { displayBoard, displayMessage, disableClick };
})();


const highlightWinningLine = (winningTiles) => {
    winningTiles.forEach(({ row, col }) => {
        const tile = document.querySelector(`.board-list div:nth-child(${row + 1}) li:nth-child(${col + 1})`);
        if (tile) {
            tile.classList.add('winning-line'); // Add the highlight class
        }
    });
};

const resetWinningLines = () => {
    const tiles = document.querySelectorAll('.board-list li');
    tiles.forEach(tile => {
        tile.classList.remove('winning-line'); // Remove the highlight class
    });
};

const game = (() => {
    let currentPlayer = 1;

    
    const play = (i, j) => {
        if (gameboard.setCell(i, j, currentPlayer)) {
            displayController.displayBoard(gameboard.getBoard());
            if (checkWin()) {
                displayController.displayMessage(`Player ${currentPlayer} wins!`);
                displayController.disableClick()
                setTimeout(resetGame, 2000); //wait before reset
            } else if (isTie()) {
                displayController.displayMessage("It's a tie!");
                displayController.disableClick()
                setTimeout(resetGame, 2000); //wait before reset
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
                winningTiles = [
                    { row: i, col: 0 },
                    { row: i, col: 1 },
                    { row: i, col: 2 }
                ];
                highlightWinningLine(winningTiles);
                return true;
            }
        }

        // Ccck columns
        for (let j = 0; j < board[0].length; j++) {
            if (board[0][j] === currentPlayer && board[1][j] === currentPlayer && board[2][j] === currentPlayer) {
                winningTiles = [
                    { row: 0, col: j },
                    { row: 1, col: j },
                    { row: 2, col: j }
                ];
                highlightWinningLine(winningTiles);
                return true;
            }
        }

        // check diagonals
        if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
            winningTiles = [
                { row: 0, col: 0 },
                { row: 1, col: 1 },
                { row: 2, col: 2 }
            ];
            highlightWinningLine(winningTiles);
            return true;
        }
        if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
           
            winningTiles = [
                { row: 0, col: 2 },
                { row: 1, col: 1 },
                { row: 2, col: 0 }
            ];
            highlightWinningLine(winningTiles);
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
        resetWinningLines();
    };

    const start = () => {
        gameboard.createBoard();
        displayController.displayBoard(gameboard.getBoard());
    };

    return { play, start };
})();

window.game = game;
game.start();