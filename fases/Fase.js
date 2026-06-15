// classe base de toda fase. timer + gatos + obstaculos + bolinhas + sofa
class Fase extends Cena {
  /** @type {Som} */
  static somSentou;

  /** @type {{x:number, y:number, largura:number, altura:number}} */
  static SOFA_PADRAO = { x: 300, y: 490, largura: 300, altura: 90 };

  /** @type {{x:number, y:number, largura:number, altura:number}} */
  static SOFA_GRANDE = { x: 225, y: 450, largura: 450, altura: 130 };

  /** @type {{x:number, y:number}[]} posicoes onde os gatos sentam no sofa */
  static SLOTS = [
    { x: 330, y: 525 },
    { x: 390, y: 525 },
    { x: 450, y: 525 },
    { x: 510, y: 525 },
    { x: 570, y: 525 },
  ];

  /** @type {string} */
  static corSofa = 'rgba(168, 216, 168, 0.47)';

  static precarregar() {
    Fase.somSentou = new Som(['jogo/sentou_sofa.ogg'], 0, 0.7);
  }

  /**
   * @param {number} numero
   * @param {Gato[]} gatos
   * @param {Obstaculo[]} obstaculos
   * @param {Bolinha[]} bolinhas
   * @param {number} tempoSegundos
   * @param {{x:number, y:number, largura:number, altura:number}} [sofa]
   */
  constructor(numero, gatos, obstaculos, bolinhas, tempoSegundos, sofa) {
    super();
    this.numero = numero;
    this.gatos = gatos;
    this.obstaculos = obstaculos;
    this.bolinhas = bolinhas;
    this.timer = tempoSegundos * 60;
    this.sofa = sofa || Fase.SOFA_PADRAO;
    this.slotsOcupados = new Array(5).fill(null); // qual instancia de gato ta em qual slot do sofa
    this.vassoura = new Vassoura();
    /** @type {boolean} trava update apos disparar transicao */
    this.transicionando = false;
  }

  update() {
    if (this.transicionando) return;

    this.timer--;

    if (this.timer <= 0) {
      this.transicionando = true;
      trocarCena(new GameOver(this.numero));
      return;
    }

    this.vassoura.update(this.gatos); // colisao do cursor com os gatos

    for (let bolinha of this.bolinhas) {
      bolinha.update(this.obstaculos);
    }

    // atualiza cada gato (movimento + colisao)
    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].update(this.bolinhas, this.obstaculos);
    }

    // colisao entre gatos: separa cada par que ta sobreposto. Itera pegando cada par uma vez so
    for (let i = 0; i < this.gatos.length; i++) {
      for (let j = i + 1; j < this.gatos.length; j++) {
        const gatoA = this.gatos[i];
        const gatoB = this.gatos[j];

        if (gatoA.sentado || gatoB.sentado) continue;

        // delta é o vetor do gato A ate o gato B, o mag() é o tamanho dele q é a distancia entre os dois
        const delta = p5.Vector.sub(gatoB.posicao, gatoA.posicao);
        const distancia = delta.mag();
        const minimo = gatoA.raio + gatoB.raio;

        if (distancia < minimo && distancia > 0) {
          // estao sobrepostos, cada um anda metade do que falta em sentidos opostos
          // setMag deixa o vetor com esse tamanho mantendo a direcao de A pra B
          delta.setMag((minimo - distancia) * 0.5);
          gatoA.posicao.sub(delta);
          gatoB.posicao.add(delta);
        }
      }
    }

    // libera slot dos gatos que sairam do sofa (atraidos pela bolinha)
    for (let i = 0; i < this.slotsOcupados.length; i++) {
      if (this.slotsOcupados[i] && !this.slotsOcupados[i].sentado) {
        this.slotsOcupados[i] = null;
      }
    }

    // checa quem chegou no sofa e ainda n sentou
    for (let gato of this.gatos) {
      // se a bolinha ta atraindo o gato, n deixa sentar
      let alvoDeBolinha = false;
      for (let bolinha of this.bolinhas) {
        if (bolinha.gatoAtraido === gato) {
          alvoDeBolinha = true;
          break;
        }
      }

      if (gato.noSofa(this.sofa) && !gato.sentado && !alvoDeBolinha) {
        // pega o primeiro slot livre
        for (let i = 0; i < this.slotsOcupados.length; i++) {
          if (!this.slotsOcupados[i]) {
            this.slotsOcupados[i] = gato;
            gato.sentado = true;
            gato.posicaoAlvo = Fase.SLOTS[i];
            Fase.somSentou.tocar();
            break;
          }
        }
      }
    }

    let todosSentados = true;
    for (let gato of this.gatos) {
      if (!gato.sentado) {
        todosSentados = false;
        break;
      }
    }

    if (todosSentados) {
      this.transicionando = true;
      trocarCena(new VitoriaFase(this.numero, this.timer));
    }
  }

  display() {
    background(Tema.fundo);

    fill(Fase.corSofa);
    noStroke();
    rect(this.sofa.x, this.sofa.y, this.sofa.largura, this.sofa.altura, 16);

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(13);
    text('sofá', this.sofa.x + this.sofa.largura / 2, this.sofa.y + this.sofa.altura / 2 + 5);

    // desenha tudo: obstaculos primeiro pq gatos passam por cima
    for (let obstaculo of this.obstaculos) {
      obstaculo.display();
    }

    for (let bolinha of this.bolinhas) {
      bolinha.display();
    }

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].display();
    }

    this.vassoura.display();

    // hud: numero da fase + segundos restantes
    const segundosRestantes = ceil(this.timer / 60);
    fill(Tema.texto);
    textAlign(LEFT);
    textSize(18);
    text('Fase ' + this.numero, 16, 30);
    textAlign(RIGHT);
    text(segundosRestantes + 's', LARGURA - 16, 30);
  }

  /** @param {number} tecla */
  aoApertarTecla(tecla) {
    // P ou esc abre pausa
    if (tecla === 80 || tecla === 27) {
      trocarCena(new Pausa(this));
    }
  }
}
