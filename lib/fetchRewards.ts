export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface LoginRequest {
  name: string;
  email: string;
}

export interface BreedsResponse {
  breeds: string[];
}

export interface DogSearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface FetchDogsRequest {
  ids: string[];
}

export interface FetchDogsResponse {
  dogs: Dog[];
}
