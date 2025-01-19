"use client";

import { useEffect, useState, useCallback } from "react";

import { Input } from "../components/ShadcnUI/Input";
import { Button } from "../components/ShadcnUI/Button";
import { Label } from "../components/ShadcnUI/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ShadcnUI/Select";
import { DogCard } from "../components/UI/DogCard";
import { PaginationButtons } from "../components/UI/Pagination";
import { Modal } from "../components/ShadcnUI/Modal";
import { Dog } from "../../../lib/fetchRewards";
import { MatchedDogDetails } from "../components/UI/MatchedDogDetails";

import AuthCheck from "../components/UI/AuthCheck";
import { DogCardSkeleton } from "../components/UI/DogCardSkeleton";

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    breed: "",
    ageMin: "",
    ageMax: "",
  });
  const [sort, setSort] = useState("breed:asc");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allBreeds, setAllBreeds] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<Dog[]>([]);

  const [favorites, setFavorites] = useState<Dog[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const [showSkeletons, setShowSkeletons] = useState(true);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?size=20&from=${
            (currentPage - 1) * 20
          }&sort=${sort}${filters.breed ? `&breeds=${filters.breed}` : ""}${
            filters.ageMin ? `&ageMin=${filters.ageMin}` : ""
          }${filters.ageMax ? `&ageMax=${filters.ageMax}` : ""}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dogs");
        }

        const data = await response.json();
        const dogIds = data.resultIds;

        const dogsResponse = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dogIds),
          },
        );

        if (!dogsResponse.ok) {
          throw new Error("Failed to fetch dog details");
        }

        const dogsData = await dogsResponse.json();
        setSearchResults(dogsData);
        setTotalPages(Math.ceil(data.total / 20));
      } catch (error: unknown) {
        setError(`Failed to load dogs: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, sort, filters],
  );

  const toggleFavorite = useCallback((dog: Dog) => {
    setFavorites((prev) => {
      const dogIndex = prev.findIndex((favorite) => favorite.id === dog.id);

      if (dogIndex !== -1) {
        // Dog is already in favorites, remove it
        const newFavorites = [...prev];
        newFavorites.splice(dogIndex, 1);
        localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
        return newFavorites;
      } else {
        // Dog is not in favorites, add it
        const newFavorites = [...prev, dog];
        localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
        return newFavorites;
      }
    });
  }, []);

  const fetchBreeds = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch breeds from the server");
      }

      setAllBreeds(data);
    } catch (error: unknown) {
      setError(`Failed to load breeds: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateMatch = useCallback(async () => {
    if (favorites.length === 0) {
      console.warn("No favorites to match with.");
      return;
    }

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(favorites.map((dog) => dog.id)),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate match");
      }

      const data = await response.json();
      const matchedDogResponse = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify([data.match]),
        },
      );

      if (!matchedDogResponse.ok) {
        throw new Error("Failed to fetch matched dog details");
      }

      const matchedDogData = await matchedDogResponse.json();
      setMatchedDog(matchedDogData[0]);
      setIsMatchModalOpen(true);
    } catch (error: unknown) {
      setError(
        `An error occured trying to find a match: ${(error as Error).message}`,
      );
    }
  }, [favorites]);

  useEffect(() => {
    fetchBreeds();

    const timer = setTimeout(() => {
      setShowSkeletons(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fetchBreeds]);

  useEffect(() => {
    const searchEvent = new Event(
      "submit",
    ) as unknown as React.FormEvent<HTMLFormElement>;
    handleSearch(searchEvent);
  }, [currentPage, sort, handleSearch]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("dogFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  return (
    <AuthCheck>
      <div className="max-w-[1000px] mx-auto px-4 py-8 fade-in">
        <h1
          className="text-3xl font-bold mb-6"
          aria-label="Find Your Perfect Dog Title"
        >
          Find Your Perfect Dog
        </h1>
        <form
          onSubmit={handleSearch}
          className="mb-8"
          aria-label="Dog search form"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="breed">Breed</Label>
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, breed: value }))
                }
                aria-label="Select dog breed"
              >
                <SelectTrigger
                  className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Breed selection dropdown"
                >
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                  {allBreeds.map((breed) => (
                    <SelectItem
                      key={breed}
                      value={breed}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                      aria-label={`Select ${breed} breed`}
                    >
                      {breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ageMin">Min Age</Label>
              <Input
                type="number"
                id="ageMin"
                min="0"
                value={filters.ageMin}
                className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, ageMin: e.target.value }))
                }
                aria-label="Enter minimum age for dog search"
              />
            </div>
            <div>
              <Label htmlFor="ageMax">Max Age</Label>
              <Input
                type="number"
                id="ageMax"
                value={filters.ageMax}
                className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, ageMax: e.target.value }))
                }
                aria-label="Enter maximum age for dog search"
              />
            </div>
          </div>
          <div
            className="flex justify-between items-center"
            aria-label="Search options"
          >
            <Select
              onValueChange={(value) => setSort(value)}
              aria-label="Sort dog search results"
            >
              <SelectTrigger
                className="w-[180px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Sort criteria dropdown"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <SelectItem
                  value="breed:asc"
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                  aria-label="Sort by breed in ascending order"
                >
                  Breed (A-Z)
                </SelectItem>
                <SelectItem
                  value="breed:desc"
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                  aria-label="Sort by breed in descending order"
                >
                  Breed (Z-A)
                </SelectItem>
                <SelectItem
                  value="age:asc"
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                  aria-label="Sort by age from youngest to oldest"
                >
                  Age (Youngest)
                </SelectItem>
                <SelectItem
                  value="age:desc"
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                  aria-label="Sort by age from oldest to youngest"
                >
                  Age (Oldest)
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={generateMatch}
              disabled={favorites.length === 0}
              className="bg-slate-700 text-white"
              aria-label="Generate a match based on your favorite dogs"
            >
              Generate Match
            </Button>
          </div>
        </form>

        {error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
            aria-live="polite"
          >
            <p>{error}</p>
          </div>
        ) : showSkeletons || isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Loading dog cards"
          >
            {[...Array(12)].map((_, index) => (
              <DogCardSkeleton key={index} aria-label="Skeleton of dog card" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Dog search results"
          >
            {searchResults.length > 0
              ? searchResults.map((dog) => (
                  <DogCard
                    key={dog.id}
                    dog={dog}
                    isFavorite={favorites.some((fav) => fav.id === dog.id)}
                    onToggleFavorite={() => toggleFavorite(dog)}
                    aria-label={`Details for ${dog.name}, a ${dog.breed}`}
                  />
                ))
              : null}
          </div>
        )}

        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousAction={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          onNextAction={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          aria-label="Pagination controls for dog search results"
        />

        {matchedDog && (
          <Modal
            isOpen={isMatchModalOpen}
            onClose={() => setIsMatchModalOpen(false)}
            title="Your Perfect Match!"
            aria-label="Modal showing your matched dog"
          >
            <MatchedDogDetails
              dog={matchedDog}
              onClose={() => setIsMatchModalOpen(false)}
              aria-label={`Details of your matched dog, ${matchedDog.name}`}
            />
          </Modal>
        )}
      </div>
    </AuthCheck>
  );
}
