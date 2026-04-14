class Fase extends Cena {
  constructor(numero, gatos, obstaculos, bolinhas, tempoSeg) {
    super()
    this.numero = numero
    this.gatos = gatos
    this.obstaculos = obstaculos
    this.bolinhas = bolinhas
    this.timer = tempoSeg * 60
    this.framesNaZona = 0
    this.vassoura = new Vassoura()
    this.tutorialFrames = 0
  }

  calcScore() {
    return floor(this.timer / 60) * this.numero
  }

  update() {
    this.timer--

    if (this.timer <= 0) {
      trocarCena(new GameOver(this.numero, this.calcScore()))
      return
    }

    this.vassoura.update(this.gatos)

    this.bolinhas.forEach(b => b.update())

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].update(this.bolinhas, this.obstaculos)
    }

    let naZona = 0
    for (let g of this.gatos) {
      if (g.naZona()) naZona++
    }

    if (naZona == this.gatos.length) {
      this.framesNaZona++
    } else {
      this.framesNaZona = 0
    }

    if (this.framesNaZona >= 120) {
      trocarCena(new VitoriaFase(this.calcScore(), this.numero + 1))
    }

    if (this.numero == 1) {
      this.tutorialFrames++
    }
  }

  display() {
    background(CORES.fundo)

    fill(CORES.zona)
    noStroke()
    rect(ZONA.x, ZONA.y, ZONA.w, ZONA.h, 16)

    fill(CORES.texto)
    textAlign(CENTER)
    textSize(13)
    text('zona de descanso', ZONA.x + ZONA.w / 2, ZONA.y + ZONA.h / 2 + 5)

    for (let obs of this.obstaculos) {
      obs.display()
    }

    for (let b of this.bolinhas) {
      b.display()
    }

    for (let g of this.gatos) {
      g.display()
    }

    this.vassoura.display()

    let segsRestantes = ceil(this.timer / 60)
    fill(CORES.texto)
    textAlign(LEFT)
    textSize(18)
    text('Fase ' + this.numero, 16, 30)
    textAlign(RIGHT)
    text(segsRestantes + 's', LARGURA - 16, 30)

    if (this.numero == 1 && this.tutorialFrames < 300) {
      fill(0, 0, 0, 100)
      noStroke()
      rect(0, ALTURA / 2 - 20, LARGURA, 36)
      fill(255)
      textAlign(CENTER)
      textSize(16)
      text('Use o mouse para empurrar Tom para a zona!', LARGURA / 2, ALTURA / 2 + 3)
    }
  }

  aoApertarTecla(k) {
    if (k == 80 || k == 27) {
      trocarCena(new Pausa(this))
    }
  }
}
