class Bolinha {
  constructor(x, y, gatos) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.raio = RAIOS.bolinha;
    this.gatos = gatos;
    this.gatoAtraido = null;
    this.timer = 60;
    this.timerPerseguicao = 0;
  }

  update(obstaculos) {
    if (this.gatoAtraido !== null) {
      this.timerPerseguicao++;
      const distancia = dist(this.pos.x, this.pos.y, this.gatoAtraido.pos.x, this.gatoAtraido.pos.y);

      if (distancia < this.raio + this.gatoAtraido.raio) {
        this.gatoAtraido.atraido = false;
        this.gatoAtraido = null;
        this.timerPerseguicao = 0;
        const angulo = random(TWO_PI);
        this.vel = createVector(cos(angulo) * 5, sin(angulo) * 5);
        this.timer = -180;
      } else if (this.timerPerseguicao > 600) {
        this.gatoAtraido.atraido = false;
        this.gatoAtraido = null;
        this.timerPerseguicao = 0;
        this.timer = -120;
      }
    }

    this.vel.mult(0.97);
    this.pos.add(this.vel);

    if (this.pos.x < this.raio || this.pos.x > LARGURA - this.raio) {
      this.vel.x *= -1;
      this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio);
    }
    if (this.pos.y < this.raio || this.pos.y > ALTURA - this.raio) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio);
    }

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }

    if (this.gatoAtraido === null) {
      this.timer++;
      const parada = this.vel.mag() < 0.3;
      if (parada && this.timer > 0) {
        this.selecionarGato();
      }
    }
  }

  selecionarGato() {
    if (this.gatos.length === 0) return;
    const gato = this.gatos[floor(random(this.gatos.length))];
    gato.atraido = true;
    this.gatoAtraido = gato;
    this.timer = 0;
    this.timerPerseguicao = 0;
  }

  display() {
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(this.pos.x + 4, this.pos.y + 4, this.raio * 2, this.raio * 2);

    fill(CORES.bolinha);
    ellipse(this.pos.x, this.pos.y, this.raio * 2, this.raio * 2);
  }
}
