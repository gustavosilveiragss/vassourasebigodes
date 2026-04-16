class Obstaculo {
  constructor(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
  }

  resolverColisao(objeto) {
    const proximoX = constrain(objeto.posicao.x, this.x, this.x + this.largura);
    const proximoY = constrain(objeto.posicao.y, this.y, this.y + this.altura);
    const distancia = dist(objeto.posicao.x, objeto.posicao.y, proximoX, proximoY);

    if (distancia < objeto.raio) {
      if (distancia === 0) {
        objeto.posicao.x = this.x - objeto.raio - 1;
        objeto.velocidade.set(0, 0);
        return;
      }
      const direcao = createVector(objeto.posicao.x - proximoX, objeto.posicao.y - proximoY);
      direcao.normalize();
      objeto.posicao.x = proximoX + direcao.x * (objeto.raio + 1);
      objeto.posicao.y = proximoY + direcao.y * (objeto.raio + 1);

      const projecao = objeto.velocidade.dot(direcao);
      objeto.velocidade.x -= 2 * projecao * direcao.x;
      objeto.velocidade.y -= 2 * projecao * direcao.y;
      objeto.velocidade.mult(0.5);
    }
  }

  display() {
    fill(CORES.obstaculo);
    noStroke();
    rect(this.x, this.y, this.largura, this.altura, 8);
  }
}
