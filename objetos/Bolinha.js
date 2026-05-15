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

  static precarregar() {
    Bolinha.somQuica = new Som(
      ['jogo/bolinha_quica_1.ogg', 'jogo/bolinha_quica_2.ogg'],
      0,
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
    this.timer = -360; // negativo = espera antes de atrair o proximo gato
    this.timerPerseguicao = 0;
    /** @type {Set<Gato>} contato no frame anterior, dispara som so na entrada */
    this.gatosEmContato = new Set();
    /** @type {boolean} */
    this.tocandoParedeX = false;
    /** @type {boolean} */
    this.tocandoParedeY = false;
    /** @type {number} cooldown em frames pra n spammar po contra obstaculo */
    this.cooldownPoObstaculo = 0;
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
    const fatorPerda = -0.9;
    const naParedeX = this.posicao.x < this.raio || this.posicao.x > LARGURA - this.raio;
    if (naParedeX) {
      this.velocidade.x *= fatorPerda;
      this.posicao.x = constrain(this.posicao.x, this.raio, LARGURA - this.raio);

      // som so no primeiro contato, evita spam quando fica quicando no canto
      if (!this.tocandoParedeX && abs(this.velocidade.x) > 0.5) {
        Bolinha.somQuica.tocar();
        Particulas.criarPo(this.posicao.x, this.posicao.y, 4);
      }
    }
    this.tocandoParedeX = naParedeX;

    const naParedeY = this.posicao.y < this.raio || this.posicao.y > ALTURA - this.raio;
    if (naParedeY) {
      this.velocidade.y *= fatorPerda;
      this.posicao.y = constrain(this.posicao.y, this.raio, ALTURA - this.raio);

      // som so no primeiro contato, evita spam quando fica quicando no canto
      if (!this.tocandoParedeY && abs(this.velocidade.y) > 0.5) {
        Bolinha.somQuica.tocar();
        Particulas.criarPo(this.posicao.x, this.posicao.y, 4);
      }
    }
    this.tocandoParedeY = naParedeY;

    if (this.cooldownPoObstaculo > 0) {
      this.cooldownPoObstaculo--;
    }

    let colidiu = false;
    for (let obstaculo of obstaculos) {
      if (obstaculo.resolverColisao(this)) {
        colidiu = true;
      }
    }

    // emite po so de tempos em tempos, mesmo se ficar quicando contra a parede
    if (colidiu && this.cooldownPoObstaculo === 0) {
      Particulas.criarPo(this.posicao.x, this.posicao.y, 4);
      this.cooldownPoObstaculo = 30;
    }

    // colisao com cada gato: empurra fora e quica
    const novosContatos = new Set();
    for (const gato of this.gatos) {
      const deltaX = this.posicao.x - gato.posicao.x;
      const deltaY = this.posicao.y - gato.posicao.y;
      const distancia = sqrt(deltaX * deltaX + deltaY * deltaY);
      const distanciaMinima = this.raio + gato.raio;

      if (distancia < distanciaMinima && distancia > 0) {
        novosContatos.add(gato);

        const novoContato = !this.gatosEmContato.has(gato);

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

          if (novoContato) {
            Bolinha.somQuica.tocar();
            Particulas.criarPo(this.posicao.x, this.posicao.y, 4);
            Particulas.criarPelo(this.posicao.x, this.posicao.y, 2, gato.cor);
          }

          continue;
        }

        // reflete a velocidade pelo eixo da normal e perde energia
        const projecao = this.velocidade.x * normalX + this.velocidade.y * normalY;
        this.velocidade.x -= 2 * projecao * normalX;
        this.velocidade.y -= 2 * projecao * normalY;
        this.velocidade.mult(0.85);

        if (novoContato) {
          Bolinha.somQuica.tocar();
          Particulas.criarPo(this.posicao.x, this.posicao.y, 3);
        }
      }
    }
    this.gatosEmContato = novosContatos;

    // vassoura empurra com forca proporcional a velocidade do mouse
    const distVassoura = dist(this.posicao.x, this.posicao.y, cursorX, cursorY);
    const distMinVassoura = this.raio + Vassoura.raio;
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
      const forca = velocidadeMouse * 0.25 + 0.6;
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

  selecionarGato() {
    if (this.gatos.length === 0) return;
    // escolhe qualquer gato, inclusive os que ja sentaram no sofa
    const gato = this.gatos[floor(random(this.gatos.length))];
    this.gatoAtraido = gato;
    this.timer = 0;
    this.timerPerseguicao = 0;
    Bolinha.somSeleciona.tocar();
    Particulas.criarBrilho(this.posicao.x, this.posicao.y);
  }

  display() {
    // sombra embaixo da bolinha
    noStroke();
    fill(0, 60);
    ellipse(this.posicao.x, this.posicao.y + this.raio * 1.1, this.raio * 1.6, this.raio * 0.5);

    fill(Bolinha.cor);
    ellipse(this.posicao.x, this.posicao.y, this.raio * 2, this.raio * 2);

    // arco verde diminui ate sumir quando ela vai escolher o proximo gato
    // anel cheio enquanto ta atraindo um gato
    const diametro = (this.raio + 2) * 2;
    noFill();
    stroke(76, 175, 80, 240);
    strokeWeight(3);
    
    if (this.timer < 0) {
      const progresso = -this.timer / 360;
      // comeca no topo (-HALF_PI) e varre o circulo todo (TWO_PI) proporcional ao progresso
      arc(this.posicao.x, this.posicao.y, diametro, diametro, -HALF_PI, -HALF_PI + TWO_PI * progresso);
    }

    noStroke();
  }
}
