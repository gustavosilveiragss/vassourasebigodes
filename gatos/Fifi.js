// fifi vesgo foge da vassoura em burst rapido fazendo curva
class Fifi extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi');
    this.frames = 0; // frames restantes do burst
    this.direcao = 0; // angulo atual da fuga em radianos
  }

  mover() {
    const distanciaCursor = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);

    // cursor chegou perto e n ta fugindo ainda? inicia burst
    if (this.frames === 0 && distanciaCursor < 120) {
      this.frames = 40;
      const fuga = createVector(this.posicao.x - cursorX, this.posicao.y - cursorY);
      fuga.normalize();
      this.direcao = atan2(fuga.y, fuga.x);
    }

    // enquanto ta fugindo gira o angulo pra fazer curva
    if (this.frames > 0) {
      this.frames--;
      this.direcao += 0.05;
      const vetorDirecao = createVector(cos(this.direcao), sin(this.direcao));
      this.velocidade.add(p5.Vector.mult(vetorDirecao, VELOCIDADES.lento));
    }
  }
}
