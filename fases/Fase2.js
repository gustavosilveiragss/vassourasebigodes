class Fase2 extends Fase {
  constructor() {
    const gatos = [
      new Tom(200, 150),
      new Salem(700, 200),
      new Fifi(450, 100)
    ];
    const obs = [
      new Obstaculo(340, 340, 220, 28)
    ];
    super(2, gatos, obs, [], 80);
  }
}
