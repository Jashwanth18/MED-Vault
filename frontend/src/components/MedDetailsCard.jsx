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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MedDetailsCardLoading from "./MedDetailsCardLoading";
import useUserStore from "../../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getMedicineById } from "../api/medicineService";
import { Link } from "react-router-dom";
import MedDetailsCardError from "./MedDetailsCardError";
import { ScrollArea } from "@/components/ui/scroll-area";

const MedDetailsCard = ({ medId }) => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["medicines", medId],
    queryFn: () => getMedicineById(medId),
    enabled: true,
  });
  const medData = data?.data?.data || {};
  if (isLoading) return <MedDetailsCardLoading />;
  if (isError) return <MedDetailsCardError />;
  return (
    <>
      <div className="flex mb-10">
        <div className="w-full max-w-[380px] p-4">
          <div className="flex flex-col justify-center">
            <Card className="bg-gray-50 border-2 p-4 rounded-lg shadow-md w-full h-[500px]">
              <CardHeader>
                <CardTitle className="scroll-m-20 border-b flex pb-2 text-2xl font-semibold tracking-tight first:mt-0 justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-normal">
                          {medData.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{medData.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <blockquote className="text-lg font-medium mt-2 border-l-2 italic">
                    {medData.type}
                  </blockquote>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center h-[300px]">
                <div className="w-48 h-48 mb-2 overflow-hidden flex justify-center items-center">
                  <img
                    src={medData.displayImage}
                    alt={medData.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="mt-3 scroll-m-20 text-xl font-semibold tracking-tight text-center">
                  Description:
                </h4>
                <CardDescription className="text-black text-lg leading-7 h-30 overflow-hidden overflow-ellipsis">
                  <ScrollArea className="h-[250px] w-[350px] rounded-md p-4">
                    {medData.description}
                  </ScrollArea>
                </CardDescription>
              </CardContent>
              <Separator className="my-4" />
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <CardDescription className="text-left text-md text-muted-foreground">
                    Added by: {medData.createdBy?.userName}
                  </CardDescription>
                  {isAdmin && (
                    <Link to={`${location.pathname}/edit`}>
                      <Button variant={"blue"} className="ml-auto">
                        Edit
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedDetailsCard;
