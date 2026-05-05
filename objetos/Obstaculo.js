class Obstaculo {
  /** @type {string} */
  static cor = '#C4A882';

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} largura
   * @param {number} altura
   */
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }

  // se o objeto encostou no obstaculo, joga ele pra fora pelo lado mais perto
  /** @param {{posicao: p5.Vector, velocidade: p5.Vector, raio: number}} objeto */
  resolverColisao(objeto) {
    // colisao circulo-retangulo precisa tratar 2 casos: centro do circulo fora
    // do retangulo e centro dentro (acontece quando entra muito rapido). sofri
    // pra fazer funcionar pros 2 e precisei de ajuda de IA, antes saia pelo 
    // lado errado quando entrava por cima

    // ponto do retangulo mais perto do centro do circulo
    const proximoX = constrain(objeto.posicao.x, this.x, this.x + this.largura);
    const proximoY = constrain(objeto.posicao.y, this.y, this.y + this.altura);

    /** @type {p5.Vector} */ let normal;
    /** @type {number} */ let sobreposicao;

    if (proximoX === objeto.posicao.x && proximoY === objeto.posicao.y) {
      // centro do circulo dentro do retangulo: empurra pelo lado mais proximo
      const distEsquerda = objeto.posicao.x - this.x;
      const distDireita = this.x + this.largura - objeto.posicao.x;
      const distCima = objeto.posicao.y - this.y;
      const distBaixo = this.y + this.altura - objeto.posicao.y;
      const menor = min(distEsquerda, distDireita, distCima, distBaixo);

      if (menor === distCima) normal = createVector(0, -1);
      else if (menor === distBaixo) normal = createVector(0, 1);
      else if (menor === distEsquerda) normal = createVector(-1, 0);
      else normal = createVector(1, 0);

      sobreposicao = menor + objeto.raio;
    } else {
      // centro fora: vetor do ponto mais proximo ate o centro do circulo
      const diferenca = createVector(objeto.posicao.x - proximoX, objeto.posicao.y - proximoY);
      const distancia = diferenca.mag();
      if (distancia >= objeto.raio) return;
      normal = diferenca.div(distancia);
      sobreposicao = objeto.raio - distancia;
    }

    // empurra o objeto pra fora ao longo da normal
    objeto.posicao.add(p5.Vector.mult(normal, sobreposicao + 1));

    // reflete a velocidade pelo eixo da normal (quica) e perde energia
    // so reflete se ta indo pra dentro, evita tremor frame a frame
    const projecao = objeto.velocidade.dot(normal);
    if (projecao < 0) {
      objeto.velocidade.sub(p5.Vector.mult(normal, 2 * projecao));
      objeto.velocidade.mult(0.5);
    }
  }

  display() {
    fill(Obstaculo.cor);
    noStroke();
    rect(this.x, this.y, this.largura, this.altura, 8);
  }
}
