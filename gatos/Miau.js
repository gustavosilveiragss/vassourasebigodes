// miau n se mexe sozinha, tem que ser empurrada com a vassoura
class Miau extends Gato {
  /** @type {number} */
  static raio = 30;
  /** @type {string} */
  static cor = '#D4A5A5';
  /** @type {string} */
  static descricao = 'Mais churu na barriga que neurônios no cérebro, você vai precisar dar um empurrãozinho';

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
}
