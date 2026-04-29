// miau n se mexe sozinha. so a vassoura empurra
class Miau extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.miau, CORES.miau, 'Miau');
  }

  mover() {} // sem movimento mesmo
}
