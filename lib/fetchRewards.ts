export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
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

// Fetch dogs by IDs
export interface FetchDogsRequest {
  ids: string[];
}

export interface FetchDogsResponse {
  dogs: Dog[];
}

export interface MatchRequest {
  dogIds: string[];
}

export interface MatchResponse {
  match: string;
}

export interface FetchLocationsRequest {
  zipCodes: string[];
}

export interface FetchLocationsResponse {
  locations: Location[];
}
