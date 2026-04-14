const GATOS_NOVOS = {
  1: [
    { nome: 'Tom', texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse gatinho vai direto onde você está!' }
  ],
  2: [
    { nome: 'Salem', texto: 'Lorem ipsum dolor sit amet. Filhote maluco que foge na hora errada!' },
    { nome: 'Fifi', texto: 'Lorem ipsum consectetur. Vesguinha encantadora que vai pra todo lado menos onde você quer.' }
  ],
  3: [
    { nome: 'Miau', texto: 'Lorem ipsum adipiscing elit. A gorda do pedaço — precisa de um empurrãozinho.' },
    { nome: 'Fofinho', texto: 'Lorem ipsum sit amet. Bravinho mas carinhoso, fica girando em volta de você.' }
  ]
}

const CLASSES_FASE = [null, Fase1, Fase2, Fase3, Fase4, Fase5, Fase6, Fase7, Fase8]

class IntroFase extends Cena {
  constructor(numero) {
    super()
    this.numero = numero
    this.gatosNovos = GATOS_NOVOS[numero] || []
  }

  display() {
    background(CORES.fundo)

    fill(CORES.texto)
    textAlign(CENTER)
    textSize(36)
    text('Fase ' + this.numero, LARGURA / 2, 80)

    if (this.gatosNovos.length > 0) {
      textSize(20)
      text('Gatos novos nesta fase:', LARGURA / 2, 130)

      let startX = LARGURA / 2 - (this.gatosNovos.length - 1) * 160
      for (let i = 0; i < this.gatosNovos.length; i++) {
        let g = this.gatosNovos[i]
        let cx = startX + i * 320

        fill(200)
        noStroke()
        rect(cx - 40, 165, 80, 80, 8)

        fill(CORES.texto)
        textAlign(CENTER)
        textSize(18)
        text(g.nome, cx, 268)

        textSize(12)
        let linhas = g.texto.split(' ')
        let linha = ''
        let y = 292
        for (let j = 0; j < linhas.length; j++) {
          let tentativa = linha + linhas[j] + ' '
          if (textWidth(tentativa) > 280 && linha != '') {
            text(linha.trim(), cx, y)
            linha = linhas[j] + ' '
            y += 18
          } else {
            linha = tentativa
          }
        }
        if (linha.trim() != '') text(linha.trim(), cx, y)
      }
    } else {
      textSize(28)
      text('Boa sorte!', LARGURA / 2, 250)
    }

    fill(color(CORES.texto + '99'))
    textAlign(CENTER)
    textSize(16)
    text('Clique para jogar', LARGURA / 2, 530)
  }

  aoClicar() {
    let Classe = CLASSES_FASE[this.numero]
    trocarCena(new Classe())
  }
}
