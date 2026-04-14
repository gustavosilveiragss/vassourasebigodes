class Vassoura {
  update(gatos) {
    let velMouse = createVector(mouseX - pmouseX, mouseY - pmouseY)

    for (let i = 0; i < gatos.length; i++) {
      let g = gatos[i]
      let d = dist(mouseX, mouseY, g.pos.x, g.pos.y)

      if (d < RAIOS.vassoura + g.raio) {
        let dir = createVector(g.pos.x - mouseX, g.pos.y - mouseY)
        dir.normalize()
        let forca = velMouse.mag() * 0.4 + 0.5
        g.empurrar(dir, forca)
      }
    }
  }

  display() {
    fill(0, 0, 0, 30)
    noStroke()
    ellipse(mouseX + 4, mouseY + 4, RAIOS.vassoura * 2, RAIOS.vassoura * 2)

    fill(CORES.vassoura)
    stroke(CORES.vassouraStroke)
    strokeWeight(2)
    ellipse(mouseX, mouseY, RAIOS.vassoura * 2, RAIOS.vassoura * 2)
    noStroke()
  }
}
