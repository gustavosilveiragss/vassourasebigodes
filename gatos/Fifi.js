class Fifi extends Gato {
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.fifi, 'Fifi');
    this.movendo = false;
    this.frames = 0;
    this.duracaoAtual = 120;
    this.dirAtual = 0;
  }

  calcDir() {
    const anguloBase = atan2(this.pos.y - cursorY, this.pos.x - cursorX);
    return anguloBase + random(-PI / 3, PI / 3);
  }

  mover() {
    this.frames++;
    const distanciaMouse = dist(cursorX, cursorY, this.pos.x, this.pos.y);

    if (this.frames >= this.duracaoAtual) {
      this.movendo = !this.movendo;
      this.frames = 0;
      if (this.movendo) {
        this.dirAtual = this.calcDir();
        this.duracaoAtual = floor(random(40, 60));
      } else {
        this.duracaoAtual = floor(random(100, 140));
      }
    }

    if (!this.movendo && distanciaMouse < 130) {
      this.movendo = true;
      this.frames = 0;
      this.dirAtual = this.calcDir();
      this.duracaoAtual = 180;
    }

    if (this.movendo) {
      const dir = createVector(cos(this.dirAtual), sin(this.dirAtual));
      this.vel.add(p5.Vector.mult(dir, VEL.rapido));
    }
  }
}
