class Miau extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.miau, CORES.miau, 'Miau')
    this.resistencia = 0.2
    this.fricao = 0.65
  }

  mover() {}
}
