const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let playerSymbol = CROSS;
let field = new Array();
let fieldDimension = 3;
let isGameOver = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();
addChangeSideListener();

function switchPlayer() {
    playerSymbol = (playerSymbol === CROSS) ? ZERO : CROSS;
}

function addChangeSideListener() {
    const btn = document.getElementById('changeSide');
    btn.addEventListener('click', changeSideClickHandler);
}

function changeSideClickHandler() {
    if (isGameOver) return;
    switchPlayer();
}

function startGame() {
    renderGrid(fieldDimension);
}

function idx(r, c) {
    return r * fieldDimension + c;
}

function checkWinner() {
    for (let r = 0; r < fieldDimension; r++) {
        let res = checkWinnerRow(r, CROSS);
        if (res) return res;

        res = checkWinnerRow(r, ZERO);
        if (res) return res;
    }

    for (let c = 0; c < fieldDimension; c++) {
        let res = checkWinnerCol(c, CROSS);
        if (res) return res;

        res = checkWinnerCol(c, ZERO);
        if (res) return res;
    }

    let res = checkWinnerDiagonal(CROSS);
    if (res) return res;

    res = checkWinnerDiagonal(ZERO);
    if (res) return res;

    return undefined;
}

function checkWinnerRow(row, symbol) {
    const cells = [];

    for (let col = 0; col < fieldDimension; col++) {
        const v = field[idx(row, col)];
        if (v !== symbol)
            return undefined;
        cells.push([row, col, symbol]);
    }

    return { winner: symbol, cells };
}

function checkWinnerCol(col, symbol) {
    const cells = [];

    for (let row = 0; row < fieldDimension; row++) {
        const v = field[idx(row, col)];
        if (v !== symbol) return undefined;
        cells.push([row, col, symbol]);
    }

    return { winner: symbol, cells };
}

function checkWinnerDiagonal(symbol) {
    let cells = [];
    for (let i = 0; i < fieldDimension; i++) {
        const v = field[idx(i, i)];
        if (v !== symbol) {
            cells = null;
            break;
        }
        cells.push([i, i, symbol]);
    }
    if (cells) return { winner: symbol, cells };

    cells = [];
    for (let i = 0; i < fieldDimension; i++) {
        const r = i;
        const c = fieldDimension - 1 - i;
        const v = field[idx(r, c)];
        if (v !== symbol) return undefined;
        cells.push([r, c, symbol]);
    }

    return { winner: symbol, cells };
}

function renderGrid(dimension) {
    container.innerHTML = '';
    field = new Array(dimension * dimension).fill(EMPTY);

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (isGameOver)
        return;

    if (field[row * fieldDimension + col] === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        renderSymbolInCell(playerSymbol, row, col);
        field[row * fieldDimension + col] = playerSymbol;

        const timeout = setTimeout(() => {
            const winner = checkWinner();
            if (winner) {
                isGameOver = true;
                alert(`Winner: ${winner.winner}`);
                drawWinCells(winner.cells);
                return;
            }
            }, 100
        );

        if (isDraw) {
            isGameOver = true;
            alert("Победила дружба");
            return;
        }

        switchPlayer();
    }
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    const gridRows = container.querySelectorAll('tr');
    for (const row of gridRows) {
        for (const cell of row.querySelectorAll('td')) {
            cell.textContent = EMPTY;
            cell.style.color = '#333';
        }
    }

    for (let i = 0; i < field.length; i++) {
        field[i] = EMPTY;
    }

    isGameOver = false;
}

function drawWinCells(cells) {
    for (const cell of cells) {
        renderSymbolInCell(cell[2], cell[0], cell[1], 'red');
    }
}

function isDraw() {
    return field.every(cell => cell !== EMPTY);
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
