let cenaAtual

function trocarCena(novaCena) {
  cenaAtual = novaCena
}

function setup() {
  createCanvas(LARGURA, ALTURA)
  textFont('Fredoka One')
  cenaAtual = new Inicio()
}

function draw() {
  cenaAtual.update()
  cenaAtual.display()
}

function mousePressed() {
  cenaAtual.aoClicar()
}

function keyPressed() {
  cenaAtual.aoApertarTecla(keyCode)
}
