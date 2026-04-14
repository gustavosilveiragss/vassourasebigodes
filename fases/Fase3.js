class Fase3 extends Fase {
  constructor() {
    let gatos = [
      new Tom(200, 120),
      new Salem(700, 150),
      new Fifi(450, 80),
      new Miau(150, 300),
      new Fofinho(600, 250)
    ]
    let obs = [
      new Obstaculo(110, 290, 120, 28),
      new Obstaculo(670, 270, 120, 28)
    ]
    super(3, gatos, obs, [], 100)
  }
}
