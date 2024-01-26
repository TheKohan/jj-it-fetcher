export interface JustJoinItDataModel {
  data: Offers[];
  meta: Meta;
}

export interface Offers {
  slug: string;
  title: string;
  requiredSkills: string[];
  niceToHaveSkills: null;
  workplaceType: WorkplaceType;
  workingTime: WorkingTime;
  experienceLevel: ExperienceLevel;
  employmentTypes: EmploymentType[];
  categoryId: number;
  multilocation: Multilocation[];
  city: string;
  street: string;
  latitude: string;
  longitude: string;
  remoteInterview: boolean;
  companyName: string;
  companyLogoThumbUrl: string;
  publishedAt: string;
  openToHireUkrainians: boolean;
}

export interface EmploymentType {
  to: number | null;
  from: number | null;
  type: Type;
  to_chf: number | null;
  to_eur: number | null;
  to_gbp: number | null;
  to_pln: null | number;
  to_usd: number | null;
  currency: Currency;
  from_chf: number | null;
  from_eur: number | null;
  from_gbp: number | null;
  from_pln: null | number;
  from_usd: number | null;
  gross?: boolean;
}

export enum Currency {
  Pln = 'pln',
}

export enum Type {
  Any = 'any',
  B2B = 'b2b',
  MandateContract = 'mandate_contract',
  Permanent = 'permanent',
}

export enum ExperienceLevel {
  CLevel = 'c_level',
  Junior = 'junior',
  Mid = 'mid',
  Senior = 'senior',
}

export interface Multilocation {
  city: string;
  slug: string;
  street: string;
  latitude: number;
  longitude: number;
}

export enum WorkingTime {
  FullTime = 'full_time',
}

export enum WorkplaceType {
  Hybrid = 'hybrid',
  Office = 'office',
  Remote = 'remote',
}

export interface Meta {
  page: number;
  totalItems: number;
  totalPages: number;
  prevPage: null;
  nextPage: number;
}
