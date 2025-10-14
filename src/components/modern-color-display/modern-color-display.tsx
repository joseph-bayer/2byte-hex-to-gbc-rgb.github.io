import { TwoByteHexToModernHex, TwoByteHexToRGB888 } from "@/lib/conversion";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";

interface ModernColorDisplayProps {
  twoByteHexValue: string;
}

export default function ModernColorDisplay({
  twoByteHexValue,
}: ModernColorDisplayProps) {
  const [rgb888, setRgb888] = useState<string>("");
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    setRgb888(TwoByteHexToRGB888(twoByteHexValue));
    setHex(TwoByteHexToModernHex(twoByteHexValue));
  }, [twoByteHexValue]);

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
