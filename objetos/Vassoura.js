class Vassoura {
  update(gatos) {
    const cursorAnteriorX = constrain(pmouseX, 0, LARGURA - 1);
    const cursorAnteriorY = constrain(pmouseY, 0, ALTURA - 1);
    const velocidadeMouse = createVector(cursorX - cursorAnteriorX, cursorY - cursorAnteriorY);

    for (let i = 0; i < gatos.length; i++) {
      const gato = gatos[i];
      if (gato.sentado) continue;
      const distancia = dist(cursorX, cursorY, gato.posicao.x, gato.posicao.y);

      if (distancia < RAIOS.vassoura + gato.raio) {
        const direcao = createVector(gato.posicao.x - cursorX, gato.posicao.y - cursorY);
        direcao.normalize();
        const forca = ((velocidadeMouse.mag() * 0.4) + 0.5) * gato.friccao;
        gato.empurrarVassoura(direcao, forca);
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
