class Inicio extends Cena {
  display() {
    background(Tema.fundo);

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(52);
    text('Vassouras & Bigodes', LARGURA / 2, 220);

    textSize(20);
    text('Para limpar a casa, leve os gatos ao sofá', LARGURA / 2, 290);

    textSize(16);
    fill(color(Tema.texto + '99'));
    text('Clique para começar', LARGURA / 2, 420);
  }

  aoClicar() {
    Cena.somClique.tocar();
    MusicaFundo.iniciar();
    // fade so quando comeca pela fase 1
    trocarCena(new IntroFase(FASE_INICIAL, FASE_INICIAL === 1));
  }
}
