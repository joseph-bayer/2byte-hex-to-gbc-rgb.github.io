"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import ModernHexInputForm from "./modern-hex-input-form/modern-hex-input-form";
import { ModernHexResultsCard } from "./modern-hex-results-card/modern-hex-results-card";

export function ModernHexToRgbConverter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modernHexValue, setModernHexValue] = useState("");

  // Initialize from URL params
  useEffect(() => {
    const hexFromUrl = searchParams.get("hex");
    if (hexFromUrl && /^[0-9A-Fa-f]{6}$/.test(hexFromUrl)) {
      setModernHexValue(hexFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = (hex: string) => {
    setModernHexValue(hex);

    // Update URL with the hex value
    const params = new URLSearchParams(searchParams);
    params.set("hex", hex);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Header */}
      <h2 className="text-3xl w-full text-center">
        Modern Hex to Pokecrystal RGB
      </h2>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Hex Input */}
        <Card className="col-span-1 h-fit">
          <CardContent>
            <ModernHexInputForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {/* Results */}
        <ModernHexResultsCard modernHexValue={modernHexValue} />
      </div>
    </>
  );
}
