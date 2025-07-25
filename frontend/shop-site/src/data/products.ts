export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Pfad zum Bild
  description: string;
  details: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Innovatives Widget X',
    price: 99.99,
    image: '/images/widget-x.jpg', // Bild aus public/images
    description: 'Das Widget X revolutioniert Ihre Arbeitsweise mit seinen einzigartigen Funktionen und nachhaltigen Materialien. Leicht und leistungsstark.',
    details: 'Gewicht: 200g, Abmessungen: 10x5x3cm, Farbe: Schwarz. Hergestellt aus recyceltem Aluminium. Energieeffizienzklasse A++.',
  },
  {
    id: '2',
    name: 'Smartes Gadget Y',
    price: 49.95,
    image: '/images/gadget-y.jpg', // Bild aus public/images
    description: 'Ein unverzichtbares Gadget für den Alltag, klein, handlich und voller smarter Features. Perfekt für unterwegs.',
    details: 'Akkulaufzeit: 24h, Konnektivität: Bluetooth 5.0, kompatibel mit iOS & Android. Spritzwassergeschützt.',
  },
  {
    id: '3',
    name: 'Bio-Kaffee "Startup-Blend"',
    price: 15.50,
    image: '/images/coffee-blend.jpg', // Bild aus public/images
    description: 'Unser exklusiver Bio-Kaffee, perfekt für den Start in den Tag oder eine produktive Pause. Fair gehandelt und aromatisch.',
    details: '250g ganze Bohnen, 100% Arabica, Mittelamerika-Mischung. Röstgrad: Medium-Dark. Hinweise zur Zubereitung auf der Verpackung.',
  },
  {
    id: '4',
    name: 'Ergonomische Maus Z',
    price: 75.00,
    image: '/images/mouse-z.jpg', // Bild aus public/images
    description: 'Steigern Sie Ihre Produktivität und Komfort mit unserer ergonomischen Maus Z. Design für stundenlanges, ermüdungsfreies Arbeiten.',
    details: 'Optischer Sensor, 800-1600 DPI einstellbar, kabellos (2.4GHz), 2x AA Batterien inklusive. Kompatibel mit Windows, macOS, Linux.',
  },
];