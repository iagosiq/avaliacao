const ROWS = 10;
const COLS = 10;
let grid = [];
let intervalId;

// Função para criar a grade inicial e adicionar eventos de clique
function createGrid() {
  const table = document.getElementById('grid');
  table.innerHTML = '';

  for (let row = 0; row < ROWS; row++) {
    let tr = document.createElement('tr');
    grid[row] = [];

    for (let col = 0; col < COLS; col++) {
      let td = document.createElement('td');
      td.dataset.row = row;
      td.dataset.col = col;
      td.addEventListener('click', toggleCell);
      tr.appendChild(td);
      grid[row][col] = 0;
    }

    table.appendChild(tr);
  }
}

// Função para alternar o estado da célula ao ser clicada
function toggleCell() {
  let row = parseInt(this.dataset.row);
  let col = parseInt(this.dataset.col);

  if (this.classList.contains('alive')) {
    this.classList.remove('alive');
    grid[row][col] = 0;
  } else {
    this.classList.add('alive');
    grid[row][col] = 1;
  }
}

// Função para atualizar o estado das células na grade
function updateGrid() {
  let newGrid = [];

  for (let row = 0; row < ROWS; row++) {
    newGrid[row] = [];

    for (let col = 0; col < COLS; col++) {
      let cell = grid[row][col];
      let neighbors = countNeighbors(row, col);

      if (cell === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newGrid[row][col] = 0; // Célula morre
        } else {
          newGrid[row][col] = 1; // Célula continua viva
        }
      } else {
        if (neighbors === 3) {
          newGrid[row][col] = 1; // Célula nasce
        } else {
          newGrid[row][col] = 0; // Célula permanece morta
        }
      }
    }
  }

  grid = newGrid;
  renderGrid();
}

// Função para contar o número de células vizinhas vivas
function countNeighbors(row, col) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      let neighborRow = (row + i + ROWS) % ROWS;
      let neighborCol = (col + j + COLS) % COLS;
      count += grid[neighborRow][neighborCol];
    }
  }

  return count;
}

// Função para renderizar o estado atual da grade na tabela HTML
function renderGrid() {
  const table = document.getElementById('grid');

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let cell = table.rows[row].cells[col];

      if (grid[row][col] === 1) {
        cell.classList.add('alive');
      } else {
        cell.classList.remove('alive');
      }
    }
  }
}

// Função para iniciar o jogo
function startGame() {
  intervalId = setInterval(updateGrid, 500); // Atualiza a cada 500ms
}

// Função para parar o jogo
function stopGame() {
  clearInterval(intervalId);
}

// Evento do botão de submit para iniciar o jogo
document.getElementById('start').addEventListener('click', function (event) {
  event.preventDefault(); // Impede o envio do formulário

  // Inicia o jogo apenas se pelo menos uma célula estiver selecionada
  if (document.querySelectorAll('.alive').length > 0) {
    startGame();
  }
});

// Cria a grade inicial
createGrid();
