// salem foge: pula longe se o cursor chega perto
class Salem extends Gato {
  /** @type {string} */
  static cor = '#2D2D2D';
  /** @type {string} */
  static descricao =
    'Salem, o gato vindo direto dos infernos, é um filhote que pula pra longe toda vez que você se aproxima';
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 1, costas: 1, direita: 1, esquerda: 2 };
  static sombras = {
    andando: { fracaoY: 1.02, fracaoLargura: 0.55 },
    sentado: { fracaoY: 0.95, fracaoLargura: 0.55 },
  };

  static precarregar() {
    Salem.somMiado = new Som(['gatos/salem_1.mp3', 'gatos/salem_2.mp3'], 180, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 'Salem');
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
      this.miar();
      Particulas.criarPo(this.posicao.x, this.posicao.y + 18, 8);
    }
  }
}
