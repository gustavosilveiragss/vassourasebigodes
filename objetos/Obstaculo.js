class Obstaculo {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  resolverColisao(obj) {
    const proximoX = constrain(obj.pos.x, this.x, this.x + this.w);
    const proximoY = constrain(obj.pos.y, this.y, this.y + this.h);
    const distancia = dist(obj.pos.x, obj.pos.y, proximoX, proximoY);

    if (distancia < obj.raio) {
      if (distancia === 0) {
        obj.pos.x = this.x - obj.raio - 1;
        obj.vel.set(0, 0);
        return;
      }
      const dir = createVector(obj.pos.x - proximoX, obj.pos.y - proximoY);
      dir.normalize();
      obj.pos.x = proximoX + dir.x * (obj.raio + 1);
      obj.pos.y = proximoY + dir.y * (obj.raio + 1);

      const projecao = obj.vel.dot(dir);
      obj.vel.x -= 2 * projecao * dir.x;
      obj.vel.y -= 2 * projecao * dir.y;
      obj.vel.mult(0.5);
    }
  }

  display() {
    fill(CORES.obstaculo);
    noStroke();
    rect(this.x, this.y, this.w, this.h, 8);
  }
}
