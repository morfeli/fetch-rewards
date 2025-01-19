import Image from "next/image";
import { Card, CardContent } from "../ShadcnUI/Card";
import { Button } from "../ShadcnUI/Button";
import { Heart } from "lucide-react";
import { Dog } from "../../../../lib/fetchRewards";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

export function DogCard({ dog, isFavorite, onToggleFavorite }: DogCardProps) {
  return (
    <Card
      key={dog.id}
      className="shadow-lg shadow-slate-500 hover:scale-105 transition-all duration-300 bg-white fade-in"
      aria-label={`Dog card for ${dog.name}`}
    >
      <CardContent className="p-4">
        <Image
          src={dog.img}
          alt={dog.name}
          className="w-full h-60 object-cover rounded-lg mb-4"
          width={300}
          height={200}
          aria-label={`Image of ${dog.name}, a ${dog.breed}`}
        />
        <h2
          className="text-xl font-semibold mb-2"
          aria-label={`Name: ${dog.name}`}
        >
          {dog.name}
        </h2>
        <p className="text-gray-600 mb-2" aria-label={`Breed: ${dog.breed}`}>
          Breed: {dog.breed}
        </p>
        <p className="text-gray-600 mb-2" aria-label={`Age: ${dog.age} years`}>
          Age: {dog.age} years
        </p>
        <p
          className="text-gray-600 mb-4"
          aria-label={`Zip Code: ${dog.zip_code}`}
        >
          Zip Code: {dog.zip_code}
        </p>
        <Button
          variant="outline"
          className="w-full bg-slate-500 text-white"
          onClick={() => onToggleFavorite(dog.id)}
          aria-label={
            isFavorite
              ? `Remove ${dog.name} from favorites`
              : `Add ${dog.name} to favorites`
          }
        >
          <Heart
            className={`mr-2 h-4 w-4 ${
              isFavorite ? "fill-current text-red-500" : ""
            }`}
            aria-label={
              isFavorite ? "Favorite icon filled" : "Favorite icon outline"
            }
          />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
}
