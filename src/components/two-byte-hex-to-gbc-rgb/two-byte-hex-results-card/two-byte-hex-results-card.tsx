import { Card, CardContent } from "@/components/ui/card";
import { RgbDisplay } from "../../rgb-display/rgb-display";
import { TwoByteHexConversionDetails } from "../two-byte-hex-conversion-details/two-byte-hex-conversion-details";
import { EmptyState } from "../../empty-state/empty-state";
import ModernColorDisplay from "../../modern-color-display/modern-color-display";
import { TwoByteHexToRGB555 } from "@/lib/conversion";

interface TwoByteHexResultsCardProps {
  twoByteHexValue: string;
}

export function TwoByteHexResultsCard({
  twoByteHexValue,
}: TwoByteHexResultsCardProps) {
  return (
    <Card className="col-span-1 h-fit">
      {!!twoByteHexValue?.length ? (
        <CardContent>
          <div className="flex flex-col gap-6">
            <RgbDisplay RGBValue={TwoByteHexToRGB555(twoByteHexValue)} />
            <TwoByteHexConversionDetails twoByteHexValue={twoByteHexValue} />

            <hr />

            <ModernColorDisplay twoByteHexValue={twoByteHexValue} />
          </div>
        </CardContent>
      ) : (
        <EmptyState description="Please provide a hex value to convert." />
      )}
    </Card>
  );
}
