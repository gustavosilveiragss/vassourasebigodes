class Vassoura {
  update(gatos) {
    const anteriorCursorX = constrain(pmouseX, 0, LARGURA - 1);
    const anteriorCursorY = constrain(pmouseY, 0, ALTURA - 1);
    const velMouse = createVector(cursorX - anteriorCursorX, cursorY - anteriorCursorY);

    for (let i = 0; i < gatos.length; i++) {
      const gato = gatos[i];
      if (gato.preso) continue;
      const distancia = dist(cursorX, cursorY, gato.pos.x, gato.pos.y);

      if (distancia < RAIOS.vassoura + gato.raio) {
        const dir = createVector(gato.pos.x - cursorX, gato.pos.y - cursorY);
        dir.normalize();
        const forca = (velMouse.mag() * 0.4 + 0.5) * gato.resistencia;
        gato.empurrar(dir, forca);
      }
    }
  }

  display() {
    push();
    translate(cursorX + 4, cursorY + 4);
    rotate(PI / 4);
    rectMode(CENTER);
    fill(0, 0, 0, 30);
    noStroke();
    rect(0, 0, 6, 38, 3);
    pop();

    push();
    translate(cursorX, cursorY);
    rotate(PI / 4);
    rectMode(CENTER);
    fill(CORES.vassoura);
    stroke(CORES.vassouraStroke);
    strokeWeight(2);
    rect(0, 0, 6, 38, 3);
    pop();
  }
}
