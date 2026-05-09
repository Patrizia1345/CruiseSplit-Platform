export interface Feature {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface Airline {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  heroVideo: string;
  heroImage: string;
  logoLetter: string;
  founded: string;
  ships: string;
  routes: string;
  priceFrom: string;
  features: Feature[];
  segmentsHref: string;
}
