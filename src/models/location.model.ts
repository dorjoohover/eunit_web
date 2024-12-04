export interface LocationModel {
  id: number;
  lat: number;
  lng: number;
  district: string;
  name: string;
  town: string;
  englishNameOfTown: string;
  city: string;
  khoroo: number;
  street?: string;
  no?: string;
  operation?: number;
  operationOrNot: boolean;
  count?: number;
}
