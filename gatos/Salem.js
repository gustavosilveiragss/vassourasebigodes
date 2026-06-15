// salem foge: pula longe se o cursor chega perto
class Salem extends Gato {
  /** @type {string} */
  static cor = '#2D2D2D';
  /** @type {string} */
  static descricao = 'Salem, o gato vindo direto dos infernos, é um filhote que pula pra longe toda vez que você se aproxima';

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
      // vetor que aponta do cursor pro gato é a direcao da fuga
      const fuga = p5.Vector.sub(this.posicao, createVector(cursorX, cursorY));
      // setMag deixa esse vetor com tamanho 100 mantendo a direcao
      // ai o pulo tem sempre a mesma forca pra qualquer lado, ja viro a velocidade do pulo
      fuga.setMag(100);
      this.velocidade.set(fuga);
      this.cooldown = 30;
      this.miar();
    }
  }
}
