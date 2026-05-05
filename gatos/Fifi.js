// fifi vesgo foge da vassoura em burst rapido fazendo curva
class Fifi extends Gato {
  /** @type {string} */
  static cor = '#C4956A';
  /** @type {number} */
  static velocidade = 0.8;
  /** @type {string} */
  static descricao = 'Esse gato vesguinho nunca consegue andar em linha reta';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 1, costas: 3, direita: 1, esquerda: 1 };
  static sombras = {
    andando: { fracaoY: 1.13, fracaoLargura: 0.6 },
    sentado: { fracaoY: 1.08, fracaoLargura: 0.55 },
  };

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
      this.velocidade.add(p5.Vector.mult(vetorDirecao, Fifi.velocidade));
    }
  }
}
