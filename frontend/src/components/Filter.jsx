import { ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({ options = [], name = "", onChange }) => {
  return (
    <Select onValueChange={(value) => onChange(name.toLowerCase(), value)}>
      <SelectTrigger className="w-[180px] bg-white">
        <ListFilter className="h-3.5 w-3.5" />
        <SelectValue placeholder={`Select ${name}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name + "s"}</SelectLabel>
          <div>
            {options.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
