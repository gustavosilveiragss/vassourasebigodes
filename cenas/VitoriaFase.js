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
    textSize(40);
    text('Fase concluída!', LARGURA / 2, 220);

    textSize(16);
    
    if (this.proximaFase > CLASSES_FASE.length - 1) {
      text('Você varreu a casa inteira com sucesso!', LARGURA / 2, 310);
      text('Clique para voltar ao início', LARGURA / 2, 370);
    } else {
      text('Clique para a Fase ' + this.proximaFase, LARGURA / 2, 330);
    }
  }

  aoClicar() {
    if (this.proximaFase > CLASSES_FASE.length - 1) {
      trocarCena(new Inicio());
    } else {
      trocarCena(new IntroFase(this.proximaFase));
    }
  }
}
