import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { medNotFoundImgUrl } from "../../constants";
const MedDetailsCardError = () => {
  return (
    <>
      <div className="flex">
        <div className="w-1/3 p-4">
          <div className="flex flex-col justify-center">
            <Card className="bg-gray-50 border-2 p-4 rounded-lg shadow-md w-[380px]">
              <CardHeader>
                <CardTitle className="scroll-m-20 border-b flex pb-2 text-2xl font-semibold tracking-tight first:mt-0 justify-between">
                  <TriangleAlert className="mt-1 ml-6 mr-2 text-red-600" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex-1 text-red-600">
                          Medicine Not Found!
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>No medicine data is available</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex justify-center items-center">
                  <img
                    src={medNotFoundImgUrl}
                    alt="Error Image"
                    className="object-cover"
                  />
                </div>
                <CardDescription className="text-red-600 text-lg leading-7 mt-2">
                  <div className="inline-flex items-center text-red-600">
                    <span className="mr-1">
                      We couldn't fetch the details of the medicine. Please try
                      again later or check if the medicine exists.
                    </span>
                  </div>
                </CardDescription>
              </CardContent>

              <Separator className="my-4" />

              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <Link to="/home">
                    <Button variant={"blue"} className="ml-auto">
                      Go Back
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedDetailsCardError;
