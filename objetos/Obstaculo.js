class Obstaculo {
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
    // o objeto é uma bolinha (centro x,y + raio). pra simplificar a colisao,
    // ao inves de checar circulo vs retangulo, eu pego o ponto do retangulo
    // mais perto do centro do circulo (com constrain). se a distancia desse
    // ponto até o centro do objeto for menor que o raio, ta colidindo.
    // sofri um pouco nessa parte e usei IA pra essa solução
    const proximoX = constrain(objeto.posicao.x, this.x, this.x + this.largura);
    const proximoY = constrain(objeto.posicao.y, this.y, this.y + this.altura);
    const distancia = dist(objeto.posicao.x, objeto.posicao.y, proximoX, proximoY);

    if (distancia < objeto.raio) {
      // objeto exatamente em cima do canto joga pra esquerda pra n dividir por 0
      if (distancia === 0) {
        objeto.posicao.x = this.x - objeto.raio - 1;
        objeto.velocidade.set(0, 0);
        return;
      }

      // empurra o objeto na direcao da normal de saida
      const direcao = createVector(objeto.posicao.x - proximoX, objeto.posicao.y - proximoY);
      direcao.normalize();
      objeto.posicao.x = proximoX + direcao.x * (objeto.raio + 1);
      objeto.posicao.y = proximoY + direcao.y * (objeto.raio + 1);

      // reflete a velocidade pelo eixo da normal (quica) e perde energia
      const projecao = objeto.velocidade.dot(direcao);
      objeto.velocidade.x -= 2 * projecao * direcao.x;
      objeto.velocidade.y -= 2 * projecao * direcao.y;
      objeto.velocidade.mult(0.5);
    }
  }

  display = () => {
    fill(CORES.obstaculo);
    noStroke();
    rect(this.x, this.y, this.largura, this.altura, 8);
  }
}
