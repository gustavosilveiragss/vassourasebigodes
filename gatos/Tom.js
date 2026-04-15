class Tom extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom');
  }

  mover() {
    const distancia = dist(cursorX, cursorY, this.pos.x, this.pos.y);
    if (distancia < 70) return;
    const dir = createVector(cursorX - this.pos.x, cursorY - this.pos.y);
    dir.normalize();
    this.vel.add(p5.Vector.mult(dir, VEL.normal));
  }
}
