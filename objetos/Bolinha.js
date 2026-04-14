class Bolinha {
  constructor(x, y, gatos) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.raio = RAIOS.bolinha
    this.gatos = gatos
    this.gatoAtraido = null
    this.timer = 60
  }

  update() {
    if (this.gatoAtraido != null) {
      let d = dist(this.pos.x, this.pos.y, this.gatoAtraido.pos.x, this.gatoAtraido.pos.y)

      if (d < this.raio + this.gatoAtraido.raio) {
        this.gatoAtraido.atraido = false
        this.gatoAtraido = null
        let ang = random(TWO_PI)
        this.vel = createVector(cos(ang) * 5, sin(ang) * 5)
        this.timer = 0
      }
    }

    this.vel.mult(0.97)
    this.pos.add(this.vel)

    if (this.pos.x < this.raio || this.pos.x > LARGURA - this.raio) {
      this.vel.x *= -1
      this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio)
    }
    if (this.pos.y < this.raio || this.pos.y > ALTURA - this.raio) {
      this.vel.y *= -1
      this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio)
    }

    if (this.gatoAtraido == null) {
      this.timer++

      let parada = this.vel.mag() < 0.3
      if (this.timer > 900 || (parada && this.timer > 60)) {
        this.selecionarGato()
      }
    }
  }

  selecionarGato() {
    if (this.gatos.length == 0) return
    let g = this.gatos[floor(random(this.gatos.length))]
    g.atraido = true
    this.gatoAtraido = g
    this.timer = 0
  }

  display() {
    fill(0, 0, 0, 30)
    noStroke()
    ellipse(this.pos.x + 4, this.pos.y + 4, this.raio * 2, this.raio * 2)

    fill(CORES.bolinha)
    ellipse(this.pos.x, this.pos.y, this.raio * 2, this.raio * 2)
  }
}
