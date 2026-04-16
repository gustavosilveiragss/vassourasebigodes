// salem foge: pula longe se o cursor chega perto
class Salem extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem');
    this.cooldown = 0; // tempo de descanso entre pulos
    this.friccao = 0.5; // freia rapido depois do pulo
  }

  // vassoura n empurra ele
  empurrar(direcao, forca) {}

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }


    const distancia = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);
    if (distancia < 150) {
      // pula no sentido oposto do cursor
      const direcao = createVector(this.posicao.x - cursorX, this.posicao.y - cursorY);
      direcao.normalize();
      this.velocidade.set(direcao.x * 100, direcao.y * 100);
      this.cooldown = 30;
    }
  }
}
