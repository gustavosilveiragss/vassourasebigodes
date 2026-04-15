class Salem extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem');
    this.cooldown = 0;
    this.resistencia = 0.55;
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    const distancia = dist(cursorX, cursorY, this.pos.x, this.pos.y);
    if (distancia < 120) {
      const dir = createVector(this.pos.x - cursorX, this.pos.y - cursorY);
      dir.normalize();
      this.pos.x += dir.x * 90;
      this.pos.y += dir.y * 90;
      this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio);
      this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio);
      this.vel.set(0, 0);
      this.cooldown = 45;
    }
  }
}
