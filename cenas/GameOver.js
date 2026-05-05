class GameOver extends Cena {
  /** @type {Som} */
  static somGameover;

  static precarregar() {
    GameOver.somGameover = new Som(['jogo/gameover.mp3'], 0, 0.5);
  }

  /** @param {number} faseAtual */
  constructor(faseAtual) {
    super();
    this.faseAtual = faseAtual; // pra retentar a mesma fase
    GameOver.somGameover.tocar(true);
  }

  display() {
    background(Tema.fundo);

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(44);
    text('Tempo esgotado!', LARGURA / 2, 210);

    textSize(18);
    text('Clique para tentar novamente', LARGURA / 2, 340);
    text('Pressione M para voltar ao menu', LARGURA / 2, 385);
  }

  aoClicar() {
    Cena.somClique.tocar();
    trocarCena(new IntroFase(this.faseAtual));
  }

  /** @param {number} tecla */
  aoApertarTecla(tecla) {
    if (tecla === 77) {
      // tecla M
      Cena.somClique.tocar();
      trocarCena(new Inicio());
    }
  }
}
