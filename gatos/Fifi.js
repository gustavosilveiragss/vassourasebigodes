class Fifi extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi');
    this.frames = 0;
    this.direcao = 0;
  }

  mover() {
    const distanciaCursor = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);
    if (this.frames === 0 && distanciaCursor < 120) {
      this.frames = 40;
      const fuga = createVector(this.posicao.x - cursorX, this.posicao.y - cursorY);
      fuga.normalize();
      this.direcao = atan2(fuga.y, fuga.x);
    }
    if (this.frames > 0) {
      this.frames--;
      this.direcao += 0.05;
      const vetorDirecao = createVector(cos(this.direcao), sin(this.direcao));
      this.velocidade.add(p5.Vector.mult(vetorDirecao, VELOCIDADES.lento));
    }
  }
}
