"use client";

import { useState } from "react";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Input } from "../components/ShadcnUI/Input";
import { Button } from "../components/ShadcnUI/Button";
import { Checkbox } from "../components/ShadcnUI/Checkbox";
import { Label } from "../components/ShadcnUI/Label";
import { Card, CardContent } from "../components/ShadcnUI/Card";

// This would typically come from an API
const dogBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "French Bulldog",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Pointer",
  "Dachshund",
];

type Dog = {
  id: string;
  name: string;
  breed: string;
  age: number;
  image: string;
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    puppy: false,
    shortHair: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate some dummy results based on the search term
      const results: Dog[] = Array.from({ length: 10 }, (_, i) => ({
        id: `dog-${i}`,
        name: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Dog ${i + 1}`,
        breed: dogBreeds[Math.floor(Math.random() * dogBreeds.length)],
        age: Math.floor(Math.random() * 10) + 1,
        image: `/placeholder.svg?text=Dog${i + 1}`,
      }));

      setSearchResults(results);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId],
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Dog</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Search for dogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="puppy"
              checked={filters.puppy}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, puppy: checked as boolean }))
              }
            />
            <Label htmlFor="puppy">Puppy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="shortHair"
              checked={filters.shortHair}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({
                  ...prev,
                  shortHair: checked as boolean,
                }))
              }
            />
            <Label htmlFor="shortHair">Short Hair</Label>
          </div>
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
          <Card key={dog.id}>
            <CardContent className="p-4">
              <Image
                src={dog.image || "/placeholder.svg"}
                alt={dog.name}
                className="w-full h-48 object-cover rounded-md mb-4"
                width={20}
              />
              <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
              <p className="text-gray-600 mb-2">Breed: {dog.breed}</p>
              <p className="text-gray-600 mb-4">Age: {dog.age} years</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toggleFavorite(dog.id)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${favorites.includes(dog.id) ? "fill-current text-red-500" : ""}`}
                />
                {favorites.includes(dog.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
