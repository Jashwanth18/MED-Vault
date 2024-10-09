import { Skeleton } from "@/components/ui/skeleton"; // Assuming Shadcn's Skeleton component
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const StockInfoTableLoading = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          Stock Information:
        </h3>
      </div>
      <Table className="border border-gray-300">
        <TableCaption>Loading stock information...</TableCaption>
        <TableHeader>
          <TableRow className="bg-teal-400 hover:bg-teal-500 hover:text-black text-lg">
            <TableHead className="w-[100px] text-white front-semibond shadow-sm ">
              Batch No.
            </TableHead>
            <TableHead className="text-white front-semibond shadow-sm  pl-20">
              Expiry Date
            </TableHead>
            <TableHead className="text-white front-semibond shadow-sm  pl-20">
              Quantity
            </TableHead>
            <TableHead className="text-white front-semibond shadow-sm  pl-20">
              Last Update by
            </TableHead>
            <TableHead className="text-right text-white front-semibond shadow-sm "></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-md">
          {[...Array(3)].map((_, index) => (
            <TableRow
              key={index}
              className="text-lg bg-[#b3e3e5] hover:bg-[#cbeaeb] transition-colors"
            >
              <TableCell className="font">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="pl-20">
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell className="pl-20">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="pl-20">
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-10" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default StockInfoTableLoading;
