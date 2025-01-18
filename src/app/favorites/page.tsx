"use client";

import { useState, useEffect } from "react";

import { Heart } from "lucide-react";
import { Card, CardContent } from "@/app/components/ShadcnUI/Card";
import { Button } from "@/app/components/ShadcnUI/Button";
import Image from "next/image";

type Dog = {
  id: string;
  name: string;
  breed: string;
  age: number;
  image: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch the favorites from an API or local storage
    const dummyFavorites: Dog[] = [
      {
        id: "dog-1",
        name: "Buddy",
        breed: "Labrador Retriever",
        age: 3,
        image: "/placeholder.svg?text=Buddy",
      },
      {
        id: "dog-2",
        name: "Max",
        breed: "German Shepherd",
        age: 2,
        image: "/placeholder.svg?text=Max",
      },
      {
        id: "dog-3",
        name: "Charlie",
        breed: "Golden Retriever",
        age: 4,
        image: "/placeholder.svg?text=Charlie",
      },
    ];
    setFavorites(dummyFavorites);
  }, []);

  const removeFavorite = (dogId: string) => {
    setFavorites((prev) => prev.filter((dog) => dog.id !== dogId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Dogs</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any dogs to your favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dog) => (
            <Card key={dog.id}>
              <CardContent className="p-4">
                <Image
                  src={dog.image || "/placeholder.svg"}
                  alt={dog.name}
                  width={8}
                  height={8}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
                <p className="text-gray-600 mb-2">Breed: {dog.breed}</p>
                <p className="text-gray-600 mb-4">Age: {dog.age} years</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => removeFavorite(dog.id)}
                >
                  <Heart className="mr-2 h-4 w-4 fill-current text-red-500" />
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
