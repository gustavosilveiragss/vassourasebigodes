class Fase5 extends Fase {
  constructor() {
    const gatos = [
      new Tom(110, 120),
      new Tom(790, 120),
      new Miau(180, 330),
      new Miau(720, 330),
      new Salem(450, 90),
      new Fofinho(340, 420),
      new Fofinho(560, 420)
    ];

    const obstaculos = [
      // espaco canto superior esquerdo
      new Obstaculo(50, 10, 140, 18),
      new Obstaculo(175, 10, 18, 127),
      new Obstaculo(50, 119, 140, 18),

      // espaco canto superior direito
      new Obstaculo(710, 10, 140, 18),
      new Obstaculo(705, 10, 18, 127),
      new Obstaculo(710, 119, 140, 18),

      // espaco meio esquerda
      new Obstaculo(100, 270, 180, 18),
      new Obstaculo(100, 270, 18, 120),
      new Obstaculo(100, 372, 180, 18),

      // espaco meio direita
      new Obstaculo(620, 270, 180, 18),
      new Obstaculo(782, 270, 18, 120),
      new Obstaculo(620, 372, 180, 18),

      // duas em cima do sofa
      new Obstaculo(240, 410, 179, 18),
      new Obstaculo(471, 410, 179, 18)
    ];

    super(5, gatos, obstaculos, 70, 12, SOFA_GRANDE);
  }
}
