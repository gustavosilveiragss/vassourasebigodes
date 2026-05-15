// fade preto entre cenas. troca a cena no meio do fade
class Transicao {
  /** @type {number} duracao de cada metade (fade-out e fade-in) em frames */
  static DURACAO_METADE = 6;

  /** @type {boolean} */
  static ativa = false;
  /** @type {number} 0 - DURACAO_METADE*2 */
  static progresso = 0;
  /** @type {Cena|null} cena que troca durante fade */
  static cenaDestino = null;
  /** @type {boolean} se a troca pra cenaDestino ja aconteceu */
  static trocouCena = false;

  /** @param {Cena} novaCena */
  static iniciar(novaCena) {
    if (Transicao.ativa) return;
    Transicao.ativa = true;
    Transicao.progresso = 0;
    Transicao.cenaDestino = novaCena;
    Transicao.trocouCena = false;
  }

  static atualizar() {
    if (!Transicao.ativa) return;
    Transicao.progresso++;

    if (!Transicao.trocouCena && Transicao.progresso >= Transicao.DURACAO_METADE) {
      cenaAtual = Transicao.cenaDestino;
      Transicao.trocouCena = true;
    }

    if (Transicao.progresso >= Transicao.DURACAO_METADE * 2) {
      Transicao.ativa = false;
      Transicao.cenaDestino = null;
    }
  }

  static desenhar() {
    if (!Transicao.ativa) return;

    const alphaOverlay = Transicao.calcularAlpha();

    push();
      resetMatrix();
      scale(ESCALA);
      noStroke();
      fill(0, alphaOverlay);
      rect(0, 0, LARGURA, ALTURA);
    pop();
  }

  
  static calcularAlpha() {
    const passouMeio = Transicao.progresso >= Transicao.DURACAO_METADE;
    if (!passouMeio) {
      // fade-in: alpha cresce até 180
      return (Transicao.progresso / Transicao.DURACAO_METADE) * 180;
    }

    // fade-out: alpha decresce
    const framesRestantes = Transicao.DURACAO_METADE * 2 - Transicao.progresso;
    return (framesRestantes / Transicao.DURACAO_METADE) * 180;
  }
}
