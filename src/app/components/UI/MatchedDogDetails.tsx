import Image from "next/image";
import { Button } from "../ShadcnUI/Button";
import { Dog } from "../../../../lib/fetchRewards";

interface MatchedDogDetailsProps {
  dog: Dog;
  onClose: () => void;
}

export function MatchedDogDetails({ dog, onClose }: MatchedDogDetailsProps) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={dog.img}
        alt={dog.name}
        width={200}
        height={200}
        className="rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
      <p className="text-gray-600 mb-2">Breed: {dog.breed}</p>
      <p className="text-gray-600 mb-2">Age: {dog.age} years</p>
      <p className="text-gray-600 mb-4">Zip Code: {dog.zip_code}</p>
      <Button onClick={onClose} className="mt-4">
        Close
      </Button>
    </div>
  );
}
