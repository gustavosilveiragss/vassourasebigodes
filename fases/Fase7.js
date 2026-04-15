class Fase7 extends Fase {
  constructor() {
    const gatos = [
      new Tom(160, 90),
      new Salem(740, 90),
      new Fifi(450, 60),
      new Miau(160, 360),
      new Fofinho(720, 330)
    ];
    const obs = [
      new Obstaculo(380, 160, 140, 28),
      new Obstaculo(100, 330, 140, 28),
      new Obstaculo(660, 330, 140, 28),
      new Obstaculo(380, 430, 140, 28)
    ];
    const bolinhas = [
      new Bolinha(250, 180, gatos),
      new Bolinha(650, 180, gatos)
    ];
    super(7, gatos, obs, bolinhas, 110);
  }
}
