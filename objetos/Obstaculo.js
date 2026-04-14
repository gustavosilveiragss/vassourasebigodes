class Obstaculo {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  resolverColisao(gato) {
    let cx = constrain(gato.pos.x, this.x, this.x + this.w)
    let cy = constrain(gato.pos.y, this.y, this.y + this.h)
    let d = dist(gato.pos.x, gato.pos.y, cx, cy)

    if (d < gato.raio) {
      let dir = createVector(gato.pos.x - cx, gato.pos.y - cy)
      dir.normalize()
      gato.pos.x = cx + dir.x * (gato.raio + 1)
      gato.pos.y = cy + dir.y * (gato.raio + 1)

      let dot = gato.vel.dot(dir)
      gato.vel.x -= 2 * dot * dir.x
      gato.vel.y -= 2 * dot * dir.y
      gato.vel.mult(0.5)
    }
  }

  display() {
    fill(CORES.obstaculo)
    noStroke()
    rect(this.x, this.y, this.w, this.h, 8)
  }
}
