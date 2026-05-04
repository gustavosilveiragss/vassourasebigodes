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
    // atraindo gato muito tempo, desiste
    if (this.gatoAtraido !== null) {
      this.timerPerseguicao++;
      if (this.timerPerseguicao > 300) {
        this.liberarGato();
      }
    }

    this.velocidade.mult(0.985); // friccao baixa pra ficar slippery
    this.posicao.add(this.velocidade);

    // quica nas paredes, perde um pouco no impacto
    if (this.posicao.x < this.raio || this.posicao.x > LARGURA - this.raio) {
      this.velocidade.x *= -0.92;
      this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);
    }
    if (this.posicao.y < this.raio || this.posicao.y > ALTURA - this.raio) {
      this.velocidade.y *= -0.92;
      this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);
    }

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }

    // colisao com cada gato: empurra fora e quica
    for (const gato of this.gatos) {
      const deltaX = this.posicao.x - gato.posicao.x;
      const deltaY = this.posicao.y - gato.posicao.y;
      const distancia = sqrt(deltaX * deltaX + deltaY * deltaY);
      const distanciaMinima = this.raio + gato.raio;
      if (distancia < distanciaMinima && distancia > 0) {
        const normalX = deltaX / distancia;
        const normalY = deltaY / distancia;
        const sobreposicao = distanciaMinima - distancia;
        this.posicao.x += normalX * sobreposicao;
        this.posicao.y += normalY * sobreposicao;

        if (gato === this.gatoAtraido) {
          // gato atraido encostou, launch aleatorio
          const angulo = random(TWO_PI);
          this.velocidade = createVector(cos(angulo) * 5, sin(angulo) * 5);
          this.liberarGato();
        } else {
          // reflete a velocidade pelo eixo da normal e perde energia
          const projecao = this.velocidade.x * normalX + this.velocidade.y * normalY;
          this.velocidade.x -= 2 * projecao * normalX;
          this.velocidade.y -= 2 * projecao * normalY;
          this.velocidade.mult(0.85);
        }
      }
    }

    // vassoura empurra com forca proporcional a velocidade do mouse
    const distVassoura = dist(this.posicao.x, this.posicao.y, cursorX, cursorY);
    const distMinVassoura = this.raio + RAIOS.vassoura;
    if (distVassoura < distMinVassoura && distVassoura > 0) {
      const normalX = (this.posicao.x - cursorX) / distVassoura;
      const normalY = (this.posicao.y - cursorY) / distVassoura;
      const sobreposicao = distMinVassoura - distVassoura;
      this.posicao.x += normalX * sobreposicao;
      this.posicao.y += normalY * sobreposicao;

      const cursorAnteriorX = constrain(pmouseX / ESCALA, 0, LARGURA - 1);
      const cursorAnteriorY = constrain(pmouseY / ESCALA, 0, ALTURA - 1);
      const deltaCursorX = cursorX - cursorAnteriorX;
      const deltaCursorY = cursorY - cursorAnteriorY;
      const velocidadeMouse = sqrt(deltaCursorX * deltaCursorX + deltaCursorY * deltaCursorY);
      const forca = velocidadeMouse * 0.6 + 1.5;
      this.velocidade.x += normalX * forca;
      this.velocidade.y += normalY * forca;
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
  };

  display() {
    noStroke();
    fill(0, 60);
    ellipse(this.posicao.x, this.posicao.y + this.raio * 1.1, this.raio * 1.6, this.raio * 0.5);
    fill(CORES.bolinha);
    ellipse(this.posicao.x, this.posicao.y, this.raio * 2, this.raio * 2);
  }
}
