# Vassouras & Bigodes

## Disciplina

Web Development: HTML5 Canvas & Games. Entrega da Primeira parcial

## Integrantes

Gustavo Silveira e Silva

## Sobre o jogo

Vassouras & Bigodes é um jogo em 2D top-down feito com p5.js em que o jogador controla uma vassoura (pelo cursor) e precisa empurrar todos os gatos da casa até o sofá. A inspiração veio de [Puffle Roundup](https://clubpenguin.fandom.com/wiki/Puffle_Roundup), minigame do Club Penguin em que o jogador conduzia puffles até o cercado antes que o tempo acabasse. Aqui a ideia foi adaptada para cada gato (equivalente ao puffle) tivesse uma movimentação diferente, baseada na sua personalidade, permitindo mais variabilidade na gameplay e na implementação do projeto.

## Como jogar

O mouse controla a vassoura. A tecla ESC (ou P) pausa o jogo. Para vencer uma fase é preciso manter todos os gatos no sofá ao mesmo tempo até completar a contagem de permanência. Se o tempo da fase chegar a zero antes disso, você perde. Cada gato sentado no sofá fica lá só por algum tempo antes de fugir de novo, então vai ficando mais difícil.

## Como rodar

Pode subir um servidor local com:

```
npm install
npm start
```

A versão publicada no github pages está em https://vassourasebigodes.marmota.dev.br.

## Planos futuros

Esta entrega corresponde ao estado atual da branch `master`. A branch `dev` contém funcionalidades em andamento, ainda não terminadas. As próximas etapas planejadas são:

- **Adaptação para vetores** migrando posição e velocidade dos gatos, da vassoura e dos obstáculos de coordenadas `x` e `y` separadas para `p5.Vector`. Isso simplifica cálculos de direção, distância, normalização e empurrão, que hoje são feitos com `if`s comparando eixos um a um. Já implementado na `dev`
- **Mais gatos** Já existe na `dev` o quinto gato (Fifi) com movimentação própria
- **Mais níveis** além dos cinco atuais, testando outras combinações de gatos e obstáculos. Ainda não iniciado
- **Bolinha como distrator** substituindo o "sair sozinho do sofá" por uma bolinha que se move pelo cenário e atrai um gato por vez antes de quicar para outro lugar. Já implementada na `dev`, com seleção de gato, perseguição, timeout e colisão com obstáculos
- **Sprites e animações** para os gatos, a vassoura e o cenário, substituindo os círculos coloridos atuais. Não iniciado
- **Efeitos sonoros** (miados, batida da vassoura, bolinha quicando, vitória e derrota). Não iniciado
- **GIFs demonstrativas** entre os níveis mostrando a movimentação de cada gato, para que o jogador entenda a mecânica antes de iniciar a fase
