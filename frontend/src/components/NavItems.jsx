import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

function NavItems() {
  const isAdmin = useUserStore((store) => store.isAdmin);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/home">
            <Button className="border border-white hover:bg-white hover:text-black bg-teal-600 mx-2">
              All Medicines
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View all medicines</p>
        </TooltipContent>
      </Tooltip>

      {isAdmin && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/new-med">
              <Button className="border border-white hover:bg-white hover:text-black bg-teal-600 mx-2">
                Add Medicine
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add a new medicine</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/inventory-log">
            <Button className="border border-white hover:bg-white hover:text-black bg-teal-600 mx-2">
              Inventory Log
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View stock update history</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default NavItems;
