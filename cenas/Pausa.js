class Pausa extends Cena {
  constructor(fase) {
    super();
    this.fase = fase;
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

  aoApertarTecla(tecla) {
    if (tecla === 80 || tecla === 27) {
      trocarCena(this.fase);
    }
  }
}
