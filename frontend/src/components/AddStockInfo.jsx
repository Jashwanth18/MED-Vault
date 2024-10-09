import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { forwardRef, useRef, useState } from "react";
import { createStockRecord } from "../api/medicineService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DatePickerD from "./DatePickerD";

const AddStockInfo = forwardRef((props, ref) => {
  const [expiryDate, setExpiryDate] = useState(null);
  const queryClient = useQueryClient();

  const batchNumberRef = useRef(null);
  const quantityRef = useRef(null);

  const { medId } = useParams();

  const createRecordMutation = useMutation({
    mutationFn: async (recordData) =>
      await createStockRecord(medId, recordData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockInfo", medId] });
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recordData = {
      batchNumber: batchNumberRef?.current?.value,
      expiryDate,
      quantity: quantityRef?.current?.value,
    };

    const createRecordPromise = createRecordMutation.mutateAsync(recordData);
    toast.promise(createRecordPromise, {
      loading: "Adding new stock record...",
      success: (data) => {
        console.log(data, "DATAAA");
        return data?.data?.message || "Successfully created record!!";
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
    console.log("added new record");
  };
  return (
    <>
      <div
        ref={ref}
        className={`bg-gray-100 w-full border-2  p-4 rounded-lg ${
          props.highlight ? "glow" : ""
        }`}
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          New Stock Record
        </h3>
        <form className="flex flex-col space-y-6 ">
          <div className="flex flex-col">
            <Label htmlFor="batchNo" className="mb-2">
              Batch No.
            </Label>
            <Input
              id="batchNo"
              placeholder="Enter Batch No."
              className="shadow-xl p-2 bg-gray-50"
              ref={batchNumberRef}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="quantity" className="mb-2">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter Quantity"
              className="shadow-xl p-2 bg-gray-50"
              ref={quantityRef}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <Label className="mb-2">Expiry Date</Label>
                <DatePickerD
                  expiryDate={expiryDate}
                  setExpiryDate={setExpiryDate}
                />
              </div>
              <Button
                disabled={createRecordMutation.isPending}
                className="mt-7 border-emerald-500 bg-emerald-500 hover:bg-emerald-400  hover:text-white text-white"
                variant={"outline"}
                onClick={handleSubmit}
              >
                Create record
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
});

export default AddStockInfo;
