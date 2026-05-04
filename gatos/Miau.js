// miau n se mexe sozinha, tem que ser empurrada com a vassoura
class Miau extends Gato {
  /** @type {string} */
  static descricao =
    'Mais churu na barriga que neurônios no cérebro, você vai precisar dar um empurrãozinho';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 0, costas: 0, direita: 0, esquerda: 0 };
  static sombras = {
    andando: { fracaoY: 0.98, fracaoLargura: 0.6 },
    sentado: { fracaoY: 0.98, fracaoLargura: 0.6 },
  };

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.miau, CORES.miau, 'Miau');
    this.friccao = 0.75;
  }

  mover() {} // sem movimento mesmo

  /** @returns {string} */
  direcaoAtual() {
    return 'sentado';
  }
}
