const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field = new Array();
let fieldDimension = 3;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(fieldDimension);
}

function renderGrid (dimension) {
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

function cellClickHandler (row, col) {
    if (field[row * fieldDimension + col] === EMPTY) {
        console.log(`Clicked on cell: ${row}, ${col}`);
        renderSymbolInCell(CROSS, row, col);
        field[row * fieldDimension + col] = CROSS;
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    const gridRows = container.querySelectorAll('tr');
    for (const row of gridRows) {
        for (const cell of row.querySelectorAll('td'))
        {
            cell.textContent = EMPTY;
            cell.style.color = '#333';
        }
    }
}

function drawWinCells(cells) {
    for (const cell of cells) {
        renderSymbolInCell(cell[2], cell[0], cell[1], 'red');
    }
}

function declareDrawn() {
    if (field.every(cell => cell !== EMPTY)) {
        alert("Победила дружба");
    }
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
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

function clickOnCell (row, col) {
    findCell(row, col).click();
}
