import {
  GBCRGBToModernHex,
  GBCRGBToRGB888,
  ModernHexToRGB888,
  TwoByteHexToModernHex,
  TwoByteHexToRGB888,
} from "@/lib/conversion";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";

interface ModernColorDisplayProps {
  twoByteHexValue?: string;
  GBCRGB?: {
    r: number;
    g: number;
    b: number;
  };
  modernHex?: string;
}

export default function ModernColorDisplay({
  twoByteHexValue,
  GBCRGB,
  modernHex,
}: ModernColorDisplayProps) {
  const [rgb888, setRgb888] = useState<string>("");
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    if (!!twoByteHexValue?.length) {
      setRgb888(TwoByteHexToRGB888(twoByteHexValue));
      setHex(`#${TwoByteHexToModernHex(twoByteHexValue)}`);
    } else if (!!GBCRGB) {
      setRgb888(GBCRGBToRGB888(GBCRGB.r, GBCRGB.g, GBCRGB.b));
      setHex(`#${GBCRGBToModernHex(GBCRGB.r, GBCRGB.g, GBCRGB.b)}`);
    } else if (!!modernHex) {
      setRgb888(ModernHexToRGB888(modernHex));
      setHex(`#${modernHex}`);
    }
  }, [twoByteHexValue, GBCRGB, modernHex]);

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-base">Web Colors (Approximate)</Label>
      <div className="flex flex-row gap-6">
        <div
          className="w-16 h-16 rounded-xl"
          style={{ backgroundColor: rgb888 }}
        ></div>
        <div className="flex flex-col gap-3">
          <div className="text-muted-foreground">{hex}</div>
          <div className="text-muted-foreground">{rgb888}</div>
        </div>
      </div>
    </div>
  );
}
