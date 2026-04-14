class VitoriaFase extends Cena {
  constructor(score, proxFase) {
    super()
    this.score = score
    this.proxFase = proxFase
  }

  display() {
    background(CORES.fundo)

    fill(CORES.texto)
    textAlign(CENTER)
    textSize(40)
    text('Fase concluída!', LARGURA / 2, 200)

    textSize(24)
    text('Pontuação: ' + this.score, LARGURA / 2, 280)

    textSize(16)
    if (this.proxFase > 8) {
      text('Você completou o jogo inteiro!', LARGURA / 2, 360)
      text('Clique para voltar ao início', LARGURA / 2, 420)
    } else {
      text('Clique para a Fase ' + this.proxFase, LARGURA / 2, 390)
    }
  }

  aoClicar() {
    if (this.proxFase > 8) {
      trocarCena(new Inicio())
    } else {
      trocarCena(new IntroFase(this.proxFase))
    }
  }
}
