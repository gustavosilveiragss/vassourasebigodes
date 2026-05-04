// classe base de toda fase. timer + gatos + obstaculos + bolinhas + sofa
class Fase extends Cena {
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
    this.sofa = sofa || SOFA;
    this.slotsOcupados = new Array(5).fill(null); // qual instancia de gato ta em qual slot do sofa
    this.vassoura = new Vassoura();
  }

  update() {
    this.timer--;

    if (this.timer <= 0) {
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

    // colisao entre gatos: separa cada par que ta sobreposto
    for (let i = 0; i < this.gatos.length; i++) {
      for (let j = i + 1; j < this.gatos.length; j++) {
        const gatoA = this.gatos[i];
        const gatoB = this.gatos[j];
        if (gatoA.sentado || gatoB.sentado) continue;
        const delta = p5.Vector.sub(gatoB.posicao, gatoA.posicao);
        const distancia = delta.mag();
        const minimo = gatoA.raio + gatoB.raio;
        if (distancia < minimo && distancia > 0) {
          // empurra cada um pra metade da sobreposicao
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
            gato.posicaoAlvo = SLOTS[i];
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
      trocarCena(new VitoriaFase(this.numero, this.timer));
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
