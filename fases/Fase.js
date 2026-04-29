// classe base de toda fase. timer + gatos + obstaculos + sofa
class Fase extends Cena {
  /**
   * @param {number} numero
   * @param {Gato[]} gatos
   * @param {Obstaculo[]} obstaculos
   * @param {number} tempoSegundos
   * @param {number} tempoEscapeSegundos
   * @param {{x:number, y:number, largura:number, altura:number}} [sofa]
   */
  constructor(numero, gatos, obstaculos, tempoSegundos, tempoEscapeSegundos, sofa) {
    super();
    this.numero = numero;
    this.gatos = gatos;
    this.obstaculos = obstaculos;

    // p5 roda 60fps. converte segundos em frames
    this.timer = tempoSegundos * 60;
    this.tempoEscape = tempoEscapeSegundos * 60;

    this.sofa = sofa || SOFA;
    this.slotsOcupados = new Array(SLOTS.length).fill(null); // qual instancia de gato ta em qual slot
    this.vassoura = new Vassoura();
  }


  update() {
    this.timer--;

    if (this.timer <= 0) {
      trocarCena(new GameOver(this.numero));
      return;
    }

    // atualiza cada gato (timer de fuga + movimento/colisao)
    for (let i = 0; i < this.gatos.length; i++) {
      let gato = this.gatos[i];

      if (gato.sentado) {
        gato.timerSentado--;

        if (gato.timerSentado <= 0) {
          this.fazerEscapar(gato);
        }
      }

      gato.atualizar(this.obstaculos);
    }

    this.vassoura.atualizar(this.gatos); // colisao do cursor

    // checa quem chegou no sofa e ainda n sentou
    for (let i = 0; i < this.gatos.length; i++) {
      let gato = this.gatos[i];

      if (gato.noSofa(this.sofa) && !gato.sentado) {
        for (let j = 0; j < this.slotsOcupados.length; j++) {
          if (!this.slotsOcupados[j]) {
            this.slotsOcupados[j] = gato;
            gato.sentado = true;
            gato.slotX = SLOTS[j].x;
            gato.slotY = SLOTS[j].y;
            gato.timerSentado = this.tempoEscape;
            break;
          }
        }
      }
    }


    let todosSentados = true;
    for (let i = 0; i < this.gatos.length; i++) {
      if (!this.gatos[i].sentado) {
        todosSentados = false;
        break;
      }
    }

    if (todosSentados) {
      trocarCena(new VitoriaFase(this.numero + 1));
    }
  }

  // gato escapa do sofa: volta pra parte de cima da tela em posicao aleatoria
  /** @param {Gato} gato */
  fazerEscapar(gato) {
    gato.sentado = false;
    gato.x = random(100, LARGURA - 100);
    gato.y = random(80, 300);

    for (let j = 0; j < this.slotsOcupados.length; j++) {
      if (this.slotsOcupados[j] === gato) {
        this.slotsOcupados[j] = null;
        break;
      }
    }
  }

  display() {
    background(CORES.fundo);

    fill(CORES.sofa);
    noStroke();
    rect(this.sofa.x, this.sofa.y, this.sofa.largura, this.sofa.altura, 16);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(13);
    text('sofá', this.sofa.x + (this.sofa.largura / 2), this.sofa.y + 5 + (this.sofa.altura / 2));


    // desenha tudo: obstaculos primeiro pq gatos passam por cima
    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].display();
    }

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].display();
    }

    this.vassoura.display();

    // hud: numero da fase + segundos restantes
    let segundosRestantes = ceil(this.timer / 60);
    fill(CORES.texto);
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
