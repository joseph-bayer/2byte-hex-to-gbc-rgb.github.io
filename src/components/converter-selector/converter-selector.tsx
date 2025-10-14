"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConverterTypes } from "@/constants/converter-types";

interface ConverterSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ConverterSelector({
  value,
  onChange,
}: ConverterSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select Converter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ConverterTypes.twoByteHex.toString()}>
          Two Byte Hex to Pokecrystal RGB
        </SelectItem>
        <SelectItem value={ConverterTypes.modernHex.toString()}>
          Modern Hex to Pokecrystal RGB
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
