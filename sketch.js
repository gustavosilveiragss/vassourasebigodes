let cenaAtual
let mx, my

function trocarCena(novaCena) {
  cenaAtual = novaCena
}

function setup() {
  createCanvas(LARGURA, ALTURA)
  textFont('Fredoka One')
  cenaAtual = new Inicio()
}

function draw() {
  mx = constrain(mouseX, 0, LARGURA - 1)
  my = constrain(mouseY, 0, ALTURA - 1)
  cenaAtual.update()
  cenaAtual.display()
}

function mousePressed() {
  cenaAtual.aoClicar()
}

function keyPressed() {
  cenaAtual.aoApertarTecla(keyCode)
}
