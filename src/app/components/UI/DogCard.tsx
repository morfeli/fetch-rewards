import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ShadcnUI/Card";
import { Button } from "../ShadcnUI/Button";

interface DogCardProps {
  dog: {
    id: string;
    name: string;
    breed: string;
    age: number;
    image: string;
  };
  onRemove: () => void;
}

export function DogCard({ dog, onRemove }: DogCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={dog.image || "/placeholder.svg"}
            alt={dog.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
          <p className="text-gray-600">{dog.breed}</p>
          <p className="text-gray-600">{dog.age} years old</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onRemove} className="w-full">
          Remove from Favorites
        </Button>
      </CardFooter>
    </Card>
  );
}
