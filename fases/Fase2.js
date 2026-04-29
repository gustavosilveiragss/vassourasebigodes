class Fase2 extends Fase {
  constructor() {
    const gatos = [
      new Tom(150, 100),
      new Tom(750, 100),
      new Salem(450, 80),
      new Miau(200, 260),
      new Fofinho(700, 260)
    ];

    const obstaculos = [
      new Obstaculo(130, 140, 160, 28),

      new Obstaculo(610, 140, 160, 28),

      new Obstaculo(380, 220, 140, 28),

      new Obstaculo(130, 320, 140, 28),

      new Obstaculo(630, 320, 140, 28)
    ];

    super(2, gatos, obstaculos, 60, 15, SOFA_GRANDE);
  }
}
