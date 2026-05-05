// classes dos gatos novos por fase. info (descricao, sombra) sai da propria classe
const GATOS_NOVOS = {
  1: [Tom],
  2: [Salem, Fifi],
  3: [Miau, Fofinho],
};

// outros desafios novos por fase (bolinha, etc)
const DESAFIOS_NOVOS = {
  4: [
    {
      nome: 'Bolinha',
      texto:
        'Uma bolinha fica parada no chão, atrai um gato aleatório e depois quica pra outro canto. Vai bagunçar seus planos e introduzir caos generalizado',
      cor: Bolinha.cor,
    },
  ],
};

const CLASSES_FASE = [Fase, Fase1, Fase2, Fase3, Fase4, Fase5];

class IntroFase extends Cena {
  /**
   * @param {number} numero
   * @param {boolean} [comFade]
   */
  constructor(numero, comFade = false) {
    super();
    this.numero = numero;
    this.gatosNovos = GATOS_NOVOS[numero];
    this.desafiosNovos = DESAFIOS_NOVOS[numero];
    this.framesFade = comFade ? 60 : 0;
    this.framesAtuais = 0;
  }

  update() {
    if (this.framesAtuais < this.framesFade) {
      this.framesAtuais++;
    }
  }

  display() {
    background(Tema.fundo);

    // fade do conteudo, sem afetar o fundo
    const alpha = this.framesFade === 0 ? 1 : this.framesAtuais / this.framesFade;
    drawingContext.globalAlpha = alpha;

    fill(Tema.texto);
    textAlign(CENTER);
    textSize(36);
    text('Fase ' + this.numero, LARGURA / 2, 70);

    const temGatos = this.gatosNovos && this.gatosNovos.length > 0;
    const temDesafios = this.desafiosNovos && this.desafiosNovos.length > 0;

    let y = 115;

    if (temGatos) {
      fill(Tema.texto);
      textAlign(CENTER);
      textSize(20);
      text('Gatos novos nesta fase:', LARGURA / 2, y);

      // espalha os cards horizontalmente em volta do centro
      const inicioX = LARGURA / 2 - (this.gatosNovos.length - 1) * 160;
      for (let indiceCard = 0; indiceCard < this.gatosNovos.length; indiceCard++) {
        const classeGato = this.gatosNovos[indiceCard];
        const chaveSprite = classeGato.name.toLowerCase();
        const centroX = inicioX + indiceCard * 320;

        const grupoSprites = SPRITES[chaveSprite];
        if (grupoSprites && grupoSprites.sentado) {
          const sprite = grupoSprites.sentado;
          const maiorLado = max(sprite.width, sprite.height);
          const fatorEscala = 100 / maiorLado;
          const larguraRender = sprite.width * fatorEscala;
          const alturaRender = sprite.height * fatorEscala;

          noStroke();
          fill(0, 60);
          const sombraSentado = classeGato.sombras.sentado;
          const larguraSombra = larguraRender * sombraSentado.fracaoLargura;
          const sombraY = y + 65 + (alturaRender / 2) * sombraSentado.fracaoY;
          ellipse(centroX, sombraY, larguraSombra, larguraSombra * 0.25);
          desenharSpriteComOutline(sprite, centroX, y + 65, larguraRender, alturaRender);
        } else {
          fill(200);
          noStroke();
          rect(centroX - 40, y + 20, 80, 80, 8);
        }

        fill(Tema.texto);
        noStroke();
        textAlign(CENTER);
        textSize(18);
        text(classeGato.name, centroX, y + 142);

        textSize(12);
        this.desenharTextoQuebrado(classeGato.descricao, centroX, y + 166, 280);
      }

      y += 210;
    }

    // bloco de desafios (bolinha etc)
    if (temDesafios) {
      fill(Tema.texto);
      textAlign(CENTER);
      textSize(20);
      text('Novos desafios:', LARGURA / 2, y);

      const inicioX = LARGURA / 2 - (this.desafiosNovos.length - 1) * 160;
      for (let i = 0; i < this.desafiosNovos.length; i++) {
        const desafio = this.desafiosNovos[i];
        const centroX = inicioX + i * 320;

        noStroke();
        fill(0, 60);
        ellipse(centroX, y + 88, 40, 12);
        fill(desafio.cor);
        ellipse(centroX, y + 60, 50, 50);

        fill(Tema.texto);
        textAlign(CENTER);
        textSize(18);
        text(desafio.nome, centroX, y + 110);

        textSize(12);
        this.desenharTextoQuebrado(desafio.texto, centroX, y + 134, 280);
      }

      y += 200;
    }

    // fase sem novidade: mensagem padrao
    if (!temGatos && !temDesafios) {
      fill(Tema.texto);
      textAlign(CENTER);
      textSize(28);
      text('Boa sorte!', LARGURA / 2, 280);
    }

    if (this.numero === 1) {
      fill(Tema.texto);
      textAlign(CENTER);
      textSize(15);
      text('Mova o mouse para controlar a vassoura', LARGURA / 2, 470);
      text('Pressione ESC para pausar', LARGURA / 2, 495);
    }

    fill(color(Tema.texto + '99'));
    textAlign(CENTER);
    textSize(16);
    text('Clique para jogar', LARGURA / 2, 555);

    drawingContext.globalAlpha = 1;
  }

  /**
   * quebra texto em varias linhas medindo a largura
   * @param {string} texto
   * @param {number} centroX
   * @param {number} inicioY
   * @param {number} larguraMax
   */
  desenharTextoQuebrado(texto, centroX, inicioY, larguraMax) {
    const palavras = texto.split(' ');
    let linha = '';
    let linhaY = inicioY;

    for (let i = 0; i < palavras.length; i++) {
      // se proxima palavra estoura largura, manda a linha atual e comeca outra
      if (textWidth(linha + palavras[i] + ' ') > larguraMax && linha !== '') {
        text(linha.trim(), centroX, linhaY);
        linha = palavras[i] + ' ';
        linhaY += 18;
        continue;
      }
      linha += palavras[i] + ' ';
    }

    if (linha.trim() !== '') {
      text(linha.trim(), centroX, linhaY);
    }
  }

  aoClicar() {
    Cena.somClique.tocar();
    const Classe = CLASSES_FASE[this.numero];
    trocarCena(new Classe());
  }
}
