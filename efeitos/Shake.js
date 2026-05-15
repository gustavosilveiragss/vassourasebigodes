class Shake {
  /** @type {number} amplitude em px */
  static intensidadeAtual = 0;
  /** @type {number} frames restantes */
  static framesRestantes = 0;
  
  /**
   * @param {number} intensidade
   * @param {number} frames
   */
  static tremer(intensidade, frames) {
    // shake fraco n interrompe um forte ja em curso
    if (intensidade > Shake.intensidadeAtual) {
      Shake.intensidadeAtual = intensidade;
      Shake.framesRestantes = frames;
      return;
    }

    if (Shake.framesRestantes < frames) {
      Shake.framesRestantes = frames;
    }
  }

  // aplicar o shake via translate
  static aplicar() {
    if (Shake.framesRestantes <= 0) return;
    // https://forum.processing.org/two/discussion/21970/
    const offsetX = random(-Shake.intensidadeAtual, Shake.intensidadeAtual);
    const offsetY = random(-Shake.intensidadeAtual, Shake.intensidadeAtual);
    translate(offsetX, offsetY);
  }

  // resetar estado 
  static atualizar() {
    if (Shake.framesRestantes <= 0) {
      return;
    }

    Shake.framesRestantes--;
    if (Shake.framesRestantes <= 0) {
      Shake.intensidadeAtual = 0;
    }
  }
}
