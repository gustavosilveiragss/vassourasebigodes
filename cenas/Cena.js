// classe base. as outras cenas herdam dela
class Cena {
  /** @type {Som} */
  static somClique;

  static precarregar() {
    Cena.somClique = new Som(['ui/clique.ogg'], 0, 0.5);
  }

  update() {}
  display() {}
  aoClicar() {}
  /** @param {number} tecla */
  aoApertarTecla(tecla) {}
}
