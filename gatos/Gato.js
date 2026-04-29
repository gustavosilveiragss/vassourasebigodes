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
    this.x = x;
    this.y = y;
    this.raio = raio;
    this.cor = cor;
    this.nome = nome;

    this.sentado = false;
    this.slotX = 0; // pra onde tem que ir quando senta
    this.slotY = 0;
    this.timerSentado = 0;
    this.empurravel = true; // se a vassoura empurra ou n
  }

  // cada gato tem o seu jeito de andar (sobrescreve)
  mover() {}


  /** @param {Obstaculo[]} obstaculos */
  atualizar(obstaculos) {
    // se ja ta sentado, so anda diagonalmente ate o slot certo
    if (this.sentado) {
      if (this.x < this.slotX) {
        this.x += 2;
      }
      if (this.x > this.slotX) {
        this.x -= 2;
      }

      if (this.y < this.slotY) {
        this.y += 2;
      }
      if (this.y > this.slotY) {
        this.y -= 2;
      }
      return;
    }

    // empurra pra fora se ta em cima de algum obstaculo
    for (let i = 0; i < obstaculos.length; i++) {
      obstaculos[i].empurrarFora(this);
    }

    this.mover(); // movimentacao especifica do gato

    // trava nas bordas da tela
    if (this.x < this.raio) {
      this.x = this.raio;
    }
    if (this.x > LARGURA - this.raio) {
      this.x = LARGURA - this.raio;
    }
    if (this.y < this.raio) {
      this.y = this.raio;
    }
    if (this.y > ALTURA - this.raio) {
      this.y = ALTURA - this.raio;
    }

  }

  // empurrao da vassoura, sentido oposto ao cursor
  /** @param {number} forca */
  empurrarDoCursor(forca) {
    if (this.x < cursor.x) {
      this.x -= forca;
    } else {
      this.x += forca;
    }

    if (this.y < cursor.y) {
      this.y -= forca;
    } else {
      this.y += forca;
    }
   }

  // checa se  gato ta dentro do retangulo do sofa (com espaco extra do raio)
  /** @param {{x:number, y:number, largura:number, altura:number}} sofa */
  noSofa(sofa) {
    return (
      this.x > (sofa.x - this.raio) &&
      this.x < (sofa.x + sofa.largura + this.raio) &&
      this.y > (sofa.y - this.raio) &&
      this.y < (sofa.y + sofa.altura + this.raio)
    );
  }

  display() {
    fill(this.cor);
    noStroke();
    ellipse(this.x, this.y, this.raio * 2, this.raio * 2);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(12);
    text(this.nome, this.x, this.y + this.raio + 14);

    if (this.sentado) {
      textSize(10);
      text(ceil(this.timerSentado / 60) + 's', this.x, this.y - this.raio - 4);
    }
  }
}
