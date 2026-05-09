import type { Airline } from "./types";

export const AIRLINES: Airline[] = [
  {
    id: "viking",
    name: "Viking River Cruises",
    tagline: "World's #1 River Cruise Line",
    description:
      "Viking verbindet Europas schönste Städte auf dem Wasserweg. Mit eleganten Longships, kultureller Tiefe und skandinavischem Design redefiniert Viking die Flusskreuzfahrt.",
    color: "#8B1A1A",
    accentColor: "#C53030",
    heroVideo: "/viking-hero.mp4",
    heroImage: "/rhine-cruise.jpg",
    logoLetter: "V",
    founded: "1997",
    ships: "80+",
    routes: "Rhein, Donau, Elbe",
    priceFrom: "249",
    features: [
      {
        number: "01",
        title: "Veranda-Kabinen",
        description:
          "205 qm Luxus mit privatem Balkon, beheiztem Boden und Panoramablick auf den Rhein. Jede Kabine ein Rückzugsort.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      },
      {
        number: "02",
        title: "Aquavit Terrace",
        description:
          "Das einzigartige Freiluft-Restaurant am Bug – Mahlzeiten mit Panoramablick, frische Luft und das Rauschen des Rheins.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      },
      {
        number: "03",
        title: "Panorama-Lounge",
        description:
          "Raumhohe Fenster, skandinavisches Design, die beste Aussicht auf dem Fluss. Ideal zum Arbeiten, Entspannen oder Genießen.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      },
      {
        number: "04",
        title: "Kulturelle Ausflüge",
        description:
          "Geführte Stadttouren inklusive in jedem Hafen – Kölner Dom, Marksburg, Straßburger Münster.",
        image: "/koblenz.jpg",
      },
      {
        number: "05",
        title: "Rhine Getaway",
        description:
          "Amsterdam → Basel durch 4 Länder, 8 UNESCO-Highlights – oder einzelne Segmente ab 1 Tag.",
        image: "/ko_ln.jpg",
      },
    ],
    segmentsHref: "/viking",
  },
  // Weitere Reedereien hier ergänzen:
  // { id: "aida", ... },
  // { id: "msc", ... },
];
