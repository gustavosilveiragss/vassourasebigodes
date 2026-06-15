// fifi vesgo foge da vassoura em burst rapido fazendo curva
class Fifi extends Gato {
  /** @type {string} */
  static cor = '#C4956A';
  /** @type {number} */
  static velocidade = 0.8;
  /** @type {string} */
  static descricao = 'Esse gato vesguinho nunca consegue andar em linha reta';

  static precarregar() {
    Fifi.somMiado = new Som(['gatos/fifi_1.mp3', 'gatos/fifi_2.mp3'], 180, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 'Fifi');
    this.frames = 0; // frames restantes do burst
    this.direcaoFuga = createVector(0, 0); // pra onde ele ta fugindo agora
  }

  mover() {
    const distanciaCursor = dist(cursorX, cursorY, this.posicao.x, this.posicao.y);

    // cursor chegou perto e n ta fugindo ainda? inicia burst
    if (this.frames === 0 && distanciaCursor < 120) {
      this.frames = 40;
      // vetor que aponta do cursor pro gato: a direcao inicial da fuga
      this.direcaoFuga = p5.Vector.sub(this.posicao, createVector(cursorX, cursorY));
      // normalize deixa o vetor com comprimento 1 (so a direcao), pq o tamanho da
      // velocidade quem da e Fifi.velocidade la embaixo, n a distancia ate o cursor
      this.direcaoFuga.normalize();
    }

    // enquanto ta fugindo, gira a direcao um tiquinho por frame pra ele fazer curva (vesgo).
    // rotate(0.05) roda o vetor 0.05 radianos sem mudar o comprimento dele
    if (this.frames > 0) {
      this.frames--;
      this.direcaoFuga.rotate(0.05);
      this.velocidade.add(p5.Vector.mult(this.direcaoFuga, Fifi.velocidade));
    }
  }
}
