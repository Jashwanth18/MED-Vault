import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
const InventoryLogErrorPage = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <Alert variant="destructive" className="mb-6 max-w-md w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error?.message || "An unexpected error occurred."}
      </AlertDescription>
    </Alert>
    <Button
      variant="outline"
      size="lg"
      onClick={() => window.location.reload()}
    >
      <RefreshCcw className="h-4" />
      Try Again
    </Button>
  </div>
);

export default InventoryLogErrorPage;
