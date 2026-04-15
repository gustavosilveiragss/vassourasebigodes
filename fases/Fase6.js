class Fase6 extends Fase {
  constructor() {
    const gatos = [
      new Tom(150, 100),
      new Salem(750, 110),
      new Fifi(450, 70),
      new Miau(180, 340),
      new Fofinho(700, 300)
    ];
    const obs = [
      new Obstaculo(300, 180, 300, 28),
      new Obstaculo(100, 360, 140, 28),
      new Obstaculo(660, 360, 140, 28)
    ];
    const bolinhas = [
      new Bolinha(200, 280, gatos),
      new Bolinha(700, 280, gatos)
    ];
    super(6, gatos, obs, bolinhas, 120);
  }
}
