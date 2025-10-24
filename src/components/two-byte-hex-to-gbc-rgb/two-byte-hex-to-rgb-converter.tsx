"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { TwoByteHexInputForm } from "./two-byte-hex-input-form/two-byte-hex-input-form";
import { TwoByteHexResultsCard } from "./two-byte-hex-results-card/two-byte-hex-results-card";
import { MoveRightIcon } from "lucide-react";

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
    <section className="flex flex-col gap-16">
      {/* Header */}
      <div className="w-full text-center flex flex-col gap-2">
        <h2 className="text-3xl">2 Byte Hexadecimal to GBC RGB Converter</h2>
        <span className="text-muted-foreground flex flex-row gap-3 items-center justify-center">
          e.g. 2FEC <MoveRightIcon aria-label="to" /> RGB 12, 31, 11
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Hex Input */}
        <Card className="col-span-1 h-fit">
          <CardContent>
            <TwoByteHexInputForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {/* Results */}
        <TwoByteHexResultsCard twoByteHexValue={twoByteHexValue} />
      </div>
    </section>
  );
}
