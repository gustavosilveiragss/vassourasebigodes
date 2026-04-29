class Fase3 extends Fase {
  constructor() {
    const gatos = [
      new Tom(150, 100),
      new Tom(750, 100),
      new Salem(200, 220),
      new Salem(700, 220),
      new Miau(450, 60),
      new Fofinho(300, 350),
      new Fofinho(600, 350)
    ];


    const obstaculos = [
      new Obstaculo(350, 130, 200, 28),

      new Obstaculo(80, 180, 160, 28),

      new Obstaculo(660, 180, 160, 28),

      new Obstaculo(180, 280, 160, 28),

      new Obstaculo(560, 280, 160, 28)
    ];

    super(3, gatos, obstaculos, 60, 15, SOFA_GRANDE);
  }
}
