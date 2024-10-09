import StockInfoTable from "../components/StockInfoTable";
import AddStockInfo from "../components/AddStockInfo";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { useRef, useState } from "react";
import MedDetailsCard from "../components/MedDetailsCard";
import { Separator } from "@/components/ui/separator";

const MedicineDetailsPage = () => {
  const { medId } = useParams();
  const isAdmin = useUserStore((state) => state.isAdmin);

  const addRecordDivRef = useRef(null);

  const [highlight, setHighlight] = useState(false);
  const scrollToAddRecordDiv = () => {
    console.log(addRecordDivRef);
    if (addRecordDivRef.current) {
      addRecordDivRef.current.scrollIntoView({ behavior: "smooth" });

      setHighlight(true);

      setTimeout(() => {
        setHighlight(false);
      }, 6000);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="sticky top-0">
            <MedDetailsCard medId={medId} className="w-full max-w-sm p-4" />
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col items-center space-y-4">
          {isAdmin && (
            <div className="w-full">
              <AddStockInfo
                ref={addRecordDivRef}
                highlight={highlight}
                className="w-full max-w-lg"
              />
              <Separator className="mt-6" />
            </div>
          )}

          <div className="flex-1 w-full overflow-auto">
            <StockInfoTable
              scrollToAddRecordDiv={scrollToAddRecordDiv}
              addRecordDivRef={addRecordDivRef}
              medId={medId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDetailsPage;
