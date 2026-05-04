// tom segue o cursor (carente)
class Tom extends Gato {
  /** @type {string} */
  static descricao = 'Esse gato é extremamente carente e vai na sua direção pra onde você for';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 3, costas: 1, direita: 2, esquerda: 2 };
  static sombras = {
    andando: { fracaoY: 0.95, fracaoLargura: 0.7 },
    sentado: { fracaoY: 0.85, fracaoLargura: 0.7 },
  };

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom');
  }

  mover() {
    const distancia = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);
    if (distancia < 70) return;

    // acelera em direcao ao cursor
    const direcao = createVector(cursorX - this.posicao.x, cursorY - this.posicao.y);
    direcao.normalize();
    this.velocidade.add(p5.Vector.mult(direcao, VELOCIDADES.normal));
  }
}
