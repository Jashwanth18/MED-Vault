import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMedicine } from "../api/medicineService";
import toast from "react-hot-toast";

const AddMedicinePage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    type: z.enum(["Tablet", "Capsule", "Syrup"], {
      message: "Type is required",
    }),
    displayImage: z.instanceof(File).optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("displayImage", file);
    }
  };

  const createMedMutation = useMutation({ mutationFn: createMedicine });
  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("type", values.type);
    if (values.displayImage) {
      formData.append("displayImage", values.displayImage);
    }
    const createMedPromise = createMedMutation.mutateAsync(formData);
    toast.promise(createMedPromise, {
      loading: "Adding medicine...",
      success: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["medicines"] });
        navigate("/home");
        return data?.data?.message || "Successfully added medicine!";
      },
      error: (error) => {
        console.log(error, "EROORRRRR");
        return error.response?.data?.message || "Something went wrong!";
      },
    });
    console.log(values);
  }
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button
                  variant={"outline"}
                  disabled={createMedMutation.isPending}
                >
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600"
                disabled={createMedMutation.isPending}
              >
                <span className={`ml-2`}>Add medicine</span>
              </Button>
            </div>
          </div>
          <Card className="mt-6 border-2 border-green-400">
            <CardHeader>
              <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Add a new medicine
              </CardTitle>
              <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">
                Fill out the form below to add a new medicine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine name</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Medicine</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tablet">Tablet</SelectItem>
                            <SelectItem value="Capsule">Capsule</SelectItem>
                            <SelectItem value="Syrup">Syrup</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Display Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="w-full"
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default AddMedicinePage;
