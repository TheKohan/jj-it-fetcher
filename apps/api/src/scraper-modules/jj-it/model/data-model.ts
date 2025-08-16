export interface JustJoinItDataModel {
  data: Offers[];
  meta: Meta;
}

export interface Offers {
  guid: string;
  slug: string;
  title: string;
  requiredSkills: string[];
  niceToHaveSkills: null;
  workplaceType: WorkplaceType;
  workingTime: WorkingTime;
  experienceLevel: ExperienceLevel;
  employmentTypes: EmploymentType[];
  categoryId?: number;
  locations: Location[];
  city: string;
  street: string;
  latitude: string;
  longitude: string;
  remoteInterview?: boolean;
  companyName: string;
  companyLogoThumbUrl: string;
  publishedAt?: string;
  openToHireUkrainians: boolean;
  languages: string[];
  employmentTypesSummary: EmploymentTypesSummary;
}

export interface EmploymentType {
  to: number | null;
  from: number | null;
  type: Type;
  unit: string;
  currency: Currency;
  gross?: boolean;
  fromChf: number | null;
  fromEur: number | null;
  fromGbp: number | null;
  fromPln: number | null;
  fromUsd: number | null;
  toChf: number | null;
  toEur: number | null;
  toGbp: number | null;
  toPln: number | null;
  toUsd: number | null;
}

export enum Currency {
  Pln = "pln",
}

export enum Type {
  Any = "any",
  B2B = "b2b",
  MandateContract = "mandate_contract",
  Permanent = "permanent",
}

export enum ExperienceLevel {
  CLevel = "c_level",
  Junior = "junior",
  Mid = "mid",
  Senior = "senior",
}

export interface Location {
  city: string;
  slug: string;
  street: string;
  latitude: number;
  longitude: number;
}

export interface EmploymentTypesSummary {
  min: number;
  max: number;
  currency: Currency;
  hasManyTypes: boolean;
}

export enum WorkingTime {
  FullTime = "full_time",
}

export enum WorkplaceType {
  Hybrid = "hybrid",
  Office = "office",
  Remote = "remote",
}

export interface Meta {
  page: number;
  totalItems: number;
  totalPages: number;
  prevPage: null;
  nextPage: number;
}
