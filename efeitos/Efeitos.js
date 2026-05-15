// classe que agrupa os subsistemas pra manter o sketch.js limpo
class Efeitos {
  static preparar() {
    Filtro.preparar();
  }

  static atualizar() {
    Particulas.atualizar();
    Shake.atualizar();
    Transicao.atualizar();
  }
}
