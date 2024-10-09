import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
const EmptyMedicinePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Alert variant="destructive" className="mb-6 max-w-md w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Medicines Available</AlertTitle>
        <AlertDescription>
          We're sorry, but there are currently no medicines in stock.
        </AlertDescription>
      </Alert>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Out of Stock</h1>
        <p className="text-gray-600">
          Inventory is currently empty. Add medicines by clicking below...
        </p>
      </div>

      <Button variant="outline" onClick={() => navigate("/new-med")}>
        <CirclePlus className="h-4" />
        Add Medicine
      </Button>
    </div>
  );
};

export default EmptyMedicinePage;
