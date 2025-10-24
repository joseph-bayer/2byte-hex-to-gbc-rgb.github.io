"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { GBCRGBInputForm } from "../shared/gbc-rgb-input-form";
import { GBCRGBToModernHexResultsCard } from "./gbc-rgb-to-modern-hex-results-card/gbc-rgb-to-modern-hex-results-card";
import { MoveRightIcon } from "lucide-react";

export function GBCRGBToModernHexConverter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [r, setR] = useState<number | null>(null);
  const [g, setG] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const rFromUrl = searchParams.get("r");
    const gFromUrl = searchParams.get("g");
    const bFromUrl = searchParams.get("b");

    if (
      rFromUrl &&
      !isNaN(Number(rFromUrl)) &&
      Number(rFromUrl) >= 0 &&
      Number(rFromUrl) <= 31
    ) {
      setR(Number(rFromUrl));
    }
    if (
      gFromUrl &&
      !isNaN(Number(gFromUrl)) &&
      Number(gFromUrl) >= 0 &&
      Number(gFromUrl) <= 31
    ) {
      setG(Number(gFromUrl));
    }
    if (
      bFromUrl &&
      !isNaN(Number(bFromUrl)) &&
      Number(bFromUrl) >= 0 &&
      Number(bFromUrl) <= 31
    ) {
      setB(Number(bFromUrl));
    }
  }, [searchParams]);

  const handleSubmit = (red: number, green: number, blue: number) => {
    setR(red);
    setG(green);
    setB(blue);

    // Update URL with the RGB values
    const params = new URLSearchParams(searchParams);
    params.set("r", red.toString());
    params.set("g", green.toString());
    params.set("b", blue.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="flex flex-col gap-16">
      {/* Header */}
      <div className="w-full text-center flex flex-col gap-2">
        <h2 className="text-3xl">GBC RGB to Modern Hex Converter</h2>
        <span className="text-muted-foreground flex flex-row gap-3 items-center justify-center">
          e.g. RGB 12, 31, 11 <MoveRightIcon aria-label="to" /> #63FF5A
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* RGB Input */}
        <Card className="col-span-1 h-fit">
          <CardContent>
            <GBCRGBInputForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {/* Results */}
        <GBCRGBToModernHexResultsCard r={r} g={g} b={b} />
      </div>
    </section>
  );
}
