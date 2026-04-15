class Fofinho extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');
    this.angulo = random(TWO_PI);
  }

  mover() {
    this.angulo += 0.06;
    this.pos.x = cursorX + cos(this.angulo) * 150;
    this.pos.y = cursorY + sin(this.angulo) * 150;
    this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio);
    this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio);
    this.vel.set(0, 0);
  }
}
