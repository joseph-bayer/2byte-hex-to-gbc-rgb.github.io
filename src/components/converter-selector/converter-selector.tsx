"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConverterTypes } from "@/constants/converter-types";
import { SelectGroup } from "@radix-ui/react-select";

interface ConverterSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ConverterSelector({
  value,
  onChange,
}: ConverterSelectorProps) {
  return (
    <>
      {/* SelectTrigger is a button and buttons require labels for screen readers. Otherwise, the screen reader will announce it just as "button" */}
      <label htmlFor="converter-select" className="sr-only">
        Select Converter
      </label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="converter-select" className="w-[300px]">
          <SelectValue placeholder="Select Converter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Converters</SelectLabel>
            <SelectItem value={ConverterTypes.twoByteHex.toString()}>
              Two Byte Hex to Pokecrystal RGB
            </SelectItem>
            <SelectItem value={ConverterTypes.modernHex.toString()}>
              Modern Hex to Pokecrystal RGB
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
