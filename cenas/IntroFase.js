const GATOS_NOVOS = {
  1: [
    { nome: 'Tom', texto: 'Esse gato é extremamente carente e vai na sua direção pra onde você for' }
  ],
  2: [
    { nome: 'Salem', texto: 'Salem, o gato vindo direto dos infernos, é um filhote que pula pra longe toda vez que você se aproxima' },
    { nome: 'Fifi', texto: 'Esse gato vesguinho nunca consegue andar em linha reta' }
  ],
  3: [
    { nome: 'Miau', texto: 'Mais churu na barriga que neurônios no cérebro, você vai precisar dar um empurrãozinho' },
    { nome: 'Fofinho', texto: 'Bravinho mas carinhoso, sai correndo atrás de você rapidamente' }
  ]
};

const DESAFIOS_NOVOS = {
  4: [
    { nome: 'Bolinha', texto: 'Uma bolinha fica parada no chão, atrai um gato aleatório e depois quica pra outro canto. Vai bagunçar seus planos e introduzir caos generalizado', cor: CORES.bolinha }
  ]
};

const CLASSES_FASE = [Fase, Fase1, Fase2, Fase3, Fase4, Fase5];

class IntroFase extends Cena {
  constructor(numero) {
    super();
    this.numero = numero;
    this.gatosNovos = GATOS_NOVOS[numero];
    this.desafiosNovos = DESAFIOS_NOVOS[numero];
  }

  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(36);
    text('Fase ' + this.numero, LARGURA / 2, 70);

    const temGatos = this.gatosNovos && this.gatosNovos.length > 0;
    const temDesafios = this.desafiosNovos && this.desafiosNovos.length > 0;

    let y = 115;

    if (temGatos) {
      fill(CORES.texto);
      textAlign(CENTER);
      textSize(20);
      text('Gatos novos nesta fase:', LARGURA / 2, y);

      const inicioX = (LARGURA / 2) - ((this.gatosNovos.length - 1) * 160);
      for (let i = 0; i < this.gatosNovos.length; i++) {
        const gato = this.gatosNovos[i];
        const centroX = inicioX + i * 320;

        fill(200);
        noStroke();
        rect(centroX - 40, y + 20, 80, 80, 8);

        fill(CORES.texto);
        textAlign(CENTER);
        textSize(18);
        text(gato.nome, centroX, y + 123);

        textSize(12);
        this.desenharTextoQuebrado(gato.texto, centroX, y + 147, 280);
      }

      y += 210;
    }

    if (temDesafios) {
      fill(CORES.texto);
      textAlign(CENTER);
      textSize(20);
      text('Novos desafios:', LARGURA / 2, y);

      const inicioX = (LARGURA / 2) - ((this.desafiosNovos.length - 1) * 160);
      for (let i = 0; i < this.desafiosNovos.length; i++) {
        const desafio = this.desafiosNovos[i];
        const centroX = inicioX + i * 320;

        noStroke();
        fill(desafio.cor);
        ellipse(centroX, y + 60, 50, 50);

        fill(CORES.texto);
        textAlign(CENTER);
        textSize(18);
        text(desafio.nome, centroX, y + 110);

        textSize(12);
        this.desenharTextoQuebrado(desafio.texto, centroX, y + 134, 280);
      }

      y += 200;
    }

    if (!temGatos && !temDesafios) {
      fill(CORES.texto);
      textAlign(CENTER);
      textSize(28);
      text('Boa sorte!', LARGURA / 2, 280);
    }

    fill(color(CORES.texto + '99'));
    textAlign(CENTER);
    textSize(16);
    text('Clique para jogar', LARGURA / 2, 555);
  }

  desenharTextoQuebrado(texto, centroX, inicioY, larguraMax) {
    const palavras = texto.split(' ');
    let linha = '';
    let linhaY = inicioY;

    for (let i = 0; i < palavras.length; i++) {
      if (textWidth(linha + palavras[i] + ' ') > larguraMax && linha !== '') {
        text(linha.trim(), centroX, linhaY);
        linha = palavras[i] + ' ';
        linhaY += 18;
      } else {
        linha += palavras[i] + ' ';
      }
    }

    if (linha.trim() !== '') {
      text(linha.trim(), centroX, linhaY);
    }
  }

  aoClicar() {
    const Classe = CLASSES_FASE[this.numero];
    trocarCena(new Classe());
  }
}
