import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { deleteStockRecord, getStockInfo } from "../api/medicineService";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useUserStore from "../../store/useUserStore";
import StockInfoTableLoading from "./StockInfoTableLoading";
import StockRecordItem from "./StockRecordItem";

export function StockInfoTable({ scrollToAddRecordDiv }) {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const { medId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["stockInfo", medId],
    queryFn: () => getStockInfo(medId),
  });
  const stockInfo = data?.data?.data || [];
  const deleteRecordMutation = useMutation({
    mutationFn: async (recordId) => await deleteStockRecord(medId, recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockInfo", medId] });
    },
  });

  if (isLoading) return <StockInfoTableLoading />;
  return (
    <>
      <div className="flex justify-center items-center w-full ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          Stock Information:
        </h3>
      </div>
      {stockInfo?.length ? (
        <Table className="border border-gray-300">
          <TableCaption>Stock Information</TableCaption>
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
            {stockInfo.map((stockRecord) => (
              <StockRecordItem
                key={stockRecord._id}
                stockRecord={stockRecord}
                medId={medId}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Alert variant="warning" className="max-w-md bg-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-lg">
                No Stock Information Available
              </AlertTitle>
              <AlertDescription className="text-md">
                There is currently no stock information to display. This could
                be due to an error or because no stocks have been added yet.
              </AlertDescription>
            </Alert>

            {isAdmin && (
              <div className="flex space-x-4">
                <Button
                  className="border-emerald-500 bg-emerald-500 hover:bg-emerald-400  hover:text-white text-white"
                  onClick={scrollToAddRecordDiv}
                >
                  Add New Stock Record
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
export default StockInfoTable;
