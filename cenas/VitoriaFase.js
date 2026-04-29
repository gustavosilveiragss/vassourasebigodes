class VitoriaFase extends Cena {
  /** @param {number} proximaFase */
  constructor(proximaFase) {
    super();
    this.proximaFase = proximaFase;
  }


  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);

    if (this.proximaFase > CLASSES_FASE.length - 1) {
      textSize(44);
      text('Você varreu a casa!', LARGURA / 2, 220);
      textSize(18);
      text('Todos os gatos pararam quietos no sofá', LARGURA / 2, 300);
      text('Clique para voltar ao início', LARGURA / 2, 370);
      return;
    }

    textSize(40);
    text('Fase concluída!', LARGURA / 2, 220);
    textSize(18);
    text('Clique para a Fase ' + this.proximaFase, LARGURA / 2, 330);
  }

  aoClicar() {
    if (this.proximaFase > CLASSES_FASE.length - 1) {
      trocarCena(new Inicio());
      return;
    }

    trocarCena(new IntroFase(this.proximaFase));
  }
}
