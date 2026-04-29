// salem foge: pula longe se o cursor chega perto
class Salem extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.salem, 'Salem');
    this.cooldown = 0; // tempo de descanso entre pulos
    this.empurravel = false; // vassoura n empurra ele
  }

  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }


    let distancia = dist(cursor.x, cursor.y, this.x, this.y);
    if (distancia < 130) {
      // pula 80px no sentido oposto do cursor
      if (this.x > cursor.x) {
        this.x += 80;
      } else {
        this.x -= 80;
      }

      if (this.y > cursor.y) {
        this.y += 80;
      } else {
        this.y -= 80;
      }
    }

    this.cooldown = 30;
  }
}
