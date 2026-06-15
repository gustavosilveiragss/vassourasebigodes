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
    // ponto do retangulo mais perto do objeto: preso (constrain) nas bordas do retangulo
    const proximo = createVector(
      constrain(objeto.posicao.x, this.x, this.x + this.largura),
      constrain(objeto.posicao.y, this.y, this.y + this.altura),
    );

    // vetor desse ponto ate o centro do objeto, é a direcao pra empurrar pra fora
    // mag() 0 quer dizer q o ponto e o centro sao o mesmo
    let normal = p5.Vector.sub(objeto.posicao, proximo);
    let sobreposicao; // quanto o objeto entrou no obstaculo, pra saber quanto empurrar pra fora

    if (normal.mag() === 0) {
      // centro do objeto ta dentro do retangulo: empurra pela parede mais proxima
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
      // o mag() do vetor é a distancia do objeto ate a borda
      // se for maior q o raio nem encostou entao sai
      const distancia = normal.mag();
      if (distancia >= objeto.raio) return;
      // normalize deixa a normal com tamanho 1 so a direcao pra fora
      normal.normalize();
      sobreposicao = objeto.raio - distancia;
    }

    // empurra o objeto pra fora ao longo da normal e freia um pouco
    objeto.posicao.add(p5.Vector.mult(normal, sobreposicao + 1));
    objeto.velocidade.mult(0.5);
  }

  display() {
    fill(Obstaculo.cor);
    noStroke();
    rect(this.x, this.y, this.largura, this.altura, 8);
  }
}
