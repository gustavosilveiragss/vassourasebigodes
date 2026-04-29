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

  // se o gato encostou no obstaculo, joga ele pra fora pelo lado mais perto
  /** @param {Gato} gato */
  empurrarFora(gato) {
    // o gato é uma bolinha (centro x,y + raio). pra simplificar a colisao,
    // ao inves de checar circulo vs retangulo, eu "incho" o retangulo
    // com o raio do gato. ai posso tratar o gato como se fosse so um ponto.
    // se o ponto (gato.x, gato.y) ta dentro desse retangulo inchado,
    // entao ta colidindo.sofri um pouco e usei IA pra essa solução

    let esquerda = this.x - gato.raio;
    let direita = this.x + this.largura + gato.raio; 
    let topo = this.y - gato.raio; 
    let base = this.y + this.altura + gato.raio; 

    // ta entre as 4 bordas? entao ta dentro = colidindo
    if (gato.x > esquerda &&
       gato.x < direita &&
        gato.y > topo &&
        gato.y < base) {

      // ja que ta colidindo, preciso jogar o gato pra fora.
      // calculo quanto ele ta afundado em cada lado:
      let distanciaEsquerda = gato.x - esquerda;
      let distanciaDireita = direita - gato.x;
      let distanciaTopo = gato.y - topo;
      let distanciaBase = base - gato.y;

      // o lado em que ele ta menos enfiado É o lado por onde ele entrou
      // (ou pelo menos o mais facil de empurrar pra fora)
      let menor = min(distanciaEsquerda, distanciaDireita, distanciaTopo, distanciaBase);

      // empurra pra borda correspondente. tipo: se entrou pela esquerda,
      // teleporta pra cima da borda esquerda (que ja considera o raio)
      if (menor === distanciaEsquerda) {
        gato.x = esquerda;
      } else if (menor === distanciaDireita) {
        gato.x = direita;
      } else if (menor === distanciaTopo) {
        gato.y = topo;
      } else {
        gato.y = base;
      }
    }
  }

  display() {
    fill(CORES.obstaculo);
    noStroke();
    rect(this.x, this.y, this.largura, this.altura, 8);
  }
}
