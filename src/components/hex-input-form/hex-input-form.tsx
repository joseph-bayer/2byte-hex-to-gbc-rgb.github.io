import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HexInputFormProps {
  onSubmit: (hexValue: string) => void;
}

export function HexInputForm({ onSubmit }: HexInputFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hexValue = formData.get("hex-input") as string;
    onSubmit(hexValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="hex-input">Hex</FieldLabel>
        <Input
          id="hex-input"
          name="hex-input"
          placeholder="2FEC"
          required
          minLength={4}
          maxLength={4}
        />
        <FieldDescription>Enter a 4-digit hex value</FieldDescription>
      </Field>
      <Button type="submit" className="cursor-pointer">
        Submit
      </Button>
    </form>
  );
}
