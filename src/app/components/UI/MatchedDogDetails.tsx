import Image from "next/image";

import { Dog } from "../../../../lib/fetchRewards";
import { Card, CardContent } from "../ShadcnUI/Card";
import { Button } from "../ShadcnUI/Button";

interface MatchedDogDetailsProps {
  dog: Dog;
  onClose: () => void;
}

export function MatchedDogDetails({ dog, onClose }: MatchedDogDetailsProps) {
  return (
    <Card
      className="fade-in max-w-sm w-full mx-auto border"
      aria-label={`Matched dog details for ${dog.name}`}
    >
      <CardContent className="p-4">
        <Image
          src={dog.img}
          alt={dog.name}
          width={300}
          height={200}
          className="w-full h-60 object-cover rounded-lg mb-4"
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
          onClick={onClose}
          aria-label="Close matched dog details"
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );
}
