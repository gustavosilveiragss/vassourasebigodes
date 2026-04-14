class Gato {
  constructor(x, y, raio, cor, nome) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.raio = raio
    this.cor = cor
    this.nome = nome
    this.sprite = null
    this.som = null
    this.atraido = false
    this.stun = 0
  }

  update(bolinhas, obstaculos) {
    if (this.stun > 0) {
      this.stun--
    }

    let minhaBolinha = null
    for (let b of bolinhas) {
      if (b.gatoAtraido === this) {
        minhaBolinha = b
        break
      }
    }

    if (minhaBolinha) {
      let dir = p5.Vector.sub(minhaBolinha.pos, this.pos)
      dir.normalize()
      this.vel.add(p5.Vector.mult(dir, VEL.normal * 1.5))
    } else if (this.stun == 0) {
      this.mover()
    }

    this.vel.mult(0.92)
    this.pos.add(this.vel)
    this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio)
    this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio)

    for (let obs of obstaculos) {
      obs.resolverColisao(this)
    }
  }

  mover() {}

  empurrar(dir, forca) {
    this.vel.add(p5.Vector.mult(dir, forca))
  }

  naZona() {
    return (
      this.pos.x > ZONA.x + this.raio &&
      this.pos.x < ZONA.x + ZONA.w - this.raio &&
      this.pos.y > ZONA.y + this.raio &&
      this.pos.y < ZONA.y + ZONA.h - this.raio
    )
  }

  display() {
    fill(0, 0, 0, 30)
    noStroke()
    ellipse(this.pos.x + 4, this.pos.y + 4, this.raio * 2.2, this.raio * 2)

    if (this.sprite) {
      imageMode(CENTER)
      image(this.sprite, this.pos.x, this.pos.y, this.raio * 2.2, this.raio * 2)
    } else {
      fill(this.cor)
      noStroke()
      ellipse(this.pos.x, this.pos.y, this.raio * 2.2, this.raio * 2)
    }

    fill(CORES.texto)
    noStroke()
    textAlign(CENTER)
    textSize(12)
    text(this.nome, this.pos.x, this.pos.y + this.raio + 14)
  }
}
