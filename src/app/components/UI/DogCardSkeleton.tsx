import { Card, CardContent } from "../ShadcnUI/Card";
import { Skeleton } from "../ShadcnUI/Skeleton";

export function DogCardSkeleton() {
  return (
    <Card className="bg-slate-100 border border-slate-200 shadow-sm">
      <CardContent className="p-4">
        <Skeleton className="w-full h-48 bg-slate-200 rounded-md mb-4" />
        <Skeleton className="h-6 w-3/4 bg-slate-300 mb-2" />
        <Skeleton className="h-4 w-1/2 bg-slate-300 mb-2" />
        <Skeleton className="h-4 w-1/2 bg-slate-300 mb-2" />
        <Skeleton className="h-4 w-1/2 bg-slate-300 mb-4" />
        <Skeleton className="h-10 w-full bg-slate-400" />
      </CardContent>
    </Card>
  );
}
