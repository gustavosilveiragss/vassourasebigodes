class Som {
  /**
   * @param {string[]} caminhos relativos a assets/sons/
   * @param {number} [cooldownFrames] minimo entre disparos. 0 = sem limite
   * @param {number} [volume] 0 a 1
   */
  constructor(caminhos, cooldownFrames = 0, volume = 1) {
    /** @type {number} */
    this.cooldown = cooldownFrames;
    /** @type {number} */
    this.volume = volume;
    /** @type {number} frame minimo do proximo disparo */
    this.proximoFrame = 0;
    /** @type {p5.SoundFile[]} */
    this.sons = caminhos.map((c) => loadSound('assets/sons/' + c));
  }

  tocar() {
    if (frameCount < this.proximoFrame) return;
    this.proximoFrame = frameCount + this.cooldown;

    const escolhido = this.sons.length === 1 ? this.sons[0] : this.sons[floor(random(this.sons.length))];
    escolhido.setVolume(this.volume);
    escolhido.play();
  }
}

// musica de fundo: uma faixa em loop, reinicia toda vez que comeca
class MusicaFundo {
  /** @type {string} */
  static caminho = 'musica/comfi_01.mp3';
  /** @type {number} */
  static volume = 0.4;
  /** @type {p5.SoundFile|null} */
  static faixa = null;

  static precarregar() {
    MusicaFundo.faixa = loadSound('assets/sons/' + MusicaFundo.caminho);
  }

  static iniciar() {
    if (!MusicaFundo.faixa) return;
    if (MusicaFundo.faixa.isPlaying()) {
      MusicaFundo.faixa.stop();
    }
    MusicaFundo.faixa.setVolume(MusicaFundo.volume);
    MusicaFundo.faixa.loop();
  }
}
