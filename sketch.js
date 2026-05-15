/** @type {Cena} */
let cenaAtual;
let cursorX;
let cursorY;
let SPRITES = {};

/**
 * @param {Cena} novaCena
 * @param {boolean} [comFade] default true
 */
function trocarCena(novaCena, comFade = true) {
  if (!comFade) {
    cenaAtual = novaCena;
    return;
  }
  Transicao.iniciar(novaCena);
}

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

  // cada modulo de audio tem uma funcao de preload,
  // que carrega os arquivos e prepara os objetos de som
  for (const classe of MODULOS_AUDIO) classe.precarregar();
}

function setup() {
  pixelDensity(displayDensity());
  createCanvas(LARGURA * ESCALA, ALTURA * ESCALA);
  textFont('Fredoka One');
  drawingContext.imageSmoothingEnabled = true;
  drawingContext.imageSmoothingQuality = 'high';
  Efeitos.preparar();
  cenaAtual = new Inicio();
}

function draw() {
  // trava cursor dentro do canvas, em coordenadas logicas
  cursorX = constrain(mouseX / ESCALA, 0, LARGURA - 1);
  cursorY = constrain(mouseY / ESCALA, 0, ALTURA - 1);

  push();
    scale(ESCALA);

    push();
      Shake.aplicar(); // aplica shake via translate, antes de desenhar os objetos
      cenaAtual.update();
      cenaAtual.display();
      Particulas.desenhar();
    pop();

    Filtro.desenhar(); // desenha filtro de grain, depois dos objetos
  pop();

  Transicao.desenhar();
  Efeitos.atualizar();
}

function mousePressed() {
  if (Transicao.ativa) return;
  cenaAtual.aoClicar();
}

function keyPressed() {
  if (Transicao.ativa) return;
  cenaAtual.aoApertarTecla(keyCode);
}
