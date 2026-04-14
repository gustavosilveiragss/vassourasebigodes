class Fase5 extends Fase {
  constructor() {
    let gatos = [
      new Tom(180, 100),
      new Salem(720, 120),
      new Fifi(450, 80),
      new Miau(200, 320),
      new Fofinho(680, 280)
    ]
    let obs = [
      new Obstaculo(350, 200, 200, 28),
      new Obstaculo(120, 380, 130, 28),
      new Obstaculo(650, 380, 130, 28)
    ]
    let bolinhas = [new Bolinha(450, 250, gatos)]
    super(5, gatos, obs, bolinhas, 120)
  }
}
