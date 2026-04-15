class Obstaculo {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  resolverColisao(obj) {
    let cx = constrain(obj.pos.x, this.x, this.x + this.w)
    let cy = constrain(obj.pos.y, this.y, this.y + this.h)
    let d = dist(obj.pos.x, obj.pos.y, cx, cy)

    if (d < obj.raio) {
      if (d == 0) {
        obj.pos.x = this.x - obj.raio - 1
        obj.vel.set(0, 0)
        return
      }
      let dir = createVector(obj.pos.x - cx, obj.pos.y - cy)
      dir.normalize()
      obj.pos.x = cx + dir.x * (obj.raio + 1)
      obj.pos.y = cy + dir.y * (obj.raio + 1)

      let dot = obj.vel.dot(dir)
      obj.vel.x -= 2 * dot * dir.x
      obj.vel.y -= 2 * dot * dir.y
      obj.vel.mult(0.5)
    }
  }

  display() {
    fill(CORES.obstaculo)
    noStroke()
    rect(this.x, this.y, this.w, this.h, 8)
  }
}
