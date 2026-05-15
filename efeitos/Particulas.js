// gerencia o array global de particulas
class Particulas {
  /** @type {Particula[]} */
  static lista = [];

  /** @type {number} limite global, descarta as mais antigas se passar */
  static LIMITE = 200;

  /** @type {string[]} cores dos gatos pra confete */
  static CORES_CONFETE = ['#E8A87C', '#C4956A', '#D4A5A5', '#6B8F71', '#D4A84B', '#E86B6B'];

  /** @param {Particula} particula */
  static adicionar(particula) {
    if (Particulas.lista.length >= Particulas.LIMITE) {
      Particulas.lista.shift();
    }
    Particulas.lista.push(particula);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} [quantidade]
   * @param {string} [cor]
   */
  static criarPo(x, y, quantidade = 6, cor = '#C4A882') {
    // gera particulas em direcoes aleatorias, pra parecer um "poeira subindo"
    for (let i = 0; i < quantidade; i++) {
      const angulo = random(TWO_PI);
      const intensidade = random(0.5, 1.8);
      Particulas.adicionar(new Particula({
        x: x,
        y: y,
        velocidadeX: cos(angulo) * intensidade,
        velocidadeY: sin(angulo) * intensidade,
        vida: floor(random(20, 35)),
        cor: cor,
        tamanho: random(3, 6),
        tipo: 'po',
      }));
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} quantidade
   * @param {string} cor
   * @param {number} [direcaoX]
   * @param {number} [direcaoY]
   */
  static criarPelo(x, y, quantidade, cor, direcaoX = 0, direcaoY = 0) {
    // gera particulas em direcoes aleatorias,
    // mas na direcao oposta ao da vassoura, pra parecer pelos voando
    for (let i = 0; i < quantidade; i++) {
      const angulo = random(TWO_PI);
      const intensidade = random(1, 2.5);
      Particulas.adicionar(new Particula({
        x: x,
        y: y,
        velocidadeX: cos(angulo) * intensidade + direcaoX * 0.5,
        velocidadeY: sin(angulo) * intensidade + direcaoY * 0.5,
        vida: floor(random(25, 40)),
        cor: cor,
        tamanho: random(2.5, 4.5),
        tipo: 'pelo',
        rotacao: random(TWO_PI),
        velocidadeRotacao: random(-0.15, 0.15),
      }));
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} [quantidade]
   */
  static criarConfete(x, y, quantidade = 30) {
    // gera particulas em direcoes aleatorias, pra parecer confete explodindo
    for (let i = 0; i < quantidade; i++) {
      const angulo = random(-PI, 0);
      const intensidade = random(3, 6);
      const cor = Particulas.CORES_CONFETE[floor(random(Particulas.CORES_CONFETE.length))];
      Particulas.adicionar(new Particula({
        x: x,
        y: y,
        velocidadeX: cos(angulo) * intensidade,
        velocidadeY: sin(angulo) * intensidade,
        vida: floor(random(60, 100)),
        cor: cor,
        tamanho: random(6, 10),
        tipo: 'confete',
        rotacao: random(TWO_PI),
        velocidadeRotacao: random(-0.25, 0.25),
        gravidade: 0.18,
      }));
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {string} [cor]
   */
  static criarBrilho(x, y, cor = '#FFE5A5') {
    Particulas.adicionar(new Particula({
      x: x,
      y: y,
      velocidadeX: 0,
      velocidadeY: 0,
      vida: 24,
      cor: cor,
      tamanho: 12,
      tipo: 'brilho',
    }));
  }

  static atualizar() {
    for (let i = Particulas.lista.length - 1; i >= 0; i--) {
      const particula = Particulas.lista[i];
      particula.update();
      if (particula.vida <= 0) {
        Particulas.lista.splice(i, 1);
      }
    }
  }

  static desenhar() {
    for (let i = 0; i < Particulas.lista.length; i++) {
      Particulas.lista[i].display();
    }
  }
}
