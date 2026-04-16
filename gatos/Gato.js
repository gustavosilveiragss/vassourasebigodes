// classe base de todo gato
class Gato {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} raio
   * @param {string} cor
   * @param {string} nome
   */
  constructor(x, y, raio, cor, nome) {
    this.posicao = createVector(x, y);
    this.velocidade = createVector(0, 0);
    this.raio = raio;
    this.cor = cor;
    this.nome = nome;
    this.sprite = null;
    this.sentado = false;
    this.posicaoAlvo = null; // pra onde tem que ir quando senta
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
      if (bolinhaAlvo) {
        this.sentado = false;
      } else {
        // puxa devagar pra posicao do slot
        this.posicao.x += (this.posicaoAlvo.x - this.posicao.x) * 0.15;
        this.posicao.y += (this.posicaoAlvo.y - this.posicao.y) * 0.15;
        this.velocidade.set(0, 0);
        return;
      }
    }

    if (bolinhaAlvo) {
      // vai atras da bolinha que escolheu ele
      const direcao = p5.Vector.sub(bolinhaAlvo.posicao, this.posicao);
      direcao.normalize();
      this.velocidade.add(p5.Vector.mult(direcao, VELOCIDADES.normal * 1.5));
    } else {
      this.mover(); // movimentacao especifica do gato
    }

    // aplica friccao e velocidade
    this.velocidade.mult(this.friccao);
    this.posicao.add(this.velocidade);

    // trava nas bordas da tela
    this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }
  }

  // cada gato tem o seu mover (sobrescreve)
  mover() {}

  /**
   * @param {p5.Vector} direcao
   * @param {number} forca
   */
  empurrar(direcao, forca) {
    this.velocidade.add(p5.Vector.mult(direcao, forca));
  }

  noSofa = () => {
    return (
      this.posicao.x > (SOFA.x + this.raio) &&
      this.posicao.x < (SOFA.x + SOFA.largura - this.raio) &&
      this.posicao.y > (SOFA.y + this.raio) &&
      this.posicao.y < (SOFA.y + SOFA.altura - this.raio)
    );
  }

  display() {
    // se tem sprite usa imagem, senao bolinha colorida
    if (this.sprite) {
      imageMode(CENTER);
      image(this.sprite, this.posicao.x, this.posicao.y, this.raio * 2.2, this.raio * 2);
    } else {
      fill(this.cor);
      noStroke();
      ellipse(this.posicao.x, this.posicao.y, this.raio * 2.2, this.raio * 2);
    }

    fill(CORES.texto);
    noStroke();
    textAlign(CENTER);
    textSize(12);
    text(this.nome, this.posicao.x, this.posicao.y + this.raio + 14);
  }
}
