// fofinho: tiro pra cima do cursor 
class Fofinho extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');
    this.cooldown = 90; // cooldown tiro
  }


  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    // dispara em direcao ao cursor
    const direcao = createVector(cursorX - this.posicao.x, cursorY - this.posicao.y);
    direcao.normalize();
    this.velocidade.set(direcao.x * 100, direcao.y * 100);
    this.cooldown = 90;
  }
}
