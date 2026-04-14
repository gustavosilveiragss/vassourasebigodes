class GameOver extends Cena {
  constructor(faseAtual, score) {
    super()
    this.faseAtual = faseAtual
    this.score = score
    this.opcao = 0
  }

  display() {
    background(CORES.fundo)

    fill(CORES.texto)
    textAlign(CENTER)
    textSize(44)
    text('Tempo esgotado!', LARGURA / 2, 190)

    textSize(22)
    text('Pontuação: ' + this.score, LARGURA / 2, 265)

    textSize(18)
    text('Clique para tentar novamente', LARGURA / 2, 370)
    text('Pressione M para voltar ao menu', LARGURA / 2, 415)
  }

  aoClicar() {
    trocarCena(new IntroFase(this.faseAtual))
  }

  aoApertarTecla(k) {
    if (k == 77) {
      trocarCena(new Inicio())
    }
  }
}
