// fofinho: tiro pra cima do cursor
class Fofinho extends Gato {
  /** @type {string} */
  static descricao = 'Bravinho mas carinhoso, sai correndo atrás de você rapidamente';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 1, costas: 0, direita: 0, esquerda: 2 };
  static sombras = {
    andando: { fracaoY: 0.95, fracaoLargura: 0.85 },
    sentado: { fracaoY: 0.85, fracaoLargura: 0.85 },
  };

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');
    this.cooldown = 90; // cooldown tiro
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    // dispara em direcao ao cursor
    const direcao = createVector(cursorX - this.posicao.x, cursorY - this.posicao.y);
    direcao.normalize();
    this.velocidade.set(direcao.x * 100, direcao.y * 100);
    this.cooldown = 90;
  }
}
