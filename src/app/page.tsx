"use client";

import { DarkModeToggle } from "@/components/mode-toggle/dark-mode-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { HexInputForm } from "@/components/hex-input-form/hex-input-form";
import { ResultsCard } from "@/components/results-card/results-card";
import { useState } from "react";

export default function Home() {
  const [hexValue, setHexValue] = useState("");

  const handleHexSubmit = (hex: string) => {
    setHexValue(hex);
  };

  return (
    <div className="font-sans p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-16">
        {/* TODO: should probably be in layout */}
        {/* Dark Mode Toggle */}
        <div className="flex w-full justify-end">
          <DarkModeToggle />
        </div>

        {/* Header */}
        <h1 className="text-5xl w-full text-center">
          Pokecrystal - 2 Byte Hexadecimal to GBC RGB Converter
        </h1>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Hex Input */}
          <Card className="col-span-1 h-fit">
            <CardContent>
              <HexInputForm onSubmit={handleHexSubmit} />
            </CardContent>
          </Card>

          {/* Results */}
          <ResultsCard hexValue={hexValue} />
        </div>
      </main>
    </div>
  );
}
