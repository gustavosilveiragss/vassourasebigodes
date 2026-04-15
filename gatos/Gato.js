class Gato {
  constructor(x, y, raio, cor, nome) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.raio = raio;
    this.cor = cor;
    this.nome = nome;
    this.sprite = null;
    this.som = null;
    this.atraido = false;
    this.preso = false;
    this.alvoPos = null;
    this.stun = 0;
    this.resistencia = 1.0;
    this.friccao = 0.82;
  }

  update(bolinhas, obstaculos) {
    if (this.stun > 0) {
      this.stun--;
    }

    let minhaBolinha = null;
    for (let bolinha of bolinhas) {
      if (bolinha.gatoAtraido === this) {
        minhaBolinha = bolinha;
        break;
      }
    }

    if (this.preso) {
      if (minhaBolinha) {
        this.preso = false;
      } else {
        this.pos.x += (this.alvoPos.x - this.pos.x) * 0.15;
        this.pos.y += (this.alvoPos.y - this.pos.y) * 0.15;
        this.vel.set(0, 0);
        return;
      }
    }

    if (minhaBolinha) {
      const dir = p5.Vector.sub(minhaBolinha.pos, this.pos);
      dir.normalize();
      this.vel.add(p5.Vector.mult(dir, VEL.normal * 1.5));
    } else if (this.stun === 0) {
      this.mover();
    }

    this.vel.mult(this.friccao);
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, this.raio, LARGURA - this.raio);
    this.pos.y = constrain(this.pos.y, this.raio, ALTURA - this.raio);

    for (let obstaculo of obstaculos) {
      obstaculo.resolverColisao(this);
    }
  }

  mover() {}

  empurrar(dir, forca) {
    this.vel.add(p5.Vector.mult(dir, forca));
  }

  naSofa() {
    return (
      this.pos.x > (SOFA.x + this.raio) &&
      this.pos.x < (SOFA.x + SOFA.w - this.raio) &&
      this.pos.y > (SOFA.y + this.raio) &&
      this.pos.y < (SOFA.y + SOFA.h - this.raio)
    );
  }

  display() {
    if (this.sprite) {
      imageMode(CENTER);
      image(this.sprite, this.pos.x, this.pos.y, this.raio * 2.2, this.raio * 2);
    } else {
      fill(this.cor);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.raio * 2.2, this.raio * 2);
    }

    fill(CORES.texto);
    noStroke();
    textAlign(CENTER);
    textSize(12);
    text(this.nome, this.pos.x, this.pos.y + this.raio + 14);
  }
}
