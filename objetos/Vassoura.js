class Vassoura {
  update(gatos) {
    let pmx = constrain(pmouseX, 0, LARGURA - 1)
    let pmy = constrain(pmouseY, 0, ALTURA - 1)
    let velMouse = createVector(mx - pmx, my - pmy)

    for (let i = 0; i < gatos.length; i++) {
      let g = gatos[i]
      if (g.preso) continue
      let d = dist(mx, my, g.pos.x, g.pos.y)

      if (d < RAIOS.vassoura + g.raio) {
        let dir = createVector(g.pos.x - mx, g.pos.y - my)
        dir.normalize()
        let forca = velMouse.mag() * 0.4 + 0.5
        g.empurrar(dir, forca)
      }
    }
  }

  display() {
    push()
    translate(mx + 4, my + 4)
    rotate(PI / 4)
    rectMode(CENTER)
    fill(0, 0, 0, 30)
    noStroke()
    rect(0, 0, 6, 38, 3)
    pop()

    push()
    translate(mx, my)
    rotate(PI / 4)
    rectMode(CENTER)
    fill(CORES.vassoura)
    stroke(CORES.vassouraStroke)
    strokeWeight(2)
    rect(0, 0, 6, 38, 3)
    pop()
  }
}
