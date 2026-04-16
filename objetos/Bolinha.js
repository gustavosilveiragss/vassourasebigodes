class Bolinha {
  constructor(x, y, gatos) {
    this.posicao = createVector(x, y);
    this.velocidade = createVector(0, 0);
    this.raio = RAIOS.bolinha;
    this.gatos = gatos;
    this.gatoAtraido = null;
    this.timer = -360;
    this.timerPerseguicao = 0;
  }

  update(obstaculos) {
    if (this.gatoAtraido !== null) {
      this.timerPerseguicao++;
      const distancia = dist(this.posicao.x, this.posicao.y, this.gatoAtraido.posicao.x, this.gatoAtraido.posicao.y);

      if (distancia < this.raio + this.gatoAtraido.raio) {
        const angulo = random(TWO_PI);
        this.velocidade = createVector(cos(angulo) * 5, sin(angulo) * 5);
        this.liberarGato();
      } else if (this.timerPerseguicao > 300) {
        this.liberarGato();
      }
    }

    this.velocidade.mult(0.97);
    this.posicao.add(this.velocidade);

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
