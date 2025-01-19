"use client";

import { useState, useEffect } from "react";
import { Dog } from "../../../lib/fetchRewards";
import { DogCard } from "../components/UI/DogCard";
import AuthCheck from "../components/UI/AuthCheck";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("dogFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((dog) => dog.id !== dogId);
      localStorage.setItem("dogFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <AuthCheck>
      <section className="max-w-[1000px] flex flex-col items-center mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Your Favorite Dogs</h2>
        {favorites.length === 0 ? (
          <p>You haven't added any dogs to your favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </AuthCheck>
  );
}
