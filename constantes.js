const LARGURA = 900;
const ALTURA = 600;

const FASE_INICIAL = 1; // mudar pra debugar fase

const SOFA = { x: 300, y: 490, largura: 300, altura: 90 };
const SOFA_GRANDE = { x: 225, y: 450, largura: 450, altura: 130 }; 

const CORES = {
  fundo: '#F5EDD6', 
  tom: '#E8A87C',
  salem: '#2D2D2D',
  miau: '#D4A5A5',
  fofinho: '#6B8F71',
  vassoura: '#D4A84B',
  obstaculo: '#C4A882',
  sofa: 'rgba(168, 216, 168, 0.47)',
  texto: '#3D2B1F'
};



const RAIOS = {
  gato: 22,
  miau: 30, 
  fofinho: 16, 
  vassoura: 22
};

// posicoes onde os gatos sentam no sofa
const SLOTS = [
  { x: 330, y: 525 },
  { x: 390, y: 525 },
  { x: 450, y: 525 },
  { x: 510, y: 525 },
  { x: 570, y: 525 },

  { x: 360, y: 555 },
  { x: 420, y: 555 },
  { x: 480, y: 555 },
  { x: 540, y: 555 }
];
