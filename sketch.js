/** @type {Cena} */
let cenaAtual;
let cursorX;
let cursorY;
let SPRITES = {};

/** @param {Cena} novaCena */
const trocarCena = (novaCena) => {
  cenaAtual = novaCena;
};

/**
 * desenha sprite com outline preto grosso (mascara serrilhado)
 * @param {p5.Image} sprite
 * @param {number} x
 * @param {number} y
 * @param {number} largura
 * @param {number} altura
 */
function desenharSpriteComOutline(sprite, x, y, largura, altura) {
  imageMode(CENTER);
  drawingContext.filter =
    'drop-shadow(2px 0 0 #000) ' +
    'drop-shadow(-2px 0 0 #000) ' +
    'drop-shadow(0 2px 0 #000) ' +
    'drop-shadow(0 -2px 0 #000) ' +
    'drop-shadow(1.4px 1.4px 0 #000) ' +
    'drop-shadow(-1.4px 1.4px 0 #000) ' +
    'drop-shadow(1.4px -1.4px 0 #000) ' +
    'drop-shadow(-1.4px -1.4px 0 #000)';
  image(sprite, x, y, largura, altura);
  drawingContext.filter = 'none';
}

const CLASSES_GATOS = [Tom, Salem, Fifi, Miau, Fofinho];

function preload() {
  for (const classeGato of CLASSES_GATOS) {
    const nome = classeGato.name.toLowerCase();
    SPRITES[nome] = { frente: [], costas: [], direita: [], esquerda: [], sentado: null };
    SPRITES[nome].sentado = loadImage('assets/sprites/' + nome + '_sentado.png');
    for (const direcao in classeGato.frames) {
      const total = classeGato.frames[direcao];
      for (let i = 1; i <= total; i++) {
        SPRITES[nome][direcao].push(
          loadImage('assets/sprites/' + nome + '_andando_' + direcao + '_' + i + '.png'),
        );
      }
    }
  }
}

function setup() {
  pixelDensity(displayDensity());
  createCanvas(LARGURA * ESCALA, ALTURA * ESCALA);
  textFont('Fredoka One');
  drawingContext.imageSmoothingEnabled = true;
  drawingContext.imageSmoothingQuality = 'high';
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
