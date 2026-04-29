/** @type {Cena} */
let cenaAtual;

const cursor = { x: 0, y: 0 };

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
  cursor.x = constrain(mouseX, 0, LARGURA - 1);
  cursor.y = constrain(mouseY, 0, ALTURA - 1);

  cenaAtual.update();
  cenaAtual.display();
}

function mousePressed() {
  cenaAtual.aoClicar();
}

function keyPressed() {
  cenaAtual.aoApertarTecla(keyCode);
}
