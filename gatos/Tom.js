class Tom extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom')
  }

  mover() {
    let dir = createVector(mouseX - this.pos.x, mouseY - this.pos.y)
    dir.normalize()
    this.vel.add(p5.Vector.mult(dir, VEL.normal))
  }
}
