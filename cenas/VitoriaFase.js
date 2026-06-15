// recorde guardado em frames pra ter precisao
const CHAVE_RECORDES = 'vassourasBigodesRecordes';

/**
 * @param {number} fase
 * @returns {number|null}
 */
function lerRecorde(fase) {
  const bruto = localStorage.getItem(CHAVE_RECORDES);
  if (!bruto) return null;
  const dados = JSON.parse(bruto);
  return dados[fase] ?? null;
}

/**
 * @param {number} fase
 * @param {number} frames
 */
function salvarRecorde(fase, frames) {
  const bruto = localStorage.getItem(CHAVE_RECORDES);
  const dados = bruto ? JSON.parse(bruto) : {};
  dados[fase] = frames;
  localStorage.setItem(CHAVE_RECORDES, JSON.stringify(dados));
}

class VitoriaFase extends Cena {
  /** @type {Som} */
  static somVitoria;

  static precarregar() {
    VitoriaFase.somVitoria = new Som(['jogo/vitoria.mp3'], 0, 0.5);
  }

  /**
   * @param {number} faseConcluida
   * @param {number} framesRestantes
   */
  constructor(faseConcluida, framesRestantes) {
    super();
    this.faseConcluida = faseConcluida;
    this.proximaFase = faseConcluida + 1;
    this.framesRestantes = framesRestantes;

    // se nunca jogou essa fase, recordeAnterior é null
    this.recordeAnterior = lerRecorde(faseConcluida);

    // novo recorde se nao tinha ou se sobrou mais tempo
    this.novoRecorde = this.recordeAnterior === null || framesRestantes > this.recordeAnterior;

    if (this.novoRecorde) {
      salvarRecorde(faseConcluida, framesRestantes);
    }

    VitoriaFase.somVitoria.tocar();
  }

  display() {
    background(Tema.fundo);

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(36);
    text('Fase ' + this.faseConcluida + ' concluída!', LARGURA / 2, 130);

    textSize(18);
    text('Tempo restante', LARGURA / 2, 200);

    const segundos = ceil(this.framesRestantes / 60);
    const tempoTexto = segundos + 's';
    textSize(34);
    fill(Tema.texto);
    text(tempoTexto, LARGURA / 2, 245);

    if (this.novoRecorde && this.recordeAnterior === null) {
      fill(Vassoura.cor);
      textSize(22);
      text('Primeiro recorde!', LARGURA / 2, 320);
    } else if (this.novoRecorde) {
      const anteriorSeg = ceil(this.recordeAnterior / 60);
      fill(Vassoura.cor);
      textSize(22);
      text('Novo recorde!', LARGURA / 2, 315);
      fill(color(Tema.texto + '99'));
      textSize(14);
      text('recorde anterior: ' + anteriorSeg + 's', LARGURA / 2, 340);
    } else {
      const melhorSeg = ceil(this.recordeAnterior / 60);
      fill(Tema.texto);
      textSize(18);
      text('Melhor tempo: ' + melhorSeg + 's', LARGURA / 2, 320);
    }

    fill(color(Tema.texto + '99'));
    textSize(16);
    if (this.proximaFase > CLASSES_FASE.length - 1) {
      text('Você varreu a casa inteira com sucesso!', LARGURA / 2, 520);
      text('Clique para voltar ao início', LARGURA / 2, 550);
      return;
    }

    text('Clique para a Fase ' + this.proximaFase, LARGURA / 2, 540);
  }

  aoClicar() {
    Cena.somClique.tocar();
    if (this.proximaFase > CLASSES_FASE.length - 1) {
      trocarCena(new Inicio());
      return;
    }
    trocarCena(new IntroFase(this.proximaFase));
  }
}
