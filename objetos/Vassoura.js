class Vassoura {
  update(gatos) {
    const cursorAnteriorX = constrain(pmouseX, 0, LARGURA - 1);
    const cursorAnteriorY = constrain(pmouseY, 0, ALTURA - 1);
    const dx = cursorX - cursorAnteriorX;
    const dy = cursorY - cursorAnteriorY;
    const velocidadeMouse = sqrt(dx * dx + dy * dy);

    for (let i = 0; i < gatos.length; i++) {
      const gato = gatos[i];
      if (gato.sentado) continue;

      const distancia = dist(cursorX, cursorY, gato.posicao.x, gato.posicao.y);
      if (distancia < RAIOS.vassoura + gato.raio) {
        const direcao = createVector(gato.posicao.x - cursorX, gato.posicao.y - cursorY);
        direcao.normalize();
        const forca = ((velocidadeMouse * 0.4) + 0.5) * gato.friccao;
        gato.empurrar(direcao, forca);
      }
    }
  }

  display() {
    push();
    translate(cursorX, cursorY);
    rotate(PI / 4);
    rectMode(CENTER);
    fill(CORES.vassoura);
    noStroke();
    rect(0, 0, 6, 38, 3);
    pop();
  }
}
