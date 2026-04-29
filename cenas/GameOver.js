class GameOver extends Cena {
  /** @param {number} faseAtual */
  constructor(faseAtual) {
    super();
    this.faseAtual = faseAtual; // pra retentar a mesma fase
  }


  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(44);
    text('Tempo esgotado!', LARGURA / 2, 210);

    textSize(18);
    text('Clique para tentar novamente', LARGURA / 2, 340);
    text('Pressione M para voltar ao menu', LARGURA / 2, 385);
  }

  aoClicar() {
    trocarCena(new IntroFase(this.faseAtual));
  }

  /** @param {number} tecla */
  aoApertarTecla(tecla) {
    if (tecla === 77) { // tecla M
      trocarCena(new Inicio());
    }
  }
}
