const GATOS_NOVOS = {
  1: [
    { nome: 'Tom', texto: 'Esse gato é extremamente carente e vai na sua direção pra onde você for' }
  ],
  2: [
    { nome: 'Salem', texto: 'Salem, o gato vindo direto dos infernos, é um filhote que pula pra longe toda vez que você se aproxima' },
    { nome: 'Fifi', texto: 'Esse gato vesguinho nunca consegue andar em linha reta' }
  ],
  3: [
    { nome: 'Miau', texto: 'Mais churu na barriga que neurônio no cérebro, você vai precisar dar um empurrãozinho' },
    { nome: 'Fofinho', texto: 'Bravinho mas carinhoso, fica girando em volta de você' }
  ]
};

const CLASSES_FASE = [null, Fase1, Fase2, Fase3, Fase4, Fase5];

class IntroFase extends Cena {
  constructor(numero) {
    super();
    this.numero = numero;
    this.gatosNovos = GATOS_NOVOS[numero];
  }

  display() {
    background(CORES.fundo);

    fill(CORES.texto);
    textAlign(CENTER);
    textSize(36);
    text('Fase ' + this.numero, LARGURA / 2, 80);

    if (this.gatosNovos.length > 0) {
      textSize(20);
      text('Gatos novos nesta fase:', LARGURA / 2, 130);

      const inicioX = (LARGURA / 2) - ((this.gatosNovos.length - 1) * 160);
      for (let i = 0; i < this.gatosNovos.length; i++) {
        const gato = this.gatosNovos[i];
        const centroX = inicioX + i * 320;

        fill(200);
        noStroke();
        rect(centroX - 40, 165, 80, 80, 8);

        fill(CORES.texto);
        textAlign(CENTER);
        textSize(18);
        text(gato.nome, centroX, 268);

        textSize(12);
        const palavras = gato.texto.split(' ');
        let linha = '';
        let textoY = 292;
        for (let j = 0; j < palavras.length; j++) {
          if (textWidth(linha + palavras[j] + ' ') > 280 && linha !== '') {
            text(linha.trim(), centroX, textoY);
            linha = palavras[j] + ' ';
            textoY += 18;
          } else {
            linha += palavras[j] + ' ';
          }
        }
        if (linha.trim() !== '') text(linha.trim(), centroX, textoY);
      }
    } else {
      textSize(28);
      text('Boa sorte!', LARGURA / 2, 250);
    }

    fill(color(CORES.texto + '99'));
    textAlign(CENTER);
    textSize(16);
    text('Clique para jogar', LARGURA / 2, 530);
  }

  aoClicar() {
    const Classe = CLASSES_FASE[this.numero];
    trocarCena(new Classe());
  }
}
