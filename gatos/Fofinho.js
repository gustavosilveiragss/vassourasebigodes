class Fofinho extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');
    this.cooldown = 90;
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }
    
    const direcao = createVector(cursorX - this.posicao.x, cursorY - this.posicao.y);
    direcao.normalize();
    this.velocidade.set(direcao.x * 100, direcao.y * 100);
    this.cooldown = 90;
  }
}
