import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define validation schema with exactly 4 characters and hex validation
const formSchema = z.object({
  twoByteHexInput: z
    .string()
    .min(4, "Two Byte Hex must be exactly 4 characters")
    .max(4, "Two Byte Hex must be exactly 4 characters")
    .regex(/^[0-9A-Fa-f]{4}$/, "Must be valid hex"),
});

type FormData = z.infer<typeof formSchema>;

interface TwoByteHexInputFormProps {
  onSubmit: (twoByteHexValue: string) => void;
}

export function TwoByteHexInputForm({ onSubmit }: TwoByteHexInputFormProps) {
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoByteHexInput: "",
    },
  });

  // Set form value from URL parameter
  useEffect(() => {
    const hexFromUrl = searchParams.get("hex");
    if (hexFromUrl && /^[0-9A-Fa-f]{4}$/.test(hexFromUrl)) {
      form.setValue("twoByteHexInput", hexFromUrl.toUpperCase());
    }
  }, [searchParams, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit(data.twoByteHexInput);
  };

  const handleInputChange = (value: string) => {
    // Strip # symbol from the beginning if present
    let cleanValue = value;
    if (cleanValue.startsWith("#")) {
      cleanValue = cleanValue.slice(1);
    }
    // Ensure the value doesn't exceed 4 characters and is uppercase
    if (cleanValue.length > 4) {
      cleanValue = cleanValue.slice(0, 4);
    }
    // Convert to uppercase for consistency
    cleanValue = cleanValue.toUpperCase();

    return cleanValue;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="twoByteHexInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Two Byte Hex</FormLabel>
              <FormControl>
                <Input
                  placeholder="2FEC"
                  {...field}
                  onChange={(e) => {
                    const cleanValue = handleInputChange(e.target.value);
                    field.onChange(cleanValue);
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter a 4-digit hex value (letters and numbers only)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  );
}
