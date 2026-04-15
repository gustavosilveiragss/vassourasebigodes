class Tom extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom')
  }

  mover() {
    let d = dist(mx, my, this.pos.x, this.pos.y)
    if (d < 70) return
    let dir = createVector(mx - this.pos.x, my - this.pos.y)
    dir.normalize()
    this.vel.add(p5.Vector.mult(dir, VEL.normal))
  }
}
