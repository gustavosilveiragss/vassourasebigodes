class Fase extends Cena {
  constructor(numero, gatos, obstaculos, bolinhas, tempoSeg) {
    super()
    this.numero = numero
    this.gatos = gatos
    this.obstaculos = obstaculos
    this.bolinhas = bolinhas
    this.timer = tempoSeg * 60
    this.slotsOcupados = [null, null, null, null, null]
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

    this.bolinhas.forEach(b => b.update(this.obstaculos))

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].update(this.bolinhas, this.obstaculos)
    }

    for (let i = 0; i < this.gatos.length; i++) {
      for (let j = i + 1; j < this.gatos.length; j++) {
        let a = this.gatos[i]
        let b = this.gatos[j]
        let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y)
        let minD = a.raio + b.raio
        if (d < minD && d > 0) {
          let nx = (b.pos.x - a.pos.x) / d
          let ny = (b.pos.y - a.pos.y) / d
          let overlap = minD - d
          if (!a.preso && !b.preso) {
            a.pos.x -= nx * overlap * 0.5
            a.pos.y -= ny * overlap * 0.5
            b.pos.x += nx * overlap * 0.5
            b.pos.y += ny * overlap * 0.5
          } else if (!a.preso) {
            a.pos.x -= nx * overlap
            a.pos.y -= ny * overlap
          } else if (!b.preso) {
            b.pos.x += nx * overlap
            b.pos.y += ny * overlap
          }
        }
      }
    }

    for (let i = 0; i < this.slotsOcupados.length; i++) {
      if (this.slotsOcupados[i] && !this.slotsOcupados[i].preso) {
        this.slotsOcupados[i] = null
      }
    }

    for (let g of this.gatos) {
      if (g.naZona() && !g.preso && !g.atraido) {
        for (let i = 0; i < this.slotsOcupados.length; i++) {
          if (!this.slotsOcupados[i]) {
            this.slotsOcupados[i] = g
            g.preso = true
            g.alvoPos = SLOTS[i]
            break
          }
        }
      }
    }

    let todosPresos = true
    for (let g of this.gatos) {
      if (!g.preso) {
        todosPresos = false
        break
      }
    }
    if (todosPresos) {
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

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].display()
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
