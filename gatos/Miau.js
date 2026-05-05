// miau n se mexe sozinha, tem que ser empurrada com a vassoura
class Miau extends Gato {
  /** @type {number} */
  static raio = 30;
  /** @type {string} */
  static cor = '#D4A5A5';
  /** @type {string} */
  static descricao =
    'Mais churu na barriga que neurônios no cérebro, você vai precisar dar um empurrãozinho';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 0, costas: 0, direita: 0, esquerda: 0 };
  static sombras = {
    andando: { fracaoY: 0.98, fracaoLargura: 0.6 },
    sentado: { fracaoY: 0.98, fracaoLargura: 0.6 },
  };

  static precarregar() {
    Miau.somMiado = new Som(['gatos/miau_1.mp3', 'gatos/miau_2.mp3'], 180, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 'Miau');
    this.friccao = 0.75;
  }

  mover() {} // sem movimento mesmo

  /** @returns {string} */
  direcaoAtual() {
    return 'sentado';
  }
}
