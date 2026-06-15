// a vassoura é o cursor. empurra os gatos pra longe com forca fixa
class Vassoura {
  /** @type {Som} */
  static somBate;
  /** @type {number} */
  static raio = 22;
  /** @type {string} */
  static cor = '#D4A84B';
  /** @type {number} forca do empurrao */
  static FORCA = 5;

  static precarregar() {
    Vassoura.somBate = new Som(
      ['jogo/vassoura_bate_1.ogg', 'jogo/vassoura_bate_2.ogg'],
      8,
      0.6,
    );
  }

  /** @param {Gato[]} gatos */
  update(gatos) {
    const cursor = createVector(cursorX, cursorY);

    for (let i = 0; i < gatos.length; i++) {
      const gato = gatos[i];
      if (gato.sentado) continue;

      // aoGato é o vetor do cursor ate o gato, o mag() é o tamanho dele q é a distancia
      // se for menor q a soma dos raios a vassoura encostou no gato
      const aoGato = p5.Vector.sub(gato.posicao, cursor);
      if (aoGato.mag() < Vassoura.raio + gato.raio) {
        // normalize deixa o vetor com tamanho 1 so a direcao pra longe do cursor
        // o tamanho do empurrao quem da é a FORCA nao a distancia
        aoGato.normalize();
        gato.empurrar(aoGato, Vassoura.FORCA * gato.friccao);

        Vassoura.somBate.tocar();
        gato.miar();
      }
    }
  }

  display() {
    push();
      translate(cursorX, cursorY);
      rotate(PI / 4);
      rectMode(CENTER);
      fill(Vassoura.cor);
      noStroke();
      rect(0, 0, 6, 38, 3);
    pop();
  }
}
