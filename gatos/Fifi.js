class Fifi extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi')
    this.angOffset = random(-PI / 4, PI / 4)
    this.frames = 0
    this.movendo = false
    this.duracaoAtual = 120
  }

  mover() {
    this.frames++

    let distMouse = dist(mx, my, this.pos.x, this.pos.y)

    if (this.frames >= this.duracaoAtual) {
      this.movendo = !this.movendo
      this.frames = 0
      if (this.movendo) {
        this.angOffset = random(-PI / 4, PI / 4)
        this.duracaoAtual = floor(random(50, 70))
      } else {
        this.duracaoAtual = floor(random(100, 140))
      }
    }

    if (!this.movendo && distMouse < 130) {
      this.movendo = true
      this.frames = 0
      this.angOffset = random(-PI / 4, PI / 4)
      this.duracaoAtual = floor(random(50, 70))
    }

    if (this.movendo) {
      let ang = atan2(my - this.pos.y, mx - this.pos.x) + this.angOffset
      let dir = createVector(cos(ang), sin(ang))
      this.vel.add(p5.Vector.mult(dir, VEL.normal))
    }
  }
}
