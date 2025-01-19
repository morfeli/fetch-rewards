import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dog } from "./fetchRewards";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = "https://frontend-take-home-service.fetch.com";

export async function searchDogs(params: {
  page: number;
  sort: string;
  breed?: string;
  ageMin?: string;
  ageMax?: string;
}): Promise<{ dogs: Dog[]; total: number }> {
  const { page, sort, breed, ageMin, ageMax } = params;
  const queryParams = new URLSearchParams({
    size: "20",
    from: ((page - 1) * 20).toString(),
    sort,
  });

  if (breed) queryParams.append("breeds", breed);
  if (ageMin) queryParams.append("ageMin", ageMin);
  if (ageMax) queryParams.append("ageMax", ageMax);

  const response = await fetch(`${BASE_URL}/dogs/search?${queryParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }

  const data = await response.json();
  const dogIds = data.resultIds;

  const dogsResponse = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dogIds),
  });

  if (!dogsResponse.ok) {
    throw new Error("Failed to fetch dog details");
  }

  const dogsData = await dogsResponse.json();
  return { dogs: dogsData, total: data.total };
}

export async function fetchBreeds(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch breeds from the server");
  }

  return res.json();
}

export async function generateMatch(favorites: string[]): Promise<Dog> {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(favorites),
  });

  if (!response.ok) {
    throw new Error("Failed to generate match");
  }

  const data = await response.json();
  const matchedDogResponse = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify([data.match]),
  });

  if (!matchedDogResponse.ok) {
    throw new Error("Failed to fetch matched dog details");
  }

  const matchedDogData = await matchedDogResponse.json();
  return matchedDogData[0];
}
