class Salem extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem');
    this.cooldown = 0;
    this.friccao = 0.5;
  }

  empurrarVassoura(direcao, forca) {}

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    const distancia = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);
    if (distancia < 120) {
      const direcao = createVector(this.posicao.x - cursorX, this.posicao.y - cursorY);
      direcao.normalize();
      this.velocidade.set(direcao.x * 100, direcao.y * 100);
      this.cooldown = 45;
    }
  }
}
