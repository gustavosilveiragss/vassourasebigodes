// fofinho: tiro pra perto do cursor
class Fofinho extends Gato {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, RAIOS.fofinho, CORES.fofinho, 'Fofinho');

    // cada fofinho tem cooldown proprio pra n correrem todos juntos
    this.cooldownInstancia = floor(random(40, 180));
    this.cooldown = this.cooldownInstancia;
    this.empurravel = false;
  }


  mover() {
    if (this.cooldown > 0) {
      this.cooldown--;
      return;
    }

    let distanciaPerto = RAIOS.vassoura + 80;

    // tiro pro lado oposto pra ficar perto mas dificil de pegar
    if (this.x > cursor.x) {
      this.x = cursor.x - distanciaPerto;
    } else {
      this.x = cursor.x + distanciaPerto;
    }

    if (this.y > cursor.y) {
      this.y = cursor.y - distanciaPerto;
    } else {
      this.y = cursor.y + distanciaPerto;
    }

    this.cooldown = this.cooldownInstancia;
  }
}
