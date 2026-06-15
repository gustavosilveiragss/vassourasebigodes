// classe base de todo gato
class Gato {
  /** @type {Som|undefined} */
  static somMiado;

  /** @type {number} raio de colisao padrao. miau e fofinho sobrescrevem */
  static raio = 22;

  /** @type {string} fallback se o sprite nao carregar */
  static cor = '#000000';

  /** @type {number} velocidade quando perseguindo a bolinha */
  static velocidadeChase = 2.7;

  // texto do card da intro
  /** @type {string} */
  static descricao = '';

  /**
   * @param {number} x
   * @param {number} y
   * @param {string} nome usado pra achar o sprite
   */
  constructor(x, y, nome) {
    /** @type {p5.Vector} centro do gato */
    this.posicao = createVector(x, y);
    /** @type {p5.Vector} px/frame */
    this.velocidade = createVector(0, 0);
    /** @type {number} */
    this.raio = this.constructor.raio;
    /** @type {string} */
    this.cor = this.constructor.cor;
    /** @type {string} */
    this.nome = nome;
    /** @type {boolean} encaixado num slot do sofa */
    this.sentado = false;
    /** @type {{x: number, y: number}|null} slot alvo no sofa */
    this.posicaoAlvo = null;
    /** @type {number} multiplica velocidade a cada frame */
    this.friccao = 0.82;
  }

  /**
   * @param {Bolinha[]} bolinhas
   * @param {Obstaculo[]} obstaculos
   */
  update(bolinhas, obstaculos) {
    // procura se alguma bolinha ta atraindo esse gato
    let bolinhaAlvo = null;
    for (let bolinha of bolinhas) {
      if (bolinha.gatoAtraido === this) {
        bolinhaAlvo = bolinha;
        break;
      }
    }

    if (this.sentado) {
      // bolinha atraiu, levanta do sofa
      if (!bolinhaAlvo) {
        // desliza devagar pro slot: anda 15% do que falta a cada frame (lerp)
        const alvo = createVector(this.posicaoAlvo.x, this.posicaoAlvo.y);
        this.posicao.lerp(alvo, 0.15);
        this.velocidade.set(0, 0);
        return;
      }
      this.sentado = false;
    }

    if (bolinhaAlvo) {
      // aBolinha é o vetor do gato ate a bolinha, normalize deixa ele com tamanho 1 so a direcao
      // ai o gato acelera sempre o mesmo tanto na direcao dela
      const aBolinha = p5.Vector.sub(bolinhaAlvo.posicao, this.posicao);
      aBolinha.normalize();
      this.velocidade.add(p5.Vector.mult(aBolinha, Gato.velocidadeChase));
    } else {
      this.mover(); // movimentacao especifica do gato
    }

    // aplica atrito e move: posicao anda na direcao da velocidade
    this.velocidade.mult(this.friccao);
    this.posicao.add(this.velocidade);

    // trava o centro do gato dentro das bordas da tela
    this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }
  }

  // cada gato tem o seu mover (sobrescreve)
  mover() {}

  miar() {
    if (this.constructor.somMiado) {
      this.constructor.somMiado.tocar();
    }
  }

  /**
   * @param {p5.Vector} direcao
   * @param {number} forca
   */
  empurrar(direcao, forca) {
    this.velocidade.add(p5.Vector.mult(direcao, forca));
  }

  noSofa(sofa) {
    return (
      this.posicao.x > sofa.x + this.raio &&
      this.posicao.x < sofa.x + sofa.largura - this.raio &&
      this.posicao.y > sofa.y + this.raio &&
      this.posicao.y < sofa.y + sofa.altura - this.raio
    );
  }

  display() {
    const sprite = SPRITES[this.nome.toLowerCase()];
    const meiaAlturaSprite = this.raio * (ESCALA_SPRITE / 2);

    if (sprite) {
      imageMode(CENTER);
      const maiorLado = max(sprite.width, sprite.height);
      const fatorEscala = (this.raio * ESCALA_SPRITE) / maiorLado;
      const larguraRender = sprite.width * fatorEscala;
      const alturaRender = sprite.height * fatorEscala;

      image(sprite, this.posicao.x, this.posicao.y, larguraRender, alturaRender);
    } else {
      fill(this.cor);
      noStroke();
      ellipse(this.posicao.x, this.posicao.y, this.raio * 2.2, this.raio * 2);
    }

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(12);
    text(this.nome, this.posicao.x, this.posicao.y + meiaAlturaSprite + 30);
  }
}
