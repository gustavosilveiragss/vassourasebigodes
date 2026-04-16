class Fase4 extends Fase {
  constructor() {
    const gatos = [
      new Tom(160, 130),
      new Salem(740, 130),
      new Fifi(450, 90),
      new Miau(250, 350),
      new Fofinho(650, 300)
    ];

    const obstaculos = [
      new Obstaculo(270, 405, 110, 28),
      new Obstaculo(520, 405, 110, 28)
    ];

    const bolinhas = [new Bolinha(450, 240, gatos)];
    
    super(4, gatos, obstaculos, bolinhas, 50);
  }
}
