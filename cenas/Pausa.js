class Pausa extends Cena {
  /** @type {Som} */
  static somTransicao;

  static precarregar() {
    Pausa.somTransicao = new Som(['ui/transicao.ogg'], 0, 0.5);
  }

  /** @param {Fase} fase */
  constructor(fase) {
    super();
    this.fase = fase;
    Pausa.somTransicao.tocar();
  }

  update() {}

  display() {
    this.fase.display();

    fill(0, 0, 0, 140);
    noStroke();
    rect(0, 0, LARGURA, ALTURA);

    fill(255);
    textAlign(CENTER);
    textSize(48);
    text('PAUSA', LARGURA / 2, ALTURA / 2 - 20);

    textSize(18);
    text('P ou ESC para continuar', LARGURA / 2, ALTURA / 2 + 30);
  }

  /** @param {number} tecla */
  aoApertarTecla(tecla) {
    // 80 = P, 27 = esc
    if (tecla === 80 || tecla === 27) {
      Pausa.somTransicao.tocar();
      trocarCena(this.fase, false);
    }
  }
}
