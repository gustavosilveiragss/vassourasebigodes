/** @type {Cena} */
let cenaAtual;
let cursorX;
let cursorY;
let SPRITES = {};

/** @param {Cena} novaCena */
function trocarCena(novaCena) {
  cenaAtual = novaCena;
}

const CLASSES_GATOS = [Tom, Salem, Fifi, Miau, Fofinho];

// classes com som carregam aqui no preload
const MODULOS_AUDIO = [
  MusicaFundo,
  Cena,
  Vassoura,
  Bolinha,
  Fase,
  VitoriaFase,
  GameOver,
  Pausa,
  ...CLASSES_GATOS,
];

function preload() {
  SPRITES.tom = loadImage('assets/sprites/tom_sentado.png');
  SPRITES.salem = loadImage('assets/sprites/salem_sentado.png');
  SPRITES.fifi = loadImage('assets/sprites/fifi_sentado.png');
  SPRITES.miau = loadImage('assets/sprites/miau_sentado.png');
  SPRITES.fofinho = loadImage('assets/sprites/fofinho_sentado.png');

  for (const classe of MODULOS_AUDIO) classe.precarregar();
}

function setup() {
  pixelDensity(displayDensity());
  createCanvas(LARGURA * ESCALA, ALTURA * ESCALA);
  textFont('Fredoka One');
  cenaAtual = new Inicio();
}

function draw() {
  // trava cursor dentro do canvas, em coordenadas logicas
  cursorX = constrain(mouseX / ESCALA, 0, LARGURA - 1);
  cursorY = constrain(mouseY / ESCALA, 0, ALTURA - 1);

  push();
    scale(ESCALA);
    cenaAtual.update();
    cenaAtual.display();
  pop();
}

function mousePressed() {
  cenaAtual.aoClicar();
}

function keyPressed() {
  cenaAtual.aoApertarTecla(keyCode);
}
