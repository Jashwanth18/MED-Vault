import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteStockRecord, updateStockRecord } from "../api/medicineService";
import { formatDate } from "../utils/dateFormatter";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StockRecordItem = ({ stockRecord, medId }) => {
  const queryClient = useQueryClient();
  const [isRecordEditable, setIsRecordEditable] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const deleteRecordMutation = useMutation({
    mutationFn: async (recordId) => await deleteStockRecord(medId, recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockInfo", medId] });
    },
  });
  const handleDelete = async (recordId) => {
    console.log(recordId, "DELETING");

    const deleteRecordPromise = deleteRecordMutation.mutateAsync(recordId);
    await toast.promise(deleteRecordPromise, {
      loading: "Deleting stock record...",
      success: (data) => {
        console.log(data, "DATAAA");
        return data?.data?.message || "Successfully deleted record!!";
      },
      error: (error) => {
        console.log(error, "ERRORRR");
        return (
          error.response?.data?.message ||
          error.message ||
          "Something went wrong!"
        );
      },
    });
  };

  const updateRecordMutation = useMutation({
    mutationFn: async ({ recordId, updatedRecordData }) =>
      await updateStockRecord(medId, recordId, updatedRecordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockInfo", medId] });
    },
  });

  const handleUpdate = async (recordId) => {
    console.log("MEEEFRRRR");
    console.log(updatedQuantity, "UPDATED");
    if (updatedQuantity < 0) {
      toast.error("Quantity cannot be negative!");
    } else if (updatedQuantity === 0) {
      console.log("HIIIi");
      await handleDelete(recordId);
    } else if (updatedQuantity === currentQuantity) {
      console.log("YOOOOo");
      setIsRecordEditable(false);
      return;
    } else {
      const updateRecordPromise = updateRecordMutation.mutateAsync({
        recordId,
        updatedRecordData: {
          quantity: Number(updatedQuantity),
        },
      });
      await toast.promise(updateRecordPromise, {
        loading: "Updating stock record...",
        success: (data) => {
          console.log(data, "MEE");
          return (
            data?.data?.message || "Successfully updated the stock record!"
          );
        },
        error: (error) => {
          console.log(error);
          return error.response?.data?.message || "Something went wrong!";
        },
      });
    }
    setIsRecordEditable(false);
    console.log(updatedQuantity);
  };

  return (
    <>
      <TableRow
        key={stockRecord._id}
        className="text-lg bg-[#b3e3e5]  hover:bg-[#cbeaeb] transition-colors"
      >
        <TableCell className="font">{stockRecord.batchNumber}</TableCell>
        <TableCell className="pl-20">
          {formatDate(stockRecord.expiryDate)}
        </TableCell>
        {!isRecordEditable ? (
          <TableCell className="pl-20">{stockRecord.quantity}</TableCell>
        ) : (
          <TableCell>
            <Input
              onChange={(e) => {
                setUpdatedQuantity(Number(e.target.value));
              }}
              type="Number"
              className="bg-white"
              value={updatedQuantity}
            />
          </TableCell>
        )}
        <TableCell className="pl-20">
          {stockRecord.updatedBy.userName}
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex justify-center">
                Actions
              </DropdownMenuLabel>
              <Separator className="mb-2" />
              <Button
                variant={isRecordEditable ? "green" : "blue"}
                disabled={updateRecordMutation.isPending}
                onClick={() => {
                  if (isRecordEditable) {
                    handleUpdate(stockRecord._id);
                  } else {
                    setUpdatedQuantity(Number(stockRecord.quantity));
                    setCurrentQuantity(Number(stockRecord.quantity));
                    setIsRecordEditable((prev) => !prev);
                  }
                }}
              >
                {isRecordEditable ? "Save" : "Edit"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="ml-1 bg-red-600 hover:bg-red-700 text-white">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      stock record remove data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600"
                      onClick={() => handleDelete(stockRecord._id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StockRecordItem;
