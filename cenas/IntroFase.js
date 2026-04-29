const CLASSES_FASE = [Fase, Fase1, Fase2, Fase3, Fase4, Fase5];

class IntroFase extends Cena {
  /** @param {number} numero */
  constructor(numero) {
    super();
    this.numero = numero;
  }

  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(40);
    text('Fase ' + this.numero, LARGURA / 2, 180);

    textSize(20);
    text('Empurre todos os gatos até o sofá!', LARGURA / 2, 270);


    textSize(16);
    text('Cuidado: cada gato escapa do sofá depois de um tempo', LARGURA / 2, 320);

    fill(color(CORES.texto + '99'));
    textSize(16);
    text('Clique para jogar', LARGURA / 2, 455);
  }

  aoClicar() {
    const Classe = CLASSES_FASE[this.numero];
    trocarCena(new Classe());
  }
}
