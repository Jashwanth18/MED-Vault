import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const EmptyInventoryLogPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Alert variant="outline" className="mb-6 max-w-md w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Inventory Logs Available</AlertTitle>
        <AlertDescription></AlertDescription>
      </Alert>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          No Inventory Logs{" "}
        </h1>
        <p className="text-gray-600">Try searching with other filters</p>
      </div>

      <Button variant="outline" onClick={() => window.location.reload()}>
        <RefreshCcw className="h-4" />
        Reload
      </Button>
    </div>
  );
};

export default EmptyInventoryLogPage;
