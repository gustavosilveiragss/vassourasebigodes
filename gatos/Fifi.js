class Fifi extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi')
    this.dir = p5.Vector.random2D()
    this.prox = floor(random(60, 120))
    this.frames = 0
  }

  mover() {
    this.frames++
    if (this.frames >= this.prox) {
      this.dir = p5.Vector.random2D()
      this.prox = floor(random(60, 120))
      this.frames = 0
    }
    this.vel.add(p5.Vector.mult(this.dir, VEL.normal))
  }
}
