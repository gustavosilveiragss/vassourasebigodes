// grain de papel. buffer pre-renderizado em setup pra n custar a cada frame
// https://forum.processing.org/two/discussion/15820/how-to-make-2d-noise-in-p5-js.html
class Filtro {
  /** @type {p5.Graphics|null} */
  static bufferGrain = null;

  static preparar() {
    Filtro.bufferGrain = createGraphics(LARGURA, ALTURA);

    Filtro.bufferGrain.loadPixels();
    const pixels = Filtro.bufferGrain.pixels; // RGBA, sao 4 valores por pixel
    
    for (let i = 0; i < pixels.length; i += 4) {
      // gambiarra pra ter uns pixels transparentes e outros com ruido, pra n ficar um overlay uniforme
      // 70% de ruido
      if (random() >= 0.30) {
        pixels[i + 3] = 0; // alpha 0 (transparente)
        continue;
      }

      // marrom escuro (60,40,20) com alpha entre 8 e 20, pra n ficar uniforme
      pixels[i] = 60;
      pixels[i + 1] = 40; 
      pixels[i + 2] = 20; 
      pixels[i + 3] = floor(random(8, 20));
    }

    Filtro.bufferGrain.updatePixels();
  }

  static desenhar() {
    if (!Filtro.bufferGrain) return;
    image(Filtro.bufferGrain, 0, 0);
  }
}
