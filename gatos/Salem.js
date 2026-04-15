class Salem extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem')
    this.cooldown = 0
    this.resistencia = 0.55
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
      this.pos.x += dir.x * 90
      this.pos.y += dir.y * 90
      this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio)
      this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio)
      this.vel.set(0, 0)
      this.cooldown = 45
    }
  }
}
