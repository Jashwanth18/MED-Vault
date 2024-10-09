import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "../api/medicineService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Filter from "../components/Filter";
import { medicineTypes } from "../../constants";
import { Link } from "react-router-dom";
import EmptyMedicinePage from "./EmptyMedicinePage";
import MedicinesLoadingPage from "./MedicinesLoadingPage";
import MedicinesErrorPage from "./MedicinesErrorPage";
import { useState } from "react";

const MedicinesPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
  });

  const { data, refetch, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => await getMedicines(filters),
    enabled: true,
  });

  const medicinesList = data?.data?.data || [];

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value.target.value }));
  };

  const handleChangeFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch();
    setFilters({
      search: "",
      type: "",
    });
  };

  if (isFetching) return <MedicinesLoadingPage />;
  if (isError) return <MedicinesErrorPage error={error} />;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="relative flex-1 ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medicines..."
            className="appearance-none bg-background pl-8 pr-3 shadow-none md:w-2/3 lg:w-2/3"
            onChange={handleSearchChange}
          />
        </div>
        <Filter
          onChange={handleChangeFilter}
          options={medicineTypes}
          name="Type"
        />
      </form>

      {medicinesList.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {medicinesList?.map((medicine) => {
            return (
              <Card key={medicine._id}>
                <CardHeader>
                  <Link to={`/medicines/${medicine._id}`}>
                    <CardTitle className="text-lg font-semibold">
                      {medicine.name}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <img src={medicine.displayImage} alt={medicine.name} />
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    {medicine.description.substring(0, 36) + "..."}
                  </CardDescription>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyMedicinePage />
      )}
    </>
  );
};

export default MedicinesPage;
