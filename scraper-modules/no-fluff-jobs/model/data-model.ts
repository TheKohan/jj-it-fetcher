export interface NoFluffJobs {
  criteriaSearch: { [key: string]: CriteriaSearch[] };
  postings: Posting[];
  totalCount: number;
  totalPages: number;
  exactMatchesPages: number;
  rawSearch: string;
  locationCriteria: boolean;
  divs: number;
  additionalSearch: any[];
}

export enum CriteriaSearch {
  B2B = 'b2b',
}

export interface Posting {
  id: string;
  name: string;
  location: Location;
  posted: number;
  renewed?: number;
  title: string;
  logo: { [key: string]: string };
  category: string;
  seniority: Seniority[];
  url: string;
  regions: Region[];
  fullyRemote: boolean;
  salary: Salary;
  flavors: Flavor[];
  topInSearch: boolean;
  highlighted: boolean;
  help4Ua: boolean;
  reference: string;
  searchBoost: boolean;
  onlineInterviewAvailable: boolean;
  tiles: Tiles;
  technology?: string;
}

export enum Flavor {
  Business = 'business',
  It = 'it',
}

export interface Location {
  places: Place[];
  fullyRemote: boolean;
  covidTimeRemotely: boolean;
}

export interface Place {
  country?: Country;
  city?: City;
  street?: string;
  postalCode?: PostalCode;
  url: string;
  geoLocation?: GeoLocation;
  province?: Province;
  provinceOnly?: boolean;
}

export enum City {
  Berlin = 'Berlin',
  Gdańsk = 'Gdańsk',
  Kraków = 'Kraków',
  Kyiv = 'Kyiv',
  Poznań = 'Poznań',
  Remote = 'Remote',
  Warsaw = 'Warsaw',
  Warszawa = 'Warszawa',
}

export interface Country {
  code: Region;
  name: Name;
}

export enum Region {
  Deu = 'DEU',
  Pl = 'pl',
  Pol = 'POL',
  Ua = 'ua',
}

export enum Name {
  Germany = 'Germany',
  Poland = 'Poland',
  Polish = 'Polish',
  Ukrainian = 'Ukrainian',
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export enum PostalCode {
  Empty = '',
  The00121 = '00-121',
  The00805 = '00-805',
  The00838 = '00-838',
  The01020 = '01-020',
  The31401Kraków = '31-401 Kraków',
  The60363 = '60-363',
}

export enum Province {
  GreaterPoland = 'greater-poland',
  HolyCross = 'holy-cross',
  KuyavianPomeranian = 'kuyavian-pomeranian',
  LesserPoland = 'lesser-poland',
  Lodz = 'lodz',
  LowerSilesian = 'lower-silesian',
  Lublin = 'lublin',
  Lubusz = 'lubusz',
  Masovian = 'masovian',
  Opole = 'opole',
  Podlaskie = 'podlaskie',
  Pomeranian = 'pomeranian',
  Silesian = 'silesian',
  Subcarpathian = 'subcarpathian',
  WarmianMasurian = 'warmian-masurian',
  WestPomeranian = 'west-pomeranian',
}

export interface Salary {
  from: number;
  to: number;
  type: CriteriaSearch;
  currency: Currency;
}

export enum Currency {
  Pln = 'PLN',
}

export enum Seniority {
  Expert = 'Expert',
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
}

export interface Tiles {
  values: Value[];
}

export interface Value {
  value: string;
  type: Type;
}

export enum Type {
  Category = 'category',
  JobLanguage = 'jobLanguage',
  Requirement = 'requirement',
}
