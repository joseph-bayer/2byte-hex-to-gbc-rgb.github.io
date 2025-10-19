import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "../../empty-state/empty-state";
import { GBCRGBToTwoByteHex } from "@/lib/conversion";
import ModernColorDisplay from "@/components/modern-color-display/modern-color-display";
import { CopyableText } from "@/components/copyable-text/copyable-text";

interface GBCRGBToTwoByteHexResultsCardProps {
  r: number | null;
  g: number | null;
  b: number | null;
}

export function GBCRGBToTwoByteHexResultsCard({
  r,
  g,
  b,
}: GBCRGBToTwoByteHexResultsCardProps) {
  const hasValidValues = r !== null && g !== null && b !== null;

  return (
    <Card className="col-span-1 h-fit">
      {hasValidValues ? (
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Two Byte Hex Result */}
            <CopyableText textToCopy={GBCRGBToTwoByteHex(r!, g!, b!)} />

            <hr />

            {/* Modern Color Formats */}
            <ModernColorDisplay GBCRGB={{ r: r!, g: g!, b: b! }} />
          </div>
        </CardContent>
      ) : (
        <EmptyState description="Please provide RGB values to convert." />
      )}
    </Card>
  );
}
