import { Button } from "@/components/ui/button";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { HashIcon } from "lucide-react";

// Define validation schema with exactly 6 characters and hex validation
const formSchema = z.object({
  modernHexInput: z
    .string()
    .min(6, "Hex code must be exactly 6 characters")
    .max(6, "Hex code must be exactly 6 characters")
    .regex(/^[0-9A-Fa-f]{6}$/, "Must be a valid 6-digit hex code"),
});

type FormData = z.infer<typeof formSchema>;

interface ModernHexInputFormProps {
  onSubmit: (modernHexValue: string) => void;
}

export default function ModernHexInputForm({
  onSubmit,
}: ModernHexInputFormProps) {
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modernHexInput: "",
    },
  });

  // Set form value from URL parameter
  useEffect(() => {
    const hexFromUrl = searchParams.get("hex");
    if (hexFromUrl && /^[0-9A-Fa-f]{6}$/.test(hexFromUrl)) {
      form.setValue("modernHexInput", hexFromUrl.toUpperCase());
    }
  }, [searchParams, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit(data.modernHexInput);
  };

  const handleInputChange = (value: string) => {
    // Strip # symbol from the beginning if present
    let cleanValue = value;
    if (cleanValue.startsWith("#")) {
      cleanValue = cleanValue.slice(1);
    }
    // Ensure the value doesn't exceed 6 characters and is uppercase
    if (cleanValue.length > 6) {
      cleanValue = cleanValue.slice(0, 6);
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
          name="modernHexInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hex Code</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon className="pr-3">
                    <HashIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="63FF5A"
                    {...field}
                    onChange={(e) => {
                      const cleanValue = handleInputChange(e.target.value);
                      field.onChange(cleanValue);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormDescription>Enter a 6-digit hex value</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          Convert
        </Button>
      </form>
    </Form>
  );
}
