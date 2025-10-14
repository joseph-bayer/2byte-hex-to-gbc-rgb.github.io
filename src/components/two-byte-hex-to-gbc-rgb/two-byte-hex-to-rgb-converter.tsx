"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { TwoByteHexInputForm } from "./two-byte-hex-input-form/two-byte-hex-input-form";
import { TwoByteHexResultsCard } from "./two-byte-hex-results-card/two-byte-hex-results-card";

export function TwoByteHexToRgbConverter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [twoByteHexValue, setTwoByteHexValue] = useState("");

  // Initialize from URL params
  useEffect(() => {
    const hexFromUrl = searchParams.get("hex");
    if (hexFromUrl && /^[0-9A-Fa-f]{4}$/.test(hexFromUrl)) {
      setTwoByteHexValue(hexFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = (hex: string) => {
    setTwoByteHexValue(hex);

    // Update URL with the hex value
    const params = new URLSearchParams(searchParams);
    params.set("hex", hex);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Header */}
      <h2 className="text-3xl w-full text-center">
        2 Byte Hexadecimal to GBC RGB Converter
      </h2>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Hex Input */}
        <Card className="col-span-1 h-fit">
          <CardContent>
            <TwoByteHexInputForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {/* Results */}
        <TwoByteHexResultsCard twoByteHexValue={twoByteHexValue} />
      </div>
    </>
  );
}
