class Inicio extends Cena {
  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(52);
    text('Vassouras & Bigodes', LARGURA / 2, 220);

    textSize(20);
    text('Empurre os gatos para a zona de descanso!', LARGURA / 2, 290);

    textSize(16);
    fill(color(CORES.texto + '99'));
    text('Clique para começar', LARGURA / 2, 420);
  }

  aoClicar() {
    trocarCena(new IntroFase(1));
  }
}
