import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, History } from "lucide-react";
import * as XLSX from "xlsx";
import { getInventoryLog } from "../api/inventoryService";
import { useQuery } from "@tanstack/react-query";
import Filter from "../components/Filter";
import { formatDate } from "../utils/dateFormatter";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { months, years } from "../../constants";
import { SeparatorHorizontal } from "lucide-react";
import InventoryLogLoadingPage from "./InventoryLogLoadingPage";
import InventoryLogErrorPage from "./InventoryLogErrorPage";
import EmptyInventoryLogPage from "./EmptyInventoryLogPage";
import { useState } from "react";

function InventoryLogPage() {
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    search: "",
  });

  const { data, refetch, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["inventory-log"],
    queryFn: () => getInventoryLog(filters),
    enabled: true,
  });

  const exportToExcel = () => {
    const inventoryLogList = data?.data?.data || [];
    console.log(inventoryLogList);

    const formattedData = inventoryLogList.map((logRecord) => ({
      "Medicine Name": logRecord.medicineId?.name,
      Quantity: logRecord.quantity,
      "Batch No": logRecord.batchNumber,
      "Expiry Date": formatDate(logRecord.expiryDate),
      "Updated On": formatDate(logRecord.updatedAt),
      "Updated By": logRecord.updatedBy.userName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Log");

    XLSX.writeFile(workbook, "inventory-log.xlsx");
  };

  const inventoryLogList = data?.data?.data || [];

  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, search: value.target.value }));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await refetch();
    setFilters({ year: "", month: "", search: "" });
  };

  if (isFetching) {
    return <InventoryLogLoadingPage />;
  }
  if (isError) {
    return <InventoryLogErrorPage error={error} />;
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <History className="w-4" />
            Inventory Log
          </h1>
        </div>

        <Button className="mt-8" onClick={exportToExcel}>
          <FileDown className="h-5 mr-1" />
          Export
        </Button>
      </div>
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

        <div className="flex justify-between items-center max-w-lg mx-auto space-x-4">
          <Filter options={years} onChange={handleFilterChange} name="Year" />
          <Filter options={months} onChange={handleFilterChange} name="Month" />
        </div>
      </form>
      {inventoryLogList?.length ? (
        <Table>
          <TableCaption>Stock info</TableCaption>
          <TableHeader>
            <TableRow className="bg-black hover:bg-gray-800">
              <TableHead className="text-white">Medicine Name</TableHead>
              <TableHead className="text-white">Quantity</TableHead>
              <TableHead className="text-white">Batch No.</TableHead>
              <TableHead className="text-white">Expiry Date</TableHead>
              <TableHead className="text-white">Recorded On</TableHead>

              <TableHead className="text-right text-white">
                Updated By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryLogList?.map((logRecord) => (
              <TableRow
                className={
                  logRecord.quantity < 0
                    ? "bg-red-400 hover:bg-red-300"
                    : "bg-green-400 hover:bg-green-300"
                }
                key={logRecord._id}
              >
                <TableCell className="font-medium">
                  {logRecord.medicineId?.name}
                </TableCell>
                <TableCell>
                  {logRecord.quantity > 0 ? "+" : ""}
                  {logRecord.quantity}
                </TableCell>
                <TableCell>{logRecord.batchNumber}</TableCell>
                <TableCell>{formatDate(logRecord.expiryDate)}</TableCell>
                <TableCell>{formatDate(logRecord.updatedAt)}</TableCell>
                <TableCell className="text-right">
                  {logRecord.updatedBy.userName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyInventoryLogPage />
      )}
    </>
  );
}

export default InventoryLogPage;
