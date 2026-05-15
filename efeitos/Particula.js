// uma particula visual, o tipo define como desenha
// inspirada no video: https://youtu.be/CKeyIbT3vXI
class Particula {
  /**
   * @param {{
   *   x: number,
   *   y: number,
   *   velocidadeX: number,
   *   velocidadeY: number,
   *   vida: number,
   *   cor: string,
   *   tamanho: number,
   *   tipo: 'po'|'pelo'|'confete'|'brilho',
   *   rotacao?: number,
   *   velocidadeRotacao?: number,
   *   gravidade?: number,
   * }} opcoes
   */
  constructor(opcoes) {
    this.posicao = createVector(opcoes.x, opcoes.y);
    this.velocidade = createVector(opcoes.velocidadeX, opcoes.velocidadeY);
    this.aceleracao = createVector(0, 0);
    this.vida = opcoes.vida;
    this.vidaMaxima = opcoes.vida;
    this.cor = opcoes.cor;
    this.tamanho = opcoes.tamanho;
    this.tipo = opcoes.tipo;
    this.rotacao = opcoes.rotacao || 0;
    this.velocidadeRotacao = opcoes.velocidadeRotacao || 0;
    this.gravidade = opcoes.gravidade || 0;
  }

  /** @param {p5.Vector} forca */
  aplicarForca(forca) {
    this.aceleracao.add(forca);
  }

  update() {
    this.aplicarForca(createVector(0, this.gravidade));
    this.velocidade.add(this.aceleracao);
    this.posicao.add(this.velocidade);
    this.aceleracao.mult(0);
    this.rotacao += this.velocidadeRotacao;
    this.vida--;

    // po e pelo freiam no ar
    if (this.tipo === 'po' || this.tipo === 'pelo') {
      this.velocidade.mult(0.94);
    }
  }

  display() {
    const alpha = (this.vida / this.vidaMaxima) * 255;
    const corComAlpha = color(this.cor);
    corComAlpha.setAlpha(alpha);

    push();
      translate(this.posicao.x, this.posicao.y);
      rotate(this.rotacao);
      noStroke();
      fill(corComAlpha);

      switch (this.tipo) {
        case 'po':
          ellipse(0, 0, this.tamanho, this.tamanho);
          break;
        case 'pelo':
          ellipse(0, 0, this.tamanho * 1.6, this.tamanho * 0.6);
          break;
        case 'confete':
          rectMode(CENTER);
          rect(0, 0, this.tamanho, this.tamanho * 0.5);
          break;
        case 'brilho':
          noFill();
          stroke(corComAlpha);
          strokeWeight(2);
          // o brilho cresce de tamanho conforme vai morrendo, pra parecer que ta explodindo
          const fracaoVida = this.vida / this.vidaMaxima;
          const raio = this.tamanho + (1 - fracaoVida) * this.tamanho * 1.8;
          ellipse(0, 0, raio * 2, raio * 2);
          break;
      }
    pop();
  }
}
