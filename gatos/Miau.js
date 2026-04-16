// miau n se mexe sozinha, tem que ser empurrada com a vassoura
class Miau extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.miau, CORES.miau, 'Miau');
    this.friccao = 0.75;
  }

  mover() {} // sem movimento mesmo
}
