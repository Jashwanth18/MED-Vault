import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MedDetailsCardLoading = () => {
  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <div className="flex flex-col justify-center">
          <Card className="bg-gray-50 border-2 p-4 rounded-lg shadow-md w-[380px]">
            <CardHeader>
              <Skeleton className="h-10 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-52 w-full mb-4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full mt-3" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <Separator className="my-4" />
            <CardFooter>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-20 ml-auto" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedDetailsCardLoading;
