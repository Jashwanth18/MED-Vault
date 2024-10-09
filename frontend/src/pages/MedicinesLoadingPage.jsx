import { Loader2 } from "lucide-react";
const MedicinesLoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        Loading Medicines...
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Please wait while we fetch the latest data.
      </p>
    </div>
  );
};

export default MedicinesLoadingPage;
