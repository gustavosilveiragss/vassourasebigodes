class Fifi extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi')
    this.movendo = false
    this.frames = 0
    this.duracaoAtual = 120
    this.dirAtual = 0
  }

  calcDir() {
    let angBase = atan2(this.pos.y - my, this.pos.x - mx)
    return angBase + random(-HALF_PI, HALF_PI)
  }

  mover() {
    this.frames++
    let distMouse = dist(mx, my, this.pos.x, this.pos.y)

    if (this.frames >= this.duracaoAtual) {
      this.movendo = !this.movendo
      this.frames = 0
      if (this.movendo) {
        this.dirAtual = this.calcDir()
        this.duracaoAtual = floor(random(50, 70))
      } else {
        this.duracaoAtual = floor(random(100, 140))
      }
    }

    if (!this.movendo && distMouse < 130) {
      this.movendo = true
      this.frames = 0
      this.dirAtual = this.calcDir()
      this.duracaoAtual = floor(random(50, 70))
    }

    if (this.movendo) {
      let dir = createVector(cos(this.dirAtual), sin(this.dirAtual))
      this.vel.add(p5.Vector.mult(dir, VEL.normal))
    }
  }
}
