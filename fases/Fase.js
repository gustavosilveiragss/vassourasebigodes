class Fase extends Cena {
  constructor(numero, gatos, obstaculos, bolinhas, tempoSeg) {
    super();
    this.numero = numero;
    this.gatos = gatos;
    this.obstaculos = obstaculos;
    this.bolinhas = bolinhas;
    this.timer = tempoSeg * 60;
    this.slotsOcupados = [null, null, null, null, null];
    this.vassoura = new Vassoura();
    this.tutorialFrames = 0;
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
        const distancia = dist(gatoA.pos.x, gatoA.pos.y, gatoB.pos.x, gatoB.pos.y);
        const minDist = gatoA.raio + gatoB.raio;
        if (distancia < minDist && distancia > 0) {
          const normX = (gatoB.pos.x - gatoA.pos.x) / distancia;
          const normY = (gatoB.pos.y - gatoA.pos.y) / distancia;
          const overlap = minDist - distancia;
          if (!gatoA.preso && !gatoB.preso) {
            const halfOverlap = overlap * 0.5;
            gatoA.pos.x -= normX * halfOverlap;
            gatoA.pos.y -= normY * halfOverlap;
            gatoB.pos.x += normX * halfOverlap;
            gatoB.pos.y += normY * halfOverlap;
          } else if (!gatoA.preso) {
            gatoA.pos.x -= normX * overlap;
            gatoA.pos.y -= normY * overlap;
          } else if (!gatoB.preso) {
            gatoB.pos.x += normX * overlap;
            gatoB.pos.y += normY * overlap;
          }
        }
      }
    }

    for (let i = 0; i < this.slotsOcupados.length; i++) {
      if (this.slotsOcupados[i] && !this.slotsOcupados[i].preso) {
        this.slotsOcupados[i] = null;
      }
    }

    for (let gato of this.gatos) {
      if (gato.naSofa() && !gato.preso && !gato.atraido) {
        for (let i = 0; i < this.slotsOcupados.length; i++) {
          if (!this.slotsOcupados[i]) {
            this.slotsOcupados[i] = gato;
            gato.preso = true;
            gato.alvoPos = SLOTS[i];
            break;
          }
        }
      }
    }

    let todosPresos = true;
    for (let gato of this.gatos) {
      if (!gato.preso) {
        todosPresos = false;
        break;
      }
    }
    if (todosPresos) {
      trocarCena(new VitoriaFase(this.numero + 1));
    }

    if (this.numero === 1) {
      this.tutorialFrames++;
    }
  }

  display() {
    background(CORES.fundo);

    fill(CORES.sofa);
    noStroke();
    rect(SOFA.x, SOFA.y, SOFA.w, SOFA.h, 16);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(13);
    text('sofá', SOFA.x + SOFA.w / 2, SOFA.y + SOFA.h / 2 + 5);

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

    if (this.numero === 1 && this.tutorialFrames < 300) {
      fill(0, 0, 0, 100);
      noStroke();
      rect(0, ALTURA / 2 - 20, LARGURA, 36);
      fill(255);
      textAlign(CENTER);
      textSize(16);
      text('Use o mouse para empurrar Tom para o sofá!', LARGURA / 2, ALTURA / 2 + 3);
    }
  }

  aoApertarTecla(tecla) {
    if (tecla === 80 || tecla === 27) {
      trocarCena(new Pausa(this));
    }
  }
}
