// a vassoura é o cursor. empurra os gatos com forca proporcional à velocidade do mouse
class Vassoura {
  /** @type {Som} */
  static somBate;
  /** @type {number} */
  static raio = 22;
  /** @type {string} */
  static cor = '#D4A84B';
  /** @type {string} */
  static corStroke = '#8B6914';

  static precarregar() {
    Vassoura.somBate = new Som(
      ['jogo/vassoura_bate_1.ogg', 'jogo/vassoura_bate_2.ogg'],
      0,
      0.6,
    );
  }

  constructor() {
    /** @type {Set<Gato>} contato no frame anterior, pra disparar som so na entrada */
    this.gatosEmContato = new Set();
  }

  /** @param {Gato[]} gatos */
  update(gatos) {
    // calcula quanto o mouse andou no ultimo frame, em coords logicas
    const cursorAnteriorX = constrain(pmouseX / ESCALA, 0, LARGURA - 1);
    const cursorAnteriorY = constrain(pmouseY / ESCALA, 0, ALTURA - 1);
    const dx = cursorX - cursorAnteriorX;
    const dy = cursorY - cursorAnteriorY;
    const velocidadeMouse = sqrt(dx * dx + dy * dy);

    const novos = new Set();

    for (let i = 0; i < gatos.length; i++) {
      const gato = gatos[i];
      if (gato.sentado) continue;

      const distancia = dist(cursorX, cursorY, gato.posicao.x, gato.posicao.y);
      if (distancia < Vassoura.raio + gato.raio) {
        novos.add(gato);

        // empurra no sentido oposto ao cursor
        const direcao = createVector(gato.posicao.x - cursorX, gato.posicao.y - cursorY);
        direcao.normalize();
        const forca = (velocidadeMouse * 0.4 + 0.5) * gato.friccao;
        gato.empurrar(direcao, forca);
        
        // som so no primeiro contato, evita spam quando gato fica preso no canto
        if (!this.gatosEmContato.has(gato)) {
          Vassoura.somBate.tocar();
          gato.miar();
        }
      }
    }

    this.gatosEmContato = novos;
  }

  display() {
    push(); // salva o estado de transformacoes e estilos
    translate(cursorX, cursorY);
    rotate(PI / 4);
    rectMode(CENTER);
    fill(Vassoura.cor);
    noStroke();
    rect(0, 0, 6, 38, 3);
    pop(); // volta o estado pra n afetar o que vem depois
  }
}
