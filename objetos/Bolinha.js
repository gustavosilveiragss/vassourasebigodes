// bolinha que para, escolhe um gato pra atrair, quica e repete
class Bolinha {
  /** @type {Som} */
  static somQuica;
  /** @type {Som} */
  static somSeleciona;
  /** @type {number} */
  static raio = 10;
  /** @type {string} */
  static cor = '#E86B6B';
  /** @type {number} frames de espera antes de atrair o proximo gato */
  static FRAMES_ESPERA = 360; // 6 segundos a 60fps
  /** @type {number} forca do empurrao da vassoura */
  static FORCA_VASSOURA = 4;

  static precarregar() {
    Bolinha.somQuica = new Som(
      ['jogo/bolinha_quica_1.ogg', 'jogo/bolinha_quica_2.ogg'],
      8,
      0.5,
    );
    Bolinha.somSeleciona = new Som(['jogo/bolinha_seleciona.ogg'], 0, 0.55);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {Gato[]} gatos
   */
  constructor(x, y, gatos) {
    this.posicao = createVector(x, y);
    this.velocidade = createVector(0, 0);
    this.raio = Bolinha.raio;
    this.gatos = gatos;
    this.gatoAtraido = null;
    this.framesEspera = 0;
    this.timerPerseguicao = 0;
  }

  /** @param {Obstaculo[]} obstaculos */
  update(obstaculos) {
    // atraindo gato muito tempo, desiste
    if (this.gatoAtraido !== null) {
      this.timerPerseguicao++;
      if (this.timerPerseguicao > 300) {
        this.liberarGato();
      }
    }

    // atrito leve e move a posicao na direcao da velocidade
    this.velocidade.mult(0.985);
    this.posicao.add(this.velocidade);

    // quica nas paredes invertendo a velocidade naquele eixo e perdendo energia
    const fatorPerda = -0.9;
    if (this.posicao.x < this.raio || this.posicao.x > LARGURA - this.raio) {
      this.velocidade.x *= fatorPerda;
      this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
      if (abs(this.velocidade.x) > 0.5) Bolinha.somQuica.tocar();
    }
    if (this.posicao.y < this.raio || this.posicao.y > ALTURA - this.raio) {
      this.velocidade.y *= fatorPerda;
      this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);
      if (abs(this.velocidade.y) > 0.5) Bolinha.somQuica.tocar();
    }

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }

    // colisao com cada gato, empurra a bolinha pra fora e faz ela quicar
    for (const gato of this.gatos) {
      // doGato é o vetor do gato ate a bolinha, o mag() devolve o tamanho dele q aqui é a distancia
      const doGato = p5.Vector.sub(this.posicao, gato.posicao);
      const distancia = doGato.mag();
      const distanciaMinima = this.raio + gato.raio; // encostam qd ficam mais perto q isso

      if (distancia < distanciaMinima && distancia > 0) {
        // normalize encolhe o vetor pra tamanho 1 sobrando so a direcao, ai empurro a bolinha pra fora
        doGato.normalize();
        this.posicao.add(p5.Vector.mult(doGato, distanciaMinima - distancia));

        if (gato === this.gatoAtraido) {
          // o gato perseguido encostou, dispara num angulo aleatorio
          // fromAngle faz um vetor tamanho 1 nesse angulo e o mult(5) deixa ele com tamanho 5 q é a velocidade
          this.velocidade = p5.Vector.fromAngle(random(TWO_PI)).mult(5);
          this.liberarGato();
          Bolinha.somQuica.tocar();
          continue;
        }

        // bateu num gato qualquer, volta pra tras perdendo energia
        this.velocidade.mult(-0.85);
        Bolinha.somQuica.tocar();
      }
    }

    // vassoura empurra a bolinha pra longe do cursor com forca fixa
    // doCursor é o vetor do cursor ate a bolinha, o mag() é a distancia entre eles
    const doCursor = p5.Vector.sub(this.posicao, createVector(cursorX, cursorY));
    const distVassoura = doCursor.mag();
    const distMinVassoura = this.raio + Vassoura.raio;
    if (distVassoura < distMinVassoura && distVassoura > 0) {
      // normalize pra sobrar so a direcao longe do cursor, o tamanho do empurrao quem da é a FORCA
      doCursor.normalize();
      // tira a sobreposicao e soma a forca do empurrao na velocidade
      this.posicao.add(p5.Vector.mult(doCursor, distMinVassoura - distVassoura));
      this.velocidade.add(p5.Vector.mult(doCursor, Bolinha.FORCA_VASSOURA));
    }

    // sem gato atraido espera um tempo parada e seleciona o proximo
    // o mag() da o tamanho da velocidade, perto de 0 quer dizer q ela quase parou
    if (this.gatoAtraido === null) {
      this.framesEspera++;
      const parada = this.velocidade.mag() < 0.3;
      if (parada && this.framesEspera >= Bolinha.FRAMES_ESPERA) {
        this.selecionarGato();
      }
    }
  }

  liberarGato() {
    this.gatoAtraido = null;
    this.timerPerseguicao = 0;
    this.framesEspera = 0;
  }

  selecionarGato() {
    if (this.gatos.length === 0) return;
    // escolhe qualquer gato, inclusive os que ja sentaram no sofa
    const gato = this.gatos[floor(random(this.gatos.length))];
    this.gatoAtraido = gato;
    this.timerPerseguicao = 0;
    Bolinha.somSeleciona.tocar();
  }

  display() {
    noStroke();
    fill(Bolinha.cor);
    ellipse(this.posicao.x, this.posicao.y, this.raio * 2, this.raio * 2);

    // anel verde em volta da bolinha: encolhe conforme o tempo de espera passa
    if (this.gatoAtraido === null) {
      const progresso = 1 - this.framesEspera / Bolinha.FRAMES_ESPERA; // divide para obter a fração do tempo de espera (0 a 1) e inverte com 1- para o anel diminuir
      const diametro = (this.raio + 2) * 2;
      noFill();
      stroke(76, 175, 80, 240);
      strokeWeight(3);
      // arc(x, y, largura, altura, anguloInicio, anguloFim) desenha so um pedaco da borda do circulo
      // angulo em radianos, 0 é a direita e menos HALF_PI é o topo, comeco no topo e desenho
      // um pedaco igual a TWO_PI (volta inteira) vezes o progresso, ai o anel cheio é a espera
      // inteira e some aos poucos ate na hora de escolher outro gato
      arc(this.posicao.x, this.posicao.y, diametro, diametro, -HALF_PI, -HALF_PI + TWO_PI * progresso);
      noStroke();
    }
  }
}
