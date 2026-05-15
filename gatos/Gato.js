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

  // quantos frames de animacao por direcao, workaround enquanto n temos 3 pra todos os gatos.
  // quando o designer entregar tudo, isso vira fixo em 3 e o map some
  /** @type {{frente: number, costas: number, direita: number, esquerda: number}} */
  static frames = { frente: 0, costas: 0, direita: 0, esquerda: 0 };

  // sombra por pose. fracaoY = fracao da meia altura (1.0 = chao do sprite). fracaoLargura = fracao da largura
  /** @type {{andando: {fracaoY: number, fracaoLargura: number}, sentado: {fracaoY: number, fracaoLargura: number}}} */
  static sombras = {
    andando: { fracaoY: 0, fracaoLargura: 0 },
    sentado: { fracaoY: 0, fracaoLargura: 0 },
  };

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
    /** @type {string} fallback durante delay de sentado */
    this.direcaoUltima = 'frente';
    /** @type {number} frame atual do ciclo */
    this.frameAnim = 0;
    /** @type {number} updates ate trocar de frame */
    this.contadorAnim = 0;
    /** @type {p5.Image|null} fallback quando falta sprite da direcao */
    this.spriteUltima = null;
    /** @type {number} frames parado seguidos, atrasa transicao pra sentado */
    this.framesParado = 0;
    /** @type {number} cooldown em frames pra n spammar po contra obstaculo */
    this.cooldownPoObstaculo = 0;
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
        // puxa devagar pra posicao do slot
        this.posicao.x += (this.posicaoAlvo.x - this.posicao.x) * 0.15;
        this.posicao.y += (this.posicaoAlvo.y - this.posicao.y) * 0.15;
        this.velocidade.set(0, 0);
        return;
      }
      this.sentado = false;
      Particulas.criarPo(this.posicao.x, this.posicao.y + 10, 4);
    }

    if (bolinhaAlvo) {
      // vai atras da bolinha que escolheu ele
      const direcao = p5.Vector.sub(bolinhaAlvo.posicao, this.posicao);
      direcao.normalize();
      this.velocidade.add(p5.Vector.mult(direcao, Gato.velocidadeChase));
    } else {
      this.mover(); // movimentacao especifica do gato
    }

    // aplica friccao e velocidade
    this.velocidade.mult(this.friccao);
    this.posicao.add(this.velocidade);

    // trava nas bordas da tela
    this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);

    if (this.cooldownPoObstaculo > 0) {
      this.cooldownPoObstaculo--;
    }

    let colidiu = false;
    for (let obstaculo of obstaculos) {
      if (obstaculo.resolverColisao(this)) {
        colidiu = true;
      }
    }

    // emite po so de tempos em tempos, mesmo se ficar empurrando contra a parede
    if (colidiu && this.cooldownPoObstaculo === 0) {
      Particulas.criarPo(this.posicao.x, this.posicao.y, 5);
      this.cooldownPoObstaculo = 30;
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

  /** @returns {string} */
  direcaoAtual() {
    const vx = this.velocidade.x;
    const vy = this.velocidade.y;
    const parado = this.sentado || this.velocidade.mag() < 5;
    if (parado) {
      this.framesParado++;
      // delay pequeno antes de virar sentado, pra parecer transicao
      if (this.framesParado >= 10) return 'sentado';
      return this.direcaoUltima;
    }
    this.framesParado = 0;
    let dir;
    if (abs(vx) > abs(vy)) {
      dir = vx < 0 ? 'esquerda' : 'direita';
    } else {
      dir = vy > 0 ? 'frente' : 'costas';
    }
    this.direcaoUltima = dir;
    return dir;
  }

  /**
   * @param {string} direcao
   * @returns {p5.Image|null}
   */
  escolherSprite(direcao) {
    const grupo = SPRITES[this.nome.toLowerCase()];
    if (!grupo) return this.spriteUltima;

    if (direcao === 'sentado') return grupo.sentado || this.spriteUltima;

    // troca de frame a cada 8 updates
    this.contadorAnim++;
    if (this.contadorAnim >= 8) {
      this.contadorAnim = 0;
      this.frameAnim++;
    }

    const frames = grupo[direcao];
    if (frames && frames.length > 0) {
      return frames[this.frameAnim % frames.length];
    }
    return this.spriteUltima;
  }

  display() {
    const direcao = this.direcaoAtual();
    const sprite = this.escolherSprite(direcao);
    const meiaAlturaSprite = this.raio * (ESCALA_SPRITE / 2);

    if (sprite) {
      this.spriteUltima = sprite;
      imageMode(CENTER);
      const maiorLado = max(sprite.width, sprite.height);
      const fatorEscala = (this.raio * ESCALA_SPRITE) / maiorLado;
      const larguraRender = sprite.width * fatorEscala;
      const alturaRender = sprite.height * fatorEscala;

      // sombra na base do corpo, fracoes da classe variam por pose visual
      noStroke();
      fill(0, 60);
      const sombraPose = direcao === 'sentado' ? this.constructor.sombras.sentado : this.constructor.sombras.andando;
      const larguraSombra = larguraRender * sombraPose.fracaoLargura;
      const sombraY = this.posicao.y + (alturaRender / 2) * sombraPose.fracaoY;
      ellipse(this.posicao.x, sombraY, larguraSombra, larguraSombra * 0.25);

      desenharSpriteComOutline(sprite, this.posicao.x, this.posicao.y, larguraRender, alturaRender);
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
