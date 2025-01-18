import { Avatar, AvatarFallback, AvatarImage } from "../ShadcnUI/Avatar";
import { Card, CardContent } from "../ShadcnUI/Card";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

export function TeamMember({
  name,
  role,
  image,
  description,
}: TeamMemberProps) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">{role}</p>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
