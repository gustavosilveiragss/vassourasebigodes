class Fase extends Cena {
  constructor(numero, gatos, obstaculos, bolinhas, tempoSegundos) {
    super();
    this.numero = numero;
    this.gatos = gatos;
    this.obstaculos = obstaculos;
    this.bolinhas = bolinhas;
    this.timer = tempoSegundos * 60;
    this.slotsOcupados = new Array(5).fill(null);
    this.vassoura = new Vassoura();
  }

  update() {
    this.timer--;

    if (this.timer <= 0) {
      trocarCena(new GameOver(this.numero));
      return;
    }

    this.vassoura.update(this.gatos);

    for (let bolinha of this.bolinhas) {
      bolinha.update(this.obstaculos);
    }

    for (let i = 0; i < this.gatos.length; i++) {
      this.gatos[i].update(this.bolinhas, this.obstaculos);
    }

    for (let i = 0; i < this.gatos.length; i++) {
      for (let j = i + 1; j < this.gatos.length; j++) {
        const gatoA = this.gatos[i];
        const gatoB = this.gatos[j];
        if (gatoA.sentado || gatoB.sentado) continue;
        const delta = p5.Vector.sub(gatoB.posicao, gatoA.posicao);
        const distancia = delta.mag();
        const minimo = gatoA.raio + gatoB.raio;
        if (distancia < minimo && distancia > 0) {
          delta.setMag((minimo - distancia) * 0.5);
          gatoA.posicao.sub(delta);
          gatoB.posicao.add(delta);
        }
      }
    }

    for (let i = 0; i < this.slotsOcupados.length; i++) {
      if (this.slotsOcupados[i] && !this.slotsOcupados[i].sentado) {
        this.slotsOcupados[i] = null;
      }
    }

    for (let gato of this.gatos) {
      let alvoDeBolinha = false;
      for (let bolinha of this.bolinhas) {
        if (bolinha.gatoAtraido === gato) {
          alvoDeBolinha = true;
          break;
        }
      }

      if (gato.noSofa() && !gato.sentado && !alvoDeBolinha) {
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
      trocarCena(new VitoriaFase(this.numero + 1));
    }
  }

  display() {
    background(CORES.fundo);

    fill(CORES.sofa);
    noStroke();
    rect(SOFA.x, SOFA.y, SOFA.largura, SOFA.altura, 16);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(13);
    text('sofá', SOFA.x + (SOFA.largura / 2), SOFA.y + (SOFA.altura / 2) + 5);

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

    const segundosRestantes = ceil(this.timer / 60);
    fill(CORES.texto);
    textAlign(LEFT);
    textSize(18);
    text('Fase ' + this.numero, 16, 30);
    textAlign(RIGHT);
    text(segundosRestantes + 's', LARGURA - 16, 30);
  }

  aoApertarTecla(tecla) {
    if (tecla === 80 || tecla === 27) {
      trocarCena(new Pausa(this));
    }
  }
}
