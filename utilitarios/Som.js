// 1 som ou variacao aleatoria, com cooldown proprio
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
    /** @type {boolean[]} cada item guarda a prioridade do disparo enfileirado */
    this.pendentes = [];
    /** @type {boolean} */
    this.tocando = false;
    /** @type {p5.SoundFile[]} */
    this.sons = caminhos.map((c) => loadSound('assets/sons/' + c));
  }

  /** @param {boolean} [comPrioridade] abaixa a musica enquanto toca */
  tocar(comPrioridade = false) {
    if (frameCount < this.proximoFrame) return;

    this.proximoFrame = frameCount + this.cooldown;

    // se ainda tocando, enfileira ate 3. evita sobrepor e tbm n perde batidas rapidas
    if (this.tocando) {
      if (this.pendentes.length < 3) {
        this.pendentes.push(comPrioridade);
      } else if (comPrioridade && !this.pendentes.includes(true)) {
        this.pendentes[0] = true;
      }

      return;
    }

    this.disparar(comPrioridade);
  }

  /** @param {boolean} comPrioridade */
  disparar(comPrioridade) {
    const escolhido = this.sons.length === 1 ? this.sons[0] : this.sons[floor(random(this.sons.length))];
    escolhido.setVolume(this.volume);
    escolhido.play();

    this.tocando = true;

    if (comPrioridade) {
      const faixa = MusicaFundo.faixas[MusicaFundo.indice];
      if (faixa) {
        faixa.setVolume(MusicaFundo.volume * 0.6);
      }
    }

    setTimeout(() => {
      if (comPrioridade) {
        const faixa = MusicaFundo.faixas[MusicaFundo.indice];
        if (faixa) {
          faixa.setVolume(MusicaFundo.volume);
        }
      }

      this.tocando = false;
      
      if (this.pendentes.length > 0) {
        this.disparar(this.pendentes.shift());
      }
    }, escolhido.duration() * 1000);
  }
}

// musica em ciclo, n reinicia entre cenas
class MusicaFundo {
  /** @type {string[]} */
  static caminhos = [
    'musica/comfi_01.mp3',
    'musica/comfi_02.mp3',
    'musica/comfi_03.mp3',
  ];
  /** @type {number} */
  static volume = 0.4;
  /** @type {p5.SoundFile[]} */
  static faixas = [];
  /** @type {number} */
  static indice = 0;
  /** @type {boolean} */
  static iniciada = false;
  /** @type {number} quantos disparos prioritarios estao abaixando a musica agora */
  static abaixadores = 0;

  static precarregar() {
    MusicaFundo.faixas = MusicaFundo.caminhos.map((c) => loadSound('assets/sons/' + c));
  }

  static iniciar() {
    if (MusicaFundo.iniciada || MusicaFundo.faixas.length === 0) {
      return;
    }
    MusicaFundo.iniciada = true;
    MusicaFundo.tocarFaixa(0);
  }

  /** @param {number} i */
  static tocarFaixa(i) {
    MusicaFundo.indice = i;
    const faixa = MusicaFundo.faixas[i];
    faixa.setVolume(MusicaFundo.volume);
    faixa.play();
    // ao terminar, vai pra proxima faixa. modulo volta pra 0 depois da ultima
    faixa.onended(() => MusicaFundo.tocarFaixa((i + 1) % MusicaFundo.faixas.length));
  }
}
