class Fase8 extends Fase {
  constructor() {
    const gatos = [
      new Tom(150, 80),
      new Salem(750, 80),
      new Fifi(450, 55),
      new Miau(150, 370),
      new Fofinho(730, 340)
    ];
    const obs = [
      new Obstaculo(380, 140, 140, 28),
      new Obstaculo(80, 300, 140, 28),
      new Obstaculo(680, 300, 140, 28),
      new Obstaculo(200, 430, 120, 28),
      new Obstaculo(580, 430, 120, 28)
    ];
    const bolinhas = [
      new Bolinha(220, 160, gatos),
      new Bolinha(450, 200, gatos),
      new Bolinha(680, 160, gatos)
    ];
    super(8, gatos, obs, bolinhas, 100);
  }
}
