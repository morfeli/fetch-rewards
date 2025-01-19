"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import Image from "next/image";
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
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ShadcnUI/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ShadcnUI/Command";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    breed: "",
    ageMin: "",
    ageMax: "",
  });
  const [sort, setSort] = useState("breed:asc");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const searchInputRef = useRef(null);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setShowAutocomplete(false);
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
        setTotalPages(data.total / 20);
      } catch (err) {
        setError("An error occurred while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, sort, filters],
  );

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId],
    );
  };

  const fetchBreeds = async () => {
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
    } catch (error) {
      setError(`Failed to load breeds: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMatch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(favorites),
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
    } catch (err) {
      setError("An error occurred while generating a match. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allBreeds.filter((breed) =>
        breed.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredBreeds(filtered);
      setShowAutocomplete(true);
    } else {
      setFilteredBreeds([]);
      setShowAutocomplete(false);
    }
  };

  const handleAutocompleteSelect = (breed: string) => {
    setSearchTerm(breed);
    setFilters((prev) => ({ ...prev, breed }));
    setShowAutocomplete(false);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const searchEvent = new Event(
      "submit",
    ) as unknown as React.FormEvent<HTMLFormElement>;
    handleSearch(searchEvent);
  }, [currentPage, sort, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Dog</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4 mb-4 relative" ref={searchInputRef}>
          <div className="flex-grow relative">
            <Popover open={showAutocomplete} onOpenChange={setShowAutocomplete}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Search for dogs..."
                    value={searchTerm}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pl-10"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
                align="start"
              >
                <Command className="w-full">
                  <CommandInput
                    placeholder="Search breeds..."
                    value={searchTerm}
                    onValueChange={handleSearchInputChange}
                    className="w-full bg-white border-none text-sm font-medium text-gray-700 focus:outline-none"
                  />
                  <CommandList>
                    <CommandEmpty>No breeds found.</CommandEmpty>
                    <CommandGroup>
                      {filteredBreeds.map((breed) => (
                        <CommandItem
                          key={breed}
                          onSelect={() => {
                            handleAutocompleteSelect(breed);
                            setShowAutocomplete(false);
                          }}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                        >
                          {breed}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mb-4">
          <div>
            <Label htmlFor="breed">Breed</Label>
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, breed: value }))
              }
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                {allBreeds.map((breed) => (
                  <SelectItem
                    key={breed}
                    value={breed}
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
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
              value={filters.ageMin}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, ageMin: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="ageMax">Max Age</Label>
            <Input
              type="number"
              id="ageMax"
              value={filters.ageMax}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, ageMax: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Select onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <SelectItem
                value="breed:asc"
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                Breed (A-Z)
              </SelectItem>
              <SelectItem
                value="breed:desc"
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                Breed (Z-A)
              </SelectItem>
              <SelectItem
                value="age:asc"
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                Age (Youngest)
              </SelectItem>
              <SelectItem
                value="age:desc"
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
              >
                Age (Oldest)
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={generateMatch}
            disabled={favorites.length === 0}
            className="bg-slate-700 text-white"
          >
            Generate Match
          </Button>
        </div>
      </form>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousAction={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNextAction={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
      />

      <Modal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
      >
        {matchedDog && (
          <>
            <h2 className="text-xl font-bold mb-4">Your Matched Dog!</h2>
            <Image
              src={matchedDog.img || "/placeholder.svg"}
              alt={matchedDog.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p>Name: {matchedDog.name}</p>
            <p>Breed: {matchedDog.breed}</p>
            <p>Age: {matchedDog.age}</p>
            <p>Zip Code: {matchedDog.zip_code}</p>
          </>
        )}
      </Modal>
      {matchedDog && (
        <Modal
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
          title="Your Perfect Match!"
        >
          <MatchedDogDetails
            dog={matchedDog}
            onClose={() => setIsMatchModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
