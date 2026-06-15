// tom segue o cursor (carente)
class Tom extends Gato {
  /** @type {string} */
  static cor = '#E8A87C';
  /** @type {number} */
  static velocidade = 1.8;
  /** @type {string} */
  static descricao = 'Esse gato é extremamente carente e vai na sua direção pra onde você for';

  static precarregar() {
    Tom.somMiado = new Som(['gatos/tom_1.mp3', 'gatos/tom_2.mp3'], 180, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 'Tom');
  }

  mover() {
    // aoCursor é o vetor do gato ate o cursor, o mag() da o tamanho dele q é a distancia
    // se ja ta perto (menos de 70) nao precisa andar mais
    const aoCursor = p5.Vector.sub(createVector(cursorX, cursorY), this.posicao);
    if (aoCursor.mag() < 70) return;

    // normalize deixa o vetor com tamanho 1 so a direcao
    // ai ele acelera sempre o mesmo tanto pro lado do cursor
    aoCursor.normalize();
    this.velocidade.add(p5.Vector.mult(aoCursor, Tom.velocidade));
  }
}
