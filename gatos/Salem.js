class Salem extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem')
    this.cooldown = 0
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--
      return
    }

    let d = dist(mx, my, this.pos.x, this.pos.y)
    if (d < 120) {
      let dir = createVector(this.pos.x - mx, this.pos.y - my)
      dir.normalize()
      this.vel.add(p5.Vector.mult(dir, 8))
      this.cooldown = 45
    }
  }
}
