class Fofinho extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');
    this.angulo = random(TWO_PI);
  }

  mover() {
    this.angulo += 0.06;
    this.posicao.x = cursorX + cos(this.angulo) * 80;
    this.posicao.y = cursorY + sin(this.angulo) * 80;
    this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);
    this.velocidade.set(0, 0);
  }
}
