class Fase5 extends Fase {
  constructor() {
    const gatos = [
      new Tom(110, 120),
      new Fifi(790, 120),
      new Miau(180, 330),
      new Salem(450, 90),
      new Fofinho(440, 330),
    ];

    const obstaculos = [
      new Obstaculo(50, 10, 140, 18),
      new Obstaculo(175, 10, 18, 127),
      new Obstaculo(50, 119, 140, 18),
      new Obstaculo(710, 10, 140, 18),
      new Obstaculo(705, 10, 18, 127),
      new Obstaculo(710, 119, 140, 18),
      new Obstaculo(100, 270, 180, 18),
      new Obstaculo(100, 270, 18, 120),
      new Obstaculo(100, 372, 180, 18),
      new Obstaculo(620, 270, 180, 18),
      new Obstaculo(782, 270, 18, 120),
      new Obstaculo(620, 372, 180, 18),
      new Obstaculo(240, 410, 179, 18),
      new Obstaculo(471, 410, 179, 18),
    ];

    const bolinhas = [new Bolinha(300, 280, gatos), new Bolinha(600, 280, gatos)];

    super(5, gatos, obstaculos, bolinhas, 50, Fase.SOFA_GRANDE);
  }
}
