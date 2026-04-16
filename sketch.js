/** @type {Cena} */
let cenaAtual;
let cursorX;
let cursorY;

/** @param {Cena} novaCena */
const trocarCena = (novaCena) => {
  cenaAtual = novaCena;
};


function setup() {
  createCanvas(LARGURA, ALTURA);
  textFont('Fredoka One');
  cenaAtual = new Inicio();
}

function draw() {
  // trava cursor dentro do canvas
  cursorX = constrain(mouseX, 0, LARGURA - 1);
  cursorY = constrain(mouseY, 0, ALTURA - 1);

  cenaAtual.update();
  cenaAtual.display();
}

function mousePressed() {
  cenaAtual.aoClicar();
}

function keyPressed() {
  cenaAtual.aoApertarTecla(keyCode);
}
