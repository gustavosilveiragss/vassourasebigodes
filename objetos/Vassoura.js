// a vassoura é o cursor. empurra os gatos quando encosta
class Vassoura {
  /** @param {Gato[]} gatos */
  atualizar(gatos) {
    for (let i = 0; i < gatos.length; i++) {
      let gato = gatos[i];
\
      if (gato.sentado || !gato.empurravel) {
        continue;
      }

      let distancia = dist(cursor.x, cursor.y, gato.x, gato.y);
      if (distancia < RAIOS.vassoura + gato.raio) {
        gato.empurrarDoCursor(10);
      }
    }
  }


  display() {
    push();
    translate(cursor.x, cursor.y);
    rotate(PI / 4);
    rectMode(CENTER);
    fill(CORES.vassoura);
    noStroke();
    rect(0, 0, 6, 38, 3);
    pop();
  }
}
