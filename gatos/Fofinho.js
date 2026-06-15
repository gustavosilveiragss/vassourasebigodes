// fofinho: tiro pra cima do cursor
class Fofinho extends Gato {
  /** @type {number} */
  static raio = 16;
  /** @type {string} */
  static cor = '#6B8F71';
  /** @type {string} */
  static descricao = 'Bravinho mas carinhoso, sai correndo atrás de você rapidamente';

  static precarregar() {
    Fofinho.somMiado = new Som(['gatos/fofinho_1.mp3', 'gatos/fofinho_2.mp3'], 180, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 'Fofinho');
    this.cooldown = 90; // cooldown tiro
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    // vetor que aponta do gato pro cursor é a direcao do tiro
    const aoCursor = p5.Vector.sub(createVector(cursorX, cursorY), this.posicao);
    // setMag deixa o vetor com tamanho 100 mantendo a direcao
    // ai o tiro sai sempre com a mesma forca pro lado do cursor, ja viro a velocidade
    aoCursor.setMag(100);
    this.velocidade.set(aoCursor);
    this.cooldown = 90;
  }
}
