class Fase4 extends Fase {
  constructor() {
    const gatos = [
      new Tom(130, 130),
      new Miau(770, 130),
      new Salem(450, 100),
      new Fofinho(300, 380),
      new Fofinho(600, 380)
    ];

    const obstaculos = [
      new Obstaculo(60, 180, 160, 20),
      new Obstaculo(60, 60, 20, 140),
      new Obstaculo(200, 60, 20, 140),

      new Obstaculo(680, 180, 160, 20),
      new Obstaculo(680, 60, 20, 140),
      new Obstaculo(820, 60, 20, 140),


      new Obstaculo(340, 260, 220, 20), 

      new Obstaculo(140, 320, 160, 20),

      new Obstaculo(600, 300, 160, 20)
    ];

    super(4, gatos, obstaculos, 60, 10, SOFA_GRANDE);
  }
}
