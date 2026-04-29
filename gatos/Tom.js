// tom segue o cursor (carente)
class Tom extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.gato, CORES.tom, 'Tom');
    this.empurravel = true;
  }


  mover() {
    let distancia = dist(cursor.x, cursor.y, this.x, this.y);
    if (distancia < 60) {
      return;
    }

    // aproxima 3px em direcao do cursor
    if (cursor.x > this.x + 3) {
      this.x += 3;
    } else if (cursor.x < this.x - 3) {
      this.x -= 3;
    }

    if (cursor.y > this.y + 3) {
      this.y += 3;
    } else if (cursor.y < this.y - 3) {
      this.y -= 3;
    }
  }
}
