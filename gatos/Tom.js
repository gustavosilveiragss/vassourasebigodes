// tom segue o cursor (carente)
class Tom extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom');
  }


  mover() {
    const distancia = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);
    if (distancia < 70) return;

    // acelera em direcao ao cursor
    const direcao = createVector(cursorX - this.posicao.x, cursorY - this.posicao.y);
    direcao.normalize();
    this.velocidade.add(p5.Vector.mult(direcao, VELOCIDADES.normal));
  }
}
