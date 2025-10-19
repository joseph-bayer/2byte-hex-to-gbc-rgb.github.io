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
} from "../ui/input-group";

// Define validation schema for RGB string format
const formSchema = z.object({
  rgbInput: z
    .string()
    .min(1, "RGB values are required")
    .refine((val) => {
      // Parse the RGB string
      const cleanValue = val.replace(/^RGB\s*/i, "").trim();
      const parts = cleanValue.split(",").map((p) => p.trim());

      if (parts.length !== 3) return false;

      return parts.every((part) => {
        const num = Number(part);
        return !isNaN(num) && num >= 0 && num <= 31;
      });
    }, "Must be in format 'R, G, B' or 'RGB R, G, B' where each value is 0-31"),
});

type FormData = z.infer<typeof formSchema>;

interface GBCRGBInputFormProps {
  onSubmit: (r: number, g: number, b: number) => void;
}

export function GBCRGBInputForm({ onSubmit }: GBCRGBInputFormProps) {
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rgbInput: "",
    },
  });

  // Set form values from URL parameters
  useEffect(() => {
    const rFromUrl = searchParams.get("r");
    const gFromUrl = searchParams.get("g");
    const bFromUrl = searchParams.get("b");

    if (rFromUrl && gFromUrl && bFromUrl) {
      const r = Number(rFromUrl);
      const g = Number(gFromUrl);
      const b = Number(bFromUrl);

      if (
        !isNaN(r) &&
        !isNaN(g) &&
        !isNaN(b) &&
        r >= 0 &&
        r <= 31 &&
        g >= 0 &&
        g <= 31 &&
        b >= 0 &&
        b <= 31
      ) {
        form.setValue("rgbInput", `${r}, ${g}, ${b}`);
      }
    }
  }, [searchParams, form]);

  const parseRGBString = (
    input: string
  ): { r: number; g: number; b: number } | null => {
    // Remove "RGB" prefix if present (case insensitive)
    const cleanValue = input.replace(/^RGB\s*/i, "").trim();

    const parts = cleanValue.split(",").map((p) => p.trim());

    if (parts.length !== 3) return null;

    const r = Number(parts[0]);
    const g = Number(parts[1]);
    const b = Number(parts[2]);

    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    if (r < 0 || r > 31 || g < 0 || g > 31 || b < 0 || b > 31) return null;

    return { r, g, b };
  };

  const handleSubmit = (data: FormData) => {
    const parsed = parseRGBString(data.rgbInput);
    if (parsed) {
      onSubmit(parsed.r, parsed.g, parsed.b);
    }
  };

  const handleInputChange = (value: string) => {
    // Strip "RGB" prefix if present (case insensitive)
    if (value.match(/^RGB\s+/i)) {
      return value.replace(/^RGB\s+/i, "");
    }
    return value;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rgbInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GBC RGB Value</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon className="pr-3">RGB</InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      placeholder="12, 31, 11"
                      onChange={(e) => {
                        const cleanValue = handleInputChange(e.target.value);
                        field.onChange(cleanValue);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormDescription>
                  Enter RGB values (0-31) separated by commas. Format: &quot;R,
                  G, B&quot; or &quot;RGB R, G, B&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Convert
          </Button>
        </div>
      </form>
    </Form>
  );
}
