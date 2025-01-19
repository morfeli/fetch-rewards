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
    <Card key={dog.id}>
      <CardContent className="p-4">
        <Image
          src={dog.img}
          alt={dog.name}
          className="w-full h-48 object-cover rounded-md mb-4"
          width={300}
          height={200}
        />
        <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
        <p className="text-gray-600 mb-2">Breed: {dog.breed}</p>
        <p className="text-gray-600 mb-2">Age: {dog.age} years</p>
        <p className="text-gray-600 mb-4">Zip Code: {dog.zip_code}</p>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onToggleFavorite(dog.id)}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${
              isFavorite ? "fill-current text-red-500" : ""
            }`}
          />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
}
