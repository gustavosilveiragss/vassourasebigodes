// bolinha que para, escolhe um gato pra atrair, quica e repete
class Bolinha {
  /**
   * @param {number} x
   * @param {number} y
   * @param {Gato[]} gatos
   */
  constructor(x, y, gatos) {
    this.posicao = createVector(x, y);
    this.velocidade = createVector(0, 0);
    this.raio = RAIOS.bolinha;
    this.gatos = gatos;
    this.gatoAtraido = null;
    this.timer = -360; // negativo = espera antes de atrair o proximo gato
    this.timerPerseguicao = 0;
  }

  /** @param {Obstaculo[]} obstaculos */
  update(obstaculos) {
    // atraindo gato? espera ele encostar ou desistir
    if (this.gatoAtraido !== null) {
      this.timerPerseguicao++;
      const distancia = dist(this.posicao.x, this.posicao.y, this.gatoAtraido.posicao.x, this.gatoAtraido.posicao.y);

      if (distancia < this.raio + this.gatoAtraido.raio) {
        // gato encostou: bolinha vai em direcao aleatoria
        const angulo = random(TWO_PI);
        this.velocidade = createVector(cos(angulo) * 5, sin(angulo) * 5);
        this.liberarGato();
      } else if (this.timerPerseguicao > 300) {
        // gato n veio em 5s desiste
        this.liberarGato();
      }
    }

    this.velocidade.mult(0.97); // imitar friccao do chao
    this.posicao.add(this.velocidade);

    // quica nas "paredes"
    if (this.posicao.x < this.raio || this.posicao.x > LARGURA - this.raio) {
      this.velocidade.x *= -1;
      this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    }
    if (this.posicao.y < this.raio || this.posicao.y > ALTURA - this.raio) {
      this.velocidade.y *= -1;
      this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);
    }

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }

    // sem gato atraido conta o cooldown e seleciona novo quando estiver parada
    if (this.gatoAtraido === null) {
      this.timer++;
      const parada = this.velocidade.mag() < 0.3;
      if (parada && this.timer > 0) {
        this.selecionarGato();
      }
    }
  }

  liberarGato() {
    this.gatoAtraido = null;
    this.timerPerseguicao = 0;
    this.timer = -360;
  }

  selecionarGato = () => {
    if (this.gatos.length === 0) return;
    // escolhe qualquer gato, inclusive os que ja sentaram no sofa
    const gato = this.gatos[floor(random(this.gatos.length))];
    this.gatoAtraido = gato;
    this.timer = 0;
    this.timerPerseguicao = 0;
  }

  display() {
    noStroke();
    fill(CORES.bolinha);
    ellipse(this.posicao.x, this.posicao.y, this.raio * 2, this.raio * 2);
  }
}
