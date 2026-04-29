class Fase1 extends Fase {
  constructor() {
    const gatos = [
      new Tom(200, 150),
      new Salem(700, 150),
      new Miau(450, 100)
    ];

    const obstaculos = [
      new Obstaculo(370, 280, 160, 28)
    ];

    super(1, gatos, obstaculos, 60, 10);
  }
}
